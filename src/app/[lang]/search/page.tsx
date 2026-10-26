import SearchBooks from '@/components/MyPlayList/SearchBooks/SearchBooks.view'
import React from 'react'

const page = () => {
  return (
    <div className='relative'>
        <div 
          className="absolute -left-0 -top-0 w-full h-full"
          style={{
            backgroundImage: "url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/29f2b5eaf4.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "full",
            height: "200vh",
            opacity: 0.3
          }}
        />
        {/* <img className='' src='https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/29f2b5eaf4.png' /> */}
        <SearchBooks/>
    </div>
  )
}

export default page