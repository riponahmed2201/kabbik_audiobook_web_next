'use client'
import React from 'react'
import ThreeDBanner from './ThreeDBanner.view'
import { container } from '@/shared/ui/static/tailwind.classes'
import { AudiobookCard } from './AudioBookCard.view'
import ReferAndEarn from './ReferAndEarn.view'
import { TPlaylistBooks } from './static/category.types'

const PlayListBooks = (props: TPlaylistBooks) => {
  const { categoryName, categoryData, dict, isPodCast } = props

  return (
    <>
      <div>
        <div className=" bg-background text-foreground relative z-[3]">
          <div className="circular_gradient right-[-10%] top-[-30%] w-[30vw] h-[30vw] absolute  "></div>
          <div className="circular_gradient left-[-10%] top-[50%] -translate-y-1/2 w-[30vw] h-[30vw] absolute  "></div>
          <div className="circular_gradient right-[-10%] bottom-[-30%] w-[30vw] h-[30vw] absolute  "></div>
          <div className="relative z-[3]">
            <div className={container('1300px')}>
              <div className="grid grid-cols-2  lg:grid-cols-5  gap-6 md:gap-8">
                {categoryData
                  ? categoryData?.data?.[0]?.data.slice(0, 10).map((audiobook) => (
                      <AudiobookCard
                        key={audiobook.id}
                        category={categoryName}
                        audiobook={audiobook}
                        className="max-w-sm mx-auto"
                      />
                    ))
                  : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {categoryData?.data?.[0]?.data?.[11] ? (
          <ThreeDBanner dict={dict} book={categoryData?.data?.[0]?.data?.[11]} />
        ) : (
          ''
        )}
      </div>
      <div className={`${container('1300px')} relative`}>
        <div className="grid mt-10 grid-cols-2  lg:grid-cols-5  gap-6 md:gap-8">
          {categoryData?.data
            ? categoryData?.data?.[0]?.data.slice(12, 22).map((audiobook) => (
                <AudiobookCard
                  key={audiobook.id}
                  category={categoryName}
                  audiobook={audiobook}
                  className="max-w-sm mx-auto"
                />
              ))
            : ''}
        </div>
      </div>
      <div className="mt-10 bg-[#09152B] border-[#8D8D8D]">
        {isPodCast ? '' : <ReferAndEarn />}
      </div>
      <div className={`${container('1300px')} relative`}>
        <div className="circular_gradient left-[-10%] top-[0%] w-[30vw] h-[30vw] absolute  "></div>
        <div className="circular_gradient right-[-20%] bottom-[-15vh] w-[40vw] h-[40vw] absolute  "></div>
        <div className="mt-10  grid grid-cols-2  lg:grid-cols-5  gap-6 md:gap-8">
          {categoryData?.data
            ? categoryData?.data?.[0]?.data.slice(23).map((audiobook) => (
                <AudiobookCard
                  key={audiobook.id}
                  category={categoryName}
                  audiobook={audiobook}
                  className="max-w-sm mx-auto"
                />
              ))
            : ''}
        </div>
      </div>
    </>
  )
}

export default PlayListBooks
