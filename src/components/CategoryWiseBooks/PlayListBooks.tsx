'use client'
import React, { useEffect, useState } from 'react'
import TopAudioBookSection from './TopAudioBookSection.view'
import { decodeWord } from '@/helpers/commonFunction'
import ThreeDBanner from './ThreeDBanner.view'
import { container } from '../ui/static/tailwind.classes'
import { AudiobookCard } from './AudioBookCard.view'
import ReferAndEarn from './ReferAndEarn.view'
import { TPlaylistBooks } from './static/category.types'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getPlayListBooks } from '@/utils/apiServices'
import { setPlaylistValue } from '@/store/slicers/PlaylistSlice'
import { useSearchParams } from 'next/navigation'

const PlayListBooks = (props:TPlaylistBooks) => {
    let {categoryName,categoryData,dict,isPodCast}=props;
    const dispatch=useAppDispatch();
    const playListData=useAppSelector(store=>store.playList.playlistData)
    //  a mapper key:value format for tracking books allready are in playlist
    const [playListBooks,setPlaylistBooks]=useState<{[key:number|string]:string|number}>({});
    const searchParams = useSearchParams();
    // const 
    let folders=searchParams.get('folders')

    const getPlaylistItems=async()=>{
      let result = await getPlayListBooks();
      dispatch(setPlaylistValue(result.data));
    }

    useEffect(()=>{
      if(playListData.length){
        return
      }
      getPlaylistItems();
    },[])

    useEffect(()=>{
      if(!playListData.length)return;
      let playListBookMapper:{[key:number|string]:string|number}={};
      //console.log(playListData,"playListData")
      playListData.forEach((book)=>{
        if(book.folder_id===Number(folders)){
          playListBookMapper[book.audiobook_id]=book.playlist_book_id;
        }
      })
      setPlaylistBooks(playListBookMapper);
      //console.log(playListBookMapper)
    },[playListData.length])

    const handleAddToBookList=(id:number|string,name:string)=>{
      let newPlaylistBooks={...playListBooks};
      newPlaylistBooks[id]=name;
      setPlaylistBooks(newPlaylistBooks);
      getPlaylistItems()
      //console.log(playListBooks,"kdjfkdf",id,name)
    }
  return (
    <>
        <>
            <div>
              <div className=" bg-background text-foreground relative z-[3]">      
                <div className="circular_gradient right-[-10%] top-[-30%] w-[30vw] h-[30vw] absolute  "></div>
                <div className="circular_gradient left-[-10%] top-[50%] -translate-y-1/2 w-[30vw] h-[30vw] absolute  "></div>
                <div className="circular_gradient right-[-10%] bottom-[-30%] w-[30vw] h-[30vw] absolute  "></div>
                {/* Main content */}
                <div className="relative z-[3]">

                    {/* Audiobooks Grid */}
                    <div className={container('1300px')}>
                    <div className="grid grid-cols-2  lg:grid-cols-5  gap-6 md:gap-8">
                      {/* {console.log(playListBooks,"PlaylistBooks")} */}
                        {categoryData ? categoryData?.data?.[0]?.data.slice(0,10).map((audiobook) => (
                        <AudiobookCard 
                            isInPlayList={playListBooks[audiobook.id]}
                            handleAddToBookList={handleAddToBookList}
                            key={audiobook.id} 
                            category={categoryName}
                            audiobook={audiobook}
                            getPlaylistItems={getPlaylistItems}
                            className="max-w-sm mx-auto"
                        />
                        )):''}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div>
              {categoryData?.data?.[0]?.data?.[11]?
                <ThreeDBanner dict={dict} book={categoryData?.data?.[0]?.data?.[11]}/>
              :''}
            </div>
            <div className={`${container('1300px')} relative`}>
              
                <div className="grid mt-10 grid-cols-2  lg:grid-cols-5  gap-6 md:gap-8">
                  {categoryData?.data ? categoryData?.data?.[0]?.data.slice(12,22).map((audiobook) => (
                    <AudiobookCard
                      isInPlayList={playListBooks[audiobook.id]}
                      handleAddToBookList={handleAddToBookList}
                      key={audiobook.id} 
                      category={categoryName}
                      audiobook={audiobook}
                      getPlaylistItems={getPlaylistItems}
                      className="max-w-sm mx-auto"
                    />
                  )):''}
                </div>
            </div>
            <div className='mt-10 bg-[#09152B] border-[#8D8D8D]'>
                  {isPodCast?"":<ReferAndEarn/>}
            </div>
            <div className={`${container('1300px')} relative`}>
                <div className="circular_gradient left-[-10%] top-[0%] w-[30vw] h-[30vw] absolute  "></div>
                <div className="circular_gradient right-[-20%] bottom-[-15vh] w-[40vw] h-[40vw] absolute  "></div>
                <div className="mt-10  grid grid-cols-2  lg:grid-cols-5  gap-6 md:gap-8">
                  {categoryData?.data ? categoryData?.data?.[0]?.data.slice(23,).map((audiobook) => (
                    <AudiobookCard
                      isInPlayList={playListBooks[audiobook.id]}
                      handleAddToBookList={handleAddToBookList}
                      key={audiobook.id} 
                      getPlaylistItems={getPlaylistItems}
                      category={categoryName}
                      audiobook={audiobook}
                      className="max-w-sm mx-auto"
                    />
                  )):''}
                </div>
            </div>
        </>
    </>
  )
}

export default PlayListBooks