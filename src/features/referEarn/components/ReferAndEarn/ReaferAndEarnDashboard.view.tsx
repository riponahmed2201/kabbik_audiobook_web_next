'use client'
import { siteConfig } from '@/config/config';
import { convertToBanglaDigits, formatDateDDMMYY, formatDateToBengali, handleCopy } from '@/helpers/commonFunction';
import { useAppSelector } from '@/store/store'
import Claims from '@/svgs/claims.svg';
import ClockIcon2 from '@/svgs/Clock.svg';
import GitIcon from '@/svgs/git.svg';
import Pending from '@/svgs/Pending.svg';
import SuccessTransaction from '@/svgs/SuccessTransaction.view';
import { claim_request, fetchReferAndEarn, get_refer_history, get_total_earn, user_claim_history } from '@/utils/apiServices';
import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { ReferralData, TClaimHistory, tEarnSummay } from './static/refeAndEarn.type';
import Link from 'next/link';
import { paths } from '@/utils/Paths';
import Spinner from '@/shared/ui/Spinner.view';
import CommonModal from '@/shared/ui/CommonModal/CommonModal.view';
import RewardTypeSelector from './moneyWithdraw.view';
import { toast, ToastContainer } from 'react-toastify';
import { CircleAlert, Clock, Copy } from 'lucide-react';

