'use client'
import { useAppSelector } from '@/store/store'
import Image from 'next/image'
import style from '@/features/home/components/Home/static/continueListen.module.css';
import styles from '@/features/home/components/Home/static/category.module.css'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import topTenStyles from "./static/TopTen.module.css"
import { Autoplay, FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { container } from '@/shared/ui/static/tailwind.classes';
import { useRouter } from 'next/navigation';
import RightAngle from '@/svgs/rightAngle';
import { ContinueReadingItem, ContinueReadingResponse, TConinueBooks } from '@/shared/ui/static/types';
import { siteConfig } from '@/config/config';
import { get_continue_listen_data } from '@/utils/apiServices';

const ContiniueListening = ({continueData}:{continueData:TConinueBooks[]}) => {
    const user=useAppSelector((store)=>store?.user?.userData)
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const router=useRouter();
    let [continueRemoteData,setContinueRemoteData]=useState<ContinueReadingItem[]>([]);
    const [expand,setIsExpand]=useState<boolean>(false);

    let getContinueData=async()=>{
      let result:ContinueReadingResponse|null = await get_continue_listen_data(user?.id||0)
      setContinueRemoteData(result?.data??[]);
    }

    useEffect(()=>{
      if(!user?.id)return;
      setTimeout(()=>getContinueData(),500)
    },[user?.id])
  return (
    <div>
       <div className={topTenStyles.heading_container+" my-10  text-white max-w-[1300px] w-[97%] md:w-[90%] mx-auto"}>
          <h3 className={topTenStyles.heading}>{continueRemoteData && continueRemoteData.length?"কন্টিনিউ লিসেনিং":''}</h3>
       </div>

        <div className='bg-ash_blue'>
          { (
                <>
                  {continueRemoteData && continueRemoteData.length ? (
                    <div className={styles.container}>
                        <div className={styles.slider_box+` md:pb-4 max-xs2:ml-2.5`}>
                                {/* Custom Arrows */}
                                <button
                                    ref={prevRef}
                                    className={styles.slider_icons + ` ${styles.slider_left_icons}`}
                                >
                                    <RightAngle color='white' className='rotate-180' />
                                </button>
                                <button
                                    ref={nextRef}
                                    className={styles.slider_icons + ` ${styles.slider_right_icons}`}
                                >
                                    <RightAngle color='white' />
                                </button>

                                <Swiper
                                    // slidesPerView={1}
                                    // spaceBetween={1}
                                    // loop={true}
                                    pagination={{ clickable: true }}
                                    style={{ paddingBottom: '20px' }}
                                    // modules={[Navigation, Pagination]}
                                    // centeredSlides={true}
                                    modules={[Navigation, Autoplay]}
                                    slidesPerGroupSkip={0}
                                    navigation={{
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                    }}
                                    breakpoints={{
                                        0: {
                                        slidesPerView: 2,
                                        slidesPerGroup:2
                                        },
                                        500: {
                                        slidesPerView: 2.9,
                                        slidesPerGroup:2
                                        },
                                        537: {
                                        slidesPerView: 3.4,
                                        slidesPerGroup:2
                                        },
                                        768: {
                                        slidesPerView: 3.7,
                                        slidesPerGroup:3
                                        },
                                        900: {
                                        slidesPerView: 4,
                                        slidesPerGroup:4
                                        },
                                        1024: {
                                        slidesPerView: 5,
                                        slidesPerGroup:5
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
                                    <>
                                    {continueRemoteData?.length && continueRemoteData.map((item,index:number)=>(
                                        item?.book_id?(
                                        <SwiperSlide
                                        key={item?.book_id}
                                          onClick={() => {
                                            router.push(
                                            `audiobook/${item?.book_id}?episodeId=${item.current_episode}&time=${item?.current_timer??0}`
                                            );
                                        }}
                                        className={styles.swiper_slider_custom}
                                        >
                                                <Link href={`/audiobook/${item?.book_id}`}>
                                                    <div className={styles.item_cont2} key={index}>
                                                        
                                        
                                                        <picture className={ styles.picture}>
                                                        <div className="relative w-full max-xxs:overflow-x-hidden max-xxs:rounded-[8px]" style={{  /* 16:9 */ }}>
                                                            <Image
                                                                src={item?.book_cover|| item?.banner}
                                                                alt={'audiobook'}
                                                                width={200}
                                                                priority={false}
                                                                height={320}
                                                                className={`${ styles.img}  max-w-full object-contain`}
                                                                sizes="(max-width: 300px)"
                                                                loading="lazy"
                                                                blurDataURL ={siteConfig.placeholderBook}
                                                            />
                                                            <div
                                                            className={`${style.currentTimeContainer}`}
                                                            >
                                                            <div
                                                                className={`${style.currentProgressBar}`}
                                                            >
                                                                <div
                                                                className={`${style.currentProgress}`}
                                                                style={{
                                                                    width: `${
                                                                    (item?.complete_percentage) *
                                                                        100 +
                                                                    "%"
                                                                    }`,
                                                                }}
                                                                ></div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </picture>
                                                        
                                                        
                                                    </div>
                                                </Link>
                                                </SwiperSlide>
                                        ):''
                                            ))}
                                    </>
                                </Swiper>
                                        {/* <div className={styles.mobile_banner_cont}>
                                            {data?.slice(0,3).map((item:any,index:number)=>(
                                                <Link href={`/audiobook/${item?.id}`}>
                                                    <div className={styles.item_cont2} key={index}>
                                                        {isPopular?
                                                            <p className={styles.popular}>Most Popular</p>
                                                        :''}
                                                        <div className={styles.crown}>
                                                            <span>
                                                                <PremiumCrownIcon/>
                                                            </span>
                                                        </div>
                                                        <picture className={styles.picture}>
                                                            
                                                            <img className={styles.img} src={item.phone_img_url} alt={item.name}/>
                                                        </picture>
                                                        <p className={styles.player_count}>
                                                            <span>
                                                                <RedPlayerIcon/>
                                                            </span>
                                                            <span>{(item?.play_count/1000).toFixed(2)}k</span>
                                                        </p>
                                                    </div>
                                                </Link>
                                                
                                            ))}
                                        </div> */}
                                </div>
                    </div>
                  ) : null}
                </>
              )}
        </div>
    </div>
  )
}

export default ContiniueListening

{/* <div className={`${container('1306px')}`}>
                      <Swiper
                        slidesPerView={6}
                        spaceBetween={20}
                        freeMode={true}
                        modules={[FreeMode, Autoplay, Navigation]}
                        zoom={true}
                         breakpoints={{
                        0: {
                        slidesPerView: 2,
                        slidesPerGroup:2
                        },
                        500: {
                          slidesPerView: 2.9,
                          slidesPerGroup:2
                        },
                        537: {
                          slidesPerView: 3.4,
                          slidesPerGroup:2
                        },
                        768: {
                          slidesPerView: 3.7,
                          slidesPerGroup:3
                        },
                        900: {
                        slidesPerView: 4,
                        slidesPerGroup:4
                        },
                        1024: {
                        slidesPerView: 5,
                        slidesPerGroup:5
                        },
                    }}
                        className="mySwiper"
                      >
                        {continueData?.map(
                          (continuebookinfo: any, index: any) => (
                            <SwiperSlide
                              key={`${continuebookinfo.audiobookId}${index}`}
                            >
                              <Link
                                href={`audiobook/${continuebookinfo?.audiobookId}?episodeId=${continuebookinfo.episodeId}&time=${continuebookinfo.runningTime}`}
                              >
                                <div
                                  className={`card bg-blue-1 position-relative mx-1 border-0`}
                                >
                                  <Image
                                    className={style.img + " max-w-full object-contain"}
                                    height={225}
                                    width={200}
                                    src={continuebookinfo.audiobookImg}
                                    alt={`${continuebookinfo.name}_kabbik`}
                                    quality={80}
                                    priority={
                                      index == 0 || index == 1 || index == 2
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                                <div
                                  className={`${styles.currentTimeContainer}`}
                                >
                                  <div
                                    className={`${styles.currentProgressBar}`}
                                  >
                                    <div
                                      className={`${styles.currentProgress}`}
                                      style={{
                                        width: `${
                                          (continuebookinfo.runningTime /
                                            continuebookinfo.duration) *
                                            100 +
                                          "%"
                                        }`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="ms-2">
                                  
                                </div>
                              </Link>
                            </SwiperSlide>
                          )
                        )}
                      </Swiper>
                    </div> */}