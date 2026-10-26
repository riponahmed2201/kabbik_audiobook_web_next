import React from 'react'
import { TAudioBookDetails, TEpisode } from './static/audiobook.type';
import PremiumCrownIcon from '@/svgs/PremiumIcon';
import Crown from '@/svgs/Crown.svg';
import LockIcon from '@/svgs/LockIcon.svg';
import PlayIcon from '@/svgs/PlayIcon';
import PauseIcon from '@/svgs/PauseIcon';
import Image from 'next/image';
import FreeIcon from '@/svgs/FreeIcon.svg';

const EpisodeList = ({book,hasAccess,togglePlay,index,isPlaying}:{book:TAudioBookDetails,hasAccess:(id:number)=>boolean,togglePlay:(i:number,id:number)=>void,index:number,isPlaying:boolean}) => {

  return (
    <div>
        <div className="space-y-2.5 tiny_scroll_bar2 max-h-[61vh] overflow-y-auto pr-2">
          {book?.episodes?.map((episode,i) => (
            <div
              onClick={()=>togglePlay(i,episode.id)}
              key={episode.id} className="bg-white border border-gray-300 cursor-pointer rounded-[6px] p-2  py-1"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 md:w-6 md:h-6">
                      {episode?.isfree?<FreeIcon/>:<Crown />}
                    </div>
                  </div>
                  {/* <img
                    src={book.thumb_path}
                    className="w-12 h-14 md:w-16 md:h-18 rounded-md object-cover flex-shrink-0"
                  /> */}
                  {/* <Image
                    src={book.thumb_path}
                    alt="Book thumbnail"
                    loading='lazy'
                    // onLoad={}
                    width={64}   // matches w-16 (16 * 4px = 64px)
                    height={72}  // matches h-18 (18 * 4px = 72px)
                    className="w-12 h-14 md:w-16 md:h-18 rounded-md object-cover flex-shrink-0"
                  /> */}
                  <h3 className="text-cs2 md:text-cn text-black font-normal min-w-0 leading-tight">
                    {episode?.name}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 md:w-6 md:h-6" >
                    {hasAccess(i) ? (
                      isPlaying && index === i ? <PauseIcon color='#98266B' /> : <PlayIcon  />
                     ) : <LockIcon />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default EpisodeList