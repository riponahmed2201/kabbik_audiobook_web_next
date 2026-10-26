import { handlers } from "@/app/lib/auth";
import { BASE_URL } from "@/utils/apiEndpoints";
import type { NextRequest } from "next/server";

async function logFacebookAuthRoute(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (!path.includes("facebook")) return;

  const payload = {
    sessionId: "9881eb",
    hypothesisId: "H2",
    location: "route.ts:auth",
    message: "Facebook auth route hit",
    timestamp: Date.now(),
    data: {
      path,
      method: req.method,
      hasCode: req.nextUrl.searchParams.has("code"),
      hasState: req.nextUrl.searchParams.has("state"),
      hasError: req.nextUrl.searchParams.has("error"),
      error: req.nextUrl.searchParams.get("error"),
    },
  };

  
  try {
    await fetch(`${BASE_URL}/v1/core/debugger`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // non-fatal
  }
}

async function handleAuth(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<Response>
) {
  await logFacebookAuthRoute(req);
  return handler(req);
}

export async function GET(req: NextRequest) {
  return handleAuth(req, handlers.GET);
}

export async function POST(req: NextRequest) {
  return handleAuth(req, handlers.POST);
}
