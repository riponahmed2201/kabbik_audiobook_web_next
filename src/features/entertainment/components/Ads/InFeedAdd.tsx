"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export const InFeedAds = ({
  slotId,
  layoutKey,
}: {
  slotId: number;
  layoutKey: string;
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, [slotId, layoutKey]);
  return (
    <div className="max-w-[1306px] mx-auto text-center">
      {/* <ins
        className="adsbygoogle"
        style={{ display: "block",textAlign:'center' }}
        data-ad-format="fluid"
        data-ad-layout-key={layoutKey}
        data-ad-client="ca-pub-3514908048340490"
        data-ad-slot={`${slotId}`}
      ></ins> */}
    </div>
  );
};
