"use client";

import SpeedMeter from '@/svgs/SpeedMeter.svg'
import {  Timer,  Volume2, VolumeOff } from 'lucide-react'
import styles from "@/features/audiobook/components/audiobook/static/audioBook.module.css";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import {  TBigPlayerProps } from "@/features/audiobook/components/audiobook/static/audiobook.type";
import {  Shrink, X } from "lucide-react";
import {  handleShare2 } from "@/helpers/commonFunction";
// import Skeleton from "@/shared/ui/Skeleton.view";
import LoveIcon from "@/svgs/LoveIcon";
// import CastAndCrew from "./Cast&Crew.viw";
// import Review from "./Review.view";
import ShareIcon from "@/svgs/ShareIcon.svg";
import GradientAudioPlayer from "@/shared/ui/AudioPlayer.view";
import {  flexCenter } from "@/shared/ui/static/tailwind.classes";
import PlayList from "@/features/audiobook/components/audiobook/PlayList.view";


// AudioPlayer Configuration

const GlobalBigPlayer = ({
    bookId,
    audioBookData,
    togglePlayList,
    index,
    handleShrink,
    isPlaying,
    setIsPlaying,
    hasAccess,
    setWithoutBGM,
    audioRef,
    audioPlayerInfo,
    epList,
    audioPlayer,
    currentTime ,
    setCurrentTime,
    setPlaybackRate,
    setTimerMin,
    playbackRate,
    timerMin,
    setShowBigPlayer,
    setShowSpeedModal,
    setShowSleeperModal,
    favSubmit,
    withoutBGM,
    isFavorite
}: TBigPlayerProps) => {
  
  return (
    <>
      <div className={"flex relative justify-around items-start "+ " "}>
        <div 
          className={"absolute top-3 z-[4] right-12 cursor-pointer h-8 bg-[#535252] w-8 rounded-[50%]"+flexCenter}
          onClick={handleShrink}
        >
          
          <Shrink color="white" className="w-5"/>
        </div>
        <div 
          className={"absolute top-3 z-[4] right-3 cursor-pointer h-8 bg-[#535252] w-8 rounded-[50%]"+flexCenter}
          onClick={() => setShowBigPlayer(false)}
        >
          
          <X color="white" className="text-6xl"/>
        </div>
        {/* <div 
          className={`absolute bottom-0 left-0 w-full h-[180vh] ${styles.audioBookBg}`}
          style={{
            backgroundImage: `url('${bookId ? audioBookData?.thumb_path : ""}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.5,
          }}
        ></div> */}
        <div className="h-40 absolute bottom-[-80px] z-2 w-full blur_gradient opacity-70"></div>

       <div className={"flex max-sm:flex-col max-w-[94%] my-7 sm:my-10 md:my-10 rounded-[32px] items-start"+ " " + styles.bigPlayer}>
            <div className=" flex items-center z-[3] justify-center p-1">
            <div className="w-full min-w-[45vw]   mx-auto">
                {/* Main Card Container */}
                <div className=" rounded-[40px]  overflow-hidden">
                {/* Book Cover Section */}
                <div>
                    <figure className="m-4  rounded-[10px]  overflow-hidden">
                        <img loading="lazy" className="w-full  object-center object-cover sm:h-[25vw]  sm:w-[45vw]  " src={audioBookData?.rect_banner ?? audioBookData?.thumb_path}/>
                    </figure>
                </div>
                    <div>
                        <GradientAudioPlayer 
                            toogleForWard={()=>togglePlayList(index+1,epList?.[index+1]?.id)} 
                            toogleBackWard={()=>togglePlayList(index-1,epList?.[index-1]?.id)}
                            isPlaying={isPlaying} 
                            isFirst={index===0}
                            isLast={(index===epList?.length-1)&&(audioPlayerInfo?.bookIds.length===0)}
                            setIsPlaying={(boolean)=>setIsPlaying(boolean)} 
                            src={audioPlayer} 
                            audioRef={audioRef}
                            currentTime={currentTime}
                            setCurrentTime={setCurrentTime}
                            setPlaybackRate={setPlaybackRate}
                            setTimerMin={setTimerMin}
                            playbackRate={ playbackRate}
                            timerMin={timerMin }
                        />
                    </div>
                    <div className="flex cursor-pointer  justify-between  items-center gap-2 px-4 max-w-4xl mx-auto">

                      {/* Left Controls */}
                      <div className="flex flex-wrap items-start justify-center gap-3">
                        {/* Speed Control */}
                        <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setShowSpeedModal(true)}>
                          <div className="flex items-center justify-center   bg-player-surface rounded-full ">
                            <span 
                              className="w-4 h-4  fill-player-text" 
                              
                            >
                                <SpeedMeter/>
                            </span>
                            <span className="text-white text-sm font-medium">{playbackRate}</span>
                          </div>
                          <span className="text-white max-xxs:hidden text-cxs">Speed</span>
                        </div>

                        {/* Timer */}
                        <div className="flex flex-col items-start  cursor-pointer" onClick={() => setShowSleeperModal(true)}>
                          <div 
                            className="w-4   rounded-full flex  text-white justify-center"
                            
                          >
                            <Timer/>
                          </div>
                          <span className="text-white max-xxs:hidden text-cxs">Timer</span>
                        </div>

                        {/* Background Music */}
                        <div onClick={setWithoutBGM} className="flex flex-col items-center ">
                          <div className="w-4 text-xl" role="img" aria-label="speaker">
                            {withoutBGM?<VolumeOff className='text-white w-full'/>:<Volume2 className='text-white w-full'/>}
                          </div> 
                          <span className="text-white max-xxs:hidden text-cxs text-center">Background <br/> music</span>
                        </div>
                      </div>

                      {/* Right Controls */}
                      <div  className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        {/* Like */}
                        <div onClick={favSubmit} className="flex flex-col items-center ">
                          <div className="w-4 h-4 inline-block">
                            {/* {//console.log(isFavorite,"isFavorite")} */}
                            <LoveIcon fill={isFavorite?'#D14874':'white'}/>
                          </div>
                          <span className="text-white text-cxs">Like</span>
                        </div>

                        {/* Share */}
                        <div onClick={()=>handleShare2()} className="flex flex-col items-center ">
                          <div className="w-4 h-4 inline-block">
                            <ShareIcon/>
                          </div>
                          <span className="text-white text-cxs">Share</span>
                        </div>

                        {/* Add My Playlist */}
                        {/* <div className="flex flex-col items-center gap-2">
                          <div className="w-4 h-4">
                            <MyPlayList/>
                          </div>
                          <span className="text-white text-cxs text-center">Add My Playlist</span>
                        </div> */}
                      </div>
                    </div>
                
                </div>
            </div>
            </div>
            <div className=" z-[5] w-full   py-4 md:py-8">
            <div className="max-w-full sm:max-w-2xl mx-auto px-4 max-sm:pr-0 space-y-8 md:space-y-16">
                {/* Header Section */}
            

                {/* Navigation Tabs */}
                <div className=" sm:gap-2 md:gap-4">
                    <PlayList 
                        hasAccess={hasAccess} 
                        book={audioBookData}
                        index={index}
                        isPlaying={isPlaying}
                        togglePlay={(i,episodeId)=>{
                            togglePlayList(i,episodeId)
                        }}
                    /> 
                    {/* <BigPlayerCards/> */}
                </div>

            </div>
            </div>
       </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(GlobalBigPlayer), {
  ssr: false,
});


