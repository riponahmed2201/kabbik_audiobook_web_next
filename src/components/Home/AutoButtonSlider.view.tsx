"use client";

import { paths } from "@/utils/Paths";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import CommonModal from "../ui/CommonModal/CommonModal.view";
import style from '@/components/CategoryWiseBooks/static/CategorySelector.module.css'
import { useAppSelector } from "@/store/store";
import Link from "next/link";
import AudioBookIcon from "@/svgs/AudioBooksIcon";
import RamadanNavButton from "../Layout/BlinkingHighlighter.view";



export default function AutoButtonSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const router=useRouter();
    const [showCategories,setShowCategories]=useState(false)
    const user = useAppSelector((store)=>store?.user?.userData)
  const categories=useAppSelector((store)=>store?.categories?.CategoriesData)

  const items = [
        // {title:"ঈদ স্পেশাল",onclick:()=>{router.push(`/eid-special`)}},
        {title:"ক্যাটাগরি",onclick:()=>{setShowCategories(true)}},
        {title:"সাবস্ক্রাইব",onclick:()=>{router.push(paths.subscribe)}},
        {title:"রেফার এন্ড আর্ন",onclick:()=>{router.push(paths.refer_earn)},subscribedOnly:true},
        {title:"আপকামিং",onclick:()=>{router.push(paths.upcoming)}},
        {title:"পডকাস্ট",onclick:()=>{router.push(paths.podcast)}},
        {title:"ফ্রি ",onclick:()=>{router.push(paths.free)}},
        {title:"ব্লগস",onclick:()=>{router.push(paths.blogs)}},
        {title:"কাব্যিক গেইমস ",onclick:()=>{ window.open(paths.entertainment, "_blank")}},
        // {title:"এপ ডাউনলোড",onclick:()=>{router.push(paths.download_app)}},
    ];

//   useEffect(() => {
//     const container = sliderRef.current;
//     if (!container) return;

//     let scrollAmount = 0;
//     let animationId:any;

//     const scroll = () => {
//       if (!container) return;
      
//       scrollAmount += 0.5; // Adjust speed here (lower = slower)
//       container.scrollLeft = scrollAmount;

//       // Reset to start when we've scrolled past the first set of items
//       if (scrollAmount >= container.scrollWidth / 2) {
//         scrollAmount = 0;
//       }

//       animationId = requestAnimationFrame(scroll);
//     };

//     animationId = requestAnimationFrame(scroll);

//     // Pause on hover
//     const handleMouseEnter = () => cancelAnimationFrame(animationId);
//     const handleMouseLeave = () => {
//       animationId = requestAnimationFrame(scroll);
//     };

//     container.addEventListener("mouseenter", handleMouseEnter);
//     container.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       cancelAnimationFrame(animationId);
//       container.removeEventListener("mouseenter", handleMouseEnter);
//       container.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

  return (
    <>
    <div className="no__scrollbar  w-[800px] xs2:w-[100vw]  py-6">
      <div
        ref={sliderRef}
        // className="flex xs2:hidden gap-3  overflow-x-auto"
        className="flex  gap-3  overflow-x-auto"
        style={{ scrollBehavior: "auto" }}
      >
        {/* Duplicate items multiple times for seamless loop */}
        <RamadanNavButton mt=" "/>
        {[...items,...items].map((item, i) => (
          <button
            key={i}
            onClick={item?.onclick}
            style={{display:user?.is_subscribed && item?.title==='সাবস্ক্রাইব'?"none":'inline-block'}}
            className={`px-6 bg_water py-2 rounded-full text-white text-sm md:text-base border border-white/20 flex-shrink-0 transition-all hover:scale-105
              ${//i % items.length === 0 
                false? " subscribe_listen " : "bg-transparent hover:bg-white/10"}
            `}
          >
            {item?.title??''}
          </button>
        ))}
      </div>

      {/* <div
        ref={sliderRef}
        className=" gap-3 hidden xs2:flex justify-center overflow-x-auto"
        style={{ scrollBehavior: "auto" }}
      >
        {[...items].map((item, i) => (
          <button
            key={i}
            onClick={item?.onclick}
            style={{display:user?.is_subscribed && item?.title==='সাবস্ক্রাইব'?"none":'inline-block'}}
            className={`px-6 bg_water py-2 rounded-full text-white text-sm md:text-base border border-white/20 flex-shrink-0 transition-all hover:scale-105
              ${i % items.length === 0 ? " subscribe_listen " : "bg-transparent hover:bg-white/10"}
            `}
          >
            {item?.title??''}
          </button>
        ))}
      </div> */}
    </div>
        <CommonModal
       isOpen={showCategories}
       onClose={()=>setShowCategories(false)}
      >
           <div className="tiny_scroll_bar2">
               {showCategories && 
                   <ul className={style.subCategories}>
                           { categories?.map((name: any, index: any) => (
                               <li key={name?.name} className="w-100">
                                   <Link
                                   // className="d-block"
                                   href={`/${name?.name}`}
                                   >
                                   <div className=" w-100">
                                       {/* <span className='w-7 h-7 inline-block mr-2'>
                                           <AudioBookIcon/>
                                       </span> */}
                                       {name.name}
                                   </div>
                                   </Link>
                               </li>
                           ))}
                       </ul>
                   }
           </div>
      </CommonModal>
    </>
  );
}