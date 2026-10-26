'use client'
import { RewardData, TTopCardProps } from '@/app/[lang]/profile/reward-point/reward-point.type'
import { convertToBanglaDigits } from '@/helpers/commonFunction'
import { store, useAppSelector } from '@/store/store'
import { LockIcon } from 'lucide-react'
import React from 'react'

const TopPointCard = ({data}:{data:TTopCardProps|null}) => {
  const user=useAppSelector(store=>store.user?.userData);

  const getPercentageOfBar=()=>{
    let result= 100*(
            ((data?.user_acquired_point||0) -(data?.min_point||0))/
            ((data?.max_point||0) -(data?.min_point||0))
          )
    
    return Math.floor(result)??0;
  }

  const isLocked=()=>{
    if((data?.user_acquired_point??0)<(data?.min_point??0)){
      return true
    }else {
      return false;
    }
  }
  return (
    <div>
      {isLocked()?(
        <div
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: "background: linear-gradient(98.51deg, #162751 0%, #985A8D 100%)",
          }}
        >
          {/* Overlay blur to show locked effect */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10 flex flex-col justify-center items-center text-white">
            <LockIcon className='w-16 h-16 inline-block py-3'/>
            <p className="text-center font-medium text-sm md:text-base">
              এই স্তরটি আনলক করতে আপনাকে অন্তত{" "}
              <span className="font-semibold text-pink-400">
                {convertToBanglaDigits(data?.min_point??1)} পয়েন্ট
              </span>{" "}
              অর্জন করতে হবে।
            </p>
          </div>

          {/* Base content (dimmed) */}
          <div className="opacity-30 pointer-events-none">
            <div className="flex justify-between mb-6">
              <p className="font-medium text-cn2 md:text-clg">{user?.full_name}</p>
              <p className="font-semibold text-cn2 md:text-clg2">
                {convertToBanglaDigits(data?.user_balance_point ?? 0)} পয়েন্ট
              </p>
            </div>

            <p className="text-cs2 md:text-cn2 mb-2">{data?.tier_name}</p>

            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                style={{ width: `${getPercentageOfBar()}%` }}
                className="h-2 bg-white/90"
              />
            </div>

            <p className="text-cs md:text-cn mt-2 opacity-90">
              পয়েন্ট ব্যবহার করলে লেভেলের অগ্রগতির উপর কোনো প্রভাব পড়বে না
            </p>
          </div>
        </div>

      ):(
        <div
        className="rounded-2xl p-6"
        style={{
            background:
            "linear-gradient(150.34deg, #162751 22.16%, #985A8D 64.47%)",
        }}
        >
          <div className="flex justify-between mb-6">
              <p className="font-medium text:cn2 md:text-clg">{user?.full_name}</p>
              <p className="font-semibold text-cn2 md:text-clg2">{convertToBanglaDigits(data?.user_balance_point??0)} পয়েন্ট</p>
          </div>
          {/* Progress bar */}
          <p className="text-cs2 md:text-cn2 mb-2">{data?.tier_name}</p>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          {/* {//console.log(`h-2 bg-white/90 w-[${getPercentageOfBar()}%]`)} */}
              <div 
                style={{ 
                  width: `${getPercentageOfBar()}%`,
                  backgroundColor:getPercentageOfBar()>=100? '#16a34a':'rgb(255 255 255 / 0.9)' 
                }}  
                className={`h-2  `} 
              />
          </div>
          <p className="text-cs md:text-cn mt-2 opacity-90">
              পয়েন্ট ব্যবহার করলে লেভেলের অগ্রগতির উপর কোনো প্রভাব পড়বে না
          </p>
      </div>
      )}
    </div>
  )
}

export default TopPointCard