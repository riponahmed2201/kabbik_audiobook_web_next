"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSingleTab } from "./useSingletab";
// import { useSingleTab } from "./Usesingletab";

/**
 * Drop this into your root layout.tsx (App Router).
 * It renders nothing — just enforces the single-tab rule.
 *
 * Usage in src/app/[lang]/layout.tsx:
 *   import { SingleTabGuard } from "@/components/SingleTabGuard";
 *   ...
 *   <SingleTabGuard />
 */
export function SingleTabGuard() {
    const pathname = usePathname();
    // don't enforce single-tab on the duplicate warning page itself
    const isDuplicatePage = pathname?.endsWith("/duplicate-tab");
    useSingleTab({ 
      redirectPath: "/duplicate-tab",
    //   disabled: isDuplicatePage  // skip logic if on duplicate page
    });
    // useEffect(()=>{
    //      if (!isDuplicatePage) {
    //        useSingleTab({ redirectPath: "/duplicate-tab" });
    //      }
    // },[])
  return null;
}