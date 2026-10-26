import ReelsVideoGrid from '@/components/Reels/ReelList.view'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className='h-[100px] mt-[-100px] z-[2] relative bg-[#0E1D3F]'/>
        <div className='relative '>
            <div 
            className="absolute -left-0 -top-10 w-full h-full"
            style={{
                backgroundImage: "url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/841c74b887fcb91272e2a8c11695512fb2025197%20(1)%20(1).png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "full",
                height: "127px",
                opacity: 0.3
            }}
            />
        </div>
        <h3 className='text-white mt-0 pt-8 text-clg2 font-semibold text-center'>কাব্যিক রিলস</h3>
        <div className='max-w-[1300px] mx-auto w-[97%] md:w-[90%]'>
          <ReelsVideoGrid/>
        </div>
    </div>
  )
}

export default page