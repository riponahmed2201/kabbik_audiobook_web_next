"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "@/features/home/components/Home/static/category.module.css";
// import MobileGreenPlayer from '../../svgs/MobileGreenPlayer';
// import DesktopCrown from '../../svgs/DesktopCrown';
import RightArrowIcon from "@/svgs/RightArrowIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import RedPlayerIcon from "@/svgs/RedPlayerIcon";
// import { useRouter } from 'next/router';
import RightAngle from "@/svgs/rightAngle";
import { TBooks } from "@/pageTypes/home.types";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import CommonButton from "@/shared/ui/button";
import PlayerIcon from "@/svgs/PlayerIcon";
import ExpandableIcon from "@/svgs/ExpandableIcon";
import { paths } from "@/utils/Paths";
import CustomVideoPlayer from "@/features/player/components/VideoPlayer/VideoPlayer";
import CommonModal from "@/shared/ui/CommonModal/CommonModal.view";
// import ReelsPlayer from '@/features/player/components/VideoPlayer/ReelsVideoplayer/ReelsPlayer.view';
import { ReelsType, ReelType } from "./static/utils";
// import CustomReels from "@/features/player/components/VideoPlayer/ReelsVideoplayer/ReelsPlayer.view";
import { useAppSelector } from "@/store/store";
import ReelsFacebook from "@/features/player/components/VideoPlayer/ReelsVideoplayer/ReelsFaceBook.view";
import ReelsPlayer from "@/features/player/components/VideoPlayer/ReelsVideoplayer/ReelsPlayer.view";
import CustomReels from "@/features/entertainment/components/Reels/CustomReels.view";
import BigVideoPlayerIcon from "@/svgs/BigVideoPlayer";
// import DesktopCrown from '../../svgs/DesktopCrown';

