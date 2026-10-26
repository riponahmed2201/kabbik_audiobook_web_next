import { useState } from "react";
import { Check } from "lucide-react";
import Spinner from "@/shared/ui/Spinner.view";


export default function EditFoldersModal({folderName,onSubmit,loading}:{folderName:string,onSubmit:(val:string)=>void,loading:boolean}) {
  const [folder,setFolder]=useState(folderName);

  

  return (
    <div className=" bg-dark_bg flex items-center pt-8 mt-4 justify-center p-1 sm:p-2 lg:p-4">
      <div className="w-full max-w-xl mx-auto">
        <div className="border border-white/20 rounded-md p-2 sm:p-3 lg:p-4 bg-[#060F1E]">
          {/* Title */}
          <h1 className="text-white text-center text-sm sm:text-base lg:text-lg font-semibold mb-4 lg:mb-6 leading-tight">
            ফোল্ডারের নাম পরিবর্তন করুন
          </h1>

          <div className="space-y-6 lg:space-y-8">
            {/* Category Selection Grid */}
            <div className="space-y-3 lg:space-y-4">
              {/* First Row */}
              
            </div>

            {/* Or Section */}
            <div className="space-y-3 lg:space-y-5">
              

              {/* New Folder Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="ফোল্ডারের নাম পরিবর্তন করুন"
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                  className="w-full h-7 lg:h-10 px-2 lg:px-3 rounded-md border border-[#5E5E5E] bg-transparent text-white placeholder-white/20 text-xs lg:text-sm font-medium focus:outline-none focus:border-[#38EF7D] transition-colors shadow"
                />
              </div>
            </div>

            {/* Complete Button */}
            <button
              onClick={()=>onSubmit(folder)}
              disabled={loading}
              className="w-full h-6 lg:h-8 bg-[#38EF7D] rounded-md text-[#0E1D3F] text-xs lg:text-sm font-medium hover:bg-[#38EF7D]/90 transition-colors shadow"
            >
                {loading?<span>
                    <Spinner size=" w-4 h-4 mr-1"/>
                </span>:""}
              সাবমিট 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
