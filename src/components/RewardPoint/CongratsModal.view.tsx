import Smile from '@/svgs/Smile.svg'
import React from 'react'

const CongratsModal = ({message,submit}:{message:string,submit:()=>void}) => {
  return (
    <div>
        <div className="bg-white rounded-[8px] py-5 flex flex-col justify-center items-center bg-gradient-to-b from-white to-pink-50 px-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">অভিনন্দন!</h1>

        {/* Smiley Icon */}
        <div className="w-28 h-28 flex justify-center items-center rounded-full border-2 border-pink-300 mb-6">
            <Smile/>
        </div>

        {/* Message */}
        <p className="text-center text-gray-700 text-lg mb-8">
            {message}
        </p>

        {/* Button */}
        <button
            type="button"
            onClick={submit}
            className="bg_pink_gray text-[#AD4142] text-lg font-semibold py-2 px-10 rounded-full shadow-md hover:opacity-90 transition"
        >
            সম্পন্ন
        </button>
        </div>
    </div>
  )
}

export default CongratsModal