"use client";

import FaceBook from "@/svgs/FaceBook";
import LinkedInIcon from "@/svgs/LinkedInIcon";
import Youtube, { Youtube2 } from "@/svgs/Youtube.Icon";
import { Mail, Phone, MapPin, Facebook, Linkedin } from "lucide-react";


const ContactUsModal = () => {
  return (
      <div className=" bg-slate-900  rounded-[12px] flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        
        {/* Main Content */}
        <div className=" rounded-xl  p-5">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-xl font-bold text-white mb-2">
              যোগাযোগ করুন
            </h1>
            <p className="text-slate-300 text-xs">
              {`আপনার যেকোনো জিজ্ঞাসা বা সহযোগিতার জন্য আমাদের সাথে যোগাযোগ করুন। আমরা আপনাকে সর্বোত্তম সহায়তা দিতে প্রতিশ্রুতিবদ্ধ।`}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-2 mb-5">
            {/* Email */}
            <div className="bg-slate-900/50 border border-slate-600 rounded-[6px] p-3 flex items-center gap-3  transition-all">
              <div className="bg-orange-500/20 p-2 rounded-[6px]">
                <Mail size={16} className="text-orange-400" />
              </div>
              <a 
                href="mailto:support@wondersoftsolution.com"
                className="text-white text-xs  transition-colors break-all"
              >
                support@wondersoftsolution.com
              </a>
            </div>

            {/* Phone */}
            <div className="bg-slate-900/50 border border-slate-600 rounded-[6px] p-3 flex items-center gap-3  transition-all">
              <div className="bg-green-500/20 p-2 rounded-[6px]">
                <Phone size={16} className="text-green-400" />
              </div>
              <a 
                href="tel:+8801915225026"
                className="text-white text-xs  transition-colors"
              >
                +8801915225026
              </a>
            </div>

            {/* Address */}
            {/* <div className="bg-slate-900/50 border border-slate-600 rounded-[6px] p-3 flex items-start gap-3  transition-all">
              <div className="bg-orange-500/20 p-2 rounded-[6px] mt-0.5">
                <MapPin size={16} className="text-orange-400" />
              </div>
              <p className="text-white text-xs leading-relaxed">
                167-169 Great Portland street, 5th Floor, London, United Kingdom W1W PF
              </p>
            </div> */}
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 mb-5"></div>

          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-4">
            <a 
              href="https://www.facebook.com/kabbikAudiobookOfficial"
              className="  transition-all hover:scale-110"
              aria-label="Facebook"
            >
              <span className="w-7 h-7 inline-block"><FaceBook/></span>
              {/* <FaceBook size={18} className="text-slate-300" /> */}
            </a>
            <a 
              href="https://www.youtube.com/channel/UCuaKfe_NyVViSRTx25VhkWQ"
              className=" text-white  transition-all hover:scale-110"
              aria-label="YouTube"
            >
              <span className="w-7 h-5 inline-block "><Youtube2 color="white"  /></span>
              {/* <Youtube size={18} className="text-slate-300" /> */}
            </a>
            <a 
              href="https://www.linkedin.com/company/kabbikaudiobookofficial/"
              className="  transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <span className="w-7 h-7 inline-block"><LinkedInIcon/></span>
              {/* <Linkedin size={18} className="text-slate-300" /> */}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsModal;
{/* <div
        className="profile_btn_gradients text-white rounded-2xl p-6 sm:p-8 shadow-lg 
                   flex flex-col gap-6 transition-all duration-300"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-wide">Get in Touch</h2>
          <p className="text-sm text-gray-200">
            We’d love to hear from you. Reach out anytime.
          </p>
        </div>

        <div className="space-y-4 text-sm sm:text-base">
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition">
            <Mail className="text-yellow-300 w-5 h-5 shrink-0" />
            <a href="mailto:support@wondersoftsolution.com" className="hover:underline">
              support@wondersoftsolution.com
            </a>
          </div>

          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition">
            <Phone className="text-green-300 w-5 h-5 shrink-0" />
            <a href="tel:+8801915225026" className="hover:underline">
              +8801915225026
            </a>
          </div>

          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 hover:bg-white/20 transition">
            <MapPin className="text-red-300 w-5 h-5 shrink-0" />
            <span>167-169 Great Portland street, 5th Floor,London,United Kingdom W1W PF</span>
          </div>
        </div>

        <div className="border-t border-white/20 my-2" />

        <div className="flex justify-center gap-6">
          <a
            href="https://www.facebook.com/kabbikAudiobookOfficial"
            target="_blank"
            className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition"
          >
            <Facebook className="w-6 h-6 text-blue-300" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCuaKfe_NyVViSRTx25VhkWQ"
            target="_blank"
            className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition"
          >
            <Youtube className="w-6 h-6 text-red-300" />
          </a>
          <a
            href="https://www.linkedin.com/company/kabbikaudiobookofficial/"
            target="_blank"
            className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition"
          >
            <Linkedin className="w-6 h-6 text-sky-300" />
          </a>
        </div>
      </div> */}