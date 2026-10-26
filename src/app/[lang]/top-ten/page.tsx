import { findCatwiseData } from '@/helpers/commonFunction';
import { HomeInfo, PromoBannerInfo, TopBannerImageInfo } from '@/pageTypes/home.types';
import { homeListData, promoBannerList, topBanner } from '@/utils/apiServices';
import styles from './static/topten.module.css'
import Link from 'next/link';
import React from 'react'
import { OneToTen } from '@/components/Home/static/utils';
import Image from 'next/image';
import RedPlayerIcon from '@/svgs/RedPlayerIcon';
import { container } from '@/components/ui/static/tailwind.classes';
import CategorySelector from '@/components/CategoryWiseBooks/CategorySelector.view';

const page = async() => {
    // const homeData: HomeInfo = await homeListData();
    // const topBannerData: {data:TopBannerImageInfo[] | null} = await topBanner();
    // const promoData: PromoBannerInfo = await promoBannerList();
    const [homeData, topBannerData, promoData] = await Promise.all([
      homeListData(),
      topBanner(),
      promoBannerList(),
    ]);
    // const blogs = await getApprovedBlogs();
  return (
    <div>
        <div className='h-[100px] mt-[-100px] bg-[#0E1D3F]'/>
      <div >
         {true?(
           <div className='relative'>
              <div className={`bg-[url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/kabbikGalaryBg-min2-min.jpg')] bg-cover opacity-20 w-full h-[123px] absolute left-0 bottom-[-15px]`}></div>
             <div className="container mx-auto px-4 pt-4 pb-2 ">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="font-bengali text-cxl2 font-bold text-white mb-1 leading-tight">
                  টপ ১০ অডিওবুক
                </h1>
                <p className="font-bengali text-cxl text-white/90 font-normal leading-relaxed">
                  শ্রোতাদের প্রথম পছন্দ এখন এক ক্লিকে।
                </p>
              </div>
            </div>
           </div>
         ):''}
        </div>
          
        <div>
            <CategorySelector />
        </div>
        <div className={container('1300px')+` mt-10 relative max-md:overflow-hidden`}>
            <div className="circular_gradient left-[-10%] top-[0%] w-[30vw] h-[30vw] absolute  "></div>
            <div className="circular_gradient max-xs:hidden right-[-20%] bottom-[-15vh] w-[40vw] h-[40vw] absolute  "></div>
            {/* <div className="mt-10  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5  gap-3 md:gap-4 lg2:gap-6"> */}
                  
        {/* Grid: 2 cols default, 3 cols on md, 4 cols on xl */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-x-1 xs:gap-x-2 sm:gap-x-3 md:gap-x-6 xl:gap-x-8 gap-y-16">
          {findCatwiseData(homeData.data,"শীর্ষ ১০")?.data.map((item,index) => (
            <Link key={index} href={`/audiobook/${item?.id}`}>
                <div className={styles.item_cont} key={index}>
                  <span className={`${index===0?'pl-0 sm:pl-7 md:pl-0 ':''} max-w-[280px]  max-h-[15vh]  xxs2:max-h-[25vh] md:max-h-[200px] inline-block`}>
                    {OneToTen[(index+1).toString()] ?(
                      OneToTen[(index+1).toString()]
                    ):''}
                  </span>
                    {/* <picture className={styles.picture}>
                        <img className={styles.img} src={item.thumb_path} alt={item.name}/>
                    </picture> */}
                    <picture className={styles.picture}>
                      <Image
                        src={item.thumb_path||''}
                        alt={item.name}
                        width={210}   // or your preferred size
                        height={320}  // or aspect-ratio based
                        className={styles.img}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </picture>
                    
                </div>
            </Link>
          ))}
        </div>
    </div>
    </div>
  )
}

export default page