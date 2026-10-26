'use client'
import { siteConfig } from '@/config/config'
import { convertToBanglaDigits, formatDateToBengali, handleCopy, handleShare, replacePlaceholder, shareContent } from '@/helpers/commonFunction'
import { useAppSelector } from '@/store/store'
import ClockIcon2 from '@/svgs/Clock.svg'
import GitIcon from '@/svgs/git.svg'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ReferralData, tEarnSummay } from './static/refeAndEarn.type'
import { container } from '../ui/static/tailwind.classes'
import Link from 'next/link'
import { paths } from '@/utils/Paths'
import { CircleAlert, Clock, Copy, CopyCheck, FileWarning, LinkIcon, Share, Share2, ShareIcon, Users } from 'lucide-react'
import { claim_request, fetchReferAndEarn, get_total_earn } from '@/utils/apiServices'
import CommonModal from '../ui/CommonModal/CommonModal.view'
import RewardTypeSelector from './moneyWithdraw.view'
import { toast, ToastContainer } from 'react-toastify'
import GiftWithBg from '@/svgs/GiftWithBg'
import Percentage from '@/svgs/percentage'
import ShareIconWithBg from '@/svgs/ShareIconWithBg'
import Thunder from '@/svgs/Thunder.svg'
import ShareModal from '../ui/ShareComponent'
import ShareButton from '../ui/ShareComponent'

