import React from 'react'

const RightArrow = ({color}:{color?:string}) => {
  return (
    <>
        {/* <svg style={{height:'100%',width:'100%'}} viewBox="0 0 38 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M37.7071 8.70711C38.0976 8.31658 38.0976 7.68342 37.7071 7.29289L31.3431 0.928932C30.9526 0.538408 30.3195 0.538408 29.9289 0.928932C29.5384 1.31946 29.5384 1.95262 29.9289 2.34315L35.5858 8L29.9289 13.6569C29.5384 14.0474 29.5384 14.6805 29.9289 15.0711C30.3195 15.4616 30.9526 15.4616 31.3431 15.0711L37.7071 8.70711ZM0 8V9H37V8V7H0V8Z" fill={color??"black"}/>
        </svg> */}
        

          <svg style={{height:'100%',width:'100%'}} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.4 15L0 13.6L11.6 2H5V0H15V10H13V3.4L1.4 15Z" fill={color??"#1C1B1F"}/>
</svg>

    </>
  )
}

export default RightArrow