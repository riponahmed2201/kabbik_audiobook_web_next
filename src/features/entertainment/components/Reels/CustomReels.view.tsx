import { useAppSelector } from "@/store/store";
import { useEffect, useMemo, useRef, useState } from "react";
import Spinner from "@/shared/ui/Spinner.view";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

function loadYouTubeIframeApi(): void {
  if (typeof window === "undefined") return;
  if (window.YT?.Player) return;
  if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) return;
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  tag.async = true;
  document.head.appendChild(tag);
}

export default function CustomReels({ targetId }: { targetId: string }) {
  const [apiReady, setApiReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reelsData = useAppSelector((store) => store?.staticTexts?.data?.reels);
  const playersRef = useRef<Record<number, { destroy?: () => void; playVideo?: () => void; pauseVideo?: () => void }>>({});
  /** Indices that should have a YT.Player mounted (lazy: viewport + initial target). */
  const [activeSlots, setActiveSlots] = useState<Set<number>>(new Set());
  const [playerEpoch, setPlayerEpoch] = useState(0);
  const seededForTargetRef = useRef<string | null>(null);

  const targetIndex = useMemo(
    () =>
      reelsData?.findIndex((r) => r?.reelInfo?.reel_youtube_id === targetId) ?? -1,
    [reelsData, targetId]
  );

  const slotsKey = useMemo(
    () => [...activeSlots].sort((a, b) => a - b).join(","),
    [activeSlots]
  );

  // Load iframe API only when this modal mounts; register ready callback (handles late load + layout race).
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.YT?.Player) {
      setApiReady(true);
      return;
    }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      try {
        prev?.();
      } finally {
        setApiReady(true);
      }
    };

    loadYouTubeIframeApi();

  }, []);

  // Seed lazy slots once per opened reel (do not reset when Redux returns a new reels array reference).
  useEffect(() => {
    if (!reelsData?.length || !targetId) return;
    if (seededForTargetRef.current === targetId) return;
    seededForTargetRef.current = targetId;
    const seed = new Set<number>();
    if (targetIndex >= 0) seed.add(targetIndex);
    else seed.add(0);
    setActiveSlots(seed);
  }, [reelsData, targetIndex, targetId]);

  // Expand slots as user scrolls — each new slot may create one player (fewer log_event / embed calls).
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !reelsData?.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(idx)) continue;
          setActiveSlots((prev) => {
            if (prev.has(idx)) return prev;
            const next = new Set(prev);
            next.add(idx);
            return next;
          });
        }
      },
      { root, threshold: 0.12, rootMargin: "120px" }
    );

    root.querySelectorAll(".reel-video").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [reelsData, apiReady]);

  // Create YT.Player only for activeSlots (not for every reel).
  useEffect(() => {
    if (!apiReady || !reelsData?.length || !window.YT?.Player) return;

    const raf = requestAnimationFrame(() => {
      for (const index of activeSlots) {
        if (playersRef.current[index]) continue;
        const reel = reelsData[index];
        const videoId = reel?.reelInfo?.reel_youtube_id;
        if (!videoId) continue;
        const hostId = `yt-player-${index}`;
        if (!document.getElementById(hostId)) continue;

        const shouldAutoplay = videoId === targetId;

        try {
          const player = new window.YT.Player(hostId, {
            videoId,
            playerVars: {
              autoplay: shouldAutoplay ? 1 : 0,
              mute: 0,
              controls: 1,
              rel: 0,
              playsinline: 1,
            },
            events: {
              onReady: (e: { target: { playVideo?: () => void } }) => {
                if (shouldAutoplay && typeof e.target?.playVideo === "function") {
                  e.target.playVideo();
                }
                setPlayerEpoch((n) => n + 1);
              },
            },
          });
          playersRef.current[index] = player;
        } catch {
          // ignore single-player init failure
        }
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [apiReady, reelsData, slotsKey, targetId]);

  // Play/pause only for constructed players.
  useEffect(() => {
    const root = containerRef.current;
    if (!root || !reelsData?.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          const player = playersRef.current[index];
          if (!player || typeof player.playVideo !== "function") return;

          if (entry.isIntersecting) {
            Object.keys(playersRef.current).forEach((k) => {
              const i = Number(k);
              if (i !== index && playersRef.current[i]?.pauseVideo) {
                playersRef.current[i].pauseVideo!();
              }
            });
            player.playVideo();
          } else if (player.pauseVideo) {
            player.pauseVideo();
          }
        });
      },
      { root, threshold: 0.8 }
    );

    root.querySelectorAll(".reel-video").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [reelsData, playerEpoch, slotsKey]);

  // Scroll target into view once layout exists.
  useEffect(() => {
    if (targetIndex < 0 || !reelsData?.length) return;
    const el = document.querySelector(`[data-index="${targetIndex}"]`) as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [targetIndex, reelsData]);

  // Destroy players when switching target or unmounting to avoid duplicate embeds.
  useEffect(() => {
    return () => {
      Object.values(playersRef.current).forEach((p) => {
        try {
          p?.destroy?.();
        } catch {
          /* noop */
        }
      });
      playersRef.current = {};
      seededForTargetRef.current = null;
    };
  }, [targetId]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen  overflow-y-scroll snap-y snap-mandatory bg-black text-white"
    >
      {reelsData?.map((reel, index) => (
        <div
          key={index}
          data-index={index}
          className="reel-video mx-auto  w-[95%] h-[97vh] my-[5vh] flex justify-center items-center snap-start"
        >
          {!apiReady ? (
            <picture className="relative">
              <img loading="lazy" src={reel?.reelInfo?.thumb} alt="" />
              <Spinner size="w-5 h-5 z-[5] relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
            </picture>
          ) : activeSlots.has(index) ? (
            <div
              id={`yt-player-${index}`}
              className=" o h-[90%] md:h-full max-w-[98%] mx-auto w-[500px]"
            />
          ) : (
            <picture className="relative">
              <img loading="lazy" src={reel?.reelInfo?.thumb} alt="" />
            </picture>
          )}
        </div>
      ))}
    </div>
  );
}
