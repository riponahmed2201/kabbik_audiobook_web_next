'use client'
import React, { useCallback, useEffect, useState } from 'react';
import BookIcon from '@/svgs/bookIcon';
import LoveIcon from '@/svgs/LoveIcon';
import { Book, Delete, Edit, GraduationCap, HandshakeIcon, InfoIcon, LogOut, PersonStandingIcon, StarIcon, User } from 'lucide-react';
import PlayIcon from '@/svgs/PlayIcon.svg';
import UserIcon from '@/svgs/UserIcon';
import TakaIcon from '@/svgs/TakaIcon.svg';
import DownloadIconWithBg from '@/svgs/DownloadIconWithBg';
import MyPlayList from '@/svgs/MyPlayList.svg';
import { cn } from '@/lib/utils';
import { clearSessionAndRedirect, convertToBanglaDigits, formatDateToBengali, formatSeconds, getBanglaDateDifference } from '@/helpers/commonFunction';
import { paths } from '@/utils/Paths';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { UserProfileInfo } from '@/features/audiobook/components/audiobook/static/audiobook.type';
import { UserSummaryInfo } from './static/profile.type';
import { bkashUnSubscribeUserApi, blDcbUnsubscribeApi, book_finished_stats, gpUnsubscribeApi, leaderboard_top_listners, postBookRequest, redeemCodePostApi, robiUnSubscribeUserApi, updateProfile, user_total_listening_time, userProfile, userSummary } from '@/utils/apiServices';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';
import TopSection from './TopSection.view';
import { MenuItem } from './MenuItem.view';
import CommonModal from '@/shared/ui/CommonModal/CommonModal.view';
import RobiNumberInput from './RobiNumberModal.view';
import BookInfoForm from './BookRequestModal.view';
import ReedemCodeActivate from './ReedemCode.view';
import ProfileInfoForm from './UpdateProfile.view';
import ContactUsModal from './ContactUsModal.view';
import SponsorFormModal from './SponsorShipModal.view';
import SocialMediaSection from './SocialMediaSection.view';
import { Clock, BookOpen, CreditCard, Gift, Users, Settings, TrendingUp, AlertCircle } from 'lucide-react';
import { container } from '@/shared/ui/static/tailwind.classes';
import { useAppSelector } from '@/store/store';
import { siteConfig } from '@/config/config';
import { useRouter } from 'next/navigation';
import Trophy from '@/svgs/Trophy.svg';
import GoldPosition from '@/svgs/GoldPosition.svg';
import CancelSubscriptionModal from './CancelSubscriptionModal.view';
import MyCoursesPage from '@/app/[lang]/profile/my-courses/page';
import FavoritesPage from '@/app/[lang]/profile/favorites/page';
import MyRents from '@/app/[lang]/profile/my-rents/page';
import Leaderboard from '@/app/[lang]/leaderboard/page';
import { UserStreamingStatList } from '@/app/[lang]/leaderboard/static/leaderboard.type';
import { Ads } from '@/features/entertainment/components/Ads/Ads';
import { FinishedBookStats, FinishedBookStatsResponse } from '@/shared/ui/static/types';
import DeviceLimitModal from './DeviceListModal.view';
import GamezopBanner from './GamezopBanner.view';