const SubscribedHomePage = ({data}:{data:ReferralData}) => {
    const user=useAppSelector(store=>store.user?.userData)
    const [showWithdrawalModal,setShowWithdrawalModal]=useState(false);
    const [summary,setSummary]=useState<tEarnSummay|null>(null)
    const [referJSON,setReferJSON]=useState<ReferralData|null>(null);
    const [copied1,setCopied1]=useState(false);
    const [showShare,setShowShare]=useState(false)
    

    const getJSON=async()=>{
      let result = await fetchReferAndEarn();
      setReferJSON(result);
    }

    useEffect(()=>{
      // getReferHistory()
      getTotalEarn()
      getJSON()
    },[])
    

    const handleWithDraw=async(value:number)=>{
          if(value>(summary?.balance_amount??0)){
            //console.log(summary?.balance_amount,value);
            
            toast.error("Selected amount is higher than your balance")
          }else{
            let result = await claim_request(user?.id ??0,value);
            if(result?.data?.success){
              toast.success(result?.data?.message)
              await getTotalEarn();
              setShowWithdrawalModal(false)
            }else{
              toast.error("Something went wrong");
            }
          }
        }
    
    

    const getTotalEarn=async()=>{
      let result =await get_total_earn(user?.id??0)
      setSummary(result?.data)
    }

    useEffect(()=>{
      getTotalEarn()
    },[])

    const getShareUrl = (route: string) => {
      if (typeof window === "undefined") return "";
      // alert(`${window.location.origin}${route}`)
      return `${window.location.origin}/${route}`;
    };
  return (
    <div>
      <ToastContainer/>
      <div className={`${user?.is_subscribed?'':'hidden'} w-[97%] lg:w-[90%] mx-auto  text-gray-900 px-4 py-8 `}>
      <div className="max-w-7xl mx-auto w-full bg-transparent space-y-8">
        <div className="bg-[#172033] rounded-[12px] p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
              {/* Left Section - Profile */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    loading="lazy"
                    src={siteConfig.defaultPremiumPic}
                    alt="Profile"
                    className="w-24 h-24 "
                  />
                </div>
                <div>
                  <h1 className="text-white text-cn font-bold">{user?.full_name}</h1>
                  <p className="text-slate-400 text-xs">সদস্য {formatDateToBengali(user?.created_at??'')} থেকে</p>
                </div>
              </div>

              {/* Right Section - Stats and Actions */}
              <div className="flex  flex-wrap items-center gap-2">
                {/* Earnings Card */}
                <div className="bg-white/10 max-md:w-full rounded-[6px] p-3 backdrop-blur-sm border border-slate-700/50">
                  <div className="flex justify-between items-center gap-3">
                    <div>
                      <p className="text-slate-400 text-xs mb-0.5">আপনার মোট আয়:</p>
                      <p className="text-white text-2xl font-bold">{convertToBanglaDigits(summary?.balance_amount??0)}  টাকা</p>
                    </div>
                    <button onClick={()=>setShowWithdrawalModal(true)} className="btn_gradient_new px-4 py-1.5 rounded-[6px] text-white text-sm font-semibold transition-all whitespace-nowrap">
                      ক্লেইম করুন
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-slate-400 text-xs">
                    <CircleAlert className="w-3 h-3 text-white flex-shrink-0" />
                    <span>ক্লেইম করতে হলে ন্যূনতম আয় হতে হবে {convertToBanglaDigits(summary?.minimum_withdrawal_amount??1000)} টাকা</span>
                  </div>
                </div>

                {/* Referral Code Button */}
                <div className='w-full md:w-[140px] max-md:flex md:ml-2'>
                  <button onClick={()=>{handleCopy(user?.refer_code??'');setCopied1(true)}} className="bg-white/10 md:mb-4 w-full rounded-[6px] hover:bg-white/10 px-3 py-2.5  border border-slate-700/50 backdrop-blur-sm transition-all flex items-center gap-1.5 text-white text-sm max-md:mr-2">
                    <Copy style={{color:copied1?"#16c606":"white"}} className={"w-3.5 h-3.5"} />
                    <span style={{color:copied1?"#16c606":"white"}} className="font-mono font-semibold">{user?.refer_code}</span>
                  </button>

                  {/* History Button */}
                  <button className="bg-white/10 w-full rounded-[6px] hover:bg-white/10 px-3 py-2.5  border border-slate-700/50 backdrop-blur-sm transition-all flex items-center gap-1.5 text-white text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    <Link href={paths?.refer_dashboard}><span  className="font-medium">পেমেন্ট হিস্ট্রি</span></Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="  text-[#fbfbfb] ">
      <div className="w-full">
        <div className="lg:flex gap-7 justify-between">
          {/* <div className='max-w-[45%]'>
            <h2 className="text-cn md:text-clg2 font-bold mb-3">
              কেন কাব্যিক  অডিওবুক  রেফার করবেন?
            </h2>
            <p className="text-blue-200 mb-6 text-sm">
              ফেকার করলে যা যা পেতে পারেন
            </p>

            <div className="space-y-4">
              <div className="flex gap-3 items-start group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-500/50">
                  <GiftWithBg/>
                </div>
                <div className="flex-1">
                  
                  <p className="text-blue-200 text-xs leading-relaxed">
                    Kabbik-এর জনপ্রিয় Premium Pack (তেলের মাধ্যমে চুল) এবংসব সার্ভিসগুলিতে রহস্যজন।
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12  flex items-center justify-center flex-shrink-0 ">
                  <Percentage/>
                </div>
                <div className="flex-1">
                  <h3 className="text-cn font-semibold mb-1">
                    আপনি পাবেন ২০ টাকা নয়ন ইনকাম
                  </h3>
                  <p className="text-blue-200 text-xs leading-relaxed">
                    বন্ধু রা পরিচিতজন আপনার কোড ব্যবহার করে প্রথমবার সার্ভিসগ্রহন নিলেই।
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12  rounded-lg flex items-center justify-center">
                  <ShareIconWithBg color='#F6339A'/>
                </div>
                <div className="flex-1">
                  <h3 className="text-cn font-semibold mb-1">
                    এক ক্লিকে সহজ শেয়ার
                  </h3>
                  <p className="text-blue-200 text-xs leading-relaxed">
                    ফাস্ট ও আমালেয়হীনভাবে কোড লাগায়ে দিন।
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12  rounded-lg flex items-center justify-center flex-shrink-0 ">
                  <Thunder/>
                </div>
                <div className="flex-1">
                  <h3 className="text-cn font-semibold mb-1">
                    উইন-উইন সুবিধা
                  </h3>
                  <p className="text-blue-200 text-xs leading-relaxed">
                    কোড শেয়ার করুন → তারা ডিসকাউন্ট পাবে → আপনি নয়ন আয় করবেন।
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          <div className="ld:max-w-[50%] grid  gap-6 items-start">
          <div className="lg:col-span-2 space-y-4">
            {data?.benefit?.map((item,index:number)=>(
                <p key={index} className="text-cs2 text-justify md:text-cn leading-relaxed text-gray-100">
                {replacePlaceholder(item,user?.refer_code??'')}
                </p>
            ))}

          </div>

          {/* <div className="flex justify-center lg:justify-end items-start relative">
            <div className="  p-5 shadow-lg">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 overflow-hidden ">
                <Image src={data?.animated_image} alt="Books and Phone" fill className="object-contain" />
              </div>
            </div>

            
          </div> */}
        </div>

          {/* Right Column - How to Do It */}
          <div className='lg:max-w-[45%] max-lg:mt-8'>
            <h2 className="text-cn2 font-bold mb-3">
              কিভাবে এটি কাজ করে
            </h2>
            <p className="text-blue-200 mb-6 text-sm">
              মাত্র দুটি সহজ ধাপে শুরু করুন
            </p>

            <div className="space-y-5">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex gap-3 items-start">
                  <div className="w-12 h-12  flex items-center justify-center flex-shrink-0 ">
                    <ShareIconWithBg/>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-cn font-semibold mb-1">
                      স্টেপ ১ — শেয়ার করুন
                    </h3>
                    <p className="text-blue-200 leading-relaxed text-sm">
                      বন্ধু বা পরিচিতজনকে কাব্যিক -এ আমন্ত্রণ জানান।
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex gap-3 items-start">
                  <div className="w-12 h-12 bg-gradient-to-br  from-blue-500 to-cyan-600 rounded-[6px] flex items-center justify-center ">
                    <Users/>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-cn font-semibold mb-1">
                      স্টেপ ২ — আপনার বন্ধু প্রিমিয়াম সাবস্ক্রিপশন নিলেই পুরস্কার পান।
                    </h3>
                    <p className="text-blue-200 leading-relaxed text-sm">
                      আপনার বন্ধু তারা কাব্যিক  অ্যাপ ডাউনলোড করে আপনার রেফারেল কোড ব্যবহার করলে তারা ডিসকাউন্ট পাবে, আর প্রতি সফল রেফারেলে আপনি পাবেন নগদ ২০ টাকা।
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              {/* <div className="pt-4">
                <button className="w-full md:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70 transition-all duration-300 hover:scale-105 text-sm">
                  এখনই শুরু করুন
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>

      </div>
    </div>
    <div className={`${container('1306px') } ${user?.is_subscribed?'':' hidden '} rounded-[12px] w-full bg-[#0F172A] py-5 flex justify-center px-4`}>
      <div className="text-center">

        {/* Title */}
        <h2 className="text-white text-clg font-semibold">
          রেফার করুন ও উপার্জন করুন
        </h2>

        {/* Subtitle */}
        <p className="text-gray-300 text-sm mt-2 ">
          প্রতি সফল রেফারেলে — বন্ধু বা পরিচিতজন আপনার রেফারেল কোড দিয়ে সাবস্ক্রাইব করলেই আপনি পাবেন নগদ ২০ টাকা।
        </p>

        {/* Box Section */}
        <div className="flex items-center justify-center gap-3 mt-6">
          
          {/* Code Box */}
          <div style={{color:copied1?"#16c606":"white"}} className="bg-[#1E293B] text-cs2 text-white px-5 py-1.5 rounded-[6px]">
            {user?.refer_code}
          </div>

          {/* Copy Icon Button */}
          <button onClick={()=>{handleCopy(user?.refer_code??'');setCopied1(true)}} className="bg-[#1E293B] p-1.5 w-[40px] flex justify-center rounded-[6px] text-gray-300 hover:bg-[#334155] transition">
            <CopyCheck style={{color:copied1?"#16c606":"white"}} className='w-4'/>
          </button>
          {/* <ShareButton
             title="কাব্যিক অডিওবুক — Referral Offer"
             text={ replacePlaceholder(data?.sharable_content,user?.refer_code??'')}
             imageUrl={data?.sharable_image_url}
            /> */}
          {/* Share Button */}
          <button onClick={async()=>{
               
                await navigator.share({
                  title: "কাব্যিক অডিওবুক — Referral Offer",
                  text: replacePlaceholder(data?.sharable_content,user?.refer_code??''),
                  // files:[]
                  url:getShareUrl(paths.refer_earn_link+user?.refer_code)
                });
              // setShowShare(true);
              }} className=" text-white text-cxs md:text-cs2 px-1 lg:px-6 py-1.5 rounded-[6px] btn_gradient_new transition flex items-center gap-2">
            <Share2 className='w-4'/>
            এখনই শেয়ার করুন
          </button>

        </div>
      </div>
    </div>
    {/* <div className={`${user?.is_subscribed?'':'hidden'}  flex items-center justify-center px-4`}>
      <div className="max-w-2xl w-full bg-[#1C1C2C] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <p className="text-[15px] sm:text-[16px] leading-relaxed mb-6">
          কবিবিক অফিসিয়াল অ্যাপ ডাউনলোড করুন, প্রিয়জনের রেফারেল কোডে সাইনআপ করে পান আকর্ষণীয় ছাড়! নিজের রেফারেল কোড নিন, বন্ধুদের শেয়ার করুন, আর নগদ টাকা উপার্জন শুরু করুন!
        </p>

        <div onClick={()=>handleCopy(replacePlaceholder(data?.sharable_content,user?.refer_code??''))} className="flex cursor-pointer items-start gap-3">
          <div className="flex-shrink-0">
            <LinkIcon className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col">
            <p className="text-[15px] mb-1">
              <span className="font-medium text-gray-200">Refer code:</span>{" "}
              <span className="font-semibold text-white">{user?.refer_code}</span>
            </p>
            <a
              href="https://kabbik.com/download-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-[#A3A3FF] hover:underline break-all"
            >
              https://kabbik.com/download-app
            </a>
          </div>
        </div>
      </div>
    </div> */}
    <CommonModal
      isOpen={showWithdrawalModal}
      onClose={()=>{setShowWithdrawalModal(false)}}
    >
      <RewardTypeSelector handleSubmit={handleWithDraw} referJSON={referJSON}/>
    </CommonModal>
    {/* {showShare && (
          <ShareModal
            shareUrl={`http://bhoot-fe.divergenttechbd.com/story`}
            onClose={() => setShowShare(false)}
          />
        )} */}
    </div>

  )
}

export default SubscribedHomePage