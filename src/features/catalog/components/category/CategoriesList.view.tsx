'use client'
import { useAppSelector } from '@/store/store'
import Image from 'next/image'
import React, { useMemo } from 'react'
import { container } from '@/shared/ui/static/tailwind.classes'
import { paths } from '@/utils/Paths'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CategoriesList = () => {
        const categories=useAppSelector((store)=>store?.categories?.CategoriesData)
        const router=useRouter();
  return (
    <div className={`${container('1300px')}`}>
        <div className="">
      <div className='grid mt-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-3 cursor-pointer mx-auto my-8'>
        {/* Main content grid */}
        {categories?.map((category, index) => (
            <div
              key={index}
              style={{background:category?.color}}
              className={` rounded-2xl p-2 relative overflow-hidden  flex flex-col justify-between cursor-pointer transition-all hover:scale-105 hover:shadow-2xl`}
            >
              {/* Category Name */}
              {/* <h3 className="text-white font-bold text-lg sm:text-xl z-10 relative drop-shadow-lg leading-tight">
                {category.name}
              </h3> */}

              

              {/* Book Image - positioned at bottom right with tilt */}
              <div className=" transform  z-0">
                <Link
                    href={paths?.categoryWiseBooks(category?.name)}
                >
                  <img
                    loading="lazy"
                    src={category.thumb_path}
                    alt={category.name}
                    className="w-full h-full object-left-bottom  object-cover rounded-[6px] shadow-2xl border-2 border-white/30"
                  />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
    </div>
  )
}

export default CategoriesList