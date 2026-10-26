"use client";

import { useEffect, useState } from "react";
import CommonTabs from "../CommonTabs/CommonTabs.view";
import { RewardHistory, RewardHistoryList, TEarnedRewardRecord } from "./static/rewardPoint.type";
import { getUser_reward_profile, user_point_details } from "@/utils/apiServices";
import { useAppSelector } from "@/store/store";
import { convertToBanglaDigits, formatDateDDMMYY, formatDateToBengali, formatTimePlus6, formatToBengali } from "@/helpers/commonFunction";
import { RewardData } from "@/app/[lang]/profile/reward-point/reward-point.type";
import CircularStar from "@/svgs/CircularStar.svg";
import GiftIcon from "@/svgs/GiftIcon.svg";

export default function PointsPage() {
   const user=useAppSelector(store=>store.user.userData);
  const [userRewardData,setUserRewardData]=useState<RewardData|null>(null)

  const getUserRewardData=async()=>{
    let result = await getUser_reward_profile(user?.id??'')
    setUserRewardData(result?.data?.data)
  }
  useEffect(()=>{
    if(user?.id){
      getUserRewardData()
    }
  },[user?.id])

  return (
    <div className=" text-white z-[4] relative max-w-[800px] mx-auto px-5 py-10">
        {/* <div className="circular_gradient right-[0%] top-[0%] w-[40vh] h-[40vh] absolute  "></div> */}

      <div className="max-w-md relative z-[2] mx-auto text-center space-y-4">
        {/* <div className="reward_gradient rounded-[12px]">
            <h1 className="text-xl font-semibold">পয়েন্ট বিবরণী</h1>

          <div>
            <p className="text-sm text-gray-300">ব্যবহারযোগ্য পয়েন্ট</p>
            <h2 className="text-c3xl md:text-5xl font-extrabold tracking-wide py-2">{convertToBanglaDigits(userRewardData?.user_tier?.user_balance_point??0)}</h2>
            <p className="text-sm text-gray-400">শেষ আপডেটঃ {formatDateDDMMYY(new Date().toISOString())}</p>
          </div>
        </div> */}
        <div className=" reward_gradient py-2.5 rounded-[12px] mx-auto text-center text-white">
        {/* Main heading */}
        <h1 className="text-3xl md:text-cxl font-bold mb-6">
          ব্যবহারযোগ্য পয়েন্ট
        </h1>
        
        {/* Points display with star icon */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="">
            <span className="w-4 h-4 inline-block"><CircularStar/></span>
          </div>
          <span className="text-2xl md:text-cxl font-semibold">
            {convertToBanglaDigits(userRewardData?.user_tier?.user_balance_point??0)} পয়েন্ট
          </span>
        </div>
        
        {/* Date updated info */}
        <p className="text-sm md:text-base text-purple-200">
          (শেষ আপডেট: {formatDateToBengali(new Date().toISOString())})
        </p>
      </div>
        

        <div className="mt-6">
          <CommonTabs tabs={[
                {
                title: "অর্জিত",
                component: <EarnedPoints />,
                },
                {
                title: "ব্যবহৃত",
                component: <UsedPoints />,
                },
                // {
                // title: "মেয়াদোত্তীর্ণ",
                // component: <ExpiredPoints />,
                // },
            ]} />
        </div>
      </div>
    </div>
  );
}

/* Earned Points Tab */
function EarnedPoints() {
  const user=useAppSelector(store=>store.user.userData);
  const [earnedPoints,setEarnedPoints]=useState<TEarnedRewardRecord[]>([])

  const getEarnedPoints=async()=>{
    let result = await user_point_details(user?.id??'','earned')
    setEarnedPoints(result?.data?.data)
  }
  useEffect(()=>{
    if(user?.id){
      getEarnedPoints()
    }
  },[user?.id])
  return (
    <div className="relative w-full bg-[#172033] p-3 rounded-[12px]">
        {/* <div className="circular_gradient left-[0%] bottom-[0%] w-[30vh] h-[30vh] absolute  "></div> */}
          <div className="w-full z-[2] relative  text-left">
            {earnedPoints?.map((item,i)=>(
              <div key={item?.id} className="p-3 flex items-center rounded-[8px] w-full mb-2 bg-[#222F4D]">
                <span className="w-14 h-14 mr-2 inline-block"><GiftIcon/></span>
                <div key={i} className="">
                <h3 className="font-semibold text-cs2 md:text-lg text-white">{item?.ui_additional_info?.title}</h3>
                <div className="flex justify-between items-center mt-3">
                    <p className="text-gray-400 text-sm">{item?.ui_additional_info?.sub_title}</p>
                <span className="text-green-500 font-semibold text-sm">+ {convertToBanglaDigits(item?.point)} পয়েন্ট</span>
                </div>
                <span className="text-xs text-gray-500">{formatDateDDMMYY(item?.created_at)} { formatTimePlus6(item?.created_at)}</span>
            </div>
              </div>
            ))}

            {earnedPoints?.length?'':(
              <div className="mt-6 text-gray-400 text-sm text-center">
                <p>কোন পয়েন্ট ব্যবহার করা হয়নি</p>
              </div>
            )}

          </div>
    </div>
  );
}

/* Used Points Tab */
function UsedPoints() {
  const user=useAppSelector(store=>store.user.userData);
  const [usedPoints,setUsedPoints]=useState<RewardHistoryList[]>([])

  const getUsedPoints=async()=>{
    let result = await user_point_details(user?.id??'','used')
    setUsedPoints(result?.data?.data)
  }
  useEffect(()=>{
    if(user?.id){
      getUsedPoints()
    }
  },[user?.id])
  return (
    <div className="relative w-full bg-[#172033] p-3 rounded-[12px]">
        {/* <div className="circular_gradient left-[0%] bottom-[0%] w-[30vh] h-[30vh] absolute  "></div> */}
          <div className="w-full z-[2] relative  text-left">
            {usedPoints?.map((item:any,i)=>(
              <div key={item?.id} className="p-3 flex items-center rounded-[8px] w-full mb-2 bg-[#222F4D]">
                {/* <span className="w-14 h-14 mr-2 inline-block"><GiftIcon/></span> */}
                <div key={i} className="">
                <h3 className="font-semibold text-cs2 md:text-lg text-white">{item?.reward_title}</h3>
                <div className="flex justify-between items-center mt-3">
                    <p className="text-gray-400 text-sm">{item?.offer}</p>
                <span className="text-green-500 font-semibold text-sm">- {convertToBanglaDigits(item?.usage_point)} পয়েন্ট</span>
                </div>
                <span className="text-xs text-gray-500">{formatDateDDMMYY(item?.created_at)} { formatTimePlus6(item?.created_at)}</span>
            </div>
              </div>
            ))}

            {usedPoints?.length?'':(
              <div className="mt-0 text-gray-400 text-sm text-center">
                <p>কোন পয়েন্ট ব্যবহার করা হয়নি</p>
              </div>
            )}

          </div>
    </div>
    // <div className="relative">
    //     <div className="circular_gradient left-[0%] bottom-[0%] w-[30vh] h-[30vh] absolute  "></div>
    //       <div className="w-full z-[2] relative  text-left">
    //         {usedPoints?.map((item:any,i)=>(
    //           <div key={i} className="pt-5">
    //             <h3 className="font-semibold text-cs2 md:text-lg text-white">{item?.reward_title}</h3>
    //             <div className="flex justify-between items-center mt-3">
    //                 <p className="text-gray-400 text-sm mr-2">{item?.offer}</p>
    //             <span className="text-pink-400 font-semibold text-sm"> - {convertToBanglaDigits(item?.usage_point)} পয়েন্ট</span>
    //             </div>
    //             <span className="text-xs text-gray-500">{formatDateDDMMYY(item?.created_at)} { formatTimePlus6(item?.created_at)}</span>
    //         </div>
    //         ))}

    //         {usedPoints?.length?'':(
    //           <div className="mt-6 text-gray-400 text-sm text-center">
    //             <p>কোন পয়েন্ট ব্যবহার করা হয়নি</p>
    //           </div>
    //         )}

    //       </div>
    // </div>
  );
}

/* Expired Points Tab */
function ExpiredPoints() {
  return (
    <div className="mt-6 text-gray-400 text-sm text-center">
      <p>কোন পয়েন্টের মেয়াদ শেষ হয়নি</p>
    </div>
  );
}
