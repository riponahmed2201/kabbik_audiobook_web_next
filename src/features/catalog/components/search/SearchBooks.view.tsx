"use client";

import CommonModal from "@/shared/ui/CommonModal/CommonModal.view";
import Categories from "./Categories.view";
import { useState } from "react";
import AudioIcon from "@/svgs/audioIcon.svg";
import { Search } from "lucide-react";
import { postSearch } from "@/utils/apiServices";
import { container } from "@/shared/ui/static/tailwind.classes";
import { AudiobookCard } from "@/features/catalog/components/CategoryWiseBooks/AudioBookCard.view";
import { TBooks } from "@/pageTypes/home.types";
import { useAppSelector } from "@/store/store";
import { Ads } from "@/features/entertainment/components/Ads/Ads";
import { InFeedAds } from "@/features/entertainment/components/Ads/InFeedAdd";

export default function SearchBooks() {
  const [showCategories, setShowCategories] = useState(false);
  const user = useAppSelector((store) => store?.user?.userData);
  const [searchText, setSearchText] = useState("");
  const [noDataFound, setNoDataFound] = useState("");
  const [books, setBooks] = useState<TBooks[]>([]);

  const runSearch = async () => {
    const result = await postSearch(searchText);
    setBooks(result?.data ?? []);
    if (!result?.data?.length) {
      setNoDataFound("কোন বই পাওয়া যায় নি");
    } else {
      setNoDataFound("");
    }
  };

  const submitSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await runSearch();
    }
  };

  return (
    <div>
      <div className="z-[0] relative flex items-center justify-center px-2 py-4">
        <div className="w-[99%] mx-auto max-w-[279px] flex flex-col items-center">
          <div className="flex h-[77px] pb-[15px] items-start justify-center mb-2 sm:mb-0">
            <AudioIcon />
          </div>
          <div className="flex flex-col items-center gap-3 sm:gap-[15px] w-full">
            <div className="flex flex-col items-center gap-1 sm:gap-[7px] w-full">
              <div className="text-center px-2">
                <span className="text-white/90 text-base sm:text-lg md:text-[15px] font-normal leading-relaxed">
                  সার্চ অডিওবুকস
                </span>
              </div>
              <div className="text-center px-2">
                <span className="text-[#A0A0A0] text-xs sm:text-sm md:text-[13px] font-normal leading-normal">
                  বই খুঁজুন
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 sm:gap-[15px] w-full max-w-[300px] px-2">
              <div className="flex items-center w-full border border-gray-400 rounded-[4px] pl-2 sm:pl-2.5">
                <div className="flex items-center w-full">
                  <div className="flex-1 ml-1 sm:ml-2">
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={submitSearch}
                      placeholder="সার্চ অডিওবুকস"
                      className="w-full z-30 bg-transparent text-[#A0A0A0] text-xs sm:text-[12px] font-normal placeholder-[#A0A0A0] border-none outline-none"
                    />
                  </div>
                  <span
                    className="cursor-pointer flex border border-gray-400 py-1.5 px-2 rounded-[4px] items-center text-gray-300"
                    onClick={() => void runSearch()}
                  >
                    <Search size={"20"} className="text-muted2" />
                    খুঁজুন
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCategories(true)}
                className="w-full max-w-[182px] h-[25px] sm:h-[30px] bg-white rounded-full flex items-center justify-center px-2 sm:px-3 hover:bg-gray-100 transition-colors"
              >
                <span className="text-[#121212] text-xs sm:text-[12px] font-normal">
                  ব্রাউজ ক্যাটাগরিস
                </span>
              </button>
            </div>
            {noDataFound ? (
              <h3 className="text-red-400 text-cn mt-12 text-center">
                {noDataFound}
              </h3>
            ) : (
              ""
            )}
          </div>
        </div>
        <CommonModal
          isOpen={showCategories}
          onClose={() => setShowCategories(false)}
        >
          <Categories />
        </CommonModal>
      </div>
      <div className={`${container("1300px")} relative`}>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {books?.map((audiobook) => (
            <AudiobookCard
              key={audiobook.id}
              category={""}
              audiobook={audiobook}
              className="max-w-sm mx-auto"
            />
          ))}
        </div>
      </div>
      {user?.is_subscribed !== 1 && <Ads slotId={2599736159} />}
      {user?.is_subscribed !== 1 && (
        <InFeedAds slotId={9666912192} layoutKey="-6t+ed+2i-1n-4w" />
      )}
    </div>
  );
}
