import React from "react";
import { TAudioBookDetails } from "./static/audiobook.type";
import Crown from "@/svgs/Crown.svg";
import LockIcon from "@/svgs/LockIcon.svg";
import FreeIcon from "@/svgs/FreeIcon.svg";

const EpisodeList = ({
  book,
  hasAccess,
}: {
  book: TAudioBookDetails;
  hasAccess: (id: number) => boolean;
}) => {
  return (
    <div>
      <div className="space-y-2.5 tiny_scroll_bar2 max-h-[61vh] overflow-y-auto pr-2">
        {book?.episodes?.map((episode, i) => (
          <div
            key={episode.id}
            className="bg-white border border-gray-300 rounded-[6px] p-2 py-1"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 md:w-6 md:h-6">
                    {episode?.isfree ? <FreeIcon /> : <Crown />}
                  </div>
                </div>
                <h3 className="text-cs2 md:text-cn text-black font-normal min-w-0 leading-tight">
                  {episode?.name}
                </h3>
              </div>
              <div className="flex-shrink-0">
                <div className="w-4 h-4 md:w-6 md:h-6">
                  {hasAccess(i) ? (
                    <span className="text-cs text-gray-500">—</span>
                  ) : (
                    <LockIcon />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;
