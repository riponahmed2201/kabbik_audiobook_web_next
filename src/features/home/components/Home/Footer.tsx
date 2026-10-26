'use client'
import { siteConfig } from "@/config/config";
import FaceBook from "@/svgs/FaceBook";
import InstagramIcon from "@/svgs/InstagramIcon";
import LinkedInIcon from "@/svgs/LinkedInIcon";
import Tiktok from "@/svgs/Tiktok.svg";
import Twiter from "@/svgs/Twiter.svg";
import Youtube from "@/svgs/Youtube.Icon";
import styles from "./static/Footer.module.css"
import { footer } from "./static/utils";
import AboutIcon, { AboutIcon2, AboutIcon3 } from "@/svgs/AboutIcon";
import TermsIcon from "@/svgs/Terms&Policy.svg";
import PhoneIcon from "@/svgs/PhoneIcon";
import UkFlagIcon, { BdFlagIcon } from "@/svgs/UkFlag.svg";
import { use, useEffect, useState } from "react";
import { NewsLetterNotificationSubs } from "@/utils/apiServices";
import { useAppSelector } from "@/store/store";
import { toast } from "react-toastify";
import Spinner from "@/shared/ui/Spinner.view";
import Link from "next/link";
import Image from "next/image";

const FOOTER_ANIMATED_LOGO_SRC =
  "https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/final2.gif";
import { paths } from "@/utils/Paths";
import { convertToBanglaDigits } from "@/helpers/commonFunction";
import { Ads } from "@/features/entertainment/components/Ads/Ads";
import { InFeedAds } from "@/features/entertainment/components/Ads/InFeedAdd";

