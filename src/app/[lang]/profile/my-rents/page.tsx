'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { Calendar, Clock, Play, Trash2 } from "lucide-react";
import { getPurchasedAudiobooks } from "@/utils/apiServices";
import { AudiobookItem, TRentAudiobook } from "@/features/profile/components/Profile/static/profile.type";
import Link from "next/link";
import { paths } from "@/utils/Paths";
// import { getPurchasedAudiobooks } from "@/shared/api/server-api";
import BookIcon from "@/svgs/bookIcon";
import { useAppSelector } from "@/store/store";
import BookIcon2 from "@/svgs/BookIcon.svg";
import { useRouter } from "next/navigation";
import { convertSecondsToHourMin, dayDifferenceInBangla, formatDate } from "@/helpers/commonFunction";
import PurchasedIcon from "@/svgs/PurchasedIcon";

type Book = { id: number; title: string; img: string };

export default  function MyRents() {
  const user=useAppSelector((store)=>store?.user?.userData); 
  const [books,setBooks]=useState<AudiobookItem[]>([]); 
  const [activeTab,setActiveTab]=useState('active')
  const router=useRouter();
  const [expiredBooks,setExpiredBooks]=useState<AudiobookItem[]>([]);
  // Read a specific cookie

  const getPurchased=async()=>{
    let result=await getPurchasedAudiobooks(user?.id??'')
    setBooks(result?.data);
    setExpiredBooks(result?.expiredData);
  }
  // const id = cookieStore.get('id')?.value;
  // //console.log("MyRents",result)
  
    // let books:TRentAudiobook[]=result?.data;

    const getTabwiseData=()=>{
      if(activeTab==='active'){
        return books;
      }else{
        return expiredBooks;
      }
    }

    useEffect(()=>{
      getPurchased();
    },[])

  return (
    <div className=" bg-slate-900 rounded-[8px] flex items-center justify-center mt-2 p-4">
      <div className="w-full max-w-md relative">
        
        {/* Main Container */}
        <div className="  rounded-xl shadow-2xl  overflow-hidden">
          {/* Header */}
          <div className=" p-4 flex items-center gap-3">
            <div className="size-8">
              <PurchasedIcon   />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">আমার র‍্যান্ট নেওয়া অডিওবইসমূহ</h1>
              {/* <p className="text-slate-400 text-xs">
                Your rented audiobooks collection
              </p> */}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-slate-900/50 px-4 pt-4">
            <div className="flex gap-6 border-b-2 border-slate-800">
              {/* <button
                onClick={() => setActiveTab('total')}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'total'
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-400'
                }`}
              >
                Total Rents
                {activeTab === 'total' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                )}
              </button> */}
              <button
                onClick={() => setActiveTab('active')}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'active'
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-400'
                }`}
              >
                অ্যাকটিভ রেন্টস
                {activeTab === 'active' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('expired')}
                className={`pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'expired'
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-400'
                }`}
              >
                এক্সপায়ার্ড
                {activeTab === 'expired' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                )}
              </button>
            </div>
          </div>

          {/* Audiobooks List */}
          <div className="p-3 space-y-3 max-h-[500px] overflow-y-auto">
            {books.length === 0 ? (
              // No Audiobooks State
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12">
                  <BookIcon2   />
                </div>
                <h3 className="text-base font-semibold text-slate-400 mb-1">
                  কোনও অডিওবুক নেই
                </h3>
                {/* <p className="text-slate-500 text-xs max-w-xs">
                  {activeTab === 'expired' 
                    ? 'কোনও অডিওবুক নেই'
                    : ''}
                </p> */}
              </div>
            ) : (
              // Audiobook Cards
              getTabwiseData()?.map((book) => (
                <div
                  key={book?.audiobook_id}
                  className="bg-slate-800/50 border border-slate-700 rounded-[4px] p-3 hover:border-slate-600 transition-all"
                >
                  <div className="flex gap-3">
                    {/* Book Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-28 bg-gradient-to-br from-teal-600 to-teal-800 rounded-[4px] overflow-hidden shadow-lg">
                        <img
                          loading="lazy"
                          src={book.thumb_path}
                          alt={book.name}
                          onClick={() => router.push(paths.book_details(book.audiobook_id))}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Book Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        {/* Title and Expiry */}
                        <div className="md:flex items-start justify-between gap-2 mb-1">
                          <div>
                            <h2 className="text-sm font-semibold text-white line-clamp-1">
                              {book.name}
                            </h2>
                            <p className="text-slate-400 text-xs">
                              {convertSecondsToHourMin(book.total_duration)}
                            </p>
                          </div>
                          {activeTab==='active'?(
                            <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded whitespace-nowrap">
                            এক্সপায়ার্ড : {formatDate(book.expired_at,'bn')}
                          </span>):(
                            <span className="text-xs text-[#FF1E3C] bg-red-700/20 px-2 py-1 rounded whitespace-nowrap">
                            এক্সপায়ার্ড 
                          </span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="xs:flex items-center gap-4 space-y-2 mb-2 mt-2">
                          <div className="flex items-center gap-1 text-slate-400 text-xs">
                            <Clock size={12} />
                            <span>{convertSecondsToHourMin(book.total_duration)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400 text-xs">
                            <Calendar size={12} />
                            <span>{dayDifferenceInBangla(book.expired_at)} বাকি</span>
                          </div>

                        </div>

                        {/* Purchase Date */}
                        <p className="text-xs text-slate-500 mb-2">
                          ক্রয়ের তারিখ: {formatDate(book.purchased_at,'bn')}
                        </p>

                        {/* Progress Bar */}
                        {/* <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-slate-400">Progress</span>
                            <span className="text-xs text-slate-400">{0}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-1 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${0}%` }}
                            ></div>
                          </div>
                        </div> */}
                      </div>

                      {/* Continue Button */}
                      <button
                        onClick={() => router.push(paths.book_details(book.audiobook_id))}
                        className="mt-2 w-full  text-white font-semibold py-2 rounded-[4px] transition-all duration-200  btn_gradient_new flex items-center justify-center gap-1.5 text-xs"
                      >
                        <Play size={14} fill="white" />
                        কন্টিনিউ
                      </button>
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

{/* <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#070B24] to-[#1A0F2E] text-white py-10 px-5 md:px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          My purchased books
        </h1>

        <ul className="space-y-6">
          {books.map((book, idx:number) => (
            <li
              key={idx}
              className="flex items-center justify-between gap-4 p-2 rounded-2xl shadow-md 
                         
                         hover:shadow-[0_0_25px_rgba(136,29,105,0.4)] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-white/80 w-6 text-right">
                  {idx + 1}.
                </span>

                <div className="w-14 h-20 md:w-20 md:h-28 rounded-[4px] overflow-hidden bg-white/10 flex-shrink-0">
                 <Link href={paths.book_details(book.audiobook_id)}>
                    <Image
                        src={book.banner_path}
                        alt={book.name}
                        width={120}
                        height={180}
                        className="object-cover w-full h-full"
                    />
                 </Link>
                </div>

                <h2 className="text-lg md:text-xl font-semibold tracking-wide">
                  {book.name}
                </h2>
              </div>

              
            </li>
          ))}

          {books.length === 0 && (
            <p className="text-center text-white/50 mt-10">
              No Rent yet 😢
            </p>
          )}
        </ul>
      </div>
    </main> */}