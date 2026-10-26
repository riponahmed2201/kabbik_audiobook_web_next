'use client';

import { useRef, useState, useEffect } from 'react';
import { Pause, Play, Maximize2, Minimize2 } from 'lucide-react';
import { TVideoPlayerProps } from './static/vidoPlayer.types';
import useVideoPlayer from './VideoPlayer.presenter';
import Plus10Sec from '@/svgs/Plus10Sec';
import Minus10Sec from '@/svgs/Minus10Sec';
import Spinner from '@/shared/ui/Spinner.view';

export default function CustomVideoPlayer({
  height,
  width,
  url,
  playing,
  setPlaying,
  videoRef,
  togglePlay,
  poster,
  muted
}: TVideoPlayerProps) {
  const {
    containerRef,
    isFullWidth,
    isFullscreen,
    progress,
    toggleFullscreen,
    handleTimeUpdate,
    // handleSeek,
    
  } = useVideoPlayer(videoRef);

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [loading,setLoading]=useState(true);

  // Skip video by seconds (positive = forward, negative = backward)
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        Math.max(0, videoRef.current.currentTime + seconds),
        videoRef.current.duration
      );
      setTimeout(()=>{videoRef?.current?.play()},100)
    }
  };

  const handlePlay = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play().catch(() => {});
      // setTimeout(()=>{
      //   if(video && 'current' in video)  videoRef.current.muted = false;
      // }, 1000)
      setPlaying(true)
      const isPosterVisible = video.paused && video.currentTime === 0;
      const isVideoPlaying = !video.paused && video.currentTime > 0;
      setIsIntersecting(!isPosterVisible || isVideoPlaying);
    }
  };

  // function to handle pause
  const handlePause = () => {
    const video = videoRef.current;
    //console.log(video,"handlepause");
    
    if (video && !video.paused) {
      video.pause();
      //console.log("from inside handlepause");
      
      // setPlaying(false)
    }
  };

  const customTogglePlay = () => {
    togglePlay();
    const video = videoRef.current;
    if(!video)return;
    const isPosterVisible = video.paused && video.currentTime === 0;
    const isVideoPlaying = !video.paused && video.currentTime > 0;
    setIsIntersecting(!isPosterVisible || isVideoPlaying);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        //console.log(entry.isIntersecting,"kdfjdkf");
        
        if (entry.isIntersecting) {
          handlePlay();
        } else {
          handlePause();
        }
      },
      { threshold: 0.5 } // 50% of video must be visible
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.pause(); // stop previous video
  //     videoRef.current.load();  // reload new src
  //     //console.log("url changed");
      
  //     videoRef.current.play().catch(() => {
  //       // autoplay may fail if browser blocks it without mute
  //       videoRef.current!.muted = true;
  //       videoRef.current!.play();
  //     });
  //   }
  // }, [url]); 
  

  return (
   <div  className='relative lll'>
    {loading?
      <span className='absolute z-[1] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Spinner size='w-12 h-12' />
      </span>
    :''}
     <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 bg-black
        ${isFullWidth ? 'w-screen max-w-none' : height ?? ' w-[60%] mx-auto '}
        ${isFullscreen ? 'h-screen max-h-none' : width ?? ' max-h-full '}`}
    >
      <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-[8px]">
        <video
          onClick={customTogglePlay}
          ref={videoRef}
          src={url}
          key={url}
          className="max-w-full max-h-full cursor-pointer rounded-[8px] object-contain bg-gray-800"
          onEnded={() => setPlaying(false)}
          muted={muted}
          onTimeUpdate={handleTimeUpdate}
          autoPlay={true}
          // priority={false}
          poster={poster}
          // onPlay={()=>{setLoading(false);//console.log('playing');}
          // }
          // onCanPlay={()=>{setLoading(false);//console.log('playing');}
          // }
          // onWaiting={()=>{setLoading(true);//console.log("loading");
          // }}
          onLoadStart={()=>{setLoading(true);//console.log("loading");
          }}
          onLoadedData={()=>setLoading(false)}
          preload='none'
        />
      </div>

      {/* Gradient Control Bar */}
      <div
        className={!isIntersecting ? 'hidden' : `absolute bottom-0 w-[95%] px-4 py-2 flex items-center gap-2 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      >
        <div className="flex items-center gap-2">
          {/* Backward 10s */}
          <button
            onClick={() => skip(-10)}
            className="text-white hover:scale-110 transition-transform bg-[#ffffff22] rounded-full w-8 h-8 flex items-center justify-center"
            title="Rewind 10 seconds"
          >
            <span className="w-6 inline-block">
              <Minus10Sec />
            </span>
          </button>

          {/* Play/Pause */}
          <button
            onClick={customTogglePlay}
            className="text-[#ca1571] hover:scale-110 transition-transform bg-white rounded-full p-1.5"
          >
            {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Forward 10s */}
          <button
            onClick={() => skip(10)}
            className="text-white hover:scale-110 transition-transform bg-[#ffffff22] rounded-full w-8 h-8 flex items-center justify-center"
            title="Forward 10 seconds"
          >
            <span className="w-6 inline-block">
              <Plus10Sec />
            </span>
          </button>
        </div>

        {/* Progress bar */}
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          // onChange={handleSeek}
          className="w-full accent-white h-1"
        />

        {/* Buttons row */}
        <div className="flex gap-2">
          <button
            onClick={toggleFullscreen}
            className="text-white hover:scale-110 transition-transform bg-[#ffffff22] rounded-full p-2"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
   </div>

  );
}
