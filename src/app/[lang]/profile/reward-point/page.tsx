'use client'
import RewrdItems from '@/components/RewardPoint/RewrdItems.view'
import TopPointCard from '@/components/RewardPoint/TopPointCard.view'
// import { container } from '@/components/ui/static/tailwind.classes'
// import { setUser } from '@/store/slicers/userSlice'
import { useAppSelector } from '@/store/store'
import { getUser_reward_profile } from '@/utils/apiServices'
import React, { useEffect, useState } from 'react'
import {  RewardData } from './reward-point.type'
import { useRouter } from 'next/navigation'
import { decodeWord } from '@/helpers/commonFunction'
import Link from 'next/link'
import { container } from '@/components/ui/static/tailwind.classes'

const Page = () => {
    const router=useRouter();
    const [userRewardData,setUserRewardData]=useState<RewardData|null>(null);
    const user=useAppSelector(store=>store?.user?.userData)

    const getUserRewardData=async()=>{
        const result = await getUser_reward_profile(user?.id??'')
        setUserRewardData(result?.data?.data);
    }

    useEffect(()=>{
        if(user?.id){
            getUserRewardData();
        }
    },[user?.id])

    const reward=userRewardData?.featureList.find((item)=>item?.type_reward==='reward')

    const setNewPoint=()=>{
       getUserRewardData()
    }

    if (!user?.id || user?.id===2820) {
        return null; // hide page until user loads
    }
  return (
    <div>
        <div className='h-[100px] mt-[-100px] z-[2] relative bg-[#0E1D3F]'/>
        <div className='relative '>
            <div 
            className="absolute -left-0 -top-10 w-full h-full"
            style={{
                backgroundImage: "url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/841c74b887fcb91272e2a8c11695512fb2025197%20(1)%20(1).png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "full",
                height: "127px",
                opacity: 0.3
            }}
            />
        </div>
        <h3 className={'text-white mt-0 px-4 pt-8 text-clg2 font-semibold text-center'}>কাব্যিক রিওয়ার্ডস</h3>
        <div  className={` md2:flex justify-between relative mx-auto ${container('1306px')}`}>
            {/* <div className="circular_gradient right-[30%] bottom-[-10%] w-[30vw] h-[30vw] absolute  "></div>
            <div className="circular_gradient left-[25%] top-[10%] w-[30vw] h-[30vw] absolute  "></div> */}
                    
            <div>
                <h2 className={`max-w-[520px] mx-auto mt-8 text-clg2 font-bold text-[#D90377]`}> রিওয়ার্ডস প্রোগ্রেস</h2>
                <div className="z-[4]  relative  flex items-center justify-center  py-5 rounded-[8px] mb-8 mt-4 text-white">
                <div className="w-full  max-w-lg space-y-5">
                    {/* --- Top Card --- */}
                    <div className=''>
                        <TopPointCard
                            data={{
                                full_name: user?.full_name??'' ,
                                user_balance_point: userRewardData?.user_tier?.user_balance_point??0 ,
                                min_point:userRewardData?.user_tier?.min_point??0  ,
                                user_acquired_point:userRewardData?.user_tier?.user_acquired_point??0  ,
                                max_point: userRewardData?.user_tier?.max_point??0 ,
                                tier_name: userRewardData?.user_tier?.name??'',
                            }}
                        />
                    </div>

                    {/* --- Bottom Card --- */}
                    <div
                        className="bg-[#172033] space-y-3 py-3 rounded-[12px]"
                
                    >
                        <div className="flex justify-between px-4 items-center my-4">
                            <p className="font-semibold text-cn2 md:text-clg2">{decodeWord(reward?.title??'')}</p>
                            <Link href={`/profile/reward-point/${reward?.goto_page??'/'}`} className="text-cn md:text-clg">{decodeWord(reward?.trailing_title??'')}</Link>
                        </div>
                        <RewrdItems setNewPoint={setNewPoint} user_balance_point={userRewardData?.user_tier.user_balance_point??0} data={reward?.items}/>
                        {/* {reward?.items.map((item,key)=>(
                        ))} */}
                    </div>
                </div>
                
            </div>
            </div>

           <div>
                <h2 className={`max-w-[510px] mx-auto mt-8 mb-2 text-clg2 font-bold text-[#D90377] `}>  রিওয়ার্ডস ডিটেইলস</h2>
                <div
                    className="z-[3] relative flex mx-auto md:py-3  justify-center md:px-4  text-white"
                >
                    <div className="w-full px-6 mx-3  overflow-hidden">
                        {/* {//console.log(userRewardData?.featureList,"userRewardData?.featureList")} */}
                        {userRewardData?.featureList?.slice(1,2).map((item,index)=>item?.type_reward==='reward'?'':(
                            <div key={index} onClick={()=>router.push(`/profile/reward-point/${item?.goto_page}`)}  className="md:px-5 cursor-pointer px-2  py-2 rounded-[6px]  bg-[#172033]  space-y-4">
                                <div className="flex items-start space-x-2">
                                    <img loading="lazy" className='max-w-5' src={item?.leading_icon2}/>
                                    <p className="text-cs sm:text-cs2 md:text-cn leading-snug">
                                    {item?.title}
                                    </p>
                                </div>
                                {item?.items?.map((subItems:any,index)=>(
                                    <div key={index} className="flex items-start space-x-2">
                                        <img loading="lazy" className='w-4' src={subItems?.leading_icon2??''}/>
                                        <p className="text-cs sm:text-cs2 md:text-cn leading-snug">{subItems?.title}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                        {/* Task list */}
                        <div className='rounded-[6px]  bg-[#172033] mt-5'>
                            {userRewardData?.featureList?.slice(2,).map((item,index)=>item?.type_reward==='reward'?'':(
                                <div key={index} onClick={()=>router.push(`/profile/reward-point/${item?.goto_page}`)}  className={`md:px-5 px-2 cursor-pointer py-4 ${userRewardData?.featureList?.length-3===index?'':'border-b border-white/20'}  space-y-4`}>
                                    <div className="flex items-start space-x-2">
                                        <img className='max-w-5' src={item?.leading_icon2}/>
                                        <p className="text-cs sm:text-cs2 md:text-cn leading-snug">
                                        {item?.title}
                                        </p>
                                    </div>
                                    {item?.items?.map((subItems:any,index)=>(
                                        <div key={index} className="flex  items-start py-1.5 space-x-2">
                                            <img className='w-4' src={subItems?.leading_icon2??''}/>
                                            <p className="text-cs sm:text-cs2 md:text-cn leading-snug">{subItems?.title}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        
                    </div>
                </div>
           </div>
        </div>
    </div>
  )
}

export default Page