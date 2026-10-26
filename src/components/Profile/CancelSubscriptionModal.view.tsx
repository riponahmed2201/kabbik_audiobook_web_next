'use client'
import CancelSubsCross from '@/svgs/CancelSubsCross.svg';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Spinner from '../ui/Spinner.view';
import { useAppSelector } from '@/store/store';
import { formatDateToBengali } from '@/helpers/commonFunction';

export default function CancelSubscriptionModal({onCancel,onConfirm}:{onCancel:()=>void,onConfirm:()=>void}) {
    const [unsubscribeLoader,setUnSubscribeLoader]=useState(false);
    const user=useAppSelector((store)=>store?.user?.userData)

    const unsubscribeApiHandler=async()=>{
        setUnSubscribeLoader(true);
        await onConfirm();
        setUnSubscribeLoader(false);
    }
  return (
    <div className=" bg-slate-900 flex items-center rounded-[16px] justify-center p-4">
      <div className="max-w-md w-full">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-purple-700 rounded-xl flex items-center justify-center">
            <CancelSubsCross/>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-white text-cn font-semibold text-center mb-3">
          আপনি কি আপনার সাবস্ক্রিপশন বন্ধ করতে চান?
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-sm text-center mb-5 px-2">
          বাতিল করলে {formatDateToBengali(user?.next_purchase_time??new Date().toISOString())} তারিখে আপনার বর্তমান প্যাকেজের সাবস্ক্রিপশন মেয়াদ শেষ হওয়ার পর থেকে আপনি কাব্যিক -এর সব প্রিমিয়াম সুবিধার অ্যাক্সেস হারাবেন।
        </p>

        {/* Features Box */}
        <div className="bg-slate-800 rounded-[8px] p-4 mb-4">
          <h2 className="text-white text-sm font-semibold mb-3">{`আপনি যেসব সুবিধা হারাবেন:`}</h2>
          <ul className="space-y-2">
            <li className="text-slate-300 text-sm flex items-start">
              <span className="mr-2">•</span>
              <span>প্রিমিয়াম ফিচার ব্যবহারের সুযোগ</span>
            </li>
            <li className="text-slate-300 text-sm flex items-start">
              <span className="mr-2">•</span>
              <span>আনলিমিটেড প্লেলিস্ট সুবিধাt</span>
            </li>
            <li className="text-slate-300 text-sm flex items-start">
              <span className="mr-2">•</span>
              <span>আনলিমিটেড ডাউনলোড সুবিধা</span>
            </li>
            <li className="text-slate-300 text-sm flex items-start">
              <span className="mr-2">•</span>
              <span>সকল প্রিমিয়াম অডিওবুক শোনার সুযোগ</span>
            </li>
            <li className="text-slate-300 text-sm flex items-start">
              <span className="mr-2">•</span>
              <span>বিজ্ঞাপন-মুক্ত অডিওবুক শোনার সুবিধা</span>
            </li>
            <li className="text-slate-300 text-sm flex items-start">
              <span className="mr-2">•</span>
              <span>রেফার অ্যান্ড আর্ন সুবিধাটিও বন্ধ হয়ে যাবে</span>
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5">
          <button onClick={onCancel} className="w-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-3 rounded-[7px] transition-colors">
            আমার প্ল্যান চালু রাখুন
          </button>
          <button disabled={unsubscribeLoader} onClick={unsubscribeApiHandler} className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-3 rounded-[7px] transition-colors">
            {unsubscribeLoader?<Spinner size='w-3 h-3'/>:''}
            সাবস্ক্রিপশন বাতিল করুন
          </button>
        </div>
      </div>
    </div>
  );
}