import FaceBook from "@/svgs/FaceBook";
import InstagramIcon from "@/svgs/InstagramIcon";
import LinkedInIcon from "@/svgs/LinkedInIcon";
import ProfilePagesvg from "@/svgs/ProfilePagesvg.view";
import Tiktok from "@/svgs/Tiktok.svg";
import Youtube from "@/svgs/Youtube.Icon";
// import FaceBook from "@/svgs/FaceBook";
import { container } from "../ui/static/tailwind.classes";
import Link from "next/link";
// import { Facebook, FacebookIcon } from "lucide-react";

export default function SocialMediaSection() {
  const socials = [
    { icon: <span className="text-[#006CF9]"><FaceBook  /></span>, text: "কাব্যিক ফেসবুক পেজ",link:'https://www.facebook.com/kabbikAudiobookOfficial' },
    { icon: <span className="text-[#B93A70]"><InstagramIcon /></span>, text: "কাব্যিক ইনস্টাগ্রাম",link:'https://www.bing.com/ck/a?!&&p=d91c54be54d78d17265928b41fe4f4133cb4e02e60c1216982572c441d96fd6eJmltdHM9MTc2MjA0MTYwMA&ptn=3&ver=2&hsh=4&fclid=09899d99-39ba-6d53-0355-884738e06ce3&psq=kabbik+instagram&u=a1aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9rYWJiaWthdWRpb2Jvb2tvZmZpY2lhbC8',
       },
    { icon: <span className="text-[#0072B1]"><LinkedInIcon /></span>, text: "কাব্যিক লিংকডইন" ,link:'https://www.linkedin.com/company/kabbikaudiobookofficial/',
      },
    { icon: <span className="text-[#FF0000]"><Youtube /></span>, text: "কাব্যিক ইউটিউব",link:'https://www.youtube.com/@kabbikAudiobookOfficial',
       },
    { icon: <span className="text-[#060F1E]"><Tiktok  /></span>, text: "কাব্যিক টিকটক",link:'https://www.tiktok.com/@kabbik_audiobook',
     },
  ];

  return (
    <div className={`${container('1300px')} text-white z-[2] relative rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8`}>
      {/* Left illustration */}
      <div className="flex items-center justify-center w-full md:w-1/2">
        <div className="relative max-w-full">
          <div className="absolute  rounded-full max-w-24 max-h-24 -top-6 -left-6 blur-xl opacity-40"></div>
          <div className="w-full h-full">
            <ProfilePagesvg/>
          </div>
        </div>
      </div>

      {/* Right content */}
      <div className="w-full md:w-1/2 space-y-5">
        <h2 className="text-xl md:text-[25px] font-semibold text-center md:text-left">
          কাব্যিক সব সোশ্যাল প্ল্যাটফর্মেই আছে
        </h2>
        <div className="space-y-3">
          {socials.map((item, index) => (
            <Link
                href={item?.link}
                key={index}
                className="flex items-center gap-3  rounded-[4px] px-4 py-2 text-gray-900 bg-white transition"
            >
              <div className="text-2xl w-[30px]">{item.icon}</div>
              <p className="text-lg">{item.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
