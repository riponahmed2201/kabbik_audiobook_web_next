"use client";

import { store, useAppSelector } from "@/store/store";
import { Moon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TCategoryItem } from "@/shared/ui/static/types";
import CommonModal from "@/shared/ui/CommonModal/CommonModal.view";
import { paths } from "@/utils/Paths";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RamadanNavButton({mt}:{mt?:string}) {
  const user=useAppSelector(store=>store?.user?.userData);
  const categories = useAppSelector(store=>store?.categories?.CategoriesData);
  let [catItem,setCatItem]=useState<TCategoryItem|null>(null);
  const special_banners=useAppSelector(store=>store?.staticTexts?.data?.special_offers);
  const [showSpecialOffers,setShowSpecialOffers]=useState(false);
  const router=useRouter();
  const specialOffersPanelRef = useRef<HTMLDivElement>(null);
  const specialOffersGridRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if((categories?.length||0)<1)return;
    let item = categories?.find(item=>(item?.name||'')==="কাব্যিক ঈদ ধামাকা")
    setCatItem(item||null);
  },[categories])

  return (
    <>
    <div 
      // href={paths.categoryWiseBooks("ব্রেইন বুস্টার")}
      className={`ramadan-btn ${mt?mt:"-mt-3"} relative inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl text-white cursor-pointer select-none`}
      style={{ fontFamily: "'Noto Serif Bengali', 'SolaimanLipi', serif" }}
      onClick={()=>{setShowSpecialOffers(true)}}
    >
      {/* <Moon className="w-4 h-4 shrink-0" /> */}

      <span className="flex flex-col leading-tight">
        <span className="text-sm whitespace-nowrap font-bold tracking-wide">
          স্পেশাল অফার
          {(user?.is_subscribed || catItem?.isPurchased) ? (
            <span className="ml-1">
              লাইব্রেরি</span>
          ):''}
        </span> 
        {/* {(user?.is_subscribed || catItem?.isPurchased) ?"":<span className="text-[10px] font-medium opacity-85 tracking-wide">
          ৩০ টি বই মাত্র ১৯৯ টাকা
        </span>} */}
      </span>

      <style>{`
        .ramadan-btn {
          background: linear-gradient(135deg, #c0286a 0%, #e91e8c 50%, #ff4db2 100%);
          border: 1.5px solid rgba(255, 77, 178, 0.4);
          animation: ramadan-blink 1.1s ease-in-out infinite;
          transition: transform 0.2s ease;
        }
        .ramadan-btn:hover {
          transform: scale(1.03);
          animation: none;
          box-shadow: 0 0 14px 4px rgba(233, 30, 140, 0.5);
          border-color: #ff4db2;
        }
        @keyframes ramadan-blink {
          0%, 100% {
            box-shadow: 0 0 0px 0px rgba(233, 30, 140, 0);
            border-color: rgba(255, 77, 178, 0.4);
          }
          50% {
            box-shadow: 0 0 10px 3px rgba(233, 30, 140, 0.55);
            border-color: rgba(255, 77, 178, 1);
          }
        }
        .blink-dot {
          animation: dot-pulse 1.1s ease-in-out infinite;
        }
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.4); opacity: 1; }
        }
      `}</style>
    </div>
      <CommonModal
        isOpen={showSpecialOffers}
        onClose={()=>setShowSpecialOffers(false)}
        replaceClassName="relative max-h-[97vh] z-[999] bg-transparent rounded-lg shadow-lg w-[min(92vw,25.75rem)] md:w-[min(92vw,44.75rem)] max-w-full min-w-0  "
        // title="স্পেশাল অফার"
        >
          {/* <div className="grid bg-bg m-2 p-5 rounded-[8px] grid-cols-1 sm:grid-cols-2 gap-4">
          {special_banners?.map((banner) => (
            <div
              key={banner.id}
              onClick={() =>{
                 router.push(paths.categoryWiseBooks(banner.link))
                 setShowSpecialOffers(false);
              }}
              className="cursor-pointer rounded-2xl overflow-hidden transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Image
                src={banner.thumb}
                alt={"special offer"}
                width={200}
                height={100}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div> */}
        <>
        <div
          ref={specialOffersPanelRef}
          className="m-3  w-full p-4 max-w-full min-w-0 mx-auto bg-bg rounded-2xl"
        >
  {/* Header */}
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="w-1 h-4 rounded-full bg-gradient-to-b from-amber-400 to-orange-500" />
            <span className="text-cn font-semibold tracking-widest uppercase text-white/80">
              স্পেশাল অফার
            </span>
          </div>

          {/* Grid — 250×160 at max; scales down with column (responsive) */}
          <div ref={specialOffersGridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 justify-items-stretch min-w-0 w-full">
            {special_banners?.map((banner) => (
              <div
                data-banner-cell
                key={banner.id}
                onClick={() => {
                  router.push(paths.categoryWiseBooks(banner.link));
                  setShowSpecialOffers(false);
                }}
                className="group cursor-pointer relative w-full max-w-[250px] justify-self-center aspect-[260/160] rounded-xl overflow-hidden bg-black/20 min-w-0 px-2"
              >
                <Image
                  src={banner.thumb}
                  alt={"special offer"}
                  fill
                  sizes="(max-width: 640px) calc(46vw - 2rem), 250px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-sm">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H4M8 2V6" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
        </CommonModal>
    </>
  );
}