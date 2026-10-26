'use client';

import { PauseIcon, PlayIcon, Volume2, VolumeOff } from "lucide-react";
import { useRef, useEffect, useState, useLayoutEffect } from "react";

interface Reel {
  id: number;
  reelInfo: {
    url: string;
    description: string;
  };
}

interface ReelsProps {
  reels: Reel[];
  startIndex?: number; // optional, default 0
  // onScrollStart?: () => void;
  // onScrollEnd?: () => void;
}

const ReelsPlayer = ({ reels, startIndex = 0 }: ReelsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentVideo, setCurrentVideo] = useState<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  // Track scroll debounce
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isScrolling = useRef(false);

  const onScrollStart=()=>{
    //console.log(currentVideo)
    currentVideo?.pause()
  }

  const onScrollEnd=()=>{
    //console.log(currentVideo)
     currentVideo?.play()
  }

  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLDivElement[];
    if (!children.length) return;

    // Find the currently visible video (more than 50% visible)
    const currentIndex = children.findIndex(child => {
      const video = child.querySelector("video");
      if (!video) return false;
      const rect = child.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
    });

    if (e.key === "PageDown") {
      e.preventDefault();
      const nextIndex = Math.min(currentIndex + 1, children.length - 1);
      children[nextIndex].scrollIntoView({ behavior: "smooth" });
    } else if (e.key === "PageUp") {
      e.preventDefault();
      const prevIndex = Math.max(currentIndex - 1, 0);
      children[prevIndex].scrollIntoView({ behavior: "smooth" });
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);

useEffect(() => {
  const container = containerRef.current;
  if (container) {
    container.tabIndex = -1;  // Make div focusable
    container.focus();         // Focus it
  }
}, []);

  // Scroll event handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!isScrolling.current) {
        isScrolling.current = true;
        onScrollStart?.(); // ✅ call before scroll
      }

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
        onScrollEnd?.(); // ✅ call after scroll ends
      }, 200); // waits 200ms after last scroll
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [onScrollStart, onScrollEnd]);

  // // Scroll to the specified index initially
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    if (startIndex < 0 || startIndex >= children.length) return;

    const target = children[startIndex] as HTMLDivElement;
    target.scrollIntoView({ behavior: "smooth" });
  }, [startIndex]);
  useLayoutEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  let mounted = true;
  let rafId = 0;

  const scrollToIndexIfReady = () => {
    if (!mounted) return false;

    const children = container.children;
    if (startIndex < 0 || startIndex >= children.length) return false;

    const target = children[startIndex] as HTMLElement;
    // Wait until target has height (videos/images might still be loading)
    if (!target || target.offsetHeight === 0) return false;

    // Option A: use scrollIntoView (works with snap)
    target.scrollIntoView({ behavior: "smooth", block: "center" });

    // Option B: compute top and scroll container (sometimes more reliable)
    // const top = target.offsetTop;
    // container.scrollTo({ top, behavior: "smooth" });

    return true;
  };

  // Try immediately; if not ready keep retrying on next frame
  if (!scrollToIndexIfReady()) {
    const tryLoop = () => {
      if (!mounted) return;
      if (!scrollToIndexIfReady()) {
        rafId = requestAnimationFrame(tryLoop);
      }
    };
    rafId = requestAnimationFrame(tryLoop);
  }

  return () => {
    mounted = false;
    if (rafId) cancelAnimationFrame(rafId);
  };
}, [startIndex, reels]);

  // // Play/Pause based on visibility
  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (!container) return;

  //   const videos = container.querySelectorAll("video");
  //   let activeVideo: HTMLVideoElement | null = null;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       let maxRatio = 0;
  //       let visibleVideo: HTMLVideoElement | null = null;

  //       entries.forEach((entry) => {
  //         const video = entry.target as HTMLVideoElement;
  //         if (entry.intersectionRatio > maxRatio) {
  //           maxRatio = entry.intersectionRatio;
  //           visibleVideo = video;
  //         }
  //       });
  //       //console.log(visibleVideo,"visibleVideo")
  //       if (visibleVideo && visibleVideo !== activeVideo) {
  //         if (activeVideo) activeVideo.pause();
  //         visibleVideo.play().catch(() => {});
  //         setCurrentVideo(visibleVideo);
  //         setIsPlaying(true);
  //         activeVideo = visibleVideo;
  //       }
  //     },
  //     { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
  //   );

  //   videos.forEach((video) => observer.observe(video));
  //   return () => {
  //     videos.forEach((video) => observer.unobserve(video));
  //     observer.disconnect();
  //   };
  // }, []);

  useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const videos = container.querySelectorAll("video");

  const observer = new IntersectionObserver(
    (entries) => {
      let maxRatio = 0;
      let visibleVideo: HTMLVideoElement | null = null;

      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          visibleVideo = video;
        }
      });

      if (visibleVideo && visibleVideo !== currentVideo) {
        // Pause old
        if (currentVideo) currentVideo.pause();

        // Play new
        (visibleVideo as any).play().catch(() => {});
        setCurrentVideo(visibleVideo);
        setIsPlaying(true);
      }
    },
    { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
  );

  videos.forEach((video) => observer.observe(video));

  return () => {
    videos.forEach((video) => observer.unobserve(video));
    observer.disconnect();
  };
}, [currentVideo]);

  const togglePlay = () => {
    if (!currentVideo) return;
    if (currentVideo.paused) {
      currentVideo.play().catch(() => {});
      setIsPlaying(true);
    } else {
      currentVideo.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!currentVideo) return;
    currentVideo.muted = !currentVideo.muted;
    setIsMuted(currentVideo.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentVideo) return;
    const vol = parseFloat(e.target.value);
    currentVideo.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const handleVideoClick = (video: HTMLVideoElement) => {
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
      setCurrentVideo(video);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar relative"
    >
      {reels.map((item, idx) => (
        <div
          key={idx}
          className="h-screen w-full flex items-center justify-center snap-start relative"
        >
          <video
            className="h-full w-auto object-contain"
            playsInline
            muted={isMuted}
            loop
            preload="auto"
            onClick={(e) => handleVideoClick(e.currentTarget)}
          >
            <source src={item.reelInfo.url} />
          </video>

          {/* Controls overlay */}
          {currentVideo === (containerRef.current?.children[idx] as HTMLDivElement)?.querySelector("video") && (
            <div className="absolute top-10 left-5 flex items-center gap-4 bg-black bg-opacity-30 rounded p-2">
              <button
                onClick={togglePlay}
                className="text-white px-3 py-1 rounded bg-[#ffffff22]"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <div
                className="relative"
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
              >
                <button
                  onClick={toggleMute}
                  className="text-white px-3 py-1 rounded bg-[#ffffff22]"
                >
                  {isMuted ? <VolumeOff /> : <Volume2 />}
                </button>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolumeChange}
                  className={`h-1 w-24 accent-white absolute bottom-[50%] transition-all duration-200 ${
                    showVolume ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReelsPlayer;
