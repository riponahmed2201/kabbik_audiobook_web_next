"use client";
import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./static/home2.module.css";
import Image from "next/image";
import { TopBannerImageInfo } from "@/pageTypes/home.types";
import { useRouter } from "next/navigation";
import CommonButton from "@/shared/ui/button";
import PlayerIcon from "@/svgs/PlayerIcon";
import IIcon from "@/svgs/IIcon";
import AppStoreIcon, { AppStoreIcon2 } from "@/svgs/AppStoreIcon";
import PlayStoreIcon, { PlayStoreIcon2 } from "@/svgs/PlayStoreIcon";
import AutoButtonSlider from "./AutoButtonSlider.view";
import CommonModal from "@/shared/ui/CommonModal/CommonModal.view";

const Hero = ({
  slidingData,
}: {
  slidingData: { data: TopBannerImageInfo[] | null };
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router = useRouter();

  return (
    <>
      <div className="relative mt-1 w-full">
        <div className="absolute top-20  z-[6] md:hidden">
          <AutoButtonSlider/>
        </div>
        <div className=" relative w-full bg-[black]">
          
          <Swiper
            loop={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{
              delay: 6000, // 10 seconds
              disableOnInteraction: false, // keeps autoplay running after manual slide
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
            }}
            onBeforeInit={(swiper: any) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== "boolean"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
          >
            {slidingData.data &&
              slidingData?.data?.map((topbannerinfo) => (
                (topbannerinfo.id===5)?"":
                <SwiperSlide
                  key={topbannerinfo?.id}
                  onClick={() => {
                    router.push(`/audiobook/${topbannerinfo?.id}`);
                  }}
                >
                  <div className="relative h-[70vh] xxs:h-[70vh] xs:h-[80vh] sm:h-[85vh] md:h-[90vh] max-h-[1000px] md2:h-[90vh] lg:h-[90vh]  lg2:h-[110vh]  w-[100vw] max-w-[1440px] mx-auto overflow-hidden">
                    <div className={styles.backdrop_filter}>
                      <div className="">
                        <picture className={styles.thumb_path}>
                          <img
                            src={topbannerinfo?.thumb_path}
                            className="w-full opacity-30"
                            loading="lazy"
                          />
                        </picture>
                      </div>
                      <div
                        // className={styles.mobile_slider_icons}
                        className="flex px-[6vw] py-[2vw] max-w-[930px] items-center mx-auto max-p-[160px] mt-[25%]  md:mt-[120px]"
                        // style={{backgroundImage:`url(${topbannerinfo.thumb_path})`}}
                      >
                        {/* <div className={styles.book_on_banner}>
                        <h5>{topbannerinfo.name}</h5>
                      </div> */}
                        <div className="w-full z-10 max-md:mt-[3.5vh]  text-white">
                          <h3 className=" leading-[1.3] text-clg2 xxs2:text-cxl md2:text-cxl2 w-full 1350:w-[60%] font-semibold">{topbannerinfo.name}</h3>
                          <p className="text-clg sm:text-clg2 my-4 sm:my-4">{topbannerinfo.author_name}</p>
                          <CommonButton className={styles.hue_btn +" "}>
                            <div className="flex gap-2">
                              <span className=" xxs2:mr-4 w-5 h-5 sm:w-7 sm:h-7 inline-block">
                                <PlayerIcon color="#68233A" />
                              </span>
                              <p className="text-cs2 sm:text-cn mt-0">শুনে ফেলুন</p>
                            </div>
                          </CommonButton>
                          <CommonButton className={styles.secondary_btn+` bg-grey`}>
                            <div className="flex gap-2">
                              <span className="xxs2:mr-4 w-5 h-5 sm:w-7 sm:h-7 inline-block">
                                <IIcon />
                              </span>
                              <p className="text-cs2 sm:text-cn mt-0"> আরও জানুন</p>
                            </div>
                          </CommonButton>
                        </div>
                        <div className="mx-auto">
                          <img

                            src={topbannerinfo.thumb_path}
                            alt="Description"
                            className="max-w-[210px] max-h-[280px] border-2 rounded-[12px] border-white w-[35vw] h-[48vw]  xs:w-[27vw] xs:h-[35vw] z-10 relative"
                          />
                        </div>
                      </div>
            </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
          {/* <div className="z-10 w-full h-24 flex items-center justify-between">
            <div className="w-[50%]">
              <div className="rect-gradient1 z-10  h-12 "></div>
              <div className="rect-gradient2 z-10  h-12 "></div>
            </div>

            <div className="rect-gradient z-10 w-[50%] h-12 "></div>
          </div> */}
          <div className="circular_gradient left-[-10%] bottom-[10%] w-[20vw] h-[20vw] absolute rounded-[50%] z-[2] "></div>
        <div className="mt-[-20%] lg:mt-[-10%] 2xl:mt-[-8%] ">
          <div className="bg-bg z-[3] relative">
          <div className={styles.play_icons+' z-[5] relative '}>
            <div className="mr-[1vw] sm:mr-[3vw]">
              <h6 className={styles.download_txt+` max-md:text-center`}>এখনই কাব্যিক এপ ডাউনলোড করুন!</h6>
              <p className="text-cn2 md:text-cn mb-[7px] max-md:text-center lg:mb-[10px]">হাজারো গল্প ও অডিওবুক আপনার হাতের মুঠোয়।</p>
                <div className="flex items-center max-md:justify-center">
                  <picture className="mr-3">
                    <img
                      src="/assets/users.png"
                      alt="users profiles"
                      loading="lazy"
                      className="max-w-[94px] max-h-[30px]"
                    />
                  </picture>
                  {/* <h6 className="text-cn lg:text-clg leading-none">
                    সারা বিশ্বে ১৮ লক্ষ + <br/>
                    <span className="text-cs2 lg:text-[16px] mt-0">সক্রিয় ব্যবহারকারী রয়েছে</span>
                  </h6> */}
                </div>
                <p className="text-cn2 lg:text-cs2 max-md:text-center mt-3">
                  {/* 600K+ App Installs | 3,000+ Audiobooks | 4M+ Listens | 3K+ Reviews  */}
                  ১ মিলিয়ন+ ইনস্টল | ৩,০০০+ অডিওবুক | ৫০ লাখ+ বার শোনা হয়েছে | ৩,০০০+ ব্যবহারকারীর রিভিউ
                </p>
            </div>
            <div className="flex max-md:mt-3 md:justify-end min-w-[55%] lg:min-w-[45%] max-md:mx-auto">
              <span className="max-w-[140px] max-h-[140px] mr-[3vw] inline-block">
                <a href={"https://apps.apple.com/us/app/kabbik/id6459885875"}><AppStoreIcon2/></a>
              </span>
              <span className="max-w-[140px] max-h-[140px] inline-block">
                <a href="https://play.google.com/store/apps/details?id=com.kabbik.app"><PlayStoreIcon2/></a>
              </span>
            </div>
          </div>
        </div>
        </div>
      </div>
      
    </>
  );
};

export default Hero;
