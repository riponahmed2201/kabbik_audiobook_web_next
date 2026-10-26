'use client'
import { useAppSelector } from "@/store/store";
import GoldPosition from "@/svgs/GoldPosition.svg";
import SecondPosition from "@/svgs/SecondPosition.svg";
import ThirdPosition from "@/svgs/ThirdPosition.svg";
import { leaderboard_top_listners } from "@/utils/apiServices";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserStreamingStatList } from "./static/leaderboard.type";
import { Book, Clock, Crown, Play, TrendingUpIcon, Trophy } from "lucide-react";
import { siteConfig } from "@/config/config";
import TopThreeCrown from "@/svgs/TopThreeCrown.svg";
import Top2Crown from "@/svgs/TopThreeCrown.svg";
import Top1Crown from "@/svgs/Top1Crown";
import Top3Crown from "@/svgs/Top3Crown";
import Spinner from "@/components/ui/Spinner.view";
import { convertToBanglaDigits, decodeWord } from "@/helpers/commonFunction";

export default function Leaderboard() {
    const user= useAppSelector(store=>store?.user?.userData)
    const [leaderboardData,setLoaderboardData]=useState<UserStreamingStatList>([]);
    let getTopListners=async()=>{
        let result = await leaderboard_top_listners(user?.id??0);
        setLoaderboardData(result)
    }

    useEffect(()=>{
        getTopListners()
    },[])
  
    const getTopThree=():UserStreamingStatList=>{
        return leaderboardData?.slice(0,3)
    }

    useEffect(()=>{
        //console.log(leaderboardData,"leader")
    },[leaderboardData])

  return (
    leaderboardData?.length===0?<Spinner/>:(
        <div className="max-w-[340px] bg-slate-900 mx-auto">
        <div className=" p-3">
        <div className="max-w-xl mx-auto">
            
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
                <h1 className="text-white text-cs2 font-medium">শেষ ৩০ দিনের শীর্ষ শ্রোতারা</h1>
                {/* <p className="text-gray-500 text-xs">October 2025 ranking</p> */}
            </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-800 mb-6"></div>

            {/* Top 3 Podium */}
            <div className="flex mt-20 items-end justify-center gap-2.5">
            
            {/* 2nd */}
            <div className="flex flex-col items-center">
                <div className="relative mt-1 mb-2">
                <span className="absolute w-12 h-12 left-[15px] top-[-38px]"><Top2Crown color="#C7CCD3"/></span>
                <img
                    loading="lazy"
                    src={siteConfig?.defaultProfilePic}
                    alt="Second"
                    className="w-20 z-[3] relative h-20 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-7 h-7 top_2_bg rounded-full flex z-[4] items-center justify-center text-white font-medium text-sm">
                    ২
                </div>
                </div>
                <h3 className="text-white line-clamp-1 max-w-[100px] font-medium text-cs2 mb-2">
                {decodeWord(leaderboardData?.[1]?.full_name || "Kabbik User")}
                </h3>
                <div className="top_2_bg rounded-b-none rounded-xl px-2 py-2 w-24 space-y-1">
                <div className="flex items-center gap-1 text-white text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{convertToBanglaDigits(Math.floor(getTopThree()?.[1]?.total_streaming_time))}ঘন্টা</span>
                </div>
                {/* <div className="flex items-center gap-1 text-white text-xs">
                    <Book className="w-3 h-3" /> 
                    <span>৪২ Books</span>
                </div> */}
                </div>
            </div>

            {/* 1st */}
            <div className="flex relative top-[-40px] flex-col items-center -mt-8">
                <div className="relative mt-1 mb-2">
                    <span className="absolute w-12 h-12 left-[15px] top-[-38px]"><Top1Crown /></span>
                <img
                    loading="lazy"
                    src={siteConfig?.defaultProfilePic}
                    alt="First"
                    className="w-20 z-[1] relative h-20 rounded-full object-cover"
                />
                <div className="absolute z-[2] bottom-0 right-0 w-9 h-9 top_1_bg rounded-full flex items-center justify-center text-white font-medium text-cs2">
                    ১ 
                </div>
                </div>
                <h3 className="text-white line-clamp-1 max-w-[100px] font-medium text-cs2 mb-2">
                {getTopThree()?.[0]?.full_name ??"Kabbik User"}
                </h3>
                <div className="top_1_bg rounded-b-none rounded-xl px-2 py-2 w-24 space-y-1">
                <div className="flex items-center gap-1 text-white text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{convertToBanglaDigits(Math.floor(getTopThree()?.[0]?.total_streaming_time))} ঘন্টা </span>
                </div>
                {/* <div className="flex items-center gap-1 text-white text-xs">
                    <Book className="w-3 h-3" />
                    <span>৪২ বই</span>
                </div> */}
                </div>
            </div>

            {/* 3rd */}
            <div className="flex flex-col items-center">
                <div className="relative mt-1 mb-2">
                <span className="absolute w-12 h-12 left-[15px] top-[-38px]"><Top3Crown /></span>
                <img
                    loading="lazy"
                    src={siteConfig.defaultProfilePic}
                    alt="Third"
                    className="w-20 z-[1] relative h-20 rounded-full object-cover"
                />
                <div className="absolute z-[2] bottom-0 right-0 w-7 h-7 top_3_bg rounded-full flex items-center justify-center text-white font-medium text-sm">
                    ৩ 
                </div>
                </div>
                <h3 className="text-white line-clamp-1 max-w-[100px] font-medium text-cs2 mb-2">{getTopThree()?.[2]?.full_name ??"Kabbik User"}</h3>
                <div className="top_3_bg rounded-b-none rounded-xl px-2 py-2 w-24 space-y-1">
                <div className="flex items-center gap-1 text-white text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{convertToBanglaDigits(Math.floor(getTopThree()?.[2]?.total_streaming_time))} ঘন্টা</span>
                </div>
                {/* <div className="flex items-center gap-1 text-white text-xs">
                    <Book className="w-3 h-3" />
                    <span>৪২ বই </span>
                </div> */}
                </div>
            </div>

            </div>
        </div>
        </div>
        <div className="leader_board_gradient p-3 max-w-[320px] rounded-[12px] mx-auto  ">
      <div className=" mx-auto space-y-2">
        {leaderboardData.slice(3,)?.map((user,index) => (
          <div
            key={index+4}
            className={`${index===12?"bg-[#d9037949] ":"bg-slate-800/50"}  backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 hover:bg-slate-800/70 transition-all`}
          >
            {/* Rank */}
            <div className={"text-gray-400 font-medium text-sm w-8"}>
              #{convertToBanglaDigits(index+4)}
            </div>

            {/* Avatar */}
            {/* <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-sm text-white font-medium flex-shrink-0">
              {user?.full_name}
            </div> */}

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-normal text-cs mb-0.5 line-clamp-1 max-w-[100px]">
                {user?.full_name ||"Kabbik User"}
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400 text-xs">র‍্যাঙ্কিং {convertToBanglaDigits(user?.ranking)}</span>
                {/* <span className={`${user.badgeColor} text-white text-xs px-2 py-0.5 rounded-full font-medium`}>
                  {user.badge}
                </span> */}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              {/* <div className="text-center">
                <div className="text-white font-medium text-sm">{convertToBanglaDigits(43)}</div>
                <div className="text-gray-400 text-xs">বই</div>
              </div> */}
              <div className="text-center">
                <div className="text-white font-medium text-sm">{convertToBanglaDigits(Math.floor(user?.total_streaming_time))}</div>
                <div className="text-gray-400 text-xs">ঘন্টা</div>
              </div>
            </div>

            {/* Trend */}
            <div className="ml-1">
              {/* <TrendingUpIcon trend={} /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    )
  );
}

{/* <div>
        <div className='h-[100px] mt-[-100px] z-[2] relative bg-[#0E1D3F]'/>
        <div className='relative '>
            <div 
            className="absolute -left-0  -top-10 w-full h-full"
            style={{
                backgroundImage: "url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/841c74b887fcb91272e2a8c11695512fb2025197%20(1)%20(1).png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "full",
                height: "127px",
                opacity: 0.3
            }}
            />
            <h3 className='text-white mt-0 pt-8 text-cs22 md:text-clg2 font-medium text-center'>এই মাসের শীর্ষ অডিওবুক শ্রোতারা</h3>
        </div>
        <div className="circular_gradient right-[-10%]  top-[0%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        <div className=" flex flex-col  items-center justify-center px-4 pb-3 md:pb-6">
            <div className="circular_gradient_bluish right-[10%]  bottom-[0%] w-[85vw] h-[25vw] absolute rounded-[50%] "></div>
            <div className="flex z-[2] relative flex-row items-end justify-center gap-3 xs:gap-6 sm:gap-12">
                {leaderboardData?.slice(0,3).map((p, i) => (
                <div
                    key={i}
                    className={`flex flex-col items-center text-white ${
                    p?.ranking === 1 ? "order-2 sm:order-2 mt-[-100px] " : p?.ranking === 2 ? "order-1 sm:order-1 mt-[100px]" : "order-3 mt-[100px] sm:order-3"
                    }`}
                >
                    <div
                    className={`relative flex items-center justify-center   rounded-full bg-gradient-to-tr  shadow-xl`}
                    >
                    {p?.ranking === 1 && (
                        <div className=" w-24 xs:w-24 sm:w-24 md:w-44 lg:w-56">
                        <GoldPosition/>
                        </div>
                    )}
                    {p?.ranking === 2 && (
                        <div className=" w-24 xs:w-24 sm:w-24 md:w-44 lg:w-56">
                        <SecondPosition/>
                        </div>
                    )}
                    {p?.ranking === 3 && (
                        <div className=" w-24 xs:w-24 sm:w-24 md:w-44 lg:w-56">
                        <ThirdPosition/>
                        </div>
                    )}
                    </div>

                    <h2 className="mt-4 text-cs text-center xs:text-cs2 md:text-cs22 lg:text-cs22 font-normal xs:font-medium">{p?.full_name||'User'}</h2>

                    <div className="mt-3 btn-gradient-2 rounded-[8px] px-4 py-2 text-center text-sm sm:text-cs2">
                    <div className="flex justify-between gap-6">
                        <div>
                        <p className="font-medium text-pink-300">ঘন্টা</p>
                        <p>{Math.floor(p?.total_streaming_time)}</p>
                        </div>
                        
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <div className=" text-white z-[2] relative flex flex-col items-center py-10 px-4">
            <div className="circular_gradient left-[-10%]  top-[10%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
            <div className="w-full max-w-5xl btn_gradient_3 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-black/20 text-cs md:text-cs2 font-medium border-b border-white/20">
                        <tr>
                            <th className="py-4">অবস্থান</th>
                            <th className="py-4 text-left pl-8">প্রোফাইল নাম</th>
                            <th className="py-4">ঘন্টা</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData?.slice(3,14).map((user, index) => (
                            <tr
                            key={index}
                            className="border-b text-cs md:text-cs2 border-white/10 hover:bg-white/10 transition"
                            >
                                <td className="py-3 text-pink-300 font-medium">#{index+3ing}</td>
                                <td className="py-3 flex items-center space-x-3 justify-start pl-8">
                               
                                <span className="font-medium text-white">{user.full_name||'User'}</span>
                                </td>
                                <td className="py-3">{Math.floor(user.total_streaming_time)}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                <div className="mt-3 font-medium text-cs2 md:text-clg"><h2>Your Current position is {leaderboardData?.find((item)=>item?.user_id===(user?.id?.toString() || ''))?.ranking}</h2></div>
        </div>
    </div> */}

    [
        {"title": "বিজ্ঞাপন ছাড়াই অডিওবুক উপভোগ করুন"},
         {"title": "অডিওবুক ডাউনলোড করে অফলাইনে শুনুন"},
         {"title": "সবার আগে উপভোগ করুন এক্সক্লুসিভ অডিওবুক"},
         {"title": "কাব্যিক রেফার করুন, নগদ উপার্জন করুন"},
         {"title": "গল্প শুনে রিওয়ার্ড জমান, আর পুরস্কার জিতুন"}
    ]