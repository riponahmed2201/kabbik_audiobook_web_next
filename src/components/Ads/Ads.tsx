import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export const Ads = ({ slotId }: { slotId: number }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, [slotId]);
  return (
    <div className="max-w-[1306px] mx-auto text-center">

      {/* <ins
      className="adsbygoogle"
      style={{ display: "block",textAlign:'center' }}
      data-ad-client="ca-pub-3514908048340490"
      data-ad-slot={`${slotId}`}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins> */}
    </div>
    
  );
};
