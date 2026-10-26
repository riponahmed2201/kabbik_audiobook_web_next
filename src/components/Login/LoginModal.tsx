"use client";
import BdFlag from "@/svgs/BdFlag.svg";
import Google from "@/svgs/Google.svg";
import FaceBook from "@/svgs/FaceBook";
import React, { MouseEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import { isValidMsisdn } from "@/helpers/commonFunction";
import Spinner from "../ui/Spinner.view";
import { TLoginModal } from "./static/login.type";
import { useAppSelector } from "@/store/store";

const LoginModal = ({ handleSubmit }: TLoginModal) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const router = usePathname();
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [errors, setErrors] = useState("");
  const [submitLoader, setSubmitLoader] = useState(false);
  const loginReduxData = useAppSelector((store) => store?.loginSlice?.value);

  const [isAndroidWebView, setIsAndroidWebView] = useState(false);

  useEffect(() => {
    let userAgent = navigator.userAgent;
    // const isAndroid = /Android/.test(userAgent);
    const hasWV = userAgent.includes("wv");
    setIsAndroidWebView(hasWV);
  }, []);

  useEffect(() => {
    if (typeof loginReduxData === "string") {
      // alert(loginReduxData+'kkkk')

      setPhoneNumbers(loginReduxData);
    }
  }, []);

  const locale = router?.split("/")[1] || "bn";
  const socialCallbackUrl = `/${locale}/redirecting?route=${encodeURIComponent(router || `/${locale}`)}`;

  const googleBtn = async () => {
    try {
      const res = await signIn("google", {
        callbackUrl: socialCallbackUrl,
      });
      // const res = await signIn("google", { callbackUrl: "/" })
      console.log(" --- res from google login fx:", res);
    } catch (error: any) {
      console.log(" --- error from google login fx:", error);
    }
  };

  const facebookBtn = async () => {
    try {
      await signIn("facebook", {
        callbackUrl: socialCallbackUrl,
      });
    } catch (error: any) {
      console.log(" --- error from facebook login fx:", error);
    }
  };

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!isValidMsisdn(phoneNumbers)) {
      setErrors("আপনার নম্বর সঠিক নয়, দয়া করে ১১ টি সংখ্যা প্রবেশ করুন");
      return;
    }
    setSubmitLoader(true);
    await handleSubmit(e, phoneNumbers);
    setSubmitLoader(false);
  };

  return (
    <div className="w-[100%] max-w-2xl  border border-gray-300 rounded-2xl shadow-lg p-5 ">
      <div className="flex flex-col gap-2 md:gap-4">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-cn md:text-lg font-semibold">
            লগইন / সাইনআপ করুন
          </h1>
        </div>

        {/* Social Login Section */}
        {isAndroidWebView ? (
          ""
        ) : (
          <>
            <div className="flex flex-col justify-center gap-3 md:gap-7">
              {/* Google Button */}
              <button
                onClick={googleBtn}
                className="w-full bg-gray-300 hover:bg-gray-200 transition-colors rounded-[4px] shadow-md  py-1.5 px-2 md:px-4 flex items-center gap-4 sm:gap-8 md:gap-12"
              >
                <div className="w-full flex justify-center">
                  <div className="w-5 md:w-6 h-6 mr-4 flex-shrink-0">
                    <Google />
                  </div>
                  <span className="text-black text-cn md:text-xl font-semibold">
                    গুগল
                  </span>
                </div>
              </button>

              {/* <button
                onClick={facebookBtn}
                className="w-full bg-[#1877F2] hover:bg-[#166fe5] transition-colors rounded-[4px] shadow-md py-1.5 px-2 md:px-4 flex items-center gap-4 sm:gap-8 md:gap-12"
              >
                <div className="w-full flex justify-center">
                  <div className="w-5 md:w-6 h-6 mr-4 flex-shrink-0 text-white">
                    <FaceBook />
                  </div>
                  <span className="text-white text-cn md:text-xl font-semibold">
                    ফেসবুক
                  </span>
                </div>
              </button> */}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white"></div>
              <span className="text-white text-sm px-4">অথবা</span>
              <div className="flex-1 h-px bg-white"></div>
            </div>
          </>
        )}
        {/* Phone Input Section */}
        <div className="flex flex-col gap-2">
          <label className="text-white font-medium">ফোন নম্বর</label>

          <div className="relative">
            <div className="w-full border border-white  rounded-[4px] shadow-md bg-transparent">
              <div className="flex items-center">
                {/* Country Code Section */}
                <div className="flex items-center gap-2 px-1  py-2 border-r border-gray-300">
                  <div className=" md:w-7 h-7 flex-shrink-0">
                    <BdFlag />
                  </div>
                  <span className="text-white text-cn md:text-cn">+88</span>
                </div>

                {/* Phone Input */}
                <input
                  type="tel"
                  value={phoneNumbers}
                  onChange={(e) => {
                    setPhoneNumbers(e.target.value);
                    setErrors("");
                  }}
                  placeholder="আপনার ফোন নম্বর লিখুন"
                  className="flex-1 text-cn md:text-cn bg-transparent text-white placeholder-gray-400 px-1 focus:outline-none"
                />
              </div>
            </div>
            <p className="text-xs text-red-600">{errors}</p>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-red-600 hover:bg-red-700 transition-colors rounded-[4px] shadow-md py-1.5 px-6 flex items-center justify-center"
          disabled={submitLoader}
        >
          {submitLoader ? <Spinner size="w-6 h-6" /> : ""}
          <span className="text-white  font-medium">কন্টিনিউ</span>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
