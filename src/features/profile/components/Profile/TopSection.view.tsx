'use client'
import { siteConfig } from "@/config/config";
import { convertToBanglaDigits, decodeWord, formatDateToBengali } from "@/helpers/commonFunction";
import { useAppSelector } from "@/store/store";
import CurrentPackage from "@/svgs/CurrentPackage.svg";
import Tik from "@/svgs/Tik.svg";
import { paths } from "@/utils/Paths";
import { Edit, Clock, BookOpen, CreditCard, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import SocialMediaSection from "./SocialMediaSection.view";

export default function TopSection({unSubscribeHandler,editProfile}:{
  unSubscribeHandler:()=>void,
  editProfile:()=>void
}) {
  const user=useAppSelector(store=>store.user.userData)
  let router= useRouter();

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
  return (
    <div className="bg-[#121B46] z-[2] relative py-6 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Profile Container */}
        <div className="bg-[#121B46] rounded-xl border border-[#2f3556] p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Section */}
            <div className="flex items-center gap-6 flex-1 min-w-0">
              {/* Profile */}
              <div className="relative">
                <div
                  className="w-[90px] h-[90px] rounded-full bg-cover bg-center relative "
                  // style={{
                  //   backgroundPosition:'cover',
                  //   backgroundImage:
                  //     `url('${user?.is_subscribed ?siteConfig.defaultPremiumPic :siteConfig.defaultProfilePic}')`,
                  // }}
                >
                  <img loading="lazy" className="max-w-full max-h-full" src={user?.is_subscribed ?siteConfig.defaultPremiumPic :siteConfig.defaultProfilePic}/>
                  <div onClick={editProfile} className="absolute bottom-1 right-1 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-sm cursor-pointer">
                    <Edit className="w-3.5 h-3.5 text-[#060F1E]" />
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="min-w-0">
                <h1 className="text-clg font-semibold text-white mb-1 truncate">
                  {user?.full_name}
                </h1>
                <p className="text-white/80 text-cs">সদস্য {formatDateToBengali(user?.created_at??'')} থেকে</p>
              </div>
            </div>

            {/* Middle Stats */}
            <div className="flex items-center md:w-[45%] flex-wrap gap-8 text-white text-sm flex-1 ">
              {/* Hours */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2D7FF9] flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" />
                  
                </div>
                <div>
                  <div className="font-semibold">লগিন আইডি</div>
                  <div className="text-xs opacity-75">{user?.user_name}</div>
                </div>
              </div>

              {/* Books */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2D7FF9] flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div> 
                  <div className="font-semibold">৩০০০+ প্রিমিয়াম বই</div>
                  <div className="text-xs opacity-75">{"এখন আপনার হাতের মুঠোয়"} </div>
                </div>
              </div>

              {/* Billing */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2D7FF9] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm">{user?.is_subscribed?`সাবস্ক্রিপশন বিলিং চক্র ${convertToBanglaDigits(user?.subscriptionDetails?.days)} দিন`:'আপনি বর্তমানে ফ্রি প্ল্যানে আছেন।'}</div>
                  <div className="text-xs text-white/70">{user?.is_subscribed?`পরবর্তী বিল: ${formatDateToBengali(user?.next_purchase_time)}।`:"প্রিমিয়াম বইয়ের উপভোগ করতে এখনই সাবস্ক্রাইব করুন!"}</div>
                </div>
              </div>
            </div>

            {/* Right Subscription Card */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 w-full md:w-auto md:justify-end">
              {/* Notice */}
              <div className="bg-white/5 backdrop-blur border rounded-[8px] z-[1] relative h-full border-white/10 p-3 w-full md:max-w-[180px] shadow-sm">
                <div className="text-center text-white text-[15px] leading-[1.6] mb-3">
                {user?.is_subscribed?(
                  <>
                    আপনার সক্রিয় <br/>
                    সাবস্ক্রিপশন চলছে ।<br/>
                    সাবস্ক্রিপশন বাতিল <br/>
                    করলে, আপনি প্যাকেজের    <br/>
                    সুবিধা আর গ্রহণ করতে <br/>
                    পারবেন না ।<br/> 
                  </>
                ):(
                  <>
                    আপনার সক্রিয় <br/>
                    সাবস্ক্রিপশন নেই ।<br/>
                    দারুণ সব বইয়ের অ্যাক্সেস<br/>
                    এবং প্রিমিয়াম ফিচার<br/>
                     আনলক করতে   <br/>
                    এখনই সাবস্ক্রাইব করুন! <br/>
                    {/* পারবেন না ।<br/>  */}
                  </>
                )}
                </div>
                <button onClick={handleSubscribeOrUnSubscribe} className="w-full bg-[#FF2D2D] text-white text-sm py-2 rounded mt-5">
                  {showSubscribedOrNot()?"সাবস্ক্রাইব":"আন-সাবস্ক্রাইব"}
                </button>
              </div>

              {/* Premium Card */}
              {user?.is_subscribed?<div className="relative w-full md:max-w-[200px]">
                <div className="relative rounded-[4px] border border-white/10 p-4 ">
                  {/* Badge */}
                  <span className="w-32 rounded-[100%] h-3w-32 inline-block absolute top-[-30px] left-[-40px] bg-[#121B46]">
                    <CurrentPackage/>
                  </span>
                  {user?.subscriptionDetails?.banner_name?
                  <div className="absolute -top-2 right-2 bg-gradient-to-r from-[#FF8FA4] to-[#BD3856] text-white text-[10px] px-2 py-1 rounded-full shadow">
                    {/* 🔥 টপ পিক */}
                    {decodeWord(user?.subscriptionDetails?.banner_name)}
                  </div>:''}

                  {/* Duration */}
                  <div className="text-center mb-2 z-10 relative">
                    <h3 className="text-[#E5C135] text-lg font-bold">{decodeWord(user?.subscriptionDetails?.bn_name)}</h3>
                  </div>

                  {/* Pricing */}
                 <div className="border border-muted2 z-10 relative rounded-[4px] py-2 mt-6 px-2 subscribe_gradient">
                     <div className="text-center mb-3 z-10 relative">
                        <div className="flex items-center justify-center gap-2">
                        <span className="text-white/60 text-sm line-through">{user?.subscriptionDetails?.base_amount_bn}</span>
                        <span className="text-white text-2xl font-bold">{user?.subscriptionDetails?.amount}</span>
                        {/* <span className="text-white/80 text-sm">৳</span> */}
                        </div>
                        <div className="text-white text-[12px] mt-1">(অটো-রিনিউয়াল)</div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {/* {//console.log(JSON.parse(user?.subscriptionDetails?.benefit??""))} */}
                        {JSON.parse(user?.subscriptionDetails?.benefit??"")?.map((feature:any, idx:number) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full  flex items-center justify-center ">
                                <span className="w-2.5 h-2.5 text-white">
                                    <Tik  />
                                </span>
                                </div>
                                <div className="text-white text-[8px]">{feature?.title}</div>
                            </div>
                        ))}
                    </div>
                 </div>
                </div>
              </div>:''}
            </div>
          </div>
        </div>
      </div>  
      
    </div>
  );
}
