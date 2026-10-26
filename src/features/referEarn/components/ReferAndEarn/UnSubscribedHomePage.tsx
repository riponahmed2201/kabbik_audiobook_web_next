'use client'
import Image from 'next/image'
import React from 'react'
import { ReferralData } from './static/refeAndEarn.type'
import { useAppSelector } from '@/store/store'
import { useRouter } from 'next/navigation'
import { paths } from '@/utils/Paths'


const UnSubscribedHomePage = ({data}:{data:ReferralData}) => {
    const user=useAppSelector(store=>store?.user?.userData);
    const router=useRouter();
  return (
    <div className={`${user?.is_subscribed?'hidden':''} text-white flex items-center justify-center px-3 sm:px-4 lg:px-6 py-6 sm:py-9 lg:py-12`}>
      <div className="max-w-6xl w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-9 xl:gap-14">
          {/* Left Content Section */}
          <div className="flex-1 w-full max-w-2xl">
           

            {/* Features List */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-6 sm:mb-8 lg:mb-10">
              {data.unsubscribed_user_content?.map((text, i) => (
                <div key={i} className="flex items-start gap-2 sm:gap-2.5">
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed">{text}</p>
                </div>
              ))}

              {/* <a
                href="https://kabbik.com/download-app"
                className="text-blue-400 hover:text-blue-300 transition-colors break-all text-sm sm:text-base lg:text-lg"
              >
                https://kabbik.com/download-app
              </a> */}
            </div>

            {/* CTA Button */}
            <button onClick={()=>router.push(paths.subscribe)} className="w-full gradient_subscribe transition-all duration-200 text-white text-lg sm:text-clg py-2 px-4 sm:px-6 rounded-[4px] border border-[#AAA]/30 shadow-lg font-normal">
              এখনই সাবস্ক্রাইব করুন
            </button>
          </div>

          {/* Right Illustration Section */}
            <figure className='w-1/2'>
                <img loading="lazy" className='max-w-full max-h-full' src={data?.sharable_image_url}/>
            </figure>
        </div>
      </div>
    </div>
  )
}

export default UnSubscribedHomePage


// <div className="min-h-screen bg-[#030b17] text-white px-6 py-10 flex flex-col items-center">
//       <div className="max-w-md w-full flex flex-col items-center">
//         <div className="relative w-full mb-6">
//           <Image
//             src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/refer_shareable_image.png"
//             alt="Referral Banner"
//             width={512}
//             height={657}
//             className="rounded-xl shadow-lg w-full"
//           />
//         </div>

//         <div className="text-center space-y-4">
//           {data?.unsubscribed_user_content.map(item=>(
//             <p className="text-gray-200 text-base leading-relaxed">
//             {item}
//           </p>
//           ))}
//         </div>
//       </div>
//     </div>