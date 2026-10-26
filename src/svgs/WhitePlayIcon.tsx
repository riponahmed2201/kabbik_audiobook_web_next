import React from 'react'

type tProps={
  color?:string
}
const WhitePlayIcon = ({color}:tProps) => {
  return (
    <>
        <svg style={{width:'100%', height:'100%'}} viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="18" cy="18.5" r="18" fill="white"/>
<path d="M27 18.5L13.5 26.2942L13.5 10.7058L27 18.5Z" fill={"#D630D2"}/>
</svg>

    </>
  )
}

export default WhitePlayIcon