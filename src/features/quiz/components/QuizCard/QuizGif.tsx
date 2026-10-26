'use client'
import { paths } from '@/utils/Paths';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const QuizGif = () => {
    const [mounted, setMounted] = useState(false);

        useEffect(() => {
        setMounted(true);
        }, []);
  return (
    <>


        {/* <Link className='fixed bottom-24 z-20  right-5' href={paths.quiz} >
            {mounted && 
            <img 
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            //   src="/navbarBtn.gif"
            className="max-w-[70px] max-h-[70px]"  src="/circleBtn.gif" alt="banner" />
            }
        </Link> */}

        <Link className='fixed bottom-5 z-10  right-5' href={paths.entertainment} target='_blank'>
                {mounted && 
                <img 
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                //   src="/navbarBtn.gif"
                className="max-w-[70px] max-h-[70px]"  src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/Group%201000005379.png" alt="banner" />
                }
        </Link>
    </>
   
  )
}

export default QuizGif