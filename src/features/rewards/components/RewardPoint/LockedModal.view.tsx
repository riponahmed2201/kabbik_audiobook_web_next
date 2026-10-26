import Reward from '@/svgs/Reward.svg'
import React from 'react'

const LockedModal = () => {
  return (
    <div>
        <div className=" flex py-5 rounded-[8px] flex-col items-center justify-center bg-white text-[#0F1633] px-4">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-8 text-center">
        রিওয়ার্ডের বিস্তারিত
      </h1>

      {/* Icon Circle */}
      <div className="relative flex items-center justify-center w-20 h-20 rounded-full  mb-8">
          <Reward/>
        
      </div>

      {/* Description */}
      <p className="text-center text-sm pb-8 font-medium leading-relaxed max-w-xs">
        আপনি এখনও এই পুরষ্কার স্তরটি আনলক করেননি। আনলক করতে, কাব্যিক ব্যবহার চালিয়ে যান
      </p>
    </div>
    </div>
  )
}

export default LockedModal