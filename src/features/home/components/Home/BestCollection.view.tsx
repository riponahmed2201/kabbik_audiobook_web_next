import { useAppSelector } from '@/store/store'
import Link from 'next/link';
import React, { useRef } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import { TBestCollection } from './static/home.types';
import RightArrow from '@/svgs/RightArrow';
import { findCatwiseData, stopPropagation } from '@/helpers/commonFunction';
import { container } from '@/shared/ui/static/tailwind.classes';
import { paths } from '@/utils/Paths';


const BestCollection = (props:TBestCollection) => {
    const {homeData}=props
    const BestCollection=useAppSelector(store=>store.staticTexts.data?.best_collection);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const router= useRouter();
    const user=useAppSelector(store=>store?.user?.userData)

    const getDataByIndex=(index:number,category:string)=>{
        let data = findCatwiseData(homeData.data,category)?.data;
        if(!data)return null;
        return data[index]
    }
  return (
    <div className={`best_collection overflow-x-hidden max-w-[1210px] mx-auto text-white mt-8 lg:w-[90%]`}>
        <Swiper
            // slidesPerView={1}
            // spaceBetween={1}
            loop={true}
              pagination={{ clickable: true }}
              style={{ paddingBottom: '40px' }}
              // modules={[Navigation, Pagination]}
            // centeredSlides={true}
            modules={[Navigation, Autoplay,Pagination]}
            autoplay={{
                delay: 7000, // 1.5 seconds
                disableOnInteraction: false, // keeps autoplay even after user interaction
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
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
             className='overflow-hidden'
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
                {BestCollection && BestCollection.map((item,index:number)=>(
                    <SwiperSlide
                        key={index}
                        onClick={() => {
                            router.push(
                            `/${item.category}`
                            );
                        }}
                       
                        // className={styles.swiper_slider_custom}
                        >
                        <Link href={`/${item?.category}`}>
                            <div className='relative overflow-hidden   w-full '>
                                <figure
                                className="absolute w-full h-[555px] bg-cover bg-center"
                                style={{ backgroundImage: `url(${item.bg})` }}
                                //  className='absolute w-full h-[555px] top-0 left-0'
                                >
                                    {/* <img loading="lazy" src={item.bg}/> */}
                                </figure>
                                <div className='z-[11] pt-4 sm:pt-12 max-w-[1300px] pb-6 mx-auto w-[90%] text-white relative'>
                                     <div className='max-sm:w-full max-xs2:z-[4] relative max-md:w-[40%]'>
                                        <div>
                                            <p className='text-cs md:text-cn2 lg2:text-clg'>বেস্ট কালেকশন</p>
                                            <div className='w-[84px] md:w-24 h-0.5 bg-white'></div>
                                        </div>
                                        <h6 className='text-cn md:text-cxl lg2:text-[30px] mt-3 sm:mt-8 font-[600]'>{item.heading}</h6>
                                        <p className='text-cs md:text-cn lg2:text-clg my-4 sm:my-10 mb-5 sm:mb-20'>{item.para}</p>
                                        <div className='bg-white rounded-[4px] text-black px-1 py-1 md:px-4 sm:py-2.5 max-w-[400px] w-[45vw] xs:w-[40vw] sm:w-[25vw] '>
                                            <Link className='flex items-center  justify-around font-[500] sm:font-[600] text-cxs md:text-cs2 lg2:text-cn2' href={user?.is_subscribed?paths?.categoryWiseBooks(item?.category) :'/subscribe'} >
                                                {user?.is_subscribed?"শোনা শুরু করুন":"এখনই সাবস্ক্রাইব করে শুনুন "} 
                                                <span className='max-w-[10px] md:max-w-[12px] lg2:max-w-[15px] inline-block '>
                                                    <RightArrow/>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className='overflow-y-hidden '>
                                        <div className='z-[3]   absolute right-[-100px] flex items-center gap-4 rotate-[40deg] top-[-40px] '>
                                        <div className='mt-[100px]'>
                                            <figure className='mb-4 max-w-[80px] sm:max-w-[110px] lg2:max-w-[140px] max-h-[240px] '>
                                                <Link onClick={stopPropagation} href={`/audiobook/${getDataByIndex(0,item.category)?.id}`}>
                                                    <img loading="lazy" className='max-w-[100%] max-h-[100%]' src={getDataByIndex(0,item.category)?.thumb_path||''}/>
                                                    </Link>
                                            </figure>
                                            <figure className= 'max-w-[80px] sm:max-w-[110px] lg2:max-w-[140px] max-h-[240px] '>
                                                <Link onClick={stopPropagation} href={`/audiobook/${getDataByIndex(1,item.category)?.id}`}>
                                                    <img loading="lazy" className='max-w-[100%] max-h-[100%]' src={getDataByIndex(1,item.category)?.thumb_path||''}/>
                                                </Link>
                                                
                                            </figure>
                                        </div>
                                        <div>
                                            <figure className='mb-4 max-w-[80px] sm:max-w-[110px] lg2:max-w-[140px] max-h-[240px] '>
                                                <Link onClick={stopPropagation} href={`/audiobook/${getDataByIndex(2,item.category)?.id}`}>
                                                    <img loading="lazy" className='max-w-[100%] max-h-[100%]' src={getDataByIndex(2,item.category)?.thumb_path||''}/>
                                                    </Link>
                                            </figure>
                                            <figure className= 'max-w-[80px] sm:max-w-[110px] lg2:max-w-[140px] max-h-[240px] '>
                                                <Link onClick={stopPropagation} href={`/audiobook/${getDataByIndex(3,item.category)?.id}`}>
                                                    <img loading="lazy" className='max-w-[100%] max-h-[100%]' src={getDataByIndex(3,item.category)?.thumb_path||''}/>
                                                </Link>
                                                
                                            </figure>
                                        </div>
                                        <div className=''>
                                            <figure className='mb-4 max-w-[80px] sm:max-w-[110px] lg2:max-w-[140px] max-h-[240px] '>
                                                <Link onClick={stopPropagation} href={`/audiobook/${getDataByIndex(5,item.category)?.id}`}>
                                                    <img loading="lazy" className='max-w-[100%] max-h-[100%]' src={getDataByIndex(5,item.category)?.thumb_path||''}/>
                                                    </Link>
                                            </figure>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        </SwiperSlide>
                    ))}
            </>
        </Swiper>
    </div>
  )
}

export default BestCollection