export default function ProfileDashboard(profileData: any) {
    const router=useRouter();
    const user=useAppSelector((store)=>store?.user?.userData);
    const [isLogin, setIsLogin]: any = useState();
    const [showDeviceListModal,setShowDeviceListModal]=useState(false);
//   const user=useAppSelector((store)=>store.user.userData);
  const [showRobiNumberModal,setShowRobiNumberModal]=useState(false);
  const [showConfirmationModal,setShowConfirmationModal]=useState(false);
  const [showBookRequestModal,setShowBookRequestModal]=useState(false);
  const [showRedeemModal,setShowRedeemModal]=useState(false);
  const [profileInfoModal,setProfileInfoModal]=useState(false);
  const [showContactModal,setShowContactModal]=useState(false);
  const [sponsorShipModal,setSponsorShipModal]=useState(false);
  const [cancelSubsModal,setCancelSubsModal]=useState(false);
  const [showCourses,setShowCourses]=useState(false);
  const [showFavoritePage,setShowFavoritePage]=useState(false);
  const [showMyRents,setShowMyRents]=useState(false);
  const [showLeaderboardModal,setShowLeaderboardModal]=useState(false);
  const [leaderboardData,setLoaderboardData]=useState<UserStreamingStatList>([]);
  const [bookFinishedStats,setBookFinishedStats]=useState<FinishedBookStats[]>([]);
  
  

  let getUserListenHistory=async()=>{
      let result = await user_total_listening_time(user?.id??0);
      setLoaderboardData(result)
  }
  let book_finished_data=async()=>{
      let result:FinishedBookStatsResponse|null = await book_finished_stats(user?.id??0);
      setBookFinishedStats(result?.data??[])
  }
  useEffect(()=>{
    console.log(user);
    if(!user?.id)return;
      getUserListenHistory();
      book_finished_data();
  },[user?.id])


  const isAuthenticated = useCallback(async () => {
    setIsLogin(Cookies.get("isLogin"));
    if (isLogin === "false") {
      window.location.replace("/");
    }
  }, [isLogin]);

  useEffect(() => {
    isAuthenticated();
  }, [isAuthenticated]);

  

  const [userName, setUserName] = useState("");
  const [bookName, setbookName] = useState("");
  const [writerName, setWriterName] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");

  const nonCancellablePaymentMethods = new Set([
    'amarPay',
    'STRIPE_ONE_TIME',
    'AamarPay',
    'SurjoPay',
    'Nagad',
    "ApplePay",
    "Googlepay",
    'Upay',
    'RedeemCode',
    'GPDCB_ONETIME',
    'BKASHONETIME',
    'DCB_ONE_OFF'
  ]);
  
  function shouldHideCancelButton(method:string) {
    return method != null && nonCancellablePaymentMethods.has(method);
  }

  


  const unSubscribeHandler = async () => {
    switch (user?.payment_method) {
      case "bKash":
        await bkashUnSubscribeUserApi(user?.subscription_id);
        router.push("/");
        break;
      case "Robi":
        setShowRobiNumberModal(true);
        break;
      case "DCB_SUBS":
        await blDcbUnsubscribeApi(user?.id);
        router.push("/");
        break;
      case "GPDCB_SUBS":
        const result = await gpUnsubscribeApi();
        if (result?.success) {
          router.push("/");
          toast.success(result.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
          });
        } else if(result){
          toast.error("Could not unsubscribe. Contact kabbik support");
        }
        break;
    }
  };

  const robiUnsubscribed = async (robiMsisdn:string) => {
    await robiUnSubscribeUserApi(robiMsisdn,user?.subscriptionDetails?.subscriptionItemId??0);
    router.push("/");
  };

  

  /*-----------------GOOGLE AUTH LOGIN------------------*/

  const logOutHandle = () => {
    if (!profileData.session) {
      const cookies = Cookies.get();
      for (const cookie in cookies) {
        Cookies.remove(cookie);
      }
      localStorage.clear();
      window.location.replace("/");
    } else {
      const cookies = Cookies.get();
      for (const cookie in cookies) {
        Cookies.remove(cookie);
      }
      localStorage.clear();
      signOut({ callbackUrl: "/" });
    }
  };
     const menuItems = [
      {name:"লাইব্রেরি ও কনটেন্ট",buttons:[
        { title: 'আমার প্লে-লিস্ট',color:'#A731EF', icon: <MyPlayList />, gradient: '',hasNewBadge: true ,handleClick:()=>router.push(paths.myPlayList) },
        { title: 'আমার ফেভারিটস',color:'#00BDD5', icon: <PlayIcon />, gradient: '' , handleClick:()=>{setShowFavoritePage(true)} },
        { title: 'বই রিকোয়েস্ট করুন',color:'#52C9FB', icon: <BookIcon color="white" />, gradient: '', handleClick:()=>{setShowBookRequestModal(true)} },
        { title: 'আমার রেন্ট করা বই',color:'#E12D90', icon: <UserIcon />, gradient: '', handleClick:()=>{setShowMyRents(true)} },
        { title: 'আমার কোর্সসমূহ',color:'#00D97D', icon: <GraduationCap />, gradient: '',handleClick:()=>{setShowCourses(true)} },
      ]},
    {name:"রিওয়ার্ড ও রেফারেল",buttons:[
      { title: 'রেফার অ্যান্ড আর্ন',color:'#FF7E17', icon: <TakaIcon />, gradient: '',hasNewBadge:true,handleClick:()=>router.push(paths.refer_earn) },
      // {title: 'লিডারবোর্ড',color:'#00B4E5', icon: <GoldPosition />, gradient: '',handleClick:()=>{setShowLeaderboardModal(true)},hasNewBadge: true },
      { title: 'রিওয়ার্ড পয়েন্ট',color:'#FF7E17', icon: <Trophy />, gradient: '',handleClick:()=>{router.push(paths.reward_point)},hasNewBadge: true },
      { title: 'কোড রিডিম করুন', color:'#A731EF', icon: <LoveIcon />, gradient: '',handleClick:()=>{setShowRedeemModal(true)} },
    ]},
    {name:"হেল্প ও ইনফরমেশন",buttons:[
      { title: 'অ্যাবাউট কাব্যিক',color:'#FD4A30', icon: <InfoIcon />, gradient: '' ,handleClick:()=>router.push('/about')},
      { title: 'কন্ট্যাক্ট কাব্যিক টিম',color:'#00C29E', icon: <PersonStandingIcon />, gradient: '',handleClick:()=>{setShowContactModal(true)} },
      { title: 'কাব্যিক অ্যাপ রেট করুন',color:'#BB0F59', icon: <StarIcon />, gradient: '',handleClick:()=>router.push('/download-app') },
    ]},
    {name:"অ্যাকাউন্ট",buttons:[ 
      { title: 'স্পনসরশিপ',color:'#FFBA00', icon: <HandshakeIcon />, gradient: '', handleClick:()=>setSponsorShipModal(true) },
      { title: 'ডিভাইস লিস্ট',color:'#E12D90', icon: <LogOut />,  gradient: ` ${user?.user_name.includes('880')?'':'hidden'}`,handleClick:()=>setShowDeviceListModal(true) },
      { title: 'লগ আউট',color:'#E12D90', icon: <LogOut />, gradient: '',handleClick:()=>clearSessionAndRedirect(user?.id||0) }
    ]}

    // Row 2

    // Row 3
    // { title: 'ডাউনলোড', icon: <DownloadIconWithBg />, gradient: 'bg-red-gradient' },
    // { title: 'অ্যাকাউন্ট ডিঅ্যাকটিভেট',color:'#00BDD5', icon: <Delete />, gradient: 'bg-purple-gradient',handleClick:clearSessionAndRedirect },

    // Remaining items (to be shown in a single horizontal row)
  ];

  const showSubscribedOrNot=()=>{
    if(user?.is_subscribed && !user?.canceled_subscription){
      return false;
    }
    return true;
  }

  const handleSubscribeOrUnSubscribe=()=>{
      if(showSubscribedOrNot()){
        router.push(paths.subscribe)
      }else{
        unSubscribeHandler();
      }
    }

  const firstNine = menuItems.slice(0, 9);
  const remainder = menuItems.slice(9);

  if (!user?.id || user?.id===2820) {
    return null; // hide page until user loads
  }
  return (
    <div className={`${container('1300px')} text-white`}>
      {/* Header */}
      <div className="flex justify-between items-center pt-4 md:pt-6 pb-1">
        <div className="flex-1"></div>
        <h1 className="text-xl md:text-2xl font-semibold">প্রোফাইল</h1>
        <div className="flex-1 flex justify-end">
          <button onClick={()=>setProfileInfoModal(true)} className="px-3 py-1.5 flex items-center font-bold border-[1.5px] border-white rounded-[6px] bg-white/10  transition">
            <Settings className="w-5 h-5 md:w-5 md:h-5 sm:mr-1.5" /> <span className='max-sm:hidden'>সেটিংস</span> 
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-1 md:px-4 pb-4">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-4 md:mb-7">
          <div className={`w-24 h-24  md:w-32 md:h-32 object-cover rounded-full bg-gradient-to-br from-pink-500 to-purple-500 p-1 mb-2`}>
            <img
              loading="lazy"
              src={user?.image_url?user?.image_url:siteConfig.defaultProfilePic}
              alt="Profile"
              className="w-full h-full  rounded-[50%]  "
            />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold mb-1">{user?.full_name||"Kabbik User"}</h2>
          <p className="text-gray-400 text-sm">লগিন আইডিঃ {user?.user_name}</p>
        </div>

        {/* Stats Cards - Mobile: 2 cols, Desktop: 3 cols in one line */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-2.5 md:gap-4 mb-6">
          {/* Total Reading Time */}
          <div className="bg-gradient-to-br from-cyan-900/50 to-cyan-950/50 border border-cyan-700/50  rounded-[8px] md:rounded-2xl  p-1 md:p-5 lg:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="p-2 md:p-2.5 bg-cyan-500/20 rounded-[4px]">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-cyan-400 text-cxs md:text-sm font-medium">মোট শোনার সময়</p>
                <p className="text-gray-400 text-[10px] md:text-xs">{getBanglaDateDifference(user?.created_at??'')}</p>
              </div>
            </div>
            <h3 className="text-cn sm:text-clg lg:text-cxl font-bold mb-1 md:mb-2">
              {
                // convertToBanglaDigits(((leaderboardData[0]?.total_streaming_time??0)/3600).toFixed(2))
                formatSeconds(leaderboardData[0]?.total_streaming_time,'bn')
              } 
              {/* <span className="text-cyan-400 text-base md:text-xl lg:text-2xl font-normal">ঘণ্টা</span> */}
            </h3>
            <p className="text-[10px] md:text-xs my-1 text-gray-400 flex items-center gap-1 md:gap-1.5">
              <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5 text-cyan-400" />
              <span>~{
                formatSeconds(
                  leaderboardData[0]?.total_streaming_time/Math.max(getBanglaDateDifference(user?.created_at??'',true) as number,1)
                  ,'bn'
                )
              //   convertToBanglaDigits((
              //     ((leaderboardData[0]?.total_streaming_time??0)/3600)
              //     /
              //     (getBanglaDateDifference(user?.created_at??'',true) as number)||0
              // ).toFixed(2))||0
              } /মাস গড়</span>
            </p>
            <p className="text-[10px] my-1 md:text-xs text-gray-400 flex items-center gap-1 md:gap-1.5">
              <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5 text-cyan-400" />
              <span>গড়ে বছরে {
                formatSeconds(
                  leaderboardData[0]?.total_streaming_time*12/Math.max(getBanglaDateDifference(user?.created_at??'',true) as number,1)
                  ,'bn'
                )
              //   convertToBanglaDigits((
              //     ((leaderboardData[0]?.total_streaming_time??0)/3600)
              //     /
              //     (getBanglaDateDifference(user?.created_at??'',true) as number/12)||0
              // ).toFixed(2))
              } </span>
            </p>
          </div>

          {/* Book Completed */}
          <div className="bg-gradient-to-br from-orange-900/50 to-orange-950/50 border border-orange-700/50  rounded-[8px] md:rounded-2xl  p-1 md:p-5 lg:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="p-2 md:p-2.5 bg-orange-500/20 rounded-[4px]">
                <Book className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-orange-400 text-cxs md:text-sm font-medium">সম্পূর্ণ শোনা মোট বই</p>
                <p className="text-gray-400 text-[10px] md:text-xs">সদস্য {formatDateToBengali(user?.created_at??'')} থেকে</p>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">
              {convertToBanglaDigits(bookFinishedStats[0]?.total_book_finished)} <span className="text-orange-400 text-base md:text-xl lg:text-2xl font-normal">টি বই</span>
            </h3>
            {/* <p className="text-[10px] md:text-cs2 my-1 text-gray-400 flex items-center gap-1 md:gap-1.5">
              <TrendingUp className="w-3 h-3  md:w-3.5 md:h-3.5 text-orange-400" />
              <span><span className='font-bold'>লগিন আইডি:</span> {user?.user_name}</span>
            </p> */}
            <p className="text-[10px] md:text-cs2 my-2 text-gray-400 flex items-center gap-1 md:gap-1.5">
              <TrendingUp className="w-3 h-3  md:w-3.5 md:h-3.5 text-orange-400" />
              <span>
                {/* <span className='font-bold'>ইমেইল: </span>  */}
                {/* {user?.user_email?user?.user_email:"সেটিংস থেকে ইমেইল সেট করুন"} */}
                {convertToBanglaDigits(
                   ( bookFinishedStats[0]?.total_book_finished/Math.max(getBanglaDateDifference(user?.created_at??'',true) as number,1)).toFixed(2)
                  )
                }
                  {`টি বই /মাস গড়`}
              </span>
            </p>
            {/* <p className="text-[10px] md:text-cs2 my-1 text-gray-400 flex items-center gap-1 md:gap-1.5">
              <TrendingUp className="w-3 h-3  md:w-3.5 md:h-3.5 text-orange-400" />
              <span>
                <span className='font-bold'>ফোন নম্বর:</span>  
                {``}</span>
            </p> */}
            <p className="text-[10px] my-1 md:text-xs text-gray-400 flex items-center gap-1 md:gap-1.5">
              <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5 text-orange-400" />
              <span>~গড়ে বছরে {
                convertToBanglaDigits(
                  (bookFinishedStats[0]?.total_book_finished*12/Math.max(getBanglaDateDifference(user?.created_at??'',true) as number,1)).toFixed(2)
                )
              } টি বই</span>
            </p>
          </div>

          {/* Billing Cycle Card - Now part of the grid */}
          <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-purple-900/50 to-purple-950/50 border border-purple-700/50  rounded-[8px] md:rounded-2xl p-1.5 md:p-5 lg:p-6">
            <div className="flex justify-between items-start mb-3 md:mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-2 md:p-2.5 bg-purple-500/20 rounded-[4px]">
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-purple-400 text-xs md:text-sm font-medium">{"বিলিং সাইকেল"}</p>
                  <p className="text-gray-400 text-[10px] md:text-xs">{"পরবর্তী চার্জের তারিখ"}</p>
                </div>
              </div>
              <p className="text-[10px] bg-purple-500/20 rounded-[4px] p-1.5 md:text-xs text-gray-300">{(user?.is_subscribed && !user?.canceled_subscription) ?formatDateToBengali(user?.next_purchase_time):'প্রযোজ্য নয়'}</p>
            </div>

            <div className={`grid ${(user?.is_subscribed && !shouldHideCancelButton(user?.payment_method))?"grid-cols-2":'grid-cols-1 '}  gap-2 md:gap-3 mb-3 md:mb-4`}>
              <button onClick={()=>{user?.is_subscribed?'':router.push(paths.subscribe)}} className="bg-green-600 hover:bg-green-700 text-white py-2 md:py-3 px-3 md:px-4 rounded-xl text-xs md:text-sm font-medium transition">
                <div className="flex items-center justify-center gap-1 md:gap-2 mb-0.5">
                  {user?.is_subscribed?(
                    <>
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                      <span className='whitespace-nowrap'>বর্তমান প্যাকেজ</span>
                    </>
                  ):(
                    <>
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                      <span>প্যাকেজ আপগ্রেড করুন</span>
                    </>
                  )}
                </div>
                <div className="text-[10px] md:text-xs opacity-80">{user?.is_subscribed?user?.subscriptionDetails?.bn_name:"এবং প্রিমিয়াম ফিচার গুলো উপভোগ করুন।"}</div>
              </button>
              <button onClick={()=>{
                  if(user?.canceled_subscription){
                    toast.info("সাবস্ক্রিপশন বন্ধ করা হয়েছে");
                  }else{
                    setCancelSubsModal(true);
                  }
                
                }} 
                className={(
                user?.is_subscribed?
                  (shouldHideCancelButton(user?.payment_method)?'hidden ':' ')
                :'hidden '
                )+ " bg-red-600 hover:bg-red-700 text-white py-2 md:py-3 px-3 md:px-4 rounded-xl text-xs md:text-sm font-medium transition"}>
                <div className="flex  items-center justify-center gap-1 md:gap-2 mb-0.5">
                  <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{user?.canceled_subscription?"সাবস্ক্রিপশন বন্ধ করা হয়েছে":"সাবস্ক্রিপশন বন্ধ করুন"}</span>
                </div>
                {/* <div className="text-[10px] md:text-xs opacity-80">সাবস্ক্রিপশন বন্ধ করুন</div> */}
              </button>
            </div>

            <p className="text-[10px] md:text-xs text-gray-400 flex items-start gap-1.5 md:gap-2">
              <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <span>{(user?.is_subscribed && !user?.canceled_subscription)?`আপনার সাবস্ক্রিপশন স্বয়ংক্রিয়ভাবে নবায়ন হবে ${formatDateToBengali(user?.next_purchase_time)} তারিখে।`:(
                user?.canceled_subscription?"সাবস্ক্রিপশন বন্ধ করা হয়েছে":
                <span onClick={()=>router.push(paths?.subscribe)}>
                  ৩,০০০+ অডিওবুক আনলক করতে অনুগ্রহপূর্বক সাবস্ক্রাইব করুন।
                </span>
              )}</span>
            </p>
          </div>
        </div>

        {/* Starred Section */}
        {/* <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 px-1">Starred</h3>
          <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {firstNine.map((item)=>(
                <button key={item?.title} onClick={item?.handleClick} className={` w-full profile_btn_gradient2  rounded-[8px] md:rounded-[8px]  p-2 flex items-center gap-4 transition group`}>
                    <div style={{background:item?.color}} className={`bg-[${item?.color}] p-3 b w-10 h-10 rounded-xl`}>
                        <span className='w-5 h-5 inline-block' >{item?.icon}</span>
                    </div>
                    <span className="text-base md:text-lg font-medium">{item?.title}</span>
                </button>
            ))}
          </div>
        </div> */}

         <div className="mb-6">
          <div className=" grid md:grid-cols-2 md2:grid-cols-3 lg2:grid-cols-4 gap-3">
            {menuItems.map((item)=>(
              <div key={item?.name} className={''}>
                  <h3 className="text-lg relative font-semibold mb-3 px-1">{item?.name}</h3>
                  {item?.buttons.map((item)=>(
                      <button key={item?.title} onClick={item?.handleClick} className={` ${item?.gradient} w-full relative mb-2 profile_btn_gradient2  rounded-[8px] md:rounded-[8px]  p-2 flex items-center gap-4 transition group  `}>
                          <div style={{background:item?.color}} className={`bg-[${item?.color}]   w-10 h-10 rounded-xl flex items-center justify-center`}>
                              {/* <Gift className="w-5 h-5 md:w-6 md:h-6" /> */}
                              <span className='w-6 h-6 inline-block' >{item?.icon}</span>
                          </div>
                          <span className="text-base md:text-lg font-medium">{item?.title}
                            
                          </span>
                          {item?.hasNewBadge && (
                              <div className="absolute z-[2] top-0.5 right-2 bg-red-600 text-white px-2 py-0.5 rounded-[4px] rotate-[30deg] text-xs font-bold shadow-md">
                                নতুন
                              </div>
                            )}
                      </button>
                  ))}
                </div>
            ))}

            
          </div>
        </div>
      </div>
      <div>
        <GamezopBanner/>
      </div>
      <div>
        <SocialMediaSection/>

    </div>
    {!(user?.is_subscribed===1) && <Ads slotId={6865735489} />}
    <CommonModal
      isOpen={showRobiNumberModal}
      onClose={()=>setShowRobiNumberModal(false)}
    >
      <RobiNumberInput onSubmit={robiUnsubscribed}/>
    </CommonModal>
    <CommonModal
      isOpen={cancelSubsModal}
      showCloseButton={false}
      onClose={()=>setCancelSubsModal(false)}
    >
      <CancelSubscriptionModal onCancel={()=>setCancelSubsModal(false)} onConfirm={unSubscribeHandler}/>
    </CommonModal>
    <CommonModal
      isOpen={showBookRequestModal}
      onClose={()=>{setShowBookRequestModal(false)}}
    >
      <BookInfoForm onclose={()=>{setShowBookRequestModal(false)}}/>
    </CommonModal>

    <CommonModal
      isOpen={showCourses}
      onClose={()=>{setShowCourses(false)}}
    >
      <MyCoursesPage />
    </CommonModal>
    <CommonModal
      isOpen={showLeaderboardModal}
      onClose={()=>{setShowLeaderboardModal(false)}}
    >
      <Leaderboard />
    </CommonModal>
    <CommonModal
      isOpen={showMyRents}
      onClose={()=>{setShowMyRents(false)}}
    >
      <MyRents />
    </CommonModal>
    <CommonModal
      isOpen={showFavoritePage}
      onClose={()=>{setShowFavoritePage(false)}}
    >
      <FavoritesPage />
    </CommonModal>
    <CommonModal
      isOpen={showRedeemModal}
      onClose={()=>{setShowRedeemModal(false)}}
    >
      <ReedemCodeActivate onClose={()=>{setShowRedeemModal(false)}}/>
    </CommonModal>
    <CommonModal
      isOpen={profileInfoModal}
      onClose={()=>{setProfileInfoModal(false)}}
    >
      <ProfileInfoForm onclose={()=>{setProfileInfoModal(false)}}/>
    </CommonModal>
    <CommonModal
      isOpen={showContactModal}
      onClose={()=>{setShowContactModal(false)}}
    >
      <ContactUsModal/>
    </CommonModal>
     <CommonModal
      isOpen={sponsorShipModal}
      onClose={()=>{setSponsorShipModal(false)}}
    >
      <SponsorFormModal onClose={()=>{setSponsorShipModal(false)}}/>
    </CommonModal>
     <CommonModal
      isOpen={showDeviceListModal}
      onClose={()=>{setShowDeviceListModal(false)}}
    >
      <DeviceLimitModal />
    </CommonModal>
    {/* <CommonModal
      isOpen={true}
      onClose={()=>{setCancelSubsModal(false)}}
    >
      <CancelSubscriptionModal onConfirm={()=>{}} onCancel={()=>{}} />
    </CommonModal> */}
    </div>
  );
}