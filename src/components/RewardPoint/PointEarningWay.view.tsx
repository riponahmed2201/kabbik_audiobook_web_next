'use client'
import { useEffect, useState } from "react";
import { TPointEarningWay } from "./static/rewardPoint.type";
import { reward_tasks } from "@/utils/apiServices";

export default function PointsPage() {
  const [tasks,setTask] = useState<TPointEarningWay>([]);

  const getPointEarningWay=async()=>{
    let result= await reward_tasks();
    setTask(result?.data?.data);
  }

  useEffect(()=>{
    getPointEarningWay();
  },[])

  return (
    <div className=" flex flex-col items-center py-10 px-4">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-semibold text-white mb-8 text-center">
        যেসব টাস্কে পয়েন্ট পাওয়া যাবে
      </h1>

      {/* Card Container */}
      <div className="w-full max-w-xl rounded-2xl shadow-lg border-b border-white/10 divide-y divide-white/10">
        {tasks.map((task, i) => (
          <div
            key={i}
            className="flex items-center gap-3 md:px-5 py-1.5 md:py-4  transition"
          >
            {/* Icon */}
            <div className="w-6 h-6 min-w-6 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-pink-500">
              <span className="text-white text-sm font-bold">
                <img loading="lazy" src={task?.leading_icon2}/>
              </span>
            </div>

            {/* Text */}
            <p className="flex-1 text-white/90 text-sm md:text-base leading-tight">
              {task.title} 
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
