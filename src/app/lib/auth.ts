import NextAuth, { type Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { BASE_URL } from "@/utils/apiEndpoints";

declare module "next-auth" {
  interface Session {
    id_token?: string;
    facebookAuth?: {
      providerAccountId: string;
      accessToken?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    fbResData?: any;
  }
}

async function serverDebuggerLog(payload: Record<string, unknown>) {
  try {
    await fetch(`${BASE_URL}/v1/core/debugger`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: "9881eb", timestamp: Date.now(), ...payload }),
    });
  } catch {
    // non-fatal
  }
}

const facebookClientId =
  process.env.AUTH_FACEBOOK_ID ??
  process.env.FACEBOOK_CLIENT_ID ??
  process.env.FACEBOOK_ID;

const facebookClientSecret =
  process.env.AUTH_FACEBOOK_SECRET ?? process.env.FACEBOOK_CLIENT_SECRET;

// Get default Facebook config then override to pure OAuth2 mode
const facebookBase = Facebook({
  clientId: facebookClientId,
  clientSecret: facebookClientSecret,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "profile email",
          prompt: "select_account",
        },
      },
    }),
    Facebook({
      clientId: facebookClientId!,
      clientSecret: facebookClientSecret!,
    
      authorization: {
        params: {
          scope: "email public_profile",
          response_type: "code",
        },
      },
    
      allowDangerousEmailAccountLinking: true,
    
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email ?? `fb_${profile.id}@placeholder.local`,
          image: profile.picture?.data?.url,
        };
      },
    })
  ],

  debug: process.env.NODE_ENV !== "production",

  logger: {
    error(error) {
      void serverDebuggerLog({
        hypothesisId: "H5",
        location: "auth.ts:logger.error",
        name: error.name,
        message: error.message,
        type: (error as { type?: string }).type,
        cause: (error as { cause?: unknown }).cause,
      });
    },
  },

  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "facebook") {
        void serverDebuggerLog({
          hypothesisId: "H2",
          location: "auth.ts:signIn:facebook",
          message: "Facebook OAuth profile accepted",
          providerAccountId: account.providerAccountId,
          hasAccessToken: !!account.access_token,
        });
      }
      return true;
    },

    async jwt({ token, account, user }) {
      // Google/other OIDC providers only — never store Facebook id_token
      if (account?.id_token && account?.provider !== "facebook") {
        token.id_token = account.id_token;
      }

      if (account?.provider === "facebook" && user) {
        token.facebookAuth = {
          providerAccountId: account.providerAccountId,
          accessToken: account.access_token ?? null,
          name: user.name ?? null,
          email: user.email ?? null,
          image: user.image ?? null,
        };
        void serverDebuggerLog({
          hypothesisId: "H3",
          location: "auth.ts:jwt:facebook",
          message: "facebookAuth stored in JWT",
          providerAccountId: account.providerAccountId,
          hasEmail: !!user.email,
          token: token,
          account: account,
          user: user,
        });
      }

      return token;
    },

    async session({ session, token }) {
      if (token.id_token) {
        session.id_token = token.id_token as string;
      }
      if (token.facebookAuth) {
        session.facebookAuth = token.facebookAuth as Session["facebookAuth"];
      }
      if (token.fbResData) {
        session.fbResData = token.fbResData;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
});