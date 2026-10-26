'use client'
import RightArrowIcon from '@/svgs/RightArrowIcon'
import React, { useEffect, useRef, useState } from 'react'
import common_cat_styles from "./static/category.module.css"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { LucideFlagTriangleLeft, LucideFlagTriangleRight } from 'lucide-react'
import { data } from './static/upcoming';
import styles from "./static/upcoming.module.css"
import { useRouter } from 'next/navigation'
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import RightAngle from '@/svgs/rightAngle'
import ThreeDBook from '@/shared/ui/ThreeDBook.view'
import { container } from '@/shared/ui/static/tailwind.classes'
import { useAppSelector } from '@/store/store'
import { upcomingList } from '@/utils/apiServices'
import { TUpcomingAudiobook } from './static/home.types'
import { formatToBengali } from '@/helpers/commonFunction'
import { paths } from '@/utils/Paths'
import Link from 'next/link'

type UpComingProps = {
  initialBooks?: TUpcomingAudiobook[] | null;
};

const UpComing = ({ initialBooks }: UpComingProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router=useRouter()
  const [upComingBooks,setUpcomingBooks]=useState<TUpcomingAudiobook[]>(() =>
    Array.isArray(initialBooks) ? initialBooks : []
  );
  // const upcomingBooks=useAppSelector(store=>store.staticTexts.data?.upcoming)
  
  const getUpComingBookList=async()=>{
    let result = await upcomingList()
    //console.log(result,"upcomingg");
    setUpcomingBooks(result?.data ?? [])
  }

  useEffect(()=>{
    if (initialBooks !== undefined) return;
    getUpComingBookList();
  },[initialBooks])
  return (
    <div className={`${container('1300px')} text-white mt-10 mx-auto max-h-[530px]`}>
        <div>
            <div className={common_cat_styles.heading_container + " mx-auto !mb-[0] "}>
                <h3 className={common_cat_styles.heading}>আপকামিং বুক</h3>
                <Link href={paths.upcoming} className={common_cat_styles.see_all}>
                    {/* <Link href={paths.upcoming}> */}
                      সবগুলো দেখুন
                      <span className={common_cat_styles.arrow}><RightArrowIcon/></span>
                    {/* </Link> */}
                </Link>
            </div>
            <div className='relative  md:h-[420px] overflow-y-hidden overflow-y-scroll-none'>
                
                {/* <figure className='absolute overflow-hidden   left-1/2 -translate-x-1/2 top-0 w-full max-h-[650px]'> */}
                        {/* <div className='-rotate-45 w-[300px]  top-9  py-1 text-[20px] text-center absolute left-[-90px] bg-[#E53F79] z-10'>
                            ১১ জুলাই ২০২৫
                        </div>
                    <img loading="lazy" className='w-full max-h-full' src='/assets/upcoming_banner.png'/> */}
                    <button
                        ref={prevRef}
                        className={styles.slider_icons + ` ${styles.slider_left_icons}`}
                    >
                        <RightAngle className='rotate-180' />
                    </button>
                  <button
                    ref={nextRef}
                    className={styles.slider_icons + ` ${styles.slider_right_icons}`}
                  >
                    <RightAngle />
                  </button>
                {/* </figure> */}
                <div className={styles.slider_box}>
                  {/* Custom Arrows */}
                  

                  <Swiper
                    // slidesPerView={1}
                    // spaceBetween={1}
                    loop={true}
                    className='h-full'
                      pagination={{ clickable: true }}
                      style={{ paddingBottom: '40px' }}
                      // modules={[Navigation, Pagination]}
                    // centeredSlides={true}
                    modules={[Navigation, Autoplay]}
                    navigation={{
                      prevEl: prevRef.current,
                      nextEl: nextRef.current,
                    }}
                    autoplay={{
                        delay: 5000, // 1.5 seconds
                        disableOnInteraction: false, // keeps autoplay even after user interaction
                    }}
                     breakpoints={{
                        0: {
                          slidesPerView: 1.1,
                        },
                        350: {
                          slidesPerView: 1.4,
                        },
                        450: {
                        slidesPerView: 2,
                        },
                         640: {
                        slidesPerView: 3,
                        },
                        768: {
                        slidesPerView: 3,
                        },
                        1024: {
                        slidesPerView: 4,
                        },
                    }}
                    onBeforeInit={(swiper:any) => {
                      if (
                        swiper.params.navigation &&
                        typeof swiper.params.navigation !== "boolean"
                      ) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                      }
                    }}
                    
                    >
                    {/* {//console.log(upComingBooks,"upcomingBooks")} */}
                    {upComingBooks?.map((topbannerinfo,i:number) => (
                      <SwiperSlide
                        key={i}
                        onClick={() => {
                          // router.push(
                          //   paths?.upcoming
                          // );
                        }}
                      >
                        {/* <div className='relative  h-[297px] md:w-[210px] md:h-[370px]'>
                          <ThreeDBook bg={topbannerinfo?.book_banner ?? topbannerinfo?.thumbPath} path={paths.upcoming}/>
                          <div className='absolute sm:w-[168px] md:w-[195px] text-center max-sm:left-1/2 max-sm:-translate-x-1/2 sm:right-[3.5vw] md:right-[-3px] skew-y-[-8deg] bottom-[0px] sm:bottom-[-8px] bg-[#E53F79] font-bold text-cn z-40'>
                              {formatToBengali(topbannerinfo?.release_date)}
                          </div>
                        </div> */}
                        <div className='relative h-[297px] md:w-[210px] md:h-[370px]'>
                          <ThreeDBook
                            bg={topbannerinfo?.book_banner ?? topbannerinfo?.thumbPath}
                            path={paths.upcoming+`?id=${topbannerinfo?.id}`}
                          />
                          
                          {/* Bottom fixed banner */}
                          <div className='absolute  bottom-[-10px] w-[58%] sm:w-[70%] md:w-[94%] left-[24%] sm:left-[20%] md:left-[18px] text-center skew-y-[-8deg] bg-[#E53F79] font-bold text-cn z-[4]'>
                            {formatToBengali(topbannerinfo?.release_date)}
                          </div>
                        </div>
                        
                        
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default UpComing
