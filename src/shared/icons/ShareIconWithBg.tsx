import React from 'react'

const ShareIconWithBg = ({color}:{color?:string}) => {
  return (
    <>
        <svg className='w-full h-full' viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="60" rx="5" fill="url(#paint0_linear_0_1)"/>
<path d="M37.5 25C39.5711 25 41.25 23.3211 41.25 21.25C41.25 19.1789 39.5711 17.5 37.5 17.5C35.4289 17.5 33.75 19.1789 33.75 21.25C33.75 23.3211 35.4289 25 37.5 25Z" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.5 33.75C24.5711 33.75 26.25 32.0711 26.25 30C26.25 27.9289 24.5711 26.25 22.5 26.25C20.4289 26.25 18.75 27.9289 18.75 30C18.75 32.0711 20.4289 33.75 22.5 33.75Z" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M37.5 42.5C39.5711 42.5 41.25 40.8211 41.25 38.75C41.25 36.6789 39.5711 35 37.5 35C35.4289 35 33.75 36.6789 33.75 38.75C33.75 40.8211 35.4289 42.5 37.5 42.5Z" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.7375 31.8875L34.275 36.8625" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M34.2625 23.1375L25.7375 28.1125" stroke="white" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_0_1" x1="0" y1="0" x2="55.5" y2="60" gradientUnits="userSpaceOnUse">
<stop stop-color={color??"#FE9A00"}/>
<stop offset="1" stop-color={color??"#FF6900"}/>
</linearGradient>
</defs>
</svg>


    </>
  )
}

export default ShareIconWithBg