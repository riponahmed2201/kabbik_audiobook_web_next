"use client";

import Minus10Sec from "@/svgs/Minus10Sec";
import Plus10Sec from "@/svgs/Plus10Sec";
import { Maximize2, Minimize2, Pause, Play } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";

export type VideoItem = {
  link: string;
  thumbnail?: string;
  title?: string;
};

type Props = {
  videos: VideoItem[];
  initialIndex?: number;
  className?: string;
  onEndAll?: () => void;
};

export default function CustomVideoPlayer({
  videos,
  initialIndex = 0,
  className = "w-full h-[400px]",
  onEndAll,
}: Props) {
  const [finalSkipped,setfinalSkipped]=useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [index, setIndex] = useState<number>(initialIndex);
  const [loading, setLoading] = useState<boolean>(true);
  const [playing, setPlaying] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = videos[index];

  // Detect user interaction to unlock sound
  useEffect(() => {
    const markInteracted = () => {
      setUserInteracted(true);
      setMuted(false);
    };
    window.addEventListener("click", markInteracted, { once: true });
    window.addEventListener("keydown", markInteracted, { once: true });
    window.addEventListener("touchstart", markInteracted, { once: true });
    return () => {
      window.removeEventListener("click", markInteracted);
      window.removeEventListener("keydown", markInteracted);
      window.removeEventListener("touchstart", markInteracted);
    };
  }, []);

  // Intersection observer for visibility control
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.5);
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle visibility-based autoplay/pause without resetting progress
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = async () => {
      if (!isVisible) {
        v.pause();
        setPlaying(false);
        return;
      }
      v.muted = !userInteracted || muted;
      try {
        await v.play();
        setPlaying(true);
      } catch (err) {
        v.muted = true;
        setMuted(true);
        try {
          await v.play();
          setPlaying(true);
        } catch {
          setPlaying(false);
        }
      }
    };

    if (isVisible) tryPlay();
    else {
      v.pause();
      setPlaying(false);
    }
  }, [isVisible, userInteracted]);

  // Reset video when index changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    setProgress(0);
    setDuration(0);

    v.pause();
    v.load();
    const onCanPlay = async () => {
      if (isVisible) {
        v.muted = !userInteracted || muted;
        try {
          await v.play();
          setPlaying(true);
        } catch (err) {
          v.muted = true;
          setMuted(true);
          await v.play().catch(() => {});
        }
      }
    };
    v.addEventListener("canplay", onCanPlay, { once: true });
    return () => v.removeEventListener("canplay", onCanPlay);
  }, [index, userInteracted, muted, isVisible]);

  // Video events
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoadStart = () => setLoading(true);
    const onWaiting = () => setLoading(true);
    const onPlaying = () => {
      setLoading(false);
      setPlaying(true);
    };
    const onCanPlay = () => setLoading(false);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      if (index < videos.length - 1) setIndex((s) => s + 1);
      else onEndAll && onEndAll();
    };
    const onTimeUpdate = () => setProgress(v.currentTime || 0);
    const onLoadedMetadata = () => setDuration(v.duration || 0);

    v.addEventListener("loadstart", onLoadStart);
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      v.removeEventListener("loadstart", onLoadStart);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [index, videos.length]);

  const togglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      try {
        await v.play();
      } catch {
        v.muted = true;
        setMuted(true);
        await v.play().catch(() => {});
      }
    } else v.pause();
  }, []);

  const skipNext = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (index < videos.length - 1) setIndex((s) => s + 1);
    else {
        setIndex(0)
        // setfinalSkipped(true);
        // onEndAll && onEndAll()
    };
  }, [index, videos.length, onEndAll]);

  const skipPrev = useCallback(() => {
    if (index > 0) setIndex((s) => s - 1);
  }, [index]);

  const seekTo = (time: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.min(Math.max(0, time), v.duration || 0);
    setProgress(v.currentTime);
    setTimeout(()=>{videoRef.current?.pause()},10)
  };

  const formatTime = (t: number) => {
    if (!t || !isFinite(t)) return "0:00";
    const sec = Math.floor(t % 60).toString().padStart(2, "0");
    const min = Math.floor(t / 60);
    return `${min}:${sec}`;
  };

  const skipLength = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        Math.max(0, videoRef.current.currentTime + seconds),
        videoRef.current.duration
      );
    }
    // alert('hey data')
    setTimeout(()=>{videoRef.current?.play()},10)
  };

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

  return (
    <div onClick={togglePlay} ref={containerRef} className={`${finalSkipped?"hidden":''} relative w-full h-full group overflow-hidden rounded-[4px] bg-black ${className}`}>
        <span
          onClick={()=>{skipNext()}}
          className="cursor-pointer z-[1] absolute top-5 right-5 select-none text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors duration-200 px-3 py-1 border border-gray-400 rounded-full hover:bg-gray-100 active:scale-95"
        >
          Skip
        </span>
      {mounted&& <video
        ref={videoRef}
        key={current?.link}
        // loading="lazy"
            // decoding="async"
            // fetchPriority="low"
        src={current?.link}
        poster={current?.thumbnail}
        className="w-full h-full object-contain"
        playsInline
        // priority={false}
        preload="none"
        muted={!userInteracted || muted}
      />}

      {loading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {loading && <div className="absolute inset-0 bg-black/30 z-20 pointer-events-none" />}

      {/* <div className="absolute left-0 right-0 bottom-0 z-40 p-3 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button onClick={togglePlay} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md">
              {playing ? "Pause" : "Play"}
            </button>
            <button onClick={skipPrev} disabled={index === 0} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md disabled:opacity-40">
              Prev
            </button>
            <button onClick={skipNext} className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md">
              Skip
            </button>
            <div className="ml-3 text-sm text-white/90 max-w-xs truncate">{current?.title ?? `Video ${index + 1} of ${videos.length}`}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-white/90">{formatTime(progress)} / {formatTime(duration)}</div>
            <button
              onClick={() => {
                setMuted((s) => !s);
                const v = videoRef.current;
                if (v) v.muted = !v.muted;
              }}
              className="bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-md"
            >
              {muted ? "Muted" : "Sound"}
            </button>
          </div>
        </div>

        <div className="mt-2">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={progress}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="w-full h-1 accent-white bg-white/30"
          />
        </div>
      </div> */}

      <div
        className={ `absolute bottom-0 w-[95%] px-4 py-2 flex items-center gap-2 
                  opacity-0 z-[2] group-hover:opacity-100 transition-opacity duration-300`}
      >
        <div className="flex items-center gap-2">
          {/* Backward 10s */}
          <button
            onClick={() => skipLength(-10)}
            className="text-white hover:scale-110 transition-transform bg-[#ffffff22] rounded-full w-8 h-8 flex items-center justify-center"
            title="Rewind 10 seconds"
          >
            <span className="w-6 inline-block">
              <Minus10Sec />
            </span>
          </button>

          {/* Play/Pause */}
          <button
            onClick={(e)=>{e.stopPropagation();togglePlay()}}
            className="text-[#ca1571] hover:scale-110 transition-transform bg-white rounded-full p-1.5"
          >
            {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Forward 10s */}
          <button
            onClick={() => skipLength(10)}
            className="text-white hover:scale-110 transition-transform bg-[#ffffff22] rounded-full w-8 h-8 flex items-center justify-center"
            title="Forward 10 seconds"
          >
            <span className="w-6 inline-block">
              <Plus10Sec />
            </span>
          </button>
        </div>

        {/* Progress bar */}
        {/* <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          className="w-full accent-white h-1"
        /> */}
        <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={progress}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="w-full h-1 accent-white bg-white/30"
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

      {/* <div className="absolute top-3 right-3 z-40 flex flex-col gap-2 text-xs">
        {videos.map((v, i) => (
          <button
            key={v.link}
            onClick={() => setIndex(i)}
            className={`px-2 py-1 rounded-md text-white/90 bg-black/40 hover:bg-white/10 ${i === index ? "ring-2 ring-white/40" : ""}`}
          >
            {v.title ?? `#${i + 1}`}
          </button>
        ))}
      </div> */}
    </div>
  );
}