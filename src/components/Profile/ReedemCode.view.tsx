"use client";

import { useState } from "react";
import CommonButton from "../ui/button";
import Spinner from "../ui/Spinner.view";
import { redeemCodePostApi } from "@/utils/apiServices";
import GiftIcon from "@/svgs/Gift.svg";

const ReedemCodeActivate = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const [redeem, setRedeem] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading]=useState(false);

  const handleSubmit = async() => {
    if (redeem.trim().length<3) {
      setError("দয়া করে সঠিক রিডিম কোড দিন");
      return;
    }
    setLoading(true);
    setError("");
    const redeemData = await redeemCodePostApi(redeem);
    window.location.replace("/profile");
    setLoading(false);
    onClose();
  };

  return (
    <div className=" bg-slate-900 flex items-center justify-center p-8">
      <div className="max-w-xl w-full bg-slate-900">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12  flex items-center justify-center">
              <GiftIcon   />
            </div>
            <div>
              <h1 className="text-white text-cn2 font-semibold">রিডিম করুন আপনার কোড</h1>
              <p className="text-slate-400 text-sm">আপনার উপহার কোড লিখুন</p>
            </div>
          </div>
        </div>

        {/* Input Field */}
        <div className="mb-6">
          <label className="text-white text-sm mb-2 block">
            রিডিম কোড <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={redeem}
            onChange={(e) => setRedeem(e.target.value)}
            placeholder="উদাহরণ: ABCED"
            className="w-full bg-slate-800 border border-slate-700 rounded-[6px] px-4 py-2 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-slate-600 text-sm"
          />
        </div>

        {/* Redeem Button */}
        <button disabled={loading} onClick={handleSubmit} className="w-full btn_gradient_new text-white font-medium py-2 rounded-[6px] transition-all mb-8 text-cn">
          {loading?<Spinner size="w-3 h-3" />:''}
          রিডিম কোড
        </button>

        

        {/* How to get codes */}
        <div>
          <h2 className="text-white text-base font-semibold mb-3">কোড কীভাবে পাবেন?</h2>
          <ul className="space-y-2">
            <li className="text-slate-300 text-sm flex items-start">
              <span className="mr-2 mt-1.5 w-1 h-1 bg-slate-300 rounded-full flex-shrink-0"></span>
              <span>রিডিম কোডের জন্য আমাদের সোশ্যাল মিডিয়ায় অনুসরণ করুন</span>
            </li>
            <li className="text-slate-300 text-sm flex items-start">
              <span className="mr-2 mt-1.5 w-1 h-1 bg-slate-300 rounded-full flex-shrink-0"></span>
              <span>প্রোমোশনাল কোডের জন্য আপনার ইমেইল চেক করুন</span>
            </li>
            {/* <li className="text-slate-300 text-sm flex items-start">
              <span className="mr-2 mt-1.5 w-1 h-1 bg-slate-300 rounded-full flex-shrink-0"></span>
              <span>Check your email for seasonal promotions</span>
            </li>
            <li className="text-slate-300 text-sm flex items-start">
              <span className="mr-2 mt-1.5 w-1 h-1 bg-slate-300 rounded-full flex-shrink-0"></span>
              <span>Complete challenges to unlock special codes</span>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReedemCodeActivate;
{/* <div className="w-full max-w-sm mx-auto p-6 rounded-2xl shadow-lg profile_btn_gradients text-white">
      <h2 className="text-xl font-medium mb-4 mt-4 text-center">
        সাবস্ক্রিপশন একটিভ করতে নিচে আপনার রিডিম কোড ব্যবহার করুন
      </h2>
      <div className="space-y-3">
        <input
          type="text"
          value={redeem}
          onChange={(e) => setRedeem(e.target.value)}
          placeholder="উদাহরণ: ABCED"
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
          className="w-full py-2 bg-[#38EF7D] text-white hover:bg-green-600/90 font-semibold text-base rounded-[4px] transition-all duration-200"
        >
            {loading?<Spinner size="w-3 h-3"/>:''}
          সাবমিট করুন
        </CommonButton>
      </div>
    </div> */}