export default function Footer() {
  const [email,setEmail]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const user=useAppSelector((state)=>state.user.userData);

  const handleSubmit=async(e:any)=>{
    e.preventDefault();
    if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    await NewsLetterNotificationSubs(user?.id??0,email)
    setError("");
    toast.success("NewsLetter Subscribed Successfully");
    // Call API to submit email
    setEmail("");
    setLoading(false);
  }
  return (
    <>
    {!(user?.is_subscribed===1) && <InFeedAds slotId={1249366126} layoutKey="-fb+5w+4e-db+86" />}
    {!(user?.is_subscribed===1) && <Ads slotId={5607041433} />}
      <footer className="bg-[#06152B] z-[2] relative text-white mt-10">
      {/* Newsletter Section */}
      <div className="px-4 max-w-[1400px] w-[97%] mx-auto py-8">
        <div className="flex flex-col md:flex-row items-start justify-between lg:items-center gap-8 ">
          {/* Newsletter Text */}
          <div className="flex-1 max-w-2xl">
            <h2 className="gradient-text text-cn2 sm:text-clg md:text-[24px] font-bold mb-3 font-inter">
              <span className="">
                Kabbik-এর নিউজলেটারে সাবস্ক্রাইব করুন
              </span>
            </h2>
            <p className="text-cs2 sm:text-cn md:text-lg text-white/90 font-inter">
              আপনার ইমেইল দিন—সব আপডেট, ইভেন্ট ও অফার আগে আগে পেতে।

              {/* <br className="hidden lg:block " />
              বিশেষ অফার সম্পর্কে জানতে। */}
            </p>
          </div>

          {/* Newsletter Form */}
          <div className=" lg:w-auto lg:max-w-[520px] w-full md:w-[40%] lg2:w-[35%]">
            <div className="flex bg-white justify-between rounded-[8px] p-2">
              <input
                type="email"
                placeholder="ইমেইল এড্রেস"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                className="flex-1 max-md:text-cs2 max-w-[65%] outline-none border-0 text-[#06152B]  placeholder:text-[#06152B]/50 focus-visible:ring-0 bg-transparent font-inter"
              />
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-to-b from-[#96256A] to-[#C84172] text-white px-1 md:px-4 py-1 md:py-2 font-medium sm:font-semibold  text-cxs xxs:text-cs  sm:text-cs2 md:text-cn2 rounded hover:opacity-90 transition-opacity font-inter"
              >
                {loading ? <Spinner size = "w-4 h-4"/> : ""}
                সাবস্ক্রাইব
              </button>
            </div>
            <p className=" text-cxs xxs:text-cs 2 text-red-400">{error}</p>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-[1px] bg-white/20"></div>
      <div className=" flex xs2:hidden justify-center mx-auto pt-4 w-[70%]">
          <Image
            src={FOOTER_ANIMATED_LOGO_SRC}
            alt="Kabbik Logo"
            width={780}
            height={193}
            sizes="70vw"
            className="w-[100%] max-h-[193px] h-auto object-contain"
            loading="lazy"
            unoptimized
          />
        </div>
      {/* Main Footer Content */}
      <div className="flex  justify-between max-w-[1400px] w-[97%] mx-auto py-12">
        <div className="flex flex-wrap justify-between  sm:w-[80%]">
          {/* Logo and Social Media */}
          <div className="flex-shrink-0 mb-5 max-xs2:w-full xs2:min-w-[175px]">
            <div className="mb-8">
              <img
                src={siteConfig.logo}
                alt="Kabbik Logo"
                className="h-16 w-auto max-xs2:mx-auto"
              />
            </div>

            {/* Social Media */}
            <div className="flex gap-2 max-xs2:justify-around">
              {footer.map((social, index) => (
                <Link href={social.link} key={social.name} className={styles.social_icons}>
                  <div className="p-1">
                    {social.icon}
                  </div>
                  <span className="text-[6px] text-white font-hind">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
          

          {/* Footer Links Grid */}
            {/* About Section */}
            <div className="sm:space-y-4 max-sm:ml-1 mb-5 max-1350:hidden min-w-[110px]">
              <div className="flex items-center gap-3">
                <span className="w-5 inline-block h-5">
                    <AboutIcon2/>
                </span>
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#CC4473] to-[#871C68] bg-clip-text text-transparent font-hind">
                  About
                </h3>
              </div>
              <Link href={paths.about} className="text-white/90 font-hind"> About Kabbik</Link>
            </div>

            {/* Terms & Policies */}
            <div className="sm:space-y-4  mb-0 sm:mb-5 min-w-[150px] sm:min-w-[214px]">
              <div className="flex items-center gap-1.5 sm:gap-3">
                <span className="w-4 sm:w-6 h-6"><TermsIcon/></span>
                
                <h3 className="text-cs sm:text-cn md:text-lg   font-bold bg-gradient-to-r from-[#CC4473] to-[#871C68] bg-clip-text text-transparent font-hind">
                  Terms & Policies
                </h3>
              </div>
              <div className="sm:space-y-2">
                <p><Link href={paths.terms_condition} className="text-white/90  text-cxs xxs:text-cs  sm:text-cs2 md:text-cs2 font-hind">Terms and Conditions</Link></p>
                <p><Link href={paths.privacy_policy} className="text-white/90  text-cxs xxs:text-cs  sm:text-cs2 md:text-cs2 font-hind">Privacy Policy</Link></p>
                <p><Link href={paths.returnpolicy} className="text-white/90  text-cxs xxs:text-cs  sm:text-cs2 md:text-cs2 font-hind">Refund and Return Policy</Link></p>
                 <p><Link href={paths.faq} className="text-white/90  text-cxs xxs:text-cs  sm:text-cs2 md:text-cs2 font-hind">FAQ</Link></p>
              </div>
            </div>

            <div className="space-y-6 sm:hidden  sm:mb-5 max-w-[150px] sm:max-w-[204px]">
            {/* UK Office */}
            <div className="sm:space-y-3">
              <div className="flex items-center gap-1">
                <div className="w-6 h-4 flex items-center justify-center">
                  <span className="w-4 sm:w-6 h-4">
                    <UkFlagIcon/>
                  </span>
                </div>
                <h4 className="text-cs sm:text-cn md:text-lg   font-bold bg-gradient-to-r from-[#CA4373] to-[#95246A] bg-clip-text text-transparent font-hind">
                  UK Office:
                </h4>
              </div>
              <p className=" text-cxs xxs:text-cs  sm:text-cs2 md:text-cs2 text-white/90 font-hind">
                Suite #1-272 39 Ludgate Hill,
                London,
                United Kingdom,
                EC4M 7JN
              </p>
            </div>

            {/* Bangladesh Office */}
            <Link href={paths.about} className=" sm:hidden 1350:hidden mt-5 min-w-[110px]">
                <div className="flex items-center">
                  <span className="w-5 h-5 inline-block">
                      <AboutIcon3/>
                  </span>
                  <h3 className="text-cn md:text-lg   font-bold bg-gradient-to-r from-[#CC4473] to-[#871C68] bg-clip-text text-transparent font-hind">
                    About
                  </h3>
                </div>
                <p className="text-white/90  text-cxs xxs:text-cs  sm:text-cs2 md:text-cs2 font-hind">About Kabbik</p>
              </Link>
          </div>
          
          

            {/* Contact Us */}
            <div className="sm:space-y-4  mb-5 w-[160px] sm:min-w-[267px]">
              <div className="flex items-center gap-1.5 sm:gap-3">
                <span className="w-4 sm:w-5 h-5">
                    <PhoneIcon/>
                </span>
                <h3 className="text-cs sm:text-cn md:text-lg   font-bold bg-gradient-to-r from-[#B83970] to-[#96246A] bg-clip-text text-transparent font-hind">
                  Contact Us
                </h3>
              </div>
              <div className="space-y-1">
                <p className=" text-white/90  text-cxs xxs:text-cs  sm:text-cs2 md:text-cs2 font-hind">Call or WhatsApp: +8801915225026</p>
                <p className=" text-white/90  text-cxs xxs:text-cs  sm:text-cs2 md:text-cs2 font-hind break-words">Email: support@wondersoftsolution.com</p>

              </div>

              <Link href={paths.about} className="mb-5 max-sm:hidden 1350:hidden mt-3 min-w-[110px]">
                <div className="flex items-center">
                  <span className="w-5 h-5 inline-block">
                      <AboutIcon/>
                  </span>
                  <h3 className="text-cn md:text-lg   font-bold bg-gradient-to-r from-[#CC4473] to-[#871C68] bg-clip-text text-transparent font-hind">
                    About
                  </h3>
                </div>
                <p className="text-white/90  text-cxs xxs:text-cs  sm:text-cs2 md:text-cs2 font-hind">About Kabbik</p>
              </Link>
            </div>

          {/* Office Locations */}
          <div className="space-y-6 max-sm:hidden  mb-5 max-w-[150px] sm:max-w-[204px]">
            {/* UK Office */}
            <div className="sm:space-y-3">
              <div className="flex items-center gap-1">
                <div className="w-6 h-4 flex items-center justify-center">
                  <span className="w-4 sm:w-6 h-4">
                    <UkFlagIcon/>
                  </span>
                </div>
                <h4 className="text-cs sm:text-cn md:text-lg   font-bold bg-gradient-to-r from-[#CA4373] to-[#95246A] bg-clip-text text-transparent font-hind">
                  UK Office:
                </h4>
              </div>
              <p className=" text-cxs xxs:text-cs  sm:text-cs2 md:text-cs2 text-white/90 font-hind">
                Suite #1-272 39 Ludgate Hill,
                London,
                United Kingdom,
                EC4M 7JN
              </p>
            </div>

            {/* Bangladesh Office */}
            {/* <div className="space-y-3">
              <div className="flex items-center gap-1">
                <div className="w-6 h-4 flex items-center justify-center">
                  <span className="w-6 h-4" >
                    <BdFlagIcon/>
                  </span>
                </div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-[#CA4373] to-[#95246A] bg-clip-text text-transparent font-hind">
                  Bangladesh Office:
                </h4>
              </div>
              <p className="text-sm text-white/90 font-hind">
                House: JA-70, 2nd Floor, Link Road, Gudaraghat,Dhaka-1212
              </p>
            </div> */}
          </div>
        </div>

        {/* Bottom Logo */}
        <div className=" flex max-xs2:hidden justify-center w-[40%] sm:w-[22%]  md:w-[18%]">
          <Image
            src={FOOTER_ANIMATED_LOGO_SRC}
            alt="Kabbik Logo"
            width={400}
            height={193}
            sizes="(max-width: 768px) 40vw, (max-width: 1024px) 22vw, 18vw"
            className="w-[100%] max-h-[193px] h-auto object-contain"
            loading="lazy"
            unoptimized
          />
        </div>

        {/* Bottom Separator */}
      </div>
    <div className="h-[1px] bg-white/20 mt-0"></div>

      {/* Copyright */}
      <div className="text-center py-4 text-gray-400">
        <p className="text-lg font-inter">© {convertToBanglaDigits(new Date().getFullYear())} কাব্যিক অডিওবুক — সর্বস্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
    </>
  );
}
