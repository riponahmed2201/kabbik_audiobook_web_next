// import TawkScript from "@/features/layoutShell/components/twak/TwakTo.view";
import FacebookProvider from "@/features/auth/components/Fblogin/FacebookProvider";
import { siteConfig } from "@/config/config";
import type { Metadata } from "next";
import "@/app/globals.css";
import Script from "next/script";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
// import { ReduxProvider } from "./Provider";

export const metadata: Metadata = {
  title: "Kabbik audiobook",
  description: "Kabbik  audiobook",
  icons:{
    icon:siteConfig.logo
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    

  return (
    <html lang="en">
      <head>

        {/* <Script
          async
          strategy="afterInteractive"
           src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3514908048340490`}
          // src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXX"
          crossOrigin="anonymous"
        /> */}

        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TVZM9845')
            `,
          }}
        />
        
        {/* <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3514908048340490`}
              crossOrigin="anonymous"
              strategy="afterInteractive"
            /> */}
      </head>
      <body
        className={`${inter.className} bg-bg text-foreground antialiased`}
        suppressHydrationWarning={true}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TVZM9845"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        {/* YouTube iframe API loads when Reels modal opens (CustomReels) — avoids beforeInteractive work + log_event spam on every page. */}
        {/* <ReduxProvider> */}
        <FacebookProvider>{children}</FacebookProvider>
            {/* {children} */}
        {/* </ReduxProvider> */}
            {/* <TawkScript/> */}
      {/* <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3514908048340490"
            crossOrigin="anonymous"
          /> */}
          {/* <Script
            strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3514908048340490"
            crossOrigin="anonymous"
          /> */}

      </body>
    </html>
  );
}
