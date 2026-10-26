"use client";

import { useState } from "react";
import CommonButton from "../ui/button";
import Spinner from "../ui/Spinner.view";

const RobiNumberInput = ({
  onSubmit,
}: {
  onSubmit: (number: string) => void;
}) => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false);

  const handleSubmit = async() => {
    if (!/^01[8|6]\d{8}$/.test(number)) {
      setError("দয়া করে সঠিক রবি নাম্বার দিন (018 বা 016 দিয়ে শুরু)");
      return;
    }
    setLoading(true);
    setError("");
    await onSubmit(number);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-2xl shadow-lg bg-gradient-to-br from-[#e52b2d] to-[#ff7043] text-white">
      <h2 className="text-xl font-semibold mb-4 mt-4 text-center">
        সাবস্ক্রিপশনে ব্যবহৃত রবি নাম্বার দিন
      </h2>
      <div className="space-y-3">
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="উদাহরণ: 018XXXXXXXX"
          className="w-full px-4 py-2 rounded-[4px] border border-white/30 text-black focus:ring-2 focus:ring-white outline-none placeholder-gray-400"
        />
        {error && (
          <p className="text-cs text-yellow-400 rounded mt-0">
             {error}
          </p>
        )}
        <CommonButton
          handleClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 bg-white text-[#e52b2d] hover:bg-gray-100 font-bold text-base rounded-[4px] transition-all duration-200"
        >
            {loading?<Spinner size="w-3 h-3"/>:''}
          সাবমিট করুন
        </CommonButton>
      </div>
    </div>
  );
};

export default RobiNumberInput;
