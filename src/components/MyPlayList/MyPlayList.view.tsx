'use client'
import { useAppDispatch, useAppSelector } from "@/store/store";
import { container } from "../ui/static/tailwind.classes";
import { siteConfig } from "@/config/config";
import { CirclePause, CirclePlay, Delete, Edit, Play, PlayCircle, PlusIcon, Trash, Trash2 } from "lucide-react";
import BigVideoPlayerIcon from "@/svgs/BigVideoPlayer";
import CommonModal from "../ui/CommonModal/CommonModal.view";
import WarningModal from "./WarningModal.view";
import { useEffect, useState } from "react";
import FoldersModal from "./FoldersModal.view";
import { createNewPlaylistFolders, getPlayListBooks, RemoveBooksFromPlaylist, updatePlaylistFolders } from "@/utils/apiServices";
import { PlaylistAudioBook } from "./static/myplaylist.type";
import { convertToBanglaDigits, formatDateDDMMYY, formatDateToBengali, formatTimePlus6 } from "@/helpers/commonFunction";
import Skeleton from "../Skeleton/Skeleton";
import EditFoldersModal from "./EditFoldersModal.view";
import { toast } from "react-toastify";
import { setPlaylistValue } from "@/store/slicers/PlaylistSlice";
import { useRouter } from "next/navigation";
import { paths } from "@/utils/Paths";
import BookStack from "./BookStack.view";
import { setglobalAudioPlayers } from "@/store/slicers/GlobalAudioPlayerSlice";
import GlobalAudioPlayer from "../GlobalAudioPlayer/GlobalAudioPlayer";
import DeleteConfirmation from "../ui/CommonModal/DeleteConfirmation.view";

