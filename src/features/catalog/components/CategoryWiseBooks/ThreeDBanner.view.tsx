'use client'
import { TBooks } from "@/pageTypes/home.types";
import ThreeDBook from "@/shared/ui/ThreeDBook.view";
import { paths } from "@/utils/Paths";
import styles from "@/features/catalog/components/CategoryWiseBooks/static/CategorySelector.module.css"
// import { useTranslation } from 'next-i18next';
import { DictionaryType } from "@/locales/locales.types";
import { numberTranslator } from "@/helpers/commonFunction";
import CircularStar from "@/svgs/CircularStar.svg";
import Traingle from "@/svgs/Traingle.svg";
import Link from "next/link";


export default function ThreeDBanner({book,dict}:{book:TBooks|null,dict:DictionaryType}) {
  return (
   <div className={`mt-16 xxs2:mt-28  ${styles.ThreeDBannerGradient} `}>
  <div className={`flex relative   justify-between  max-w-[1300px] w-[97%] md:w-[90%] mx-auto`}>
    {/* Book Cover Image */}
    <div className="min-w-[44%] three_d_small xs:min-w-[40%] mt-[-75px] xxs2:mt-[-120px]">
      {book ? (
        <ThreeDBook path={paths.book_details(book.id)} bg={book?.thumb_path} />
      ) : null}
    </div>

    {/* Content Section */}
    <div className="max-sm:text-right z-[3]  ">
      
      {/* Main Heading */}
      <div className="">
        <h1 className=" text-cs max-md:text-center xs:text-cn sm:text-clg md:text-cxl text-white font-medium leading-tight lg:leading-[50.4px] ">
          {numberTranslator(book?.play_count??0,dict.numbers)}+ শ্রোতা ইতিমধ্যেই শুনেছেন!
        </h1>

        {/* Rating Section */}
        <div className="flex flex-col my-7 md:items-center gap-6 lg:gap-8">
          
          {/* Star Rating */}
          <div className="flex max-md:mx-auto items-center gap-1 xs:gap-3 lg:gap-[14px]">
            {[...Array(Math.ceil(Number(book?.rating)))].map((_, index) => (
              <div
                key={index}
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-[#D9D9D9] flex items-center justify-center"
              >
                <CircularStar/>
              </div>
            ))}
          </div>

          {/* Rating Text */}
          <h2 className="text-cs max-md:text-center xs:text-cs2 sm:text-lg md:text-lg2 text-white font-medium leading-tight lg:leading-[50.4px]">
            পাঠকের রিভিউ – ৫/{numberTranslator(Number((book?.rating)?.toFixed(1))??0,dict.numbers)} রেটিং!
          </h2>
        </div>
      </div>

      {/* Play Button */}
      <div className="w-full flex justify-center   mx-auto max-sm:mr-0 ">
        <Link href={paths.book_details(book?.id??0)} className=" w-full rounded-[8px] subscribe_listen border max-w-[80%]  md:max-w-[421px] border-[#888] shadow-lg flex items-center justify-center gap-5 lg:gap-[22px] py-1.5 md:py-2 px:1 md:px-6 hover:opacity-90 transition-opacity">
          <span className="w-3 md:w-5">
            <Traingle/>
          </span>
          <span className="text-white text-cs sm:text-cn2 md:text-lg2 font-medium">
            শোনা শুরু করুন
          </span>
        </Link>
      </div>
    </div>
  </div>
</div>

  );
}
