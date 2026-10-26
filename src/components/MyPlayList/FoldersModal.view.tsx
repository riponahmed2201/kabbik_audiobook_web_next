import { useState } from "react";
import { Check } from "lucide-react";
import { TFolderModal } from "./static/myplaylist.type";
import Spinner from "../ui/Spinner.view";
import Link from "next/link";
import { paths } from "@/utils/Paths";



export default function FoldersModal({folders,AddNewFolder,loader}:TFolderModal) {
  let [newFolderName,setNewFolderName]=useState('');
  

  
  return (
    <div className=" bg-dark_bg flex items-center pt-8 mt-4 justify-center p-1 sm:p-2 lg:p-4">
      <div className="w-full max-w-xl mx-auto">
        <div className="border border-white/20 rounded-[6px] p-2 sm:p-3 lg:p-4 bg-[#060F1E]">
          {/* Title */}
          <h1 className="text-white text-center text-sm sm:text-base lg:text-lg font-semibold mb-4 lg:mb-6 leading-tight">
            আপনার পছন্দের ফোল্ডার নির্বাচন করুন
          </h1>

          <div className="space-y-6 lg:space-y-8">
            {/* Category Selection Grid */}
            <div className="space-y-3 lg:space-y-4">
              {/* First Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 text-center  lg:grid-cols-3 gap-1.5 lg:gap-2">
                {Object.keys(folders)?.map((category,index) => (
                  <Link
                    href={paths.playlist_search+`?folders=${category}&f_name=${folders[category]}`}
                    key={index}
                    // onClick={() => toggleCategory(category.id)}
                    className={`relative h-7 text-center lg:h-10 rounded-[6px] transition-all duration-200 shadow ${
                      true
                        ? 'btn-gradient-2 text-white/90'
                        : 'bg-[#0E1D3F] hover:bg-[#0E1D3F]/80'
                    }`}
                  >
                    <span className={`text-xs lg:text-sm mt-2 inline-block text-white font-medium ${''
                      // selectedCategories[category.id] ? 'text-[#060F1E]' : 'text-white'
                    }`}
                    >
                      {folders[category]}
                    </span>
                    {/* {selectedCategories[category.id] && ( */}
                      {/* <div className="absolute top-1 right-1 lg:top-1.5 lg:right-1.5">
                        <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-1.5 h-1.5 lg:w-2 lg:h-2 text-[#38EF7D]" />
                        </div>
                      </div> */}
                    {/* )} */}
                  </Link>
                ))}
              </div>

              {/* Second Row */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 lg:gap-2">
                {categories.slice(3, 6).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`relative h-7 lg:h-10 rounded-[6px] transition-all duration-200 shadow ${
                      selectedCategories[category.id]
                        ? 'bg-[#38EF7D]'
                        : 'bg-[#0E1D3F] hover:bg-[#0E1D3F]/80'
                    }`}
                  >
                    <span className={`text-xs lg:text-sm font-medium ${
                      selectedCategories[category.id] ? 'text-[#060F1E]' : 'text-white'
                    }`}>
                      {category.name}
                    </span>
                    {selectedCategories[category.id] && (
                      <div className="absolute top-1 right-1 lg:top-1.5 lg:right-1.5">
                        <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-1.5 h-1.5 lg:w-2 lg:h-2 text-[#38EF7D]" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div> */}
            </div>

            {/* Or Section */}
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
  );
}
