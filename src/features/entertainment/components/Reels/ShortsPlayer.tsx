"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  MoreVertical,
  Share2,
  ThumbsUp,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
// import { Button } from "./";

interface Video {
  id: string;
  youtubeId: string;
  thumbnail: string;
  title: string;
  creator: string;
  likes: string;
  comments: string;
}

interface ShortsPlayerProps {
  initialIndex: number;
  videos: Video[];
  onClose: () => void;
}

export default function ShortsPlayer({
  initialIndex,
  videos,
  onClose,
}: ShortsPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Assume playing due to autoplay
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentVideo = videos[currentIndex];

  const handleNext = () => {
    if (isTransitioning) return;
    if (currentIndex < videos.length - 1) {
      setIsTransitioning(true);
      setCurrentIndex(currentIndex + 1);
      setIsLiked(false);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setCurrentIndex(currentIndex - 1);
      setIsLiked(false);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      handleNext();
    } else if (swipeDistance < -minSwipeDistance) {
      handlePrevious();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 30) {
      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  const togglePlayPause = () => {
    if (iframeRef.current) {
      const command = isPlaying ? "pauseVideo" : "playVideo";
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: command }),
        "*",
      );
      setIsPlaying(!isPlaying); // Optimistic update
    }
  };

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "https://www.youtube.com") return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === "onStateChange") {
          setIsPlaying(data.data === 1);
        }
      } catch {}
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      //console.log(e);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        //console.log("ArrowDown");
        handleNext();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        //console.log("ArrowUp");
        handlePrevious();
      }
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]); // Removed currentIndex and videos.length as they aren't directly used in the closure

  useEffect(() => {
    if (iframeRef.current) {
      const command = isMuted ? "mute" : "unMute";
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: command }),
        "*",
      );
    }
  }, [isMuted]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Video Container */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
      >
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&controls=0&loop=1&playlist=${currentVideo.youtubeId}&playsinline=1&enablejsapi=1&rel=0&modestbranding=1&fs=0&iv_load_policy=3&showinfo=0`}
          className="h-full w-full object-cover"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{ border: "none" }}
          tabIndex={-1} // Prevent iframe from stealing focus
        />
        <div
          className="absolute inset-0 z-10"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          onClick={togglePlayPause}
        />
      </div>

      {/* Top Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-20">
        <button
          // variant="ghost"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>
        <button  className="text-white hover:bg-white/20">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-20">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              isLiked ? "bg-red-600" : "bg-white/20"
            } backdrop-blur-sm transition-colors`}
          >
            <ThumbsUp
              className={`h-6 w-6 ${isLiked ? "fill-white text-white" : "text-white"}`}
            />
          </div>
          <span className="text-xs font-medium text-white">
            {currentVideo.likes}
          </span>
        </button>

        <button className="flex flex-col items-center gap-1 transition-transform active:scale-90">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs font-medium text-white">
            {currentVideo.comments}
          </span>
        </button>

        <button className="flex flex-col items-center gap-1 transition-transform active:scale-90">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Share2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs font-medium text-white">Share</span>
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            {isMuted ? (
              <VolumeX className="h-6 w-6 text-white" />
            ) : (
              <Volume2 className="h-6 w-6 text-white" />
            )}
          </div>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 z-20">
        <div className="max-w-[calc(100%-80px)]">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-600 to-red-400" />
            <span className="font-semibold text-white">
              {currentVideo.creator}
            </span>
            <button
              // size="sm"
              className="h-8 rounded-full bg-white text-black hover:bg-white/90 font-semibold px-4"
            >
              Follow
            </button>
          </div>
          <p className="text-sm text-white leading-relaxed">
            {currentVideo.title}
          </p>
        </div>
      </div>

      {/* Navigation Indicators */}
      {/*<div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">*/}
      {/*  {videos.map((_, index) => (*/}
      {/*    <div*/}
      {/*      key={index}*/}
      {/*      className={`h-1 w-1 rounded-full transition-all ${index === currentIndex ? "bg-white h-8" : "bg-white/40"}`}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}

      {/* Swipe Hint */}
      {currentIndex === initialIndex && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 animate-bounce pointer-events-none">
          <div className="text-xs text-white/60 text-center">
            Swipe up for next
          </div>
        </div>
      )}
    </div>
  );
}
