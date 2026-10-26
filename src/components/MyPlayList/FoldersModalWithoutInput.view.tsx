import { useState } from "react";
import { TFolderModal } from "./static/myplaylist.type";
import Spinner from "../ui/Spinner.view";
import { addBooksToPlaylistFolders, getPlayListBooks } from "@/utils/apiServices";
import { useAppDispatch } from "@/store/store";
import { setPlaylistValue } from "@/store/slicers/PlaylistSlice";
import { toast } from "react-toastify";



export default function FoldersModalForBookDetails({folders,audioBookId,closeModal,AddNewFolder,loader}:TFolderModal) {
  let [newFolderName,setNewFolderName]=useState('');
  const dispatch=useAppDispatch();
    
    const getPlaylistItems=async()=>{
        let result = await getPlayListBooks();
        dispatch(setPlaylistValue(result.data));
    
    }
    const addToPlayList=async(folder:string)=>{
        let result = await addBooksToPlaylistFolders(audioBookId??0,folder)
        if(result?.success===true){
            toast.success("Book added to playlist successfully")
            await getPlaylistItems()
        }

        closeModal && closeModal();
    }
  return (
    <div className=" bg-dark_bg flex items-center pt-8 mt-4 justify-center p-1 sm:p-2 lg:p-4">
      <div className="w-full max-w-xl mx-auto">
        <div className="border border-white/20 rounded-[6px] p-2 sm:p-3 lg:p-4 bg-[#060F1E]">
          {/* Title */}
          <h1 className="text-white text-center text-sm sm:text-base lg:text-lg font-semibold mb-4 lg:mb-6 leading-tight">
            আপনার পছন্দের ফোল্ডার নির্বাচন করুন
          </h1>

          <div className="space-y-6 lg:space-y-8">
            {/* folder Selection Grid */}
            <div className="space-y-3 lg:space-y-4">
              {/* First Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 text-center  lg:grid-cols-3 gap-1.5 lg:gap-2">
                {Object.keys(folders)?.map((folder,index) => (
                  <div
                    // href={paths.playlist_search+`?folders=${folder}&f_name=${folders[folder]}`}
                    key={index}
                    onClick={() => addToPlayList(folder)}
                    className={`relative h-7 cursor-pointer text-center lg:h-10 rounded-[6px] transition-all duration-200 shadow ${
                      true
                        ? 'btn-gradient-2 text-white/90'
                        : 'bg-[#0E1D3F] hover:bg-[#0E1D3F]/80'
                    }`}
                  >
                    <span className={`text-xs lg:text-sm mt-2 inline-block text-white font-medium ${''
                      // selectedCategories[folder.id] ? 'text-[#060F1E]' : 'text-white'
                    }`}
                    >
                      {folders[folder]}
                    </span>
                    
                  </div>
                ))}
              </div>

              <div className="space-y-3 lg:space-y-5">
                  <p className="text-white text-center text-xs lg:text-sm font-medium">
                    অথবা
                  </p>

                  {/* New Folder Input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="নতুন ফোল্ডার তৈরি করুন"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="w-full h-7 lg:h-10 px-2 lg:px-3 rounded-[6px] border border-[#5E5E5E] bg-transparent text-white placeholder-white/20 text-xs lg:text-sm font-medium focus:outline-none focus:border-[#38EF7D] transition-colors shadow"
                    />
                  </div>
                </div>

                {/* Complete Button */}
                <button
                  onClick={()=>AddNewFolder(newFolderName)}
                  disabled={loader}
                  className="w-full h-6 lg:h-8 btn-gradient-2 rounded-[6px] text-[white]/90 text-xs lg:text-sm font-medium hover:bg-[#38EF7D]/90 transition-colors shadow"
                >
                  {loader?(
                    <span>
                      <Spinner size="w-3 h-3 mr-1" />
                    </span>
                  ):''}
                  + নতুন ফোল্ডার 
                </button>
            </div>
               
          
          </div>
        </div>
      </div>
    </div>
  );
}
