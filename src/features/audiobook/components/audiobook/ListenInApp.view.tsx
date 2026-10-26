"use client";

import Link from "next/link";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  getListenInAppHref,
} from "@/shared/lib/appLinks";

type ListenInAppProps = {
  audiobookId?: string | number;
  className?: string;
  variant?: "primary" | "inline";
};

export default function ListenInApp({
  audiobookId,
  className = "",
  variant = "primary",
}: ListenInAppProps) {
  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        <Link
          href={getListenInAppHref(audiobookId)}
          className="text-deep_pink2 font-semibold underline"
        >
          অ্যাপে শুনুন
        </Link>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 underline"
        >
          Play Store
        </a>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 underline"
        >
          App Store
        </a>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Link
        href={getListenInAppHref(audiobookId)}
        className="w-full btn-gradient-2 text-gray-50 py-2 px-6 rounded-full text-cs2 transition-colors duration-200 flex items-center justify-center font-semibold"
      >
        অ্যাপে শুনুন
      </Link>
      <p className="text-center text-cs text-gray-600">
        শোনার জন্য Kabbik মোবাইল অ্যাপ ব্যবহার করুন
      </p>
    </div>
  );
}
