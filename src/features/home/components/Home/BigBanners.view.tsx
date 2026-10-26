import { useAppSelector } from '@/store/store'
import Link from 'next/link';
import React, { useRef } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import RightArrow from '@/svgs/RightArrow';
import { findCatwiseData, stopPropagation } from '@/helpers/commonFunction';
import { container } from '@/shared/ui/static/tailwind.classes';
import Image from 'next/image';


const BigBanners = () => {
    const BigBanners=useAppSelector(store=>store.staticTexts.data?.big_book_banners);
    const BigBannersSubscribed=useAppSelector(store=>store.staticTexts.data?.big_book_banners_subscribed);
    const prevRef = useRef(null);
    const user=useAppSelector((store)=>store?.user?.userData)
    const nextRef = useRef(null);
    const router= useRouter();

    
  return (
    <div className={`best_collection pb-0 md:pb-7  max-w-[1210px] h-[auto] mx-auto overflow-hidden text-white  lg:w-[90%] `}>
        <Swiper
            // slidesPerView={1}
            // spaceBetween={1}
            loop={true}
              pagination={{ clickable: true }}
              style={{ paddingBottom: '40px' }}
              // modules={[Navigation, Pagination]}
            // centeredSlides={true}
            modules={[Navigation, Autoplay,Pagination]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{
              delay: 7000, // 3 seconds
              disableOnInteraction: false, // keeps autoplay even after user interaction
            }}
            breakpoints={{
               0: {
               slidesPerView: 1,
               },
               768: {
               slidesPerView: 1,
               },
               1024: {
               slidesPerView: 1,
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
                {(user?.is_subscribed? BigBannersSubscribed :BigBanners)?.map((item,index:number)=>(
                    <SwiperSlide
                        key={index}
                        onClick={() => {
                            router.push(item.link?item.link:
                            `/audiobook/${item.id}`
                            );
                        }}
                        // className={styles.swiper_slider_custom}
                        >
                        <Link href={`/${item?.id}`}>
                            <div className='w-full  '>
                                <figure className='max-w-[100%] text-left max-xs:overflow-x-hidden  max-h-[100%]'>
                                    <Image
                                      loading="lazy"
                                      className=" object-cover object-right max-sm:min-w-[103%] max-sm:h-[110%] max-w-[100%] max-sm:min-h-[103%] xs:max-h-[100%]"
                                      src={item.img}
                                      alt=""
                                      width={1210}
                                      height={455}
                                      sizes="(max-width: 768px) 100vw, min(1210px, 90vw)"
                                    />
                                </figure>
                            </div>
                        </Link>
                        </SwiperSlide>
                    ))}
            </>
        </Swiper>
    </div>
  )
}

export default BigBanners