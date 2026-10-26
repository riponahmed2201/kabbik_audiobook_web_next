import { TeamMemberCard } from '@/components/about/TeamMemberCard.view';
import { container } from '@/components/ui/static/tailwind.classes';
import { staticTextSlice } from '@/components/ui/static/types';
import { fetchDataFromJson } from '@/utils/apiServices';
import React from 'react'

export const metadata = {
  title: "About us | Kabbik",
  description: "Learn more about Kabbik and our story.",
};


const page = async() => {
     const staticTexts:staticTextSlice['data']=await fetchDataFromJson();
     const teamMembers = staticTexts?.teamMembers;
  return (
    <div>
        <div className='h-[100px] mt-[-100px] bg-[#0E1D3F]'/>
        <div>
            <div className='relative'>
               <div className={`bg-[url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/kabbikGalaryBg-min2-min.jpg')] bg-cover opacity-20 w-full h-[130px] absolute left-0 bottom-[-15px]`}></div>
                    <div className="container mx-auto px-4 pt-5 pb-4 ">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="font-bengali text-cxl2 font-bold text-white mb-2 leading-tight">
                        এবাউট কাব্যিক
                        </h1>
                        <p className="font-bengali text-clg text-white/90 font-normal leading-relaxed">
                            কাব্যিক যেখানে শব্দরা জীবন্ত।
                        </p>
                    </div>
                </div>
            </div>
            <div className="  py-12">
            {/* Header */}
            

            {/* Team Members */}
            <div className={container("1300px")+" mx-auto px-2 md:px-4"}>
                {teamMembers ?teamMembers.map((member, index) => (
                    <div key={index} className="flex my-8 justify-center">
                        <TeamMemberCard
                        name={member.name}
                        title={member.title}
                        description={member.description}
                        imageUrl={member.imageUrl}
                        />
                    </div>
                )):''}
            </div>
            </div>
        </div>
    </div>
  )
}

export default page