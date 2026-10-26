"use client";
import Script from "next/script";

declare global {
  interface Window { FB: any; }
}

export default function FacebookProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.FB.init({
            appId: "1869476554005636",  // ← your app ID
            cookie: true,
            xfbml: true,
            version: "v20.0",
          });
        }}
      />
      {children}
    </>
  );
}