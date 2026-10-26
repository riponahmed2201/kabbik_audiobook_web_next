import React from 'react'

const RightAngle = ({className,color}:{className?:string,color?:string}) => {
  return (
    <>
        <svg className={className} style={{width:'100%',height:'100%'}} viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.24772 9.77804C0.573894 10.074 1.1027 10.074 1.42896 9.77804L5.51129 6.07072C6.16313 5.47872 6.16287 4.5195 5.51071 3.92789L1.42596 0.221942C1.0997 -0.0739789 0.570887 -0.0739789 0.24463 0.221941C-0.0815436 0.517863 -0.0815436 0.997701 0.24463 1.29362L3.74083 4.46555C4.06702 4.76147 4.06702 5.24123 3.74083 5.53723L0.24772 8.70635C-0.0785374 9.00229 -0.0785374 9.48211 0.24772 9.77804Z" fill={color??"#C4C4C4"}/>
        </svg>

    </>
  )
}

export default RightAngle