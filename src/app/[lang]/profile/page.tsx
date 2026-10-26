import { auth } from '@/app/lib/auth';
import ProfileDashboard from '@/components/Profile/Profile2.view';
import Profiles from '@/components/Profile/ProfileOptions.view'
import TopSection from '@/components/Profile/TopSection.view'
import React from 'react'

export const metadata = {
  title: "Profile | Kabbik",
  description: "Learn more about Kabbik and our story.",
};

const page = async() => {
  const session = await auth();
  return (
    <div>
        {/* <div className='h-[100px] mt-[-100px] bg-[#0E1D3F]'/>
        <div className='relative'>
           <div className={`bg-[url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/kabbikGalaryBg-min2-min.jpg')] bg-cover opacity-20 w-full h-[126px] absolute left-0 `}></div>
          <div className="container mx-auto px-4 pt-6 pb-3 ">
           <div className="text-center max-w-4xl mx-auto">
             <h1 className="font-bengali text-clg2 md:text-cxl2 font-bold text-white mb-1 leading-tight">
               শ্রোতার প্রোফাইল
             </h1>
             <p className="font-bengali text-clg md:text-cxl text-white/90 font-normal leading-relaxed">
               শুনুন, শিখুন, বেড়ে উঠুন — প্রতিদিন!
             </p>
           </div>
         </div>
        </div>
        <div>
            
            <div>
                <Profiles session={session}/>
            </div>
        </div> */}
        <ProfileDashboard/>
    </div>
  )
}

export default page