import Message from '@/svgs/Message.svg'
import React from 'react'

const CollectRewardModal = ({
  onSubmit,
  onClose
}:{
  onSubmit:()=>void;
  onClose:()=>void
}) => {
  return (
    <div>
        <div className=" flex rounded-[8px] flex-col items-center justify-center bg-white px-4 py-6">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-[#0B1537] text-center mb-6">
        আপনি কি এই রিওয়ার্ডটি সংগ্রহ করতে চান?
      </h1>

      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#162751] flex items-center justify-center shadow-md mb-10">
        <Message/>
      </div>

      {/* Description */}
      <p className="text-sm text-[#0B1537] text-center mb-8">
        পয়েন্ট ব্যবহার করে রিওয়ার্ডটি সংগ্রহ করতে<br />“হ্যাঁ” ট্যাপ করুন
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button onClick={()=>onClose()} className="px-8 py-2 border-2 border-[#0B1537] text-[#0B1537] font-medium rounded-full">
          না
        </button>
        <button onClick={onSubmit} className="px-8 py-2 bg-[#FBD9D7] text-[#0B1537] font-medium rounded-full">
          হ্যাঁ
        </button>
      </div>
    </div>
    </div>
  )
}

export default CollectRewardModal