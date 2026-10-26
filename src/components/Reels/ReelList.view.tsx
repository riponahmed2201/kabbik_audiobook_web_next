// app/components/VideoGrid.tsx
"use client";

import { useAppSelector } from "@/store/store";
import CommonModal from "../ui/CommonModal/CommonModal.view";
import CustomReels from "./CustomReels.view";
import { useState } from "react";
import BigVideoPlayerIcon from "@/svgs/BigVideoPlayer";
import { PlayCircle } from "lucide-react";


export default function ReelsVideoGrid() {
    const reelsData=useAppSelector((store)=>store?.staticTexts?.data?.reels)
    const [target,setTarget]=useState('');
    
  return (
    <div className="p-4 mt-10">
      <div
        className="
          grid gap-4
          grid-cols-1
          xs:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {reelsData?.map((item, i) => (
          <div onClick={()=>setTarget(item.reelInfo?.reel_youtube_id)} key={i} className="w-full cursor-pointer h-[60vh] max-h-[800px] rounded-xl overflow-hidden">
            
            <figure className="relative max-h-full">
              <img loading="lazy" className="max-h-full max-w-full" src={item?.reelInfo.thumb}/>
              <span className="absolute z-[3] inline-block w-16  h-16  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <BigVideoPlayerIcon />
              </span>
            </figure>
            {/* {item.reelInfo?.reel_youtube_id} */}
          </div>
        ))}
      </div>
      <CommonModal
        isOpen={target?true:false}
        onClose={()=>{setTarget('')}}
      >
        <div className="max-w-[99vw] w-[99vw]">
            <CustomReels targetId={target}/>
        </div>
      </CommonModal>
    </div>
  );
}
