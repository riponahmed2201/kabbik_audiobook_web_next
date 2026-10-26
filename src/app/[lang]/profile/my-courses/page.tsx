'use client'
import { TMyCourse } from "@/components/Profile/static/profile.type";
import { convertToBanglaDigits } from "@/helpers/commonFunction";
import { useAppSelector } from "@/store/store";
import MyCourseIcon from "@/svgs/MyCourseIcon.svg";
import { getPurchasedCourse } from "@/utils/apiServices";
import { Book, CheckCircle, Clock, Play } from "lucide-react";
// import { getPurchasedCourse } from "@/utils/server-api";
import Image from "next/image";
import { useEffect, useState } from "react";



export default  function MyCoursesPage() {
  const user= useAppSelector((store)=>store?.user?.userData);
  const [getPurchasedCourses,setGetPurchasedCourss]=useState<TMyCourse[]>([])

  const getCourses=async()=>{
    let result=await getPurchasedCourse(user?.id??'')
    setGetPurchasedCourss(result?.data);
  }

  useEffect(()=>{
    
  },[])
    
    // const cookieStore = cookies();
    // const id = cookieStore.get('id')?.value;
    
    // let courses:TMyCourse[]=result?.data;

  return (
    <div className=" bg-slate-900 flex items-center rounded-[8px] justify-center p-3 pr-6 my-2">
      <div className="w-full max-w-md relative">
        
        {/* Main Container */}
        <div className=" overflow-hidden ">
          {/* Header */}
          <div className="bg-slate-900/90 border-b border-b-slate-500 p-4 flex items-center gap-3">
            <div className="w-12">
              <MyCourseIcon />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">আমার কোর্সসমূহ</h1>
              <p className="text-slate-400 text-xs">
                {convertToBanglaDigits(getPurchasedCourses.length)}  একটিভ কোর্স
              </p>
            </div>
          </div>

          {/* Courses List */}
          <div className="p-3 space-y-3 max-h-[500px] overflow-y-auto">
            {getPurchasedCourses.length === 0 ? (
              // No Courses State
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-slate-800/50 p-4 rounded-full mb-3">
                  <Book size={32} className="text-slate-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-400 mb-1">
                  কোন কোর্স নেই 
                </h3>
                
              </div>
            ) : (
              // Course Cards
              getPurchasedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 hover:border-slate-600 transition-all"
                >
                  <div className="flex gap-3">
                    {/* Course Thumbnail */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-28 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg overflow-hidden shadow-lg">
                        <img
                          loading="lazy"
                          src={course.image_url}
                          alt={course.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <h2 className="text-sm font-semibold text-white mb-0.5 line-clamp-1">
                          {course.name}
                        </h2>
                        <p className="text-slate-400 text-xs mb-2">
                          {course.instructor}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1 text-slate-400 text-xs">
                            <Clock size={12} />
                            <span>{course.total_class}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400 text-xs">
                            <CheckCircle size={12} />
                            <span>{course.total_class}/{0} Lessons</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-slate-400">Progress</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-1 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Continue Button */}
                      <button
                        // onClick={() => handleContinue(course.id)}
                        className="mt-2 w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-1.5 text-xs"
                      >
                        <Play size={14} fill="white" />
                        Continue Listening
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

{/* <div className="min-h-screen bg-[#050f1e] text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">🎓 My Courses</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {getPurchasedCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-[#3A2768] to-[#881D69] hover:scale-105 transition-transform duration-300"
          >
            <div className="relative w-full h-48">
              <Image
                src={course.image_url}
                alt={course.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-sm text-gray-200">{course.description?.slice(0,200)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div> */}