export default function MyPlayList() {
  const router=useRouter();
  const audioPlayerInfo=useAppSelector((store)=>store?.audioPlayerSlice)
  const user=useAppSelector(store=>store.user.userData);
  const [showWarningModal,setWarningModal]=useState(false);
  let [books,setbooks]=useState<PlaylistAudioBook[]>([])
  let [folders,setFolders]=useState<{[key:number | string]:string}>({});
  const [showFolderModal,setFolderModal]=useState(false);
  const [editFolderModal,setEditFoldersModal]=useState("");
  const [activeBooks,setActiveBooks]=useState<PlaylistAudioBook[]>([]);
  const [activeFolders,setActiveFolders]=useState('');
  const [tableloading,setTableLoading]=useState(false)
  const [editLoader,setEditLoader]=useState(false);
  const [showBigPlayer,setShowBigPlayer]=useState(false);
  const dispatch=useAppDispatch();
  const [ShowDeleteModal,setShowDeleteModal]=useState<number|string|null>(null);
  // let folders=["আলোকিত ইসলাম","ব্রেইন বুস্টার","হুমায়ূন আহমেদ ","ভৌতিক","মোটিভেশনাল","রোমান্স"]


  const getPlaylistItems=async()=>{
    setTableLoading(true)
    setActiveFolders('')
    let result = await getPlayListBooks();
    setbooks(result?.data);
    dispatch(setPlaylistValue(result?.data));

    let foldersFromResult:{[key:number | string]:string}={};
    result?.data?.forEach((item:PlaylistAudioBook,index:number)=>{
      if(index===0){
        setActiveFolders(item.folder_name)
      }
      foldersFromResult[item.folder_id]=item.folder_name
    })
    setFolders(foldersFromResult);
    setTableLoading(false);
  }

  useEffect(()=>{
    if(!books.length) return;
    let activeBooks=books.filter(item=>item.folder_name===activeFolders);
    setActiveBooks(activeBooks);
  },[activeFolders])

  useEffect(()=>{
    getPlaylistItems();
  },[])

  const handleEditSubmit=async(val:string)=>{
    setEditLoader(true)
    let result =await updatePlaylistFolders(editFolderModal,val);
    getPlaylistItems()
    setEditFoldersModal('')
    setEditLoader(false);
  }

  const AddNewFolder=async(val:string)=>{
    if(val?.trim()?.length===0){
      toast.error("Please add a folder name")
      return;
    }
    setEditLoader(true);
    let result = await createNewPlaylistFolders(val)
    await getPlaylistItems();
    if(result?.success!=='false'){
      toast.success("New folders added successfully")
    }else{
      toast.error("Something went wrong");
    }
    setEditLoader(false)
  }

  const RemoveFromPlaylist=async(id:number|string)=>{
    let result =await RemoveBooksFromPlaylist(id)
    await getPlaylistItems();
    if(result?.success===false){
      toast.error("Something Went wrong")
    }else{
      toast.success("Removed From playlist")
    }
    setShowDeleteModal(null);
  }

  const playAllButton=()=>{
    if(audioPlayerInfo?.playAll)return;
    let bookIds:number[]=[];
    activeBooks?.forEach((item,i)=>i!==0 && bookIds.push(item.audiobook_id))
    if(
      audioPlayerInfo?.playerBook===activeBooks[0]?.audiobook_id
    ){
      dispatch(
      setglobalAudioPlayers({
        ...audioPlayerInfo,
        bookIds:bookIds,
        playAll:true,
      })
    )
    }else{
      dispatch(
      setglobalAudioPlayers({
        speed:1,
        timer:0,
        bookIds:bookIds,
        playerBook:activeBooks[0]?.audiobook_id,
        playerEpisodeInd:0,
        audibookDetailsData:null,
        withBg:true,
        playAll:true,
      })
    )
    }
    
  }

  const closeAllButton=()=>{
    dispatch(
      setglobalAudioPlayers({
        speed:1,
        timer:0,
        bookIds:[],
        playerBook:null,
        playerEpisodeInd:0,
        audibookDetailsData:null,
        withBg:true,
        playAll:true,
      })
    )
  }

  return (
    <>
      <div className={`${showBigPlayer?'hidden':''} relative tiny_scroll_bar2 md:mt-5`}>
      {/* Radial gradient background */}
      <div className={"flex  justify-around "+container('1280px')}>
        
        <figure className="hidden md1:block -mt-4 mb-2">
          {/* {//console.log(activeBooks.length,"length",activeBooks)} */}
          {activeBooks?.length>1?
            <BookStack books={activeBooks}/>
          :(
            <img
            loading="lazy"
            src="/assets/booksStack.png"
            className="max-w-[200px]"
          />
          )}
          {/*  */}
        </figure>
        <div>
          <div className="grid grid-cols-3 gap-[5px] sm:gap-[20px]">
            {
              Object.keys(folders).map(item=>(
                <button
                  className={`text-white relative line-clamp-1 border text-cs md:text-cn py-2 px-0.5 sm:px-2 md:px-4 rounded-[4px] border-gray-300 hover_btn-gradient-1 ${folders[item]===activeFolders?' btn-gradient-1 ':'' }`}
                  onClick={()=>{setActiveFolders(folders[item])}}
                  key={folders[item]}
                >
                  {folders[item]}
                  <span onClick={()=>{setEditFoldersModal(item)}} className="absolute -top-1 right-0.5">
                    <Edit className="w-3 h3"/>
                  </span>
                </button>
              ))
            }
          </div>
          <div className="flex items-center text-cs-2 md:text-cn-2 mt-2 text-white gap-x-3">
            <figure>
              <img loading="lazy" className="w-10 h-10 rounded-[50%]" src={user?.image_url??siteConfig.defaultProfilePic}/>
            </figure>
            <p className="">{user?.full_name}</p>
            <p>• {convertToBanglaDigits(books.length)} টি অডিওবুক</p>
          </div>
        </div>
      </div>
      <div className="btn-gradient-2 py-0 z-[3] relative">
          <div className={container('1300px')+" flex justify-between items-center"}>
            <div   className="flex cursor-pointer items-center">
              <span  className="w-12 h-12 flex items-center justify-center z-[3] relative  mr-3">
                {/* <BigVideoPlayerIcon/> */}
                { audioPlayerInfo?.playAll?
                  <span onClick={closeAllButton} className="p-2 flex items-center justify-center">
                    <CirclePause  className="text-white/70 w-8 h-8 text-c4xl2"/>
                    <h3 className="font-semibold text-white/80 whitespace-nowrap">প্লে অল</h3>
                  </span>
                :
                  <span className="p-2 flex items-center justify-center" onClick={playAllButton}>
                    <PlayCircle  className="text-white/70 w-8 h-8 text-c4xl2"/>
                    <h3 className="font-semibold text-white/80 whitespace-nowrap">প্লে অল</h3>
                  </span>
                  }
              </span>
              
              {/* <img className="max-w-12" src={books?.[0]?.thumb_path ?? books?.[0]?.banner_path }/> */}
            </div>
            <div>
              <button  className="text-white text-cs2 md:text-cn2 flex items-center gap-1 btn-gradient-3 py-2 px-4 rounded-[8px]" onClick={()=>{setFolderModal(true)}}>
                <PlusIcon className="text-white w-4"/>
               {books.length?"এড নিউ বুক":" ক্রিয়েট নিউ প্লেলিস্ট"}
              </button>
            </div>
          </div>
          
      </div>
      <div className={container('1280px')+" "}>
        <div className=" pb-8 md:px-4 lg:px-12">
      <div className=" mx-auto relative max-lg:overflow-x-auto ">
        {/* Table Header */}

        {/* Table Rows */}
        <table className="w-full min-w-[800px] border-collapse z-[1] relative">
          {/* Table Head */}
          <thead>
            <tr className="text-gray-400 text-cs md:text-cn bg-white bg-opacity-10 text-left">
              <th className="px-1.5 md:px-6 py-3">#</th>
              <th className="px-1.5 md:px-6 py-3">টাইটেল</th>
              <th className="px-1.5 md:px-6 py-3">লেখক</th>
              <th className="px-1.5 md:px-6 py-3">তারিখ</th>
              <th className="px-1.5 md:px-6 py-3">সময়</th>
              <th className="px-1.5 md:px-6 py-3">অ্যাকশন</th>
              <th className="px-1.5 md:px-6 py-3">প্লে</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {activeBooks.map((book, index) => (
              !book.audiobook_id?(
                <span key={index}>
                  <Skeleton height="50px" width="80vw"/>
                  <Skeleton height="50px" width="80vw"/>
                  <Skeleton height="50px" width="80vw"/>
                  <Skeleton height="50px" width="80vw"/>
                  <Skeleton height="50px" width="80vw"/>
                </span>
              ):
              <tr
                key={book.audiobook_id}
                className={`hover:bg-white/5 py-1.5 border-b border-gray-800 cursor-pointer text-cs md:text-cn`}
                onClick={()=>{router.push(paths.book_details(book.audiobook_id))}}
              >
                {/* Row Number */}
                <td className="px-1.5 md:px-6 py-0 text-gray-300 text-cs2 md:text-clg2 font-normal">
                  {convertToBanglaDigits(index+1)}
                </td>

                {/* Title + Cover */}
                <td className="px-1.5 md:px-6 py-1 flex items-center gap-4 max-w-[300px]">
                  <img
                    loading="lazy"
                    src={book?.thumb_path ?? book?.banner_path}
                    alt={book.name}
                    className="w-[51px] h-[60px] object-cover rounded"
                  />
                  <span className="text-white  leading-tight">
                    {book.name}
                  </span>
                </td>

                {/* Author */}
                <td className="px-1.5 md:px-6 py-1 text-gray-300  leading-tight">
                  {book.author_name}
                </td>

                {/* Date */}
                <td className="px-1.5 md:px-6 py-1 text-gray-400 ">
                  {formatDateToBengali(book.created_at)}
                </td>

                {/* Time */}
                <td className="px-1.5 md:px-6 py-1 text-gray-400 ">
                  {/* {book.time} */}
                  {formatTimePlus6(book.created_at)}
                </td>

                {/* Action */}
                <td className="px-1.5 md:px-6 py-1">
                  <button
                    onClick={(e) => {e.stopPropagation();setShowDeleteModal(book.playlist_book_id)}}
                    className="bg-red-500/20 hover:bg-red-600/20 text-white rounded p-2 flex items-center justify-center"
                  >
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </button>
                </td>

                <td className="px-1.5 md:px-6 py-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if(audioPlayerInfo?.playerBook===book?.audiobook_id)return;
                      dispatch(
                        setglobalAudioPlayers({
                          speed:1,
                          timer:0,
                          bookIds:[],
                          playerBook:book?.audiobook_id||0,
                          playerEpisodeInd:0,
                          audibookDetailsData:null,
                          withBg:true
                        })
                      )
                    }}
                    className="bg-white-500/20 hover:bg-white-600/20 text-white rounded p-2 flex items-center justify-center"
                  >
                    {audioPlayerInfo?.playerBook===book?.audiobook_id?
                    <CirclePause className="w-6 h-6 text-white/80" />
                    :
                    <CirclePlay className="w-6 h-6 text-white/80" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="circular_gradient right-[-40%] top-[-10%] w-[30vw] h-[30vw] absolute  "></div>
        <div className="circular_gradient left-[-20%] bottom-[-10%] w-[30vw] h-[30vw] absolute  "></div>
      </div>
     </div>
      </div>
      <div className="bg-deep-blue text-white px-4 py-8 md:px-8">
     
    </div>
      <CommonModal
        isOpen={showWarningModal}
        onClose={()=>setWarningModal(false)}
      >
        <WarningModal/>
      </CommonModal>
      <CommonModal
        isOpen={showFolderModal}
        onClose={()=>setFolderModal(false)}
      >
        <FoldersModal loader={editLoader} AddNewFolder={AddNewFolder} folders={folders}/>
      </CommonModal>
      <CommonModal
        isOpen={editFolderModal?true:false}
        onClose={()=>setEditFoldersModal('')}
      >
        <EditFoldersModal
          folderName={folders[editFolderModal]}
          onSubmit={handleEditSubmit}
          loading={editLoader}
        />
      </CommonModal>
      <CommonModal
        isOpen={ShowDeleteModal?true:false}
        onClose={()=>setShowDeleteModal(null)}
      >
        <DeleteConfirmation
          handleDelete={()=>{RemoveFromPlaylist(ShowDeleteModal||0)}}
          onClose={()=>setShowDeleteModal(null)}
        />
      </CommonModal>
    </div>
      <GlobalAudioPlayer showBigPlayer={showBigPlayer} setShowBigPlayer={(val:boolean)=>setShowBigPlayer(val)}/>
    </>
  );
}

// Book Stack Component




