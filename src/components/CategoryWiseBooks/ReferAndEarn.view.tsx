'use client'
import LinkIcon from "@/svgs/LinkIcon.svg";

import { container } from "../ui/static/tailwind.classes";
import { useRouter } from "next/navigation";
import { paths } from "@/utils/Paths";
import Link from "next/link";
import { Ads } from "../audiobook/Ads";
import { useAppSelector } from "@/store/store";


export default function ReferAndEarn() {
  const user=useAppSelector(store=>store?.user?.userData)
  // const router=useRouter();
  return (
    <>
      <div className="border border-[#8D8D8D]">
        <div  className={container('1402px')}>
          {/* Main referral section */}
          <div className="flex flex-col lg:flex-row items-center  justify-center py-3">
            {/* Left side - Illustration */}
            {/* <div className="w-[35.5%] max-w-[300px]">
              <img
                src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/referAndEarn.png"
                alt="Referral illustration showing people with megaphones"
                className="w-full"
              />
            </div> */}

            {/* Right side - Content */}
            <div className="md:w-[55%]">
              {/* Main header with gradient background */}
              <Link href={paths.refer_earn} className="flex items-center justify-center subscribe_listen px-2 md:px-5 py-2 rounded-[8px]">
                  <img loading="lazy" src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/image.svg" className="w-7 mr-1 md:mr-3"/>
                  <h1 className="text-white text-center font-inter font-semibold text-cs2 sm:text-clg md:text-cxl">
                      রেফার করুন এবং উপার্জন করুন!
                  </h1>
              </Link>

              {/* Content section */}
              <div className="flex flex-col items-center gap-3 w-full">
                {/* Description text */}
                <div className="w-full text-center xl:text-left">
                  <p className="text-white font-inter text-cs sm:text-cn md:text-cn2 text-justify my-2 sm:my-3 md:my-5 xl:leading-10">
                    {/* আপনার বন্ধুদের আমাদের অডিওবুক প্ল্যাটফর্মে আমন্ত্রণ{' '}
                    জানান    এবং  প্রতি বার কেউ আপনার রেফারেল লিংক{' '}
                    ব্যবহার করে সাইন আপ করলেই পুরস্কার জিতুন। */}
                    বন্ধু বা পরিচিতজনকে Kabbik-এ আমন্ত্রণ জানান।
                    তারা আপনার রেফারেল লিংক/কোড ব্যবহার করে সাবস্ক্রাইব করলেই—
                    আপনি পাবেন নগদ ২০ টাকা, আর তারা পাবে বিশেষ ডিসকাউন্ট।

                  </p>
                </div>

                {/* Call to action */}
                {/* <div className="flex flex-row items-center gap-3 sm:gap-2 cursor-pointer group">
                  <Link href={paths.refer_earn} className="text-center font-inter text-cs sm:text-cs2 md:text-cn2 gradient-text2">
                    এখনই আপনার রেফারেল লিংক সংগ্রহ করুন
                  </Link>
                  <Link href={paths.refer_earn} className="p-2 rounded-full bg-white flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                    <span className="w-2 h-2 md:w-3 md:h-3 inline-block">
                      <LinkIcon/>
                    </span>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        
      </div>
      {!(user?.is_subscribed===1) && <Ads slotId={5223898054} />}
    </>
  );
}