const ReaferAndEarnDashboard = () => {
    const user = useAppSelector(store=>store?.user?.userData);
    const [claimHistory,setClaimHistory]=useState<TClaimHistory|null>(null)
    const [formData,setFormData]=useState<{ [key: string]: string }>({status:'ALL',fromDate:'2025-07-03',toDate:new Date().toISOString().split("T")[0]});
    const [summary,setSummary]=useState<tEarnSummay|null>(null)
    const [loader,setLoader]=useState(false);
    const [showWithdrawalModal,setShowWithdrawalModal]=useState(false);
    const [selectedAmount,setSelectedAmount]=useState(0);
    const [referJSON,setReferJSON]=useState<ReferralData|null>(null);
    // const []

    const getReferHistory=async()=>{
      setLoader(true);
      let fromDate=formData.fromDate;
      let toDate=formData.toDate || formatDateDDMMYY(new Date().toISOString());
      let result = await  user_claim_history(user?.id||0,fromDate,toDate,formData.status);
      setClaimHistory(result);
      setLoader(false);
    }

    const getTotalEarn=async()=>{
      let result =await get_total_earn(user?.id??0)
      setSummary(result?.data)
    }

    const getJSON=async()=>{
      let result = await fetchReferAndEarn();
      setReferJSON(result);
    }

    useEffect(()=>{
      getReferHistory()
      getTotalEarn()
      getJSON()
    },[])

    const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));      
    };

    const handleWithDraw=async(value:number)=>{
      if(value<(summary?.balance_amount??0) ){
        //console.log(summary?.balance_amount,value);
        let result = await claim_request(user?.id ??0,value);
        if(result?.data?.success){
          toast.success(result?.data?.message)
          await getTotalEarn();
          setShowWithdrawalModal(false)
        }else{
          toast.error("Something went wrong");
        }
        
      }else{
        toast.error("Selected amount is higher than your balance")
      }
    }

    const claimDisabled=()=>{
      return (summary?.balance_amount??0)<(summary?.minimum_withdrawal_amount??1000)
    }



  return (
    <div className=" text-gray-800 px-4 py-8 sm:px-8 sm:py-12">
      <ToastContainer/>
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header Section */}
        {/* <div className="profile_earn_gradients rounded-[8px] p-4 flex flex-col md:flex-row items-center gap-3 md:gap-6 shadow-lg">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
              <Image src={siteConfig.defaultPremiumPic} alt="Profile" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">{user?.full_name}</h2>
              <p className="text-white/90 text-sm">সদস্য {formatDateToBengali(user?.created_at??'')} থেকে</p>
            </div>
          </div>

          <div className="flex-1 flex flex-wrap items-center justify-center gap-4 px-2">
            <div className="bg-white/90 rounded-[6px] px-5 py-2 shadow-sm flex items-center gap-3 min-w-[170px]">
              <div className="w-9 h-9 text-white/90 flex items-center justify-center">
                <GitIcon/>
              </div>
              <Link href={paths.refer_earn}>
                <p className="font-semibold">{user?.refer_code}</p>
              </Link>
            </div>

            <div className="bg-white/90 rounded-[6px] px-2 py-2 shadow-sm flex items-center gap-1 min-w-[170px]">
              <div className="w-9 h-9  text-white/90 flex items-center justify-center">
                <ClockIcon2/>
              </div>
              <div>
                <p className="font-semibold">পেমেন্ট হিস্ট্রি</p>
              </div>
            </div>
          </div>

          <div className="flex-0">
            <div className="bg-white/90 rounded-xl p-3 w-52 text-center shadow-md">
              <p className="text-xs text-gray-500">আপনার মোট আয়</p>
              <p className="text-xl font-bold mt-1">৳{convertToBanglaDigits(summary?.balance_amount??0)}</p>
              <small> ৳{convertToBanglaDigits(summary?.minimum_withdrawal_amount??0)}-এর কম পরিমাণ আয় 
                আপনি ক্লেইম করতে পারবেন না</small>
              <button onClick={()=>setShowWithdrawalModal(true)} className="mt-3 w-full bg-red-600 text-white/90 text-sm py-1 rounded">উইথড্র</button>
            </div>
          </div>
        </div> */}
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
                  <h1 className="text-white text-lg font-bold">{user?.full_name}</h1>
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
                    <button 
                      disabled={claimDisabled()} 
                      onClick={()=>setShowWithdrawalModal(true)} 
                      className={`btn_gradient_new ${claimDisabled()?"cursor-not-allowed":"cursor-pointer"} px-4 py-1.5 rounded-[6px] text-white text-sm font-semibold transition-all whitespace-nowrap`}
                    >
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
                  <button className="bg-white/10 md:mb-4 w-full rounded-[6px] hover:bg-white/10 px-3 py-2.5  border border-slate-700/50 backdrop-blur-sm transition-all flex items-center gap-1.5 text-white text-sm max-md:mr-2">
                    <Copy className="w-3.5 h-3.5" />
                    <span onClick={()=>handleCopy(user?.refer_code??'')} className="font-mono font-semibold">{user?.refer_code}</span>
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

        {/* Stats Section */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl sm:text-clg2 text-white/90 font-semibold mb-2">রেফারেল অ্যাওয়ার্ড ক্লেইম হিস্ট্রি</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              {/* আপনার সকল রেফারেল রিওয়ার্ড এবং তাদের বর্তমান অবস্থা ট্র্যাক করুন */}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/90 px-3 py-3 rounded-xl border border-white/5 flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl"><Claims/></div>
              <div>
                <h4 className="text-sm text-gray-500">টোটাল ক্লেইমস</h4>
                <p className="text-clg font-bold ">{claimHistory?.summary.totalClaim??0} টি ক্লেইমস</p>
              </div>
            </div>

            <div className="bg-white/90 px-3 py-3 rounded-xl border border-white/5 flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl"><SuccessTransaction/></div>
              <div>
                <h4 className="text-sm text-gray-500">সফল ক্লেইমস</h4>
                <p className="text-clg font-bold ">{claimHistory?.summary?.totalDelivered??0} টি ডেলিভার্ড</p>
              </div>
            </div>

            <div className="bg-white/90 px-3 py-3 rounded-xl border border-white/5 flex items-center gap-3">
              <div className="w-12 h-12  rounded-[4px] flex items-center justify-center text-2xl"><Pending/></div>
              <div>
                <h4 className="text-sm text-gray-500">পেনডিং ক্লেইমস</h4>
                <p className="text-clg font-bold ">{claimHistory?.summary?.totalPending??0} টি ক্লেইমস</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <div>
            <label className='block text-gray-200'>সিলেক্ট স্ট্যাটাস</label>
            <select name='status' onChange={handleChange} className="bg-[#0e142a] text-white/90 border border-white/10 rounded-[4px] px-4 py-2 focus:ring-2 focus:ring-blue-500">
              <option>সব স্ট্যাটাস</option>
              <option value="DELIVERED">ডেলিভার্ড</option>
              <option value="PENDING">পেন্ডিং</option>
              <option value="CANCELLED">ক্যানসেল</option>
            </select>
          </div>
          {/* <input
            type="date"
            placeholder="তারিখ অনুসন্ধান"
            className="bg-[#0e142a] border border-white/10 text-white/90 px-4 py-2 rounded-[4px] focus:ring-2 focus:ring-blue-500 appearance-none"
          /> */}
          <div className=''>
            <label className='block text-gray-200'>ফ্রম ডেট</label>
            <input
              type="date"
              name='fromDate' 
            
              value={formData?.fromDate}
              onChange={handleChange}
              style={{ colorScheme: 'light' }}
              // style={{colorScheme:'white'}}
              className="bg-[#0e142a] your-date-input border border-white/10 text-white/90 px-4 py-2 rounded-[4px] focus:ring-2 focus:ring-blue-500 appearance-none"
              // className="bg-[#0e142a]   border border-white/10 text-white/90 px-4 py-2 rounded-[4px] focus:ring-2 focus:ring-blue-500 appearance-none"
            />
          </div>
          <div className=''>
            <label className='block text-gray-200'>টু ডেট</label>
            <input
              type="date"
              name='toDate' 
              value={formData?.toDate}
              onChange={handleChange}
              style={{ colorScheme: 'light' }}
              className="bg-[#0e142a] your-date-input border border-white/10 text-white/90 px-4 py-2 rounded-[4px] focus:ring-2 focus:ring-blue-500 appearance-none"
            />
          </div>
          <div>
            {/* <label className='block text-gray-200'>{''}</label> */}
            <br/>
            <button onClick={getReferHistory} className="bg-[#6A49FF] px-4 py-2 rounded-[4px] hover:bg-[#5A3FFF] transition">
              {loader?<Spinner size='w-3 h-3' />:''}
              🔍 খুঁজুন</button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mt-6 rounded-[4px]">
          <table className="min-w-full text-sm sm:text-base border-collapse">
            <thead>
              <tr className="bg-white/90 text-black">
                <th className="text-left px-4 py-3 font-medium rounded-tl-md">ক্র নংঃ </th>
                <th className="text-left px-4 py-3 font-medium">তারিখ</th>
                <th className="text-left px-4 py-3 font-medium">অ্যাওয়ার্ড টাইপ</th>
                <th className="text-left px-4 py-3 font-medium">পরিমাণ</th>
                <th className="text-left px-4 py-3 font-medium rounded-tr-md">অবস্থা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-[#071022]">
              {claimHistory?.data.map((item, i) => (
                <tr key={i} className="hover:bg-[#0c1224] text-white/90 transition">
                  <td className="px-4 py-3">{i}</td>
                  <td className="px-4 py-3">{formatDateDDMMYY(item.created_at)}</td>
                  <td className="px-4 py-3">{item.award_type}</td>
                  <td className="px-4 py-3">{item.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={`${claimHistory?.data?.length?'hidden':' text-muted2 mt-5 font-medium text-center '}`}>কোনো ডেটা পাওয়া যায়নি</p>
          <CommonModal
            isOpen={showWithdrawalModal}
            onClose={()=>{setShowWithdrawalModal(false)}}
          >
            <RewardTypeSelector handleSubmit={handleWithDraw} referJSON={referJSON}/>
          </CommonModal>
        </div>

        {/* Pagination */}
        {/* <div className="flex justify-end items-center gap-3 mt-6">
          <button className="p-2 rounded-full bg-[#0e142a] hover:bg-[#1a2040]">←</button>
          <button className="w-9 h-9 rounded-full bg-blue-600 text-white/90 flex items-center justify-center">১</button>
          <button className="w-9 h-9 rounded-full bg-[#0e142a] text-white/90 flex items-center justify-center">২</button>
          <button className="w-9 h-9 rounded-full bg-[#0e142a] text-white/90 flex items-center justify-center">৩</button>
          <button className="p-2 rounded-full bg-[#0e142a] hover:bg-[#1a2040]">→</button>
        </div> */}

        {/* Footer Note */}
        {/* <p className="text-gray-400 text-center text-sm mt-4">
          ২৪টি ক্রেইমস এর ৫-টি প্রদর্শন করা হয়েছে মাত্র
        </p> */}
      </div>
    </div>
  )
}

export default ReaferAndEarnDashboard