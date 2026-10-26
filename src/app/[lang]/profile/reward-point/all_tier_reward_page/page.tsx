'use client'
import React, { useEffect, useState } from 'react'
import { ChevronRight, Clock, File, FileChartColumn, FileChartLine, FileQuestion, GitGraph, PlayCircle, Users } from 'lucide-react'
import RewrdItems from '@/components/RewardPoint/RewrdItems.view'
import TopPointCard from '@/components/RewardPoint/TopPointCard.view'
import CommonTabs from '@/components/CommonTabs/CommonTabs.view'
import CommonModal from '@/components/ui/CommonModal/CommonModal.view'
import LockedModal from '@/components/RewardPoint/LockedModal.view'
import CollectRewardModal from '@/components/RewardPoint/CollectRewardModal.view'
import MobileNumberForm from '@/components/RewardPoint/RewardForm.view'
import CongratsModal from '@/components/RewardPoint/CongratsModal.view'
import { useRouter } from 'next/navigation'
import { FeatureItems, RewardData, TiersResponse } from '../reward-point.type'
import { useAppSelector } from '@/store/store'
import { all_tier_reward, getUser_reward_profile } from '@/utils/apiServices'
import Link from 'next/link'
import { decodeWord } from '@/helpers/commonFunction'
import { container } from '@/components/ui/static/tailwind.classes'
import Star from '@/svgs/Star.svg'
import CircularStar from '@/svgs/CircularStar.svg'

const Page = () => {
    const router=useRouter();
    const [userRewardData,setUserRewardData]=useState<RewardData|null>(null);
    const user=useAppSelector(store=>store?.user?.userData)
    const [all_tier_rewards,setAllTierRewards]=useState<TiersResponse>([]);

    const getUserRewardData=async()=>{
        const result = await getUser_reward_profile(user?.id??'')
        setUserRewardData(result?.data?.data);
    }

    const get_all_tier_reward=async()=>{
        let result = await all_tier_reward(user?.id??'')
        setAllTierRewards(result?.data?.data??[]);
    }

    useEffect(()=>{
        if(user?.id){
            getUserRewardData();
            get_all_tier_reward()
        }
    },[user?.id])

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
        <h3 className='text-white mt-0 pt-8 text-clg2 font-semibold text-center'>কাব্যিক রিওয়ার্ডস</h3>
        <div className={` md2:flex justify-between relative mx-auto ${container('1306px')}`}>
            <div>
                <h2 className='mt-11 mx-auto max-w-[600px] text-clg2 font-bold text-[#D90377]'> রিওয়ার্ডস প্রোগ্রেস</h2>
                <div  className=' relative  mx-auto'>
                    {/* <div className="circular_gradient right-[30%] bottom-[-10%] w-[30vw] h-[30vw] absolute  "></div>
                    <div className="circular_gradient left-[25%] top-[10%] w-[30vw] h-[30vw] absolute  "></div> */}
                    <div className="z-[4] max-w-[600px] mx-auto relative  flex items-center justify-center   py-0 md:pb-0 text-white">
                        <CommonTabs
                            tabs={all_tier_rewards.map((item,index)=>(
                                {
                                    title:item.name,
                                    component:(
                                        <div className="w-full   space-y-5">
                    
                                            <TopPointCard data={{
                                                full_name: user?.full_name??'' ,
                                                user_balance_point: userRewardData?.user_tier?.user_balance_point??0 ,
                                                min_point:item?.min_point  ,
                                                user_acquired_point:userRewardData?.user_tier?.user_acquired_point??0  ,
                                                max_point: item?.max_point ,
                                                tier_name: item?.name ,
                                            }} />
                                            <div
                                                className=" rounded-[6px]  bg-[#172033] space-y-3"
                                            >                        
                                                <div className="flex justify-between items-center mt-4 pt-4">
                                                    <p className="font-semibold text-cn2 ml-3 md:text-cn2">
                                                        <span className='w-4 mr-2 inline-block h-4'>
                                                            <CircularStar />
                                                        </span>
                                                        কাব্যিক রিওয়ার্ডস
                                                    </p>
                                                    {/* <Link href={`/profile/reward-point/${reward?.goto_page??'/'}`} className="text-cn md:text-clg">{decodeWord(reward?.trailing_title??'')}</Link> */}
                                                </div>
                                                <RewrdItems setNewPoint={setNewPoint} isLocked={(userRewardData?.user_tier?.user_acquired_point??0)<item?.min_point} user_balance_point={userRewardData?.user_tier?.user_balance_point??0} data={item.rewards?.map(subItem=>{
                                                    subItem['tier_id']=item?.id
                                                    return subItem
                                                })} />
                                            </div>
                                        </div>
                                    )
                                }
                            ))}
                        />
                        
                    </div>
                </div>
            </div>
            <div className=''>
                <h2 className='mt-11 text-clg2 font-bold text-[#D90377] ml-4'>  রিওয়ার্ডস ডিটেইলস</h2>
                <div
                    className="z-[3] relative flex mx-auto md:py-3  justify-center md:px-4  text-white"
                >
                    <div className="w-full xs:mx-4   overflow-hidden">
                        {/* {//console.log(userRewardData?.featureList,"userRewardData?.featureList")} */}
                        {userRewardData?.featureList?.slice(1,2).map((item,index)=>item?.type_reward==='reward'?'':(
                            <div key={index} onClick={()=>router.push(`/profile/reward-point/${item?.goto_page}`)}  className="md:px-5 cursor-pointer px-3  py-2 rounded-[6px]  bg-[#172033]  space-y-4">
                                <div className="flex items-start  space-x-2">
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
                        <div className='rounded-[6px] px-3  bg-[#172033] mt-5'>
                            {userRewardData?.featureList?.slice(2,).map((item,index)=>item?.type_reward==='reward'?'':(
                                <div key={index} onClick={()=>router.push(`/profile/reward-point/${item?.goto_page}`)}  className={`md:px-5 cursor-pointer py-4 ${userRewardData?.featureList?.length-3===index?'':'border-b border-white/20'}  space-y-4`}>
                                    <div className="flex items-start space-x-2">
                                        <img loading="lazy" className='max-w-5' src={item?.leading_icon2}/>
                                        <p className="text-cs sm:text-cs2 md:text-cn leading-snug">
                                        {item?.title}
                                        </p>
                                    </div>
                                    {item?.items?.map((subItems:any,index)=>(
                                        <div key={index} className="flex  items-start py-1.5 space-x-2">
                                            <img loading="lazy" className='w-4' src={subItems?.leading_icon2??''}/>
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