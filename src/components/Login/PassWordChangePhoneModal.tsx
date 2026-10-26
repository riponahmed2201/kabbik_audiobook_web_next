'use client'
import BdFlag from '@/svgs/BdFlag.svg'
import React, { MouseEvent, useState } from 'react'
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'
import { isValidMsisdn, normalizeMsisdn } from '@/helpers/commonFunction'
import Spinner from '../ui/Spinner.view'
import { TLoginModal, TPhoneOfChangePassword } from './static/login.type'

const PasswordChangePhoneModal = ({handleSubmit}:TPhoneOfChangePassword) => {
    const router = usePathname();
    const [phoneNumbers,setPhoneNumbers]=useState('')
    const [errors,setErrors]=useState('');
    const [submitLoader,setSubmitLoader]=useState(false);

    const handleLogin=async(e:MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();
      if(!isValidMsisdn(phoneNumbers)){
        setErrors('আপনার নম্বর সঠিক নয়, দয়া করে ১১ টি সংখ্যা প্রবেশ করুন')
        return;
      }
      setSubmitLoader(true);
      await handleSubmit(normalizeMsisdn(phoneNumbers)??'')
      setSubmitLoader(false);
    }

    

  return (
      <div className="w-full max-w-2xl  border border-gray-300 rounded-2xl shadow-lg p-5 ">
        <div className="flex flex-col gap-2 md:gap-4">
            <h2 className='text-white text-cs2 md:text-cn2 font-semibold'>আপনার ফোন নম্বর নিশ্চিত করুন</h2>
            <p className='text-white text-cs md:text-sm'>পাসওয়ার্ড পুনরায় সেট করতে আপনার <br/> ফোন নম্বরটি আবার নিশ্চিত করুন।</p>
          <div className="flex flex-col gap-2">
            <label className="text-white text-cs2 md:text-cn font-medium">
              ফোন নম্বর
            </label>
            
            <div className="relative">
              <div className="w-full border border-white  rounded-[4px] shadow-md bg-transparent">
                <div className="flex items-center">
                  {/* Country Code Section */}
                  <div className="flex items-center gap-2 px-1  py-2 border-r border-gray-300">
                    <div className="md:w-7 h-7 flex-shrink-0">
                      <BdFlag/>
                    </div>
                    <span className="text-white text-cs2 md:text-lg">+88</span>
                  </div>
                  
                  {/* Phone Input */}
                  <input
                    type="tel"
                    // value={phoneNumber}
                    onChange={(e) => {setPhoneNumbers(e.target.value);setErrors('');}}
                    placeholder="আপনার ফোন নম্বর লিখুন"
                    className="flex-1 text-cs2 md:text-cn bg-transparent text-white  placeholder-gray-400 px-1 focus:outline-none"
                  />
                </div>
              </div>
              <p className='text-xs text-red-600'>{errors}</p>
            </div>
          </div>

          {/* Continue Button */}
          <button 
            onClick={handleLogin}
            className="w-full bg-red-600 hover:bg-red-700 transition-colors rounded-[4px] shadow-md py-2 px-6 flex items-center justify-center"
            disabled={submitLoader}
          >
            {submitLoader?<Spinner size='w-6 h-6'/>:''}
            <span className="text-white text-cs2 md:text-cn font-medium">
              কন্টিনিউ
            </span>
          </button>
        </div>
      </div>
  )
}

export default PasswordChangePhoneModal