'use client'
import { useAppSelector } from "@/store/store";
import ContentCard from "./contentCard.view";
import { useEffect, useState } from "react";
import Link from "next/link";
import { paths } from "@/utils/Paths";
import { container } from "@/components/ui/static/tailwind.classes";
import { useRouter } from "next/navigation";

export default function Categories({folders}:{folders:number|string}) {
    const categories=useAppSelector((store)=>store.categories.CategoriesData);
    const [totaldiv,setTotalDiv]=useState<number[]>([]); // a div consisted with three image
    // const router=useRouter();

    useEffect(()=>{
        let totaldiv=Math.floor((categories??[])?.length/4);
        let i = 0;
        let arr = Array.from({ length: totaldiv }, () => i=i+4)
        setTotalDiv(arr);
    },[categories])

    
  return (
    <div className={"max-w-[700px]  mt-3 bg-bg/95 overflow-y-auto  relative  p-1 sm:p-2 md:p-6"}>
      <div className=" mx-auto">
        {/* First Section */}
        <div className='grid mt-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-1 cursor-pointer mx-auto my-8'>
        {/* Main content grid */}
        {categories?.map((category, index) => (
            <div
              key={index}
            //   onClick={()=>router}
              style={{background:category?.color}}
              className={` rounded-2xl p-1 relative overflow-hidden  flex flex-col justify-between cursor-pointer transition-all hover:scale-105 hover:shadow-2xl`}
            >
              {/* Category Name */}
              {/* <h3 className="text-white font-bold text-lg sm:text-xl z-10 relative drop-shadow-lg leading-tight">
                {category.name}
              </h3> */}

              

              {/* Book Image - positioned at bottom right with tilt */}
              <div className=" transform  z-0">
                <Link
                    href={paths?.categoryWiseBooks(category?.name)+`?folders=${folders}`}
                >
                    <img
                        loading="lazy"
                        src={category.thumb_path}
                        alt={category.name}
                        className="w-full rounded-[8px] h-full aspect-[2/1] object-left-bottom  object-cover  shadow-2xl border-2 border-white/30"
                    />
                </Link>
              </div>
            </div>
          ))}
      </div>
      </div>
    </div>
  );
}
