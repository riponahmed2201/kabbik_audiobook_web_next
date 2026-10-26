'use client'
import Minus10Sec from "@/svgs/Minus10Sec";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Plus10Sec from "@/svgs/Plus10Sec";
import PauseIcon from "@/svgs/PauseIcon";
import GoPrevious from "@/svgs/GoPrevious.svg";
import { clampAudio, formatTimeForAudio, seekAudioWhenReady, waitForAudioReady } from "@/helpers/commonFunction";
import { GradientAudioPlayerProps } from "./static/audioPlayer.type";
import WhitePlayer from "@/svgs/WhitePlayer.svg";
import Spinner from "./Spinner.view";

const GradientAudioPlayer: React.FC<GradientAudioPlayerProps> = ({
  src,
  isPlaying ,
  setIsPlaying ,
  toogleForWard,
  toogleBackWard,
  isFirst,
  isLast,
  audioRef,
  setPlaybackRate,
  setTimerMin,
  playbackRate,
  timerMin,
  currentTime ,
  setCurrentTime = () => {},
  thumbColor = "#ffffff",
  trackBg = "#111827",
  accent = "#ffffff",
  className = "",
  skipSeconds = 10,
  defaultSpeed = 1,
  defaultTimerMin = 0,
  startMuted = false,
  resumeTimeRef,
  onLoadingChange,
}) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [timerEndsAt, setTimerEndsAt] = useState<number | null>(null);
  const timerTimeoutRef = useRef<number | null>(null);
  const tickIntervalRef = useRef<number | null>(null);
  const [, forceTick] = useState(0);
  const srcRef = useRef(src);
  const playRequestRef = useRef(0);

  const updateLoading = (loading: boolean) => {
    setIsLoading(loading);
    onLoadingChange?.(loading);
  };

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const onLoaded = () => {
      setDuration(audio.duration || currentTime);
      
    };
    const onTime = () => {
      setCurrentTime(audio.currentTime || 0)
    };
    const onEnded = () => setIsPlaying(false);
    const onProgress = () => {
      try {
        const b = audio.buffered;
        if (b && b.length > 0) {
          const end = b.end(b.length - 1);
          setBuffered(end);
        }
      } catch {}
    };
    const onWaiting = () => updateLoading(true);
    const onPlaying = () => updateLoading(false);
    const onCanPlay = () => updateLoading(false);
    const onLoadStart = () => updateLoading(true);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("progress", onProgress);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("loadstart", onLoadStart);

    audio.muted = startMuted;
    audio.playbackRate = playbackRate;

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("progress", onProgress);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("loadstart", onLoadStart);
    };
  }, [playbackRate, startMuted, audioRef, setCurrentTime, setIsPlaying, onLoadingChange]);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio || !src) return;

    if (srcRef.current !== src) {
      srcRef.current = src;
      updateLoading(true);
      audio.load();
    }
  }, [src, audioRef]);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const requestId = ++playRequestRef.current;

    const runPlayback = async () => {
      if (!isPlaying) {
        audio.pause();
        return;
      }

      try {
        updateLoading(true);
        await waitForAudioReady(audio, "canplay");

        if (playRequestRef.current !== requestId) return;

        const pendingSeek = resumeTimeRef?.current;
        if (pendingSeek != null && pendingSeek > 0) {
          await seekAudioWhenReady(audio, pendingSeek, setCurrentTime);
          if (resumeTimeRef) resumeTimeRef.current = null;
          
        }

        if (playRequestRef.current !== requestId) return;

        await audio.play();
        
        updateLoading(false);
      } catch {
        if (playRequestRef.current === requestId) {
          updateLoading(false);
        }
      }
    };

    runPlayback();
  }, [isPlaying, src, audioRef, resumeTimeRef, setCurrentTime]);

  const skip = (secs: number) => {
    const audio = audioRef?.current;
    if (!audio) return;
    audio.currentTime = clampAudio(audio.currentTime + secs, 0, duration || audio.duration || 0);
  };

  const seekFromClientX = (clientX: number) => {
    const audio = audioRef?.current;
    const bar = barRef.current;
    if (!audio || !bar || duration === 0) return;
    const rect = bar.getBoundingClientRect();
    const p = clampAudio((clientX - rect.left) / rect.width, 0, 1);
    const t = p * duration;
    audio.currentTime = t;
    setCurrentTime(t || currentTime);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
    if (duration > 0) {
      const bar = barRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const p = clampAudio((e.clientX - rect.left) / rect.width, 0, 1);
      setDragProgress(p);
      seekFromClientX(e.clientX);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const p = clampAudio((e.clientX - rect.left) / rect.width, 0, 1);
    setDragProgress(p);
    seekFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    setDragging(false);
  };

  const progress = useMemo(() => {
    return duration > 0 ? (currentTime / duration) : 0;
  }, [currentTime, duration]);

  const bufferedPct = useMemo(() => {
    return duration > 0 ? clampAudio(buffered / duration, 0, 1) : 0;
  }, [buffered, duration]);

  const setSpeed = (rate: number) => {
    const audio = audioRef?.current;
    if (!audio) return;
    audio.playbackRate = rate;
    setPlaybackRate(rate);
  };

  useEffect(() => {
    setSpeed(playbackRate);
  },[playbackRate])

  const clearSleepTimer = () => {
    if (timerTimeoutRef.current) {
      window.clearTimeout(timerTimeoutRef.current);
      timerTimeoutRef.current = null;
    }
    if (tickIntervalRef.current) {
      window.clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
    setTimerEndsAt(null);
  };

  const startSleepTimer = (minutes: number) => {
    clearSleepTimer();
    if (!minutes || minutes <= 0) return;
    const ms = minutes * 60 * 1000;
    const ends = Date.now() + ms;
    setTimerEndsAt(ends);

    timerTimeoutRef.current = window.setTimeout(() => {
      const audio = audioRef?.current;
      if (audio) {
        audio.pause();
      }
      setIsPlaying(false);
      clearSleepTimer();
    }, ms);

    tickIntervalRef.current = window.setInterval(() => {
      forceTick((v) => v + 1);
    }, 1000);
  };

  useEffect(() => {
    if (timerMin && timerMin > 0) {
      startSleepTimer(timerMin);
    } else {
      clearSleepTimer();
    }
    return () => clearSleepTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerMin]);

  const countdownStr = useMemo(() => {
    if (!timerEndsAt) return "Off";
    const remaining = Math.max(0, timerEndsAt - Date.now());
    const totalSec = Math.ceil(remaining / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, [timerEndsAt, currentTime]);

  useEffect(() => () => clearSleepTimer(), []);

  const gradientStyle = {
    background: `linear-gradient(90deg, #DC0277 0%, #004C99 100%)`,
  } as React.CSSProperties;

  const trackStyle = {
    background: trackBg,
  } as React.CSSProperties;

  const thumbStyle = {
    background: "linear-gradient(180deg, #A41580 0%, #DC0277 100%)",
    borderColor: thumbColor,
  } as React.CSSProperties;

  return (
    <div
      className={`w-full   p-4 pt-0   ${className}`}
      style={{ color: accent }}
    >
      <audio ref={audioRef} src={src} preload="auto" />

      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="mt-0.5 text-xs text-white/60">
            {formatTimeForAudio(currentTime)} / {duration ? formatTimeForAudio(duration) : "0:00"}
          </p>
          {/* {isLoading && (
            <p className="mt-1 flex items-center text-xs text-white/70" aria-live="polite">
              <Spinner size="w-3 h-3" color="border-t-white" />
              <span className="ml-2">Preparing audio...</span>
            </p>
          )} */}
          <div
            aria-live="polite"
            aria-hidden={!isLoading}
            className={`overflow-hidden transition-all duration-300 ease-out ${
              isLoading
                ? "max-h-10 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-1 pointer-events-none"
            }`}
          >
            <p className="mt-1 flex items-center text-xs text-white/70">
              <Spinner size="w-3 h-3" color="border-t-white" />
              <span className="ml-2">Preparing audio...</span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative mb-4 select-none">
        <div
          ref={barRef}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={duration || 0}
          aria-valuenow={dragging ? (dragProgress * duration) : currentTime}
          aria-label="Seek"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") skip(5);
            if (e.key === "ArrowLeft") skip(-5);
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="group relative h-3 w-full cursor-pointer touch-none rounded-full"
          style={trackStyle}
        >
          <div
            className="absolute left-0 top-1/2 h-3 -translate-y-1/2 rounded-full opacity-90"
            style={{ width: `${bufferedPct * 100}%`, background: "#ffffff" }}
          />

          <div
            className="absolute left-0 top-1/2 h-3 -translate-y-1/2 rounded-full"
            style={{ width: `${(dragging ? dragProgress : progress) * 100}%`, ...gradientStyle }}
          />

          <div
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full  ring-white/50 transition-transform duration-100 group-active:scale-110"
            style={{ left: `calc(${(dragging ? dragProgress : progress) * 100}% - 8px)`, ...thumbStyle }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-6">
            <button
                onClick={toogleBackWard}
                className={`${isFirst ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label={`Rewind ${skipSeconds} seconds`}
                disabled={isFirst || isLoading}
            >
            <span className="w-3 inline-block">
                <GoPrevious/>
            </span>
          </button>
          <button
            onClick={() => skip(-skipSeconds)}
            className={``}
            aria-label={`Rewind ${skipSeconds} seconds`}
            disabled={isLoading}
          >
            <span className="w-5 inline-block">
                <Minus10Sec/>
            </span>
          </button>

          <button
            onClick={()=>!isLoading && setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause" : "Play"}
            disabled={isLoading && !isPlaying}
            className="relative"
          >
            <span className="w-10 inline-block">
                {isLoading ? (''
                  // <span className="flex h-10 w-10 items-center justify-center">
                  //   <Spinner size="w-8 h-8" color="border-t-[#DC0277]" />
                  // </span>
                ) : isPlaying ? (
                  <PauseIcon/>
                ) : (
                  <WhitePlayer />
                )}
            </span>
          </button>

          <button
            onClick={() => skip(skipSeconds)}
            aria-label={`Forward ${skipSeconds} seconds`}
            disabled={isLoading}
          >
            <span className="w-5 inline-block">
                <Plus10Sec/>
            </span>
          </button>

          <button
                onClick={toogleForWard}
                className={`${isLast ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="Next episode"
                disabled={isLast || isLoading}
            >
            <span className="w-3 rotate-180 inline-block">
                <GoPrevious/>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradientAudioPlayer;
