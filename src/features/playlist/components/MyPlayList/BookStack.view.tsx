import { PlaylistAudioBook } from "./static/myplaylist.type";

export default function BookStack({books}:{books:PlaylistAudioBook[]}) {
  // Dummy book data - replace these URLs with your actual book banner URLs
  
  return (
      <div className="w-full max-w-4xl">
  <div className="relative w-full" style={{ perspective: "1200px" }}>
    <div
      className="relative flex items-end justify-center"
      style={{ height: "clamp(90px, 16vw, 160px)" }}
    >
      {books?.slice(0,10).map((book, index) => {
        const stackOffset = index * -5;
        const rotateY = index * 1.4;
        const translateZ = -index * 18;
        const scale = 1 - index * 0.018;

        return (
          <div
            key={book.audiobook_id}
            className="absolute transition-all duration-300 hover:scale-105 hover:z-50 cursor-pointer"
            style={{
              left: `calc(50% + ${stackOffset}px)`,
              transform: `translateX(-50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
              transformStyle: "preserve-3d",
              zIndex: books.length - index,
              width: "clamp(55px, 9vw, 110px)",
              height: "clamp(75px, 13vw, 150px)",
            }}
          >
            <div
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-sm overflow-hidden shadow-xl"
                style={{ transform: "translateZ(7px)" }}
              >
                <img
                  loading="lazy"
                  src={book.thumb_path || book.banner_path}
                  alt={book.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Spine */}
              <div
                className="absolute top-0 right-0 h-full rounded-r-sm"
                style={{
                  width: "clamp(10px, 1.6vw, 16px)",
                  transform: "rotateY(90deg) translateX(50%)",
                  transformOrigin: "left center",
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0.45), rgba(0,0,0,0.2))",
                }}
              />

              {/* Back */}
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  transform: "translateZ(-7px) rotateY(180deg)",
                  background: "linear-gradient(135deg, #1b1b1b, #2a2a2a)",
                }}
              />

              {/* Top */}
              <div
                className="absolute top-0 left-0 w-full"
                style={{
                  height: "clamp(10px, 1.6vw, 16px)",
                  transform: "rotateX(90deg) translateY(-50%)",
                  transformOrigin: "top center",
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.1))",
                }}
              />

              {/* Bottom */}
              <div
                className="absolute bottom-0 left-0 w-full"
                style={{
                  height: "clamp(10px, 1.6vw, 16px)",
                  transform: "rotateX(-90deg) translateY(50%)",
                  transformOrigin: "bottom center",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.35), rgba(0,0,0,0.15))",
                }}
              />

              {/* Shadow */}
              <div
                className="absolute bottom-0 left-1/2 w-[90%] h-2 rounded-full blur-md opacity-25"
                style={{
                  transform:
                    "translateX(-50%) translateY(100%) translateZ(-45px)",
                  background:
                    "radial-gradient(ellipse, rgba(0,0,0,0.65), transparent)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>


  );
}