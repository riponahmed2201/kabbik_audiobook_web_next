'use client'
import { handleShare, handleShare2 } from "@/helpers/commonFunction";
import BootomTraingle from "@/svgs/BootomTraingle";
import Messenger from "@/svgs/Messenger.svg";
import ShareIcon from "@/svgs/ShareIcon.svg";
import { useState } from "react";

export default function CommentSection() {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = () => {
    if (commentText.trim()) {
      //console.log("Comment submitted:", commentText);
      setCommentText("");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6 text-white">
      {/* Header Row */}
      <div className="flex justify-between text-blue-400 items-center">
        <h2 className="flex items-center gap-2 text-xl md:text-2xl font-semibold">
          <span className="w-7 h-7 inline-block">
            <Messenger />
          </span>
          কমেন্টস <span className="text-blue-400">120</span>
        </h2>
        <div onClick={handleShare2} className="flex cursor-pointer items-center gap-2">
          <span className="font-semibold">শেয়ার</span>
          <span className="w-4 h-4 inline-block text-white">
            <ShareIcon />
          </span>
        </div>
      </div>

      {/* Input Box */}
      <div className="border border-gray-500 rounded-lg p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <img
            loading="lazy"
            src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/manPlaceholder.jpg"
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="কমেন্ট যোগ করুন"
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-gray-600 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-700 transition"
        >
          পোস্ট
        </button>
      </div>

      {/* Comments Count + View All */}
      <div className="flex justify-between items-center">
        <h3 className="text-base md:text-lg">120 কমেন্টস</h3>
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-sm">সবগুলো দেখুন</span>
          <span className="w-4 h-4 inline-block text-white">
            <BootomTraingle />
          </span>
        </div>
      </div>

      {/* Comment Item */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <img
            loading="lazy"
            src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/manPlaceholder.jpg"
            alt="Shokat Ali"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-medium">শওকত আলী</span>
            <span className="text-xs text-gray-400">ক্রিয়েটর · ২০ ঘণ্টা আগে</span>
          </div>
        </div>
        <p className="text-sm md:text-base leading-relaxed ml-14">
          কাব্বিকের অডিওবুক গুলো মন ছুঁয়ে যায়। রাতে ঘুমানোর আগে প্রায়ই শুনি “শওকত, রাজশাহী”
        </p>
      </div>
    </div>
  );
}
