"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";
// import { useRouter } from "next";

const TAB_ID_KEY = "active_tab_id";
const TAB_CHANNEL = "single_tab_channel";

function generateTabId(): string {
  return `tab_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

interface UseSingleTabOptions {
  onDuplicate?: () => void;
  redirectPath?: string; // e.g. "/duplicate-tab" — locale prefix added automatically
}

export function useSingleTab({
  onDuplicate,
  redirectPath = "/duplicate-tab",
}: any) {
    const pathname = usePathname();
//   const router = useRouter();
  const tabId = useRef<string>(generateTabId());

  // Builds the redirect URL with the current locale prefix automatically.
  // e.g. locale="ar" + redirectPath="/duplicate-tab" => "/ar/duplicate-tab"
  const handleDuplicate = useCallback(() => {
    if (onDuplicate) {
      onDuplicate();
      return;
    }
    const locale =  "bn";
    const localizedPath = `/${locale}${redirectPath}`;
    // avoid endless redirect loop if already on duplicate-tab page
    if (typeof window !== "undefined" && window.location.pathname === localizedPath) {
      return;
    }
    window.location.replace(localizedPath);
  }, [onDuplicate, redirectPath]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const myId = tabId.current;

    // ── Strategy 1: BroadcastChannel (modern browsers) ──
    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel(TAB_CHANNEL);

      // Announce this new tab to any existing tabs
      channel.postMessage({ type: "NEW_TAB", id: myId });

      channel.onmessage = (event) => {
        const { type, id } = event.data;

        if (type === "NEW_TAB" && id !== myId) {
          // We are an existing tab — respond to claim ownership
          channel.postMessage({ type: "TAB_EXISTS", id: myId });
        }

        if (type === "TAB_EXISTS" && id !== myId) {
          // We are the new tab — an older tab already owns the session
          handleDuplicate();
        }
      };

      return () => channel.close();
    }

    // ── Strategy 2: localStorage fallback (older browsers) ──
    const claimTab = () => localStorage.setItem(TAB_ID_KEY, myId);

    const onStorageChange = (e: StorageEvent) => {
      if (e.key === TAB_ID_KEY && e.newValue && e.newValue !== myId) {
        handleDuplicate();
      }
    };

    const activeId = localStorage.getItem(TAB_ID_KEY);
    if (activeId && activeId !== myId) {
      handleDuplicate();
    } else {
      claimTab();
    }

    window.addEventListener("storage", onStorageChange);

    const onUnload = () => {
      if (localStorage.getItem(TAB_ID_KEY) === myId) {
        localStorage.removeItem(TAB_ID_KEY);
      }
    };
    window.addEventListener("beforeunload", onUnload);

    return () => {
      window.removeEventListener("storage", onStorageChange);
      window.removeEventListener("beforeunload", onUnload);
      onUnload();
    };
  }, [handleDuplicate,pathname]);
}