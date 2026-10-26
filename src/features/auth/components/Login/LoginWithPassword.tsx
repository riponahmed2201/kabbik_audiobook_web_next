import BdFlag from "@/svgs/BdFlag.svg";
import { EyeOffIcon } from "lucide-react";
import { useState } from "react";

// Bangladesh Flag Icon Component


export default function LoginWithPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    // Handle login logic here
    //console.log("Login attempt", { phoneNumber, password, rememberMe });
  };

  return (
    <div className=" bg-login-bg font-inter flex items-center justify-center ">
      <div className="w-full max-w-[932px] bg-gradient-to-b from-gray-50/[0.01] to-gray-50/[0.01] rounded-2xl border p-6 border-[#EAEAEA] ">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-white font-inter font-semibold text-2xl leading-normal mb-3">
            লগইন
          </h1>
          <p className="text-white font-inter  leading-normal">
            ডোন্ট হ্যাভ এন অ্যাকাউন্ট?{" "}
            <span className="text-red-600 cursor-pointer hover:underline">
              সাইন আপ
            </span>
          </p>
        </div>

        {/* Form Section */}
        <div className="space-y-6 sm:space-y-8">
          {/* Phone Number Field */}
          <div>
            <label className="block text-white font-inter  mb-2 ">
              ফোন নম্বর
            </label>
            <div className="relative">
              <div className="flex items-center border border-white rounded-[4px]  shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] bg-transparent">
                {/* Country Code Section */}
                <div className="flex items-center gap-2 px-1 py-2 border-r border-white/20">
                  <div className="flex items-center gap-1">
                    <span className="w-5 h-5 inline-block">
                        <BdFlag />
                    </span>
                    {/* <B /> */}
                  </div>
                  <span className="text-white font-inter  ml-2">
                    +88
                  </span>
                </div>
                {/* Phone Input */}
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="আপনার ফোন নম্বর লিখুন"
                  className="flex-1 bg-transparent text-white placeholder-text-gray font-inter text-cn  px-1 py-2 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white font-inter mb-2 ">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <div className="flex items-center border py-2 border-white rounded-[4px] shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] bg-transparent">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  className="flex-1 bg-transparent text-white placeholder-text-gray font-inter text-cn  px-4   outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-2 "
                >
                  <EyeOffIcon size={20} color="gray" />
                </button>
              </div>
            </div>
            <div className="flex justify-between">
                <div>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        // className="sr-only"
                        id="checkbox_login"
                    />
                    <label htmlFor="checkbox_login" className="text-muted3 ml-0.5 font-inter text-xs">
                        পরবর্তীতে স্বয়ংক্রিয় লগইন করুন
                    </label>
                </div>
                <div>
                     <button
                        type="button"
                        className="text-orange-400 ml-4 font-inter text-xs hover:underline text-left sm:text-right"
                    >
                    পাসওয়ার্ড ভুলে গেছেন
                    </button>
                </div>
              </div>
          </div>

          {/* Remember Me and Forgot Password */}
         
          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-brand-red text-white font-inter  font-medium py-2 rounded-[4px]  shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] bg-red-700 transition-colors duration-200 mt-8 sm:mt-12"
          >
            লগইন করুন
          </button>
        </div>
      </div>
    </div>
  );
}
