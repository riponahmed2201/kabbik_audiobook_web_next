'use client'
import Link from 'next/link';
import { TAudiobookCardProps } from './static/category.types';
import { paths } from '@/utils/Paths';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/config';
import { convertToBanglaDigits, decodeWord } from '@/helpers/commonFunction';
import { useAppSelector } from '@/store/store';
import { TCategoryItem } from '@/shared/ui/static/types';

export function AudiobookCard({ audiobook, className = '',category }: TAudiobookCardProps) {
  const [catItem,setCatItem]=useState<TCategoryItem|null>(null);
  const categories =useAppSelector(store=>store?.categories?.CategoriesData)
  const user = useAppSelector(store=>store?.user?.userData)

  useEffect(()=>{
    if((categories?.length||0)<1)return;
    let item = categories?.find(item=>(item?.name||'')===decodeWord(category))
    setCatItem(item||null);
  },[categories, category])

  return (
    <div  className={`group  cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}>
      <div className="relative overflow-hidden rounded-[6px] border border-white/20 bg-black/20 backdrop-blur-sm">
        {( !user?.is_subscribed) && (!catItem?.isPurchased)  && audiobook?.price ? (
            // <div className="absolute -top-8 -right-1 w-48 h-10 overflow-hidden z-[3]">
              <div className="absolute text-center top-4 z-[5] -right-6 rotate-[37deg] btn-gradient-2  text-white text-xs font-bold px-8 py-1 shadow-lg">
                রেন্ট TK.{convertToBanglaDigits(audiobook?.price)}
              </div>
            // </div>
          ):''}
        <Link href={paths.book_details(audiobook.id)}>
            {/* <img
              src={audiobook.thumb_path}
              alt={audiobook.name}
              loading='lazy'
              className="aspect-[3/4] max-w-full z-10 object-cover transition-transform duration-300 group-hover:scale-110"
            /> */}
            <Image
              src={audiobook.thumb_path || siteConfig.placeholderBook ||''}
              alt={audiobook.name || "Audiobook cover"}
              width={300} // adjust based on your design
              height={400}
              placeholder="blur"
              blurDataURL={siteConfig.placeholderBook}
              loading="lazy"
              priority={false}
              className="aspect-[3/4] max-w-full object-left-top z-10 object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = siteConfig.placeholderBook; // fallback if image fails
              }}
            />
        
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
        
        {/* Overlay content on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <div className="space-y-1">
            <h3 className="font-bengali font-semibold text-lg leading-tight">
              <Link href={paths.book_details(audiobook.id)}>
                {audiobook.name}
              </Link>
            </h3>
           
            {/* <p className="text-xs text-accent font-medium">
              {category}
            </p> */}
            {audiobook.author_name && (
              <p className="font-bengali text-xs text-white/70">
                {audiobook.author_name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
