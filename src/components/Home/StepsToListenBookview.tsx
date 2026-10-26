"use client";
import { useAppSelector } from '@/store/store'
import React, { useRef } from 'react'
import { IconsForSteps } from './static/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import RightAngle from '@/svgs/rightAngle';
import styles from './static/category.module.css';
import { useRouter } from 'next/navigation';

const StepsToListenBookview = () => {
    const guideline = useAppSelector((store) => store?.staticTexts?.data?.guideline);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const router=useRouter();

    if (!guideline?.length) {
        return null;
    }

    const loopEnabled = guideline.length >= 3;
    const showNav = guideline.length > 1;

    return (
        <div className={`relative mt-14 w-[97%] md:w-[90%]  max-w-[1300px] ${showNav ? styles.slider_box : ''} `} style={{margin: '0 auto'}}>
            {/* {showNav ? (
                <>
                    <button
                        type="button"
                        ref={prevRef}
                        className={`${styles.slider_icons} ${styles.slider_left_icons}`}
                        aria-label="Previous slide"
                    >
                        <RightAngle color="white" className="rotate-180" />
                    </button>
                    <button
                        type="button"
                        ref={nextRef}
                        className={`${styles.slider_icons} ${styles.slider_right_icons}`}
                        aria-label="Next slide"
                    >
                        <RightAngle color="white" />
                    </button>
                </>
            ) : null} */}

            <Swiper
                className="w-full min-w-0 overflow-hidden"
                loop={true}
                rewind={!loopEnabled && guideline.length > 1}
                // pagination={showNav ? { clickable: true } : false}

                modules={showNav ? [Navigation, Pagination, Autoplay] : [Autoplay]}
                navigation={
                    showNav
                        ? {
                              prevEl: prevRef.current,
                              nextEl: nextRef.current,
                          }
                        : false
                }
                noSwiping={false}
                // autoplay={
                //     showNav
                //         ? {
                //               delay: 6000,
                //               disableOnInteraction: false,
                //           }
                //         : false
                // }
                breakpoints={{
                  0: { slidesPerView: 0.95 },
                }}
                onBeforeInit={(swiper: any) => {
                  if (
                    showNav &&
                    swiper.params.navigation &&
                    typeof swiper.params.navigation !== "boolean"
                  ) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }
                }}
            >
                {guideline.map((section, slideIdx) => (
                    <SwiperSlide className='pl-4' key={`${section.heading}-${slideIdx}`}>
                        <div onClick={()=>{router.push(section.link || '')}} className="flex mx-auto items-center justify-around gap-[2vw] w-full">
                            <div className="max-sm:hidden max-w-[40%] lg2:max-w-[45%] relative">
                                <figure>
                                    <img
                                        loading="lazy"
                                        // loading="lazy"
                                        alt={section.heading || 'steps to listen audio books'}
                                        src={section.image || '/assets/HowToListen.png'}
                                        className="w-[100%] max-w-[440px]"
                                    />
                                </figure>
                            </div>
                            <div className="max-sm:mx-auto sm:max-w-[45%] w-full min-w-0">
                                <h2 className="gradient-text z-[3] text-clg2 md:text-cxl2 font-[600] mb-4">
                                    {section.heading}
                                </h2>
                                {section.datas?.map((item, i: number) => (
                                    <div
                                        key={i}
                                        className="flex items-center text-white font-medium text-cs2 md:text-cn2 lg2:text-clg mb-2.5 lg2:mb-4"
                                    >
                                        <span className="inline-block mr-3 max-w-[26px] md:max-w-[35px] max-h-[35px] lg2:max-w-[40px] lg2:max-h-[40px]">
                                            {IconsForSteps[i % IconsForSteps.length]}
                                        </span>
                                        <div>
                                            <h3 className="text-cs2 md:text-cn font-semibold">{item?.title}</h3>
                                            <p className="text-cs md:text-cs2">{item?.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default StepsToListenBookview
