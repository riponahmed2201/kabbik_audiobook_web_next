'use client'
import { useAppSelector } from "@/store/store";
import AudioBookIcon from "@/svgs/AudioBooksIcon";
import { CategoryIcon } from "@/svgs/Category.svg";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import style from './static/CategorySelector.module.css'
import { useState } from "react";
import CommonModal from "@/shared/ui/CommonModal/CommonModal.view";
import { Ads } from "@/features/entertainment/components/Ads/Ads";



export default function CategorySelector({folders}:{folders?:string}) {
    const categories=useAppSelector(store=>store?.categories?.CategoriesData)
    const user=useAppSelector(store=>store?.user?.userData);
    const [showCategories,setShowCategories]=useState<boolean>(false);

  return (
    <div>
        <div className="w-full z-[2] relative   cursor-pointer  px-4 btn-gradient-2 mt-3">
            <div onClick={()=>setShowCategories(!showCategories)} className="max-w-[1440px] mx-auto rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center justify-between w-full  py-2">
                <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 ">
                    <CategoryIcon />
                    </div>
                    <h1 className="text-white text-cn md:text-clg2 font-medium leading-tight flex-1 min-w-0">
                        আপনার গল্পের ক্যাটাগরি বেছে নিন
                    </h1>
                </div>
                <div className="flex-shrink-0 ml-4">
                    <ChevronDown
                    className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-7 xl:h-7"
                    strokeWidth={2}
                    />
                </div>
                </div>
            </div>
        </div>
        <div>
           
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
                                        href={`/${name?.name}${folders?`?folders=${folders}`:''}`}
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
           {/* {!(user?.is_subscribed===1) && <Ads slotId={9491898820} />} */}
    </div>
  );
}
