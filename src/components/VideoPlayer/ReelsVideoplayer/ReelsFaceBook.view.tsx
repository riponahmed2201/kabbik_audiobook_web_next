'use client';

import { useRef, useEffect, useState, useLayoutEffect } from "react";

interface Reel {
  id: number;
  reelInfo: {
    url: string; // will hold the iframe src
    description?: string;
    facebook_url?:string;
  };
}

interface ReelsProps {
  reels: Reel[];
  startIndex?: number; // optional, default 0
}

const Reels = ({ reels, startIndex = 0 }: ReelsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll debounce
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isScrolling = useRef(false);

  const onScrollStart = () => {
    //console.log("Scrolling started");
  };

  const onScrollEnd = () => {
    //console.log("Scrolling ended");
  };

  // Keyboard navigation (PageUp / PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const children = Array.from(container.children) as HTMLDivElement[];
      if (!children.length) return;

      const currentIndex = children.findIndex((child) => {
        const rect = child.getBoundingClientRect();
        return (
          rect.top < window.innerHeight * 0.5 &&
          rect.bottom > window.innerHeight * 0.5
        );
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

  // Make container focusable
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.tabIndex = -1;
      container.focus();
    }
  }, []);

  // Scroll event handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!isScrolling.current) {
        isScrolling.current = true;
        onScrollStart();
      }

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
        onScrollEnd();
      }, 200);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to specified index initially
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
      if (!target || target.offsetHeight === 0) return false;

      target.scrollIntoView({ behavior: "smooth", block: "center" });
      return true;
    };

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
            {/* {//console.log(item)} */}
            {/* <iframe src={"https://www.facebook.com/plugins/embed.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1293464835751742%2F&show_text=false&width=267&t=0"} width="267" height="476" style={{border:"none",overflow:"hidden"}} scrolling="no" frameBorder="0"   allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen={true}></iframe> */}
          {/* <iframe
            src={item.reelInfo.facebook_url}
            width="267"
            height="476"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          ></iframe> */}

          <div >
          <iframe 
            src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1293464835751742%2F&show_text=false&width=267&t=0&autoplay=1&muted=1"
            width="400"
            height="700"
            style={{border:"none",overflow:"hidden"}}
            scrolling="no"
            // muted={true}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen={true}>
          </iframe>
        </div>
        </div>
      ))}
    </div>
  );
};

export default Reels;

{/* <iframe src="" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe> */}

// 2338074426648300 -f 2338074426648300 b
// 4f058f3ccdea95995a9eeb031db15a7d password
// access token EAAFNpUMmJnwBPYqaZBtwoFGUYchZA97uo0ff2rLw6ZADfOfImUKD58iBeZAh3iMWec4ZAyPaIa5hR1t8NsieM9stWe1TcGE7r9a31kfgcMnbGzdc0y7KxJm72TZBt6wAK7QjgFuFuqBysPYjsLvDxJnFQARZBEsK0bR0BZAQokFEhtzeLVYk1IMAIEmQpnuTzxIPzW5ATjPtTVrZAJlNMTqBqdKHisQ3HgT9AZC9JPhesDqZAVG415VJ5vxPVoC68p0S8JjQOwVOZADLJUlJ67It

// access token final EAAhOd1ZBopuwBPaz9Ln63OJog7iUdD8g9MxwidzEG95TZArqdegUeBtYHSUIcEqmVbf2PhVA5ACEGU6fbiE4ZCxTNHqNoCq8pLc2LZCNKbR2PqUdt0q97asDktfC7hHWDjIe5bvO1cyEroNd5jm9nkqtzAMXkyMdRSZCU9oZAU13d0kFcjtcZC9NJRbZAhSjoei1QSZCE2tVkCAtzw2Cdtl5A1kDbNxPZAGIdpxSkcjAZDZD


//   "data": [
//     {
//       "access_token": "EAAhOd1ZBopuwBPQxe8K4jL8ZBUYSgjDXBPSNu0aOAA8ErL0YEdsSXBdc4PEFpKWDgLMETjwevQjuFQZCgDdqXZBQrlPscCoL2lNsZAfeIBNdMukvVr1RnGsiZAlVOvG5QQ11s9TMzv4Tt8gsX2kpPjuZA9Jgw8vcWfZC7cRZCE7ew4lFNOSo9ZBEl9tG7ggo7VIZACrmqG71AaYWHmoE47PxKoAy0uZAeuPkpKgNv2Wa0K4ZD",
//       "category": "Arts & entertainment",
//       "category_list": [
//         {
//           "id": "133436743388217",
//           "name": "Arts and entertainment"
//         }
//       ],
//       "name": "Kabbik - Audiobook & Podcast",
//       "id": "101354702457572",
//       "tasks": [
//         "MODERATE",
//         "MESSAGING",
//         "ANALYZE",
//         "ADVERTISE",
//         "CREATE_CONTENT"
//       ]
//     }
//   ],
//   "paging": {
//     "cursors": {
//       "before": "QVFIU2hVdDZA6VU45d3ZARXzBmOUNUbG9MV2F3bmlRMms0UzBIcEdvSXhLRTREeDgxV3dVaGJZAOW92VVd0WTI5VWd5ZAjAzX0hqYlBlcXowdlBQTnlrSWRPMmJB",
//       "after": "QVFIU2hVdDZA6VU45d3ZARXzBmOUNUbG9MV2F3bmlRMms0UzBIcEdvSXhLRTREeDgxV3dVaGJZAOW92VVd0WTI5VWd5ZAjAzX0hqYlBlcXowdlBQTnlrSWRPMmJB"
//     }
//   }
// }

// { long lived access token
//     "access_token": "EAAhOd1ZBopuwBPQkmOcB8LRckBCzUUxMa0USrNYoSanzR4iH4D30auzHlCi7xZCDY3ZCRvUppMpoUtONsuwzPPgFLBkHcKtjb6JwIIRWSVvwYVuJ4fnrJ7fneTZCfYoF2FvyoVHcItu0AM9JWpkilT4ZBqsBbuYGCZAVVkVRID9PzwEsOxDteyZB60wl00izgaPtM2BAZA4ZD",
//     "token_type": "bearer",
//     "expires_in": 5179048
// }