"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { deleteFavoritesApi, favoriteAudiobook } from "@/utils/apiServices";
import { FavoriteAudioBookInfo } from "@/features/profile/components/Profile/static/profile.type";
import Link from "next/link";
import { paths } from "@/utils/Paths";
import { toast } from "react-toastify";
import Spinner from "@/shared/ui/Spinner.view";
import { siteConfig } from "@/config/config";
import ListenInApp from "@/features/audiobook/components/audiobook/ListenInApp.view";
import { BookOpen, Heart, Trash2 } from "lucide-react";
import { convertToBanglaDigits } from "@/helpers/commonFunction";

interface Book {
  id: number;
  title: string;
  banner: string;
}

export default  function FavoritesPage () {
    let [books,setBooks]=useState<FavoriteAudioBookInfo[]>([]);
    let [loaderId,setLoaderId]=useState<number|string>(0);
    //  let books=result.data;
    const getBooks=async()=>{
      const result: {data:FavoriteAudioBookInfo[]} = await favoriteAudiobook();
      //console.log(result.data,"favorite books")
      setBooks(result?.data);
    }

    let handleDeleteFromList=async(id:number|string)=>{
      setLoaderId(id)
      let result=await deleteFavoritesApi(id);
      if(result?.success){
        toast.success("Removed From list successfully!")
        let newBooks=[...books];
        newBooks=newBooks.filter((item)=>item.id!==id);
        setBooks(newBooks);
      }else{
        toast.error("Something went wrong!")
      }
      setLoaderId(0);
    }

    useEffect(()=>{
      getBooks();
    },[])

  return (
    <div className="bg-slate-900 rounded-[8px] py-5 my-2 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        

        {/* Main Container */}
        <div className="">
          {/* Header */}
          <div className="bg-slate-900/90 border-b  border-slate-800 p-4 flex items-center gap-3">
            <div className="bg-red-500 p-2 rounded-xl">
              <Heart size={20} className="text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">আমার ফেভারিটস বইগুলো</h1>
              <p className="text-slate-400 text-xs">
                {convertToBanglaDigits(books.length)}টি ফেভারিট 
              </p>
            </div>
          </div>

          {/* Books List */}
          <div className="p-3 space-y-3 max-h-[500px] overflow-y-auto">
            {books.length === 0 ? (
              // No Books State
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-slate-800/50 p-4 rounded-full mb-3">
                  <Heart size={32} className="text-slate-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-400 mb-1">
                  কোনো প্রিয় বই নেই
                </h3>
                <p className="text-slate-500 text-xs max-w-xs">
                  আপনার প্রিয় বই সংগ্রহে যোগ করুন
                </p>
              </div>
            ) : (
              // Book Cards
              books.map((book) => (
                <div
                  key={book.id}
                  className="bg-slate-800/50 rounded-[4px] border border-slate-700  p-3 hover:border-slate-600 transition-all"
                >
                  <div className="flex gap-3">
                    {/* Book Thumbnail */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-20 h-28 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg overflow-hidden shadow-lg">
                        <Link href={paths.book_details(book?.id)}>
                          <img
                            loading="lazy"
                            src={book.thumb_path}
                            alt={book.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>
                      {/* Favourite Icon */}
                      <button
                        onClick={() => handleDeleteFromList(book.id)}
                        className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 rounded-full p-1 shadow-lg transition-colors"
                      >
                        <Trash2 size={12} className="text-white" fill="white" />
                      </button>
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <h2 className="text-sm font-semibold text-white mb-0.5 line-clamp-1">
                          {book.name}
                        </h2>
                        <p className="text-slate-400 text-xs mb-2">
                          {book.author_name}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1 text-slate-400 text-xs">
                            {/* <Star size={12} className="text-yellow-500" fill="currentColor" /> */}
                            <span>শুনেছেন:</span>
                            <span className="text-slate-500">{convertToBanglaDigits(book.play_count)}</span>
                          </div>
                        </div>

                        {/* Duration */}
                        {/* <div className="flex items-center gap-1 text-slate-400 text-xs mb-2">
                          <BookOpen size={12} />
                          <span>{book.}</span>
                        </div> */}
                      </div>

                      <div className="mt-2 space-y-2">
                        <Link
                          href={paths.book_details(book.id)}
                          className="w-full text-white font-semibold py-2 rounded-[4px] transition-all duration-200 shadow-lg btn_gradient_new flex items-center justify-center gap-1.5 text-xs"
                        >
                          <BookOpen size={14} />
                          বই দেখুন
                        </Link>
                        <ListenInApp
                          audiobookId={book.id}
                          variant="inline"
                          className="justify-center text-xs [&_a]:text-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className="  relative overflow-hidden">
//   <div className="absolute inset-0 overflow-hidden pointer-events-none">
//     <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
//     <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
//     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
//   </div>

//   <div className="relative z-[2] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto">
//     <div className="text-center mb-12 sm:mb-16">
//       <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight">
//         My Favorite <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">Books</span>
//       </h1>
//       <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
//         A carefully curated collection of literary masterpieces
//       </p>
//     </div>

//     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
//       {books.map((book, index) => (
//         <div
//           key={book.id}
//           className="group"
//           style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
//         >
//           <div className="relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"></div>

//             <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-xl overflow-hidden border border-slate-700/30 transition-all duration-300 hover:border-purple-400/40 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1">
//               <Link href={paths.book_details(book.id)}>
//                 <div className="relative w-full aspect-[3/4] overflow-hidden bg-slate-900/40">
//                   <Image
//                     src={
//                       book.thumb_path ??
//                       book.banner_path ??
//                       "https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/bookPlaceholder.jpg"
//                     }
//                     alt={book.name}
//                     blurDataURL={siteConfig.placeholderBook}
//                     fill
//                     className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-50"></div>
//                   <div className="absolute inset-0 bg-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <div className="absolute top-3 right-3 w-7 h-7 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
//                     <Heart className="w-4 h-4 text-red-400" />
//                   </div>
//                 </div>
//               </Link>

//               <div className="p-3 sm:p-4 absolute bottom-0">
                

//                 <button
//                   disabled={loaderId === book.id}
//                   onClick={() => handleDeleteFromList(book.id)}
//                   className="w-full bg-gradient-to-r from-red-500/90 to-rose-600/90 hover:from-red-600 hover:to-rose-700 disabled:from-gray-600 disabled:to-gray-700 text-white text-xs sm:text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed active:scale-95 shadow-md hover:shadow-red-500/20"
//                 >
//                   {loaderId === book.id ? (
//                     <>
//                       <Spinner size="w-3 h-3 sm:w-4 sm:h-4" />
//                       <span className="hidden sm:inline">Removing...</span>
//                       <span className="sm:hidden">...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
//                       <span>Remove</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>

//     {books.length === 0 && (
//       <div className="flex flex-col items-center justify-center py-24 sm:py-32">
//         <div className="relative mb-8">
//           <div className="absolute inset-0 bg-purple-400/20 blur-3xl rounded-full animate-pulse-slow"></div>
//           <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-full flex items-center justify-center border border-purple-400/20 shadow-xl">
//             <BookOpen className="w-10 h-10 sm:w-14 sm:h-14 text-purple-300" />
//           </div>
//         </div>
//         <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Your Library Awaits</h3>
//         <p className="text-gray-300 text-center max-w-md px-4 text-sm sm:text-base leading-relaxed">
//           Start building your collection by adding books that inspire, educate, and entertain you.
//         </p>
//       </div>
//     )}
//   </div>

//   <style jsx>{`
//     @keyframes fadeInUp {
//       from {
//         opacity: 0;
//         transform: translateY(20px);
//       }
//       to {
//         opacity: 1;
//         transform: translateY(0);
//       }
//     }
//     @keyframes pulse-slow {
//       0%, 100% {
//         opacity: 0.6;
//       }
//       50% {
//         opacity: 1;
//       }
//     }
//     .animate-pulse-slow {
//       animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//     }
//   `}</style>
// </div>