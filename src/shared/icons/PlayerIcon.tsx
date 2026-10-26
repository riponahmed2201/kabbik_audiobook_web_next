import React from 'react'
import { TCommonProps } from './common.types'

const PlayerIcon = ({color}:TCommonProps) => {
  return (
    <>
        <svg style={{width:'100%',height:'100%'}} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" fill="white"/>
        <path d="M27 18L13.5 25.7942L13.5 10.2058L27 18Z" fill={color??"#D630D2"}/>
        </svg>

    </>
  )
}

export default PlayerIcon