type tProps = {
  categoryName: string;
  link: string;
  data: TBooks[] | undefined;
  isPopular?: boolean;
};
const Reels = ({ categoryName, link, data, isPopular }: tProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router = useRouter();
  const [target,setTarget]=useState('');
  const [podcast, setPodcast] = useState(false);
  const [expand, setIsExpand] = useState<boolean>(false);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const [player3, setPlayer3] = useState(false);
  const [reelsModal,setReelsModal]=useState<number|null>(null);
  const reels=useAppSelector(store=>store.staticTexts.data?.reels)

 useEffect(() => {
    const iframes = document.querySelectorAll(".swiper-slide iframe");
    iframes.forEach((iframe:any) => ((iframe).style.pointerEvents = "none"));
  }, []);

  const handleSlideChange = (swiper: any) => {
    const iframes = document.querySelectorAll(".swiper-slide iframe");
    iframes.forEach((iframe:any) => (iframe.style.pointerEvents = "none"));
    const activeIframe = swiper.slides[swiper.activeIndex].querySelector("iframe");
    if (activeIframe) activeIframe.style.pointerEvents = "auto";
  };

  return (
    <div className={styles.container+` md:pb-5`}>
      <div className={styles.heading_container}>
        <h3 className={styles.heading}>{categoryName}</h3>
        <div className={styles.see_all}>
          <Link href={paths.reels}>
            সবগুলো দেখুন
            <span className={styles.arrow}>
              <RightArrowIcon />
            </span>
          </Link>
        </div>
      </div>
      <div className={styles.slider_box}>
        {/* Custom Arrows */}
        <button
          ref={prevRef}
          className={styles.slider_icons + ` ${styles.slider_left_icons}`}
        >
          <RightAngle color="white" className="rotate-180" />
        </button>
        <button
          ref={nextRef}
          className={styles.slider_icons + ` ${styles.slider_right_icons}`}
        >
          <RightAngle color="white" />
        </button>
        <Swiper
          // slidesPerView={1}
          // spaceBetween={1}
          // loop={true}
          
          // pagination={{ clickable: true }}
          // style={{ paddingBottom: "40px" }}
          // // modules={[Navigation, Pagination]}
          // // centeredSlides={true}
          // modules={[Navigation, Autoplay]}
          // navigation={{
          //   prevEl: prevRef.current,
          //   nextEl: nextRef.current,
          // }}

           modules={[Navigation, Autoplay]}
          pagination={{ clickable: true }}
          style={{ paddingBottom: "0px" }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper: any) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 1.33,
            },
            500: {
              slidesPerView: 1.66,
            },
            600: {
              slidesPerView: 2,
            },
            700: {
              slidesPerView: 2.33,
            },
            800: {
              slidesPerView: 2.66,
            },
            900: {
              slidesPerView: 3,
            },
            1000: {
              slidesPerView:3.33 ,
            },
            1100: {
              slidesPerView: 3.66,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
          // onBeforeInit={(swiper: any) => {
          //   if (
          //     swiper.params.navigation &&
          //     typeof swiper.params.navigation !== "boolean"
          //   ) {
          //     swiper.params.navigation.prevEl = prevRef.current;
          //     swiper.params.navigation.nextEl = nextRef.current;
          //   }
          // }}
        >
          <>
            {reels &&
              reels.map((item:ReelType, index: number) => (
                <SwiperSlide
                  key={index}
                  // className={styles.swiper_slider_custom}
                >
                  {/* <div onClick={()=>setReelsModal(index)} className="w-[90%] relative h-[80vh] flex justify-center items-center bg-black"> */}
                    {/* <div className="absolute cursor-pointer z-10 h-[100%] w-[100%] top-0 left-0 bg-transparent"></div> */}
                    {/* <CustomVideoPlayer
                      width=" max-w-[auto] "
                      height=" max-h-[70vh]  "
                      videoRef={videoRef3}
                      playing={player3}
                      togglePlay={CommonTogglePlay}
                      setPlaying={setPlayer3}
                      url={
                        item.reelInfo.url
                      }
                    /> */}
                    {/* <iframe 
                    src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1293464835751742%2F&show_text=false&width=267&t=0&autoplay=1&muted=1"
                    // width="400"
                    // height="600"
                    className=" h-full"
                    style={{border:"none",overflow:"hidden"}}
                    scrolling="no"
                    // muted={true}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen={true}>
                  </iframe> */}

                  {/* </div> */}
                  <div onClick={()=>setTarget(item.reelInfo?.reel_youtube_id)} key={index} className="w-full space-x-2 h-[70vh] md:h-[65vh]  max-h-[800px] cursor-pointer overflow-hidden">
            
                    <figure className="relative max-h-full xxs:mr-3">
                      <img
                        fetchPriority="low"
                        loading="lazy"
                        decoding="async"
                        className="max-w-full max-h-full"
                        src={item?.reelInfo.thumb}
                      />
                      <span className="absolute z-[3] inline-block w-24 h-24 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <BigVideoPlayerIcon />
                      </span>
                    </figure>
                    {/* {item.reelInfo?.reel_youtube_id} */}
                  </div>
                </SwiperSlide>
              ))}
          </>
        </Swiper>
      </div>
      {/* <CommonModal
        isOpen={reelsModal===null?false:true}
        onClose={() => setReelsModal(null)}
        replaceClassName="relative rounded-lg shadow-lg w-[100vw] max-w-[100vw] h-[100vh] bg-bg"
      >
        <div className="flex h-[100vh] items-center justify-center">
          
             <div className="overflow-y-auto"> 
             
              <CustomReels startIndex={reelsModal??0} reels={reels??[]} />
          </div>
        </div>
      </CommonModal> */}
      {/* <CommonModal
        isOpen={reelsModal===null?false:true}
        onClose={() => setReelsModal(null)}
        replaceClassName="relative rounded-lg shadow-lg w-[100vw] max-w-[100vw] h-[100vh] bg-bg"
      >
        <div className="flex h-[100vh] items-center justify-center">
          
             <div className="overflow-y-auto"> 
             
              <ReelsPlayer startIndex={reelsModal??0} reels={reels??[]} />
          </div>
        </div>
      </CommonModal> */}
      <CommonModal
        isOpen={target?true:false}
        onClose={()=>{setTarget('')}}
      >
        <div className="max-w-[99vw] w-[99vw]">
            <CustomReels targetId={target}/>
        </div>
      </CommonModal>
    </div>
  );
};

export default Reels;
