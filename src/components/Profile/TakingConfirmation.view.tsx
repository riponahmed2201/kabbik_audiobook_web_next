"use client";

import { useState } from "react";
import CommonButton from "../ui/button";
import Spinner from "../ui/Spinner.view";

interface CancelSubscriptionModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const CancelSubscriptionModal = ({
  onConfirm,
  onCancel,
}: CancelSubscriptionModalProps) => {
    const [loading,setIsLoading]=useState(false);


    const handleSubmit=async()=>{
        setIsLoading(true)
        await onConfirm();
        setIsLoading(false);
        onCancel()
    }
  return (
    <div className="w-full max-w-sm mx-auto p-6 rounded-2xl shadow-xl profile_btn_gradients text-white">
      <h2 className="text-xl font-semibold text-center mb-3">
        সাবস্ক্রিপশন বাতিল করবেন?
      </h2>

      <p className="text-center text-sm mb-6 opacity-90 leading-relaxed">
        সাবস্ক্রিপশন বাতিল করলে আপনি প্রিমিয়াম কনটেন্ট ও ফিচার আর ব্যবহার করতে পারবেন না।
      </p>

      <div className="flex justify-center gap-4">
        <CommonButton
          handleClick={onCancel}
          className="bg-white  text-green-700 hover:bg-green-700 hover:text-white px-7 py-1.5 rounded-[4px] font-semibold transition-all duration-200"
        >
          বাতিল
        </CommonButton>

        <CommonButton
          handleClick={handleSubmit}
          disabled={loading}
          className="bg-white text-[#e52b2d] hover:bg-red-400 hover:text-gray-100 px-2 py-1.5 rounded-[4px] font-semibold transition-all duration-200"
        >
            {loading?<Spinner size="w-3 h-3" />:''}
          নিশ্চিত করুন
        </CommonButton>
      </div>
    </div>
  );
};

export default CancelSubscriptionModal;
