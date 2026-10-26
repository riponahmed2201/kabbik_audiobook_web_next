"use client";

import { useState } from "react";
import Spinner from "../ui/Spinner.view";

export default function GPNumberModal(
    {value,setValue,handleSubmit}:
    {value:string,setValue:(val:string)=>void,handleSubmit:()=>void}
) {
  const [loading, setLoading] = useState(false);

  const handleNext = async() => {
    if (value.trim()) {
        setLoading(true)
        //   alert(`GP Number submitted: ${value}`);
        await handleSubmit();
        setLoading(false);
        // setValue()
    }
  };

  return (
    <div className="flex items-center justify-center py-6 mt-0">
      <div
        className="relative w-72 rounded-2xl px-6 pt-6 pb-5 shadow-2xl"
        style={{ background: "#1a2235" }}
      >
        {/* Title */}
        <h2
          className="text-white text-xl font-bold mb-5 leading-snug tracking-tight"
          style={{ fontFamily: "'Segoe UI', sans-serif" }}
        >
          আপনার জিপি নম্বর লিখুন
        </h2>

        {/* Input */}
        <input
          type="text"
          placeholder="Type a number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-[4px] px-4 py-3 text-sm text-gray-300 placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          style={{
            background: "#111827",
            border: "1px solid #2d3a4f",
            fontFamily: "'Segoe UI', sans-serif",
          }}
        />

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="mt-4 w-full rounded-xl py-2 text-white font-bold text-base tracking-wide transition-all duration-200 hover:brightness-110 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #00bcd4, #0288d1)",
            fontFamily: "'Segoe UI', sans-serif",
            boxShadow: "0 4px 20px rgba(0, 188, 212, 0.3)",
          }}
        >
            {loading?<Spinner size="w-3 h-3 mr-1"/>:''}
          সাবমিট 
        </button>
      </div>
    </div>
  );
}