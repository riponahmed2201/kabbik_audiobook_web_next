import Link from 'next/link'
import React from 'react'

const ThreeDBook = ({bg,path}:{bg:string,path:string}) => {
  return (
    <Link href={path??''}>
        <div className='skew-y-[-8deg]'>
            <article className='absolute left-1/2  -translate-x-1/2 top-[20px]'>
                <div className="cover-back"></div>
                <div className="pages">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={`cover  bg-[#f3f3f0] bg-center bg-cover bg-no-repeat`}
                    style={{
                        backgroundImage: `url(${bg})`,
                    }}
                >
                    {/* <span className="title">Book Title</span> */}
                </div>
                <div className="spine">
                    {/* <span>my logo</span> */}
                </div>
                <div className="spine-shadow"></div>
            </article>
        </div>
    </Link>
  )
}

export default ThreeDBook