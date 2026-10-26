import React from 'react'

type tProps={
  color?:string;
  width?:string;
  height?:string
}
const SingleStar = ({color,width,height}:tProps) => {
  return (
    <>
        <svg width={width??"16"} height={height??"16"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.06925 0.327454L9.9041 5.97453H15.8418L11.0381 9.46461L12.8729 15.1117L8.06925 11.6216L3.26556 15.1117L5.10041 9.46461L0.296721 5.97453H6.23441L8.06925 0.327454Z" fill={color??"#FABE08"}/>
        </svg>

    </>
  )
}

export default SingleStar