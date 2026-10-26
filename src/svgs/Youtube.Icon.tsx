import React from 'react'

const Youtube = ({color}:{color?:string}) => {
  return (
    <>
       <svg  style={{maxHeight:'100%',maxWidth:'100%'}} viewBox="0 0 15 10" fill={"currentColor"} xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M6.37169 6.87669V2.94018C7.76916 3.59776 8.85149 4.23299 10.1316 4.91785C9.07578 5.50338 7.76916 6.16035 6.37169 6.87669ZM14.1598 0.982378C13.9187 0.664782 13.5079 0.417561 13.0705 0.335713C11.7848 0.0915679 3.76402 0.0908734 2.47905 0.335713C2.12829 0.401469 1.81594 0.56041 1.54763 0.807354C0.417079 1.85668 0.77134 7.48387 1.04385 8.39539C1.15844 8.78994 1.30658 9.07448 1.49314 9.26126C1.7335 9.5082 2.0626 9.67823 2.44062 9.75448C3.4992 9.97345 8.95281 10.0959 13.0481 9.78736C13.4254 9.72161 13.7594 9.5461 14.0228 9.28867C15.0681 8.24354 14.9969 2.30033 14.1598 0.982378Z" fill={"currentColor"}/>
<defs>
<linearGradient id="paint0" x1="0" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse">
<stop stopColor={"currentColor"}/>
<stop offset="1" stopColor={"currentColor"}/>
</linearGradient>
</defs>
</svg>

    </>
  )
}

export default Youtube


export const Youtube2 = ({color}:{color?:string}) => {
  return (
    <>
       <svg  style={{maxHeight:'100%',maxWidth:'100%'}} viewBox="0 0 15 10" fill={color??"white"} xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M6.37169 6.87669V2.94018C7.76916 3.59776 8.85149 4.23299 10.1316 4.91785C9.07578 5.50338 7.76916 6.16035 6.37169 6.87669ZM14.1598 0.982378C13.9187 0.664782 13.5079 0.417561 13.0705 0.335713C11.7848 0.0915679 3.76402 0.0908734 2.47905 0.335713C2.12829 0.401469 1.81594 0.56041 1.54763 0.807354C0.417079 1.85668 0.77134 7.48387 1.04385 8.39539C1.15844 8.78994 1.30658 9.07448 1.49314 9.26126C1.7335 9.5082 2.0626 9.67823 2.44062 9.75448C3.4992 9.97345 8.95281 10.0959 13.0481 9.78736C13.4254 9.72161 13.7594 9.5461 14.0228 9.28867C15.0681 8.24354 14.9969 2.30033 14.1598 0.982378Z" fill="url(#paint0_linear_1283_25672)"/>
<defs>
<linearGradient id="paint0_linear_1283_25672" x1="7.78274" y1="0.152344" x2="7.78274" y2="9.97289" gradientUnits="userSpaceOnUse">
<stop stopColor={color??"white"}/>
<stop offset="1" stopColor={color??"white"}/>
</linearGradient>
</defs>
</svg>

    </>
  )
}