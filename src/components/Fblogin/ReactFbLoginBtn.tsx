// components/FacebookLoginButton.tsx
"use client";

import FaceBook from "@/svgs/FaceBook";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function FacebookLoginButton() {
  const [loading, setLoading] = useState(false);
  const router = usePathname();

  const locale = router?.split("/")[1] || "bn";
  const socialCallbackUrl = `/${locale}/redirecting?route=${encodeURIComponent(router || `/${locale}`)}`;

  const handleLogin = async () => {
    setLoading(true);
    await signIn("facebook", { callbackUrl: socialCallbackUrl });
  };

  const facebookBtn = async () => {
    try {
      await signIn("facebook", {
        callbackUrl: socialCallbackUrl,
      });
    } catch (error: any) {
      console.log(" --- error from facebook login fx:", error);
    }
  };

  return (
    <>
    
    <button
                onClick={facebookBtn}
                className="w-full bg-[#1877F2] hover:bg-[#166fe5] transition-colors rounded-[4px] shadow-md py-1.5 px-2 md:px-4 flex items-center gap-4 sm:gap-8 md:gap-12"
              >
                <div className="w-full flex justify-center">
                  <div className="w-5 md:w-6 h-6 mr-4 flex-shrink-0 text-white">
                    <FaceBook />
                  </div>
                  <span className="text-white text-cn md:text-xl font-semibold">
                    ফেসবুক
                  </span>
                </div>
              </button>
    <button
      onClick={handleLogin}
      disabled={loading}
      className="flex items-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 transition-colors cursor-pointer"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
      {loading ? "Connecting..." : "Continue with Facebook"}
    </button>
    </>
  );
}