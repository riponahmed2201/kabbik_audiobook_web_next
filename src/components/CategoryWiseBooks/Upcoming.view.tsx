'use client'
import { textSlice } from "@/helpers/commonFunction";
import Link from "next/link";
import { useState } from "react";

interface BookCardProps {
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export function BookCard({ title, author, description, imageUrl, slug }: BookCardProps) {
  const [showFull,setShowFull]=useState(false)
  return (
    <div className="w-full max-w-[588px] p-4 flex flex-col gap-4 lg:gap-6 rounded-[16px] border border-card-border bg-navy-dark">
      <div className="text-white">
        <h3 className="font-bengali font-bold text-clg leading-tight mb-1">
          {title}
        </h3>
        <p className="font-bengali text-lg lg:text-cn font-normal text-white/90">
          {author}
        </p>
      </div>
      
      <div className="w-full">
        <img
          loading="lazy"
          src={imageUrl}
          alt={title}
          className="w-full h-[250px] lg:h-[312px] object-cover rounded-[16px] border border-image-border shadow-lg"
        />
      </div>
      
      <p className="text-white max-h-[200px overflow-y-auto] text-justify font-bengali text-xs lg:text-[13px] leading-relaxed">
        {showFull?description:textSlice(description,300)}
      </p>
      
      {/* <Link  className="block"> */}
        <button onClick={()=>{setShowFull(!showFull)}} className="w-full btn-gradient-2 text-white rounded-[8px] p-3 text-lg">
          {showFull?"সংক্ষেপে দেখুন":"গল্পের বিস্তারিত"}
        </button>
      {/* </Link> */}
    </div>
  );
}
