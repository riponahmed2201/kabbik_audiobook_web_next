import React, { RefObject, useRef, useState } from 'react'
import { TVideoPlayerProps } from './static/vidoPlayer.types';

const useVideoPlayer = (videoRef:RefObject<HTMLVideoElement>) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isFullWidth, setIsFullWidth] = useState(false);
    const [progress, setProgress] = useState(0);

    

    //   useEffect(()=>{
    //     playing && togglePlay()
    //   },[playing])

    const toggleFullscreen = async () => {
        const container = containerRef.current;
        if (!container) return;

        if (!document.fullscreenElement) {
        await container.requestFullscreen();
        setIsFullscreen(true);
        } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
        }
    };

    const toggleFullWidth = () => setIsFullWidth(prev => !prev);

    const handleTimeUpdate = () => {
        const video = videoRef && videoRef.current;
        if (!video) return;
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        //console.log("hey dada")
        const video = videoRef.current;
        if (!video) return;
        const newTime = (parseFloat(e.target.value) / 100) * video.duration;
        video.currentTime = newTime;
        setTimeout(()=>{video.play},100)
    };

  return {containerRef,isFullWidth,setIsFullscreen,isFullscreen,setIsFullWidth,progress,setProgress,toggleFullWidth,toggleFullscreen,handleTimeUpdate,handleSeek}
}

export default useVideoPlayer