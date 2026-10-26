import MyPlayList from '@/components/MyPlayList/MyPlayList.view'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='h-[100px] mt-[-100px] z-10 bg-[#0E1D3F]'/>
      <div className='relative'>
        <div 
          className="absolute -left-0 -top-0 w-full h-full"
          style={{
            backgroundImage: "url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/841c74b887fcb91272e2a8c11695512fb2025197%20(1)%20(1).png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "full",
            height: "197px",
            opacity: 0.3
          }}
        />
      </div>
        <MyPlayList/>
    </div>
  )
}

export default page