"use client";

import { UserInfoFields } from "@/app/[lang]/profile/reward-point/reward-point.type";
import { ChangeEvent, FormEvent, useState } from "react";
import Spinner from "../ui/Spinner.view";

export default function MobileNumberForm({inputFields,onSubmit}:{inputFields:UserInfoFields|null,onSubmit:(val:any)=>Promise<void>}) {
  const [data, setData] = useState<any>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading,setLoading]=useState(false);
  

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]:e.target.value
    });
    setError("");
    setSuccess("");
  };

  // const validateNumber = (number:string) => {
  //   const pattern = /^01[0-9]{9}$/; // Valid Bangladeshi number (11 digits)
  //   return pattern.test(number);
  // };

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!mobile) {
    //   setError("মোবাইল নম্বর লিখুন");
    //   return;
    // }

    // if (!validateNumber(mobile)) {
    //   setError("সঠিক মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)");
    //   return;
    // }
    setLoading(true)
    await onSubmit(data);
    
    setError("");
    setLoading(false);
  };

  return (
    <div className="py-5 rounded-[8px] flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        {/* Title */}
        <h1 className="text-clg2 font-bold text-[#0A093D] leading-snug mb-8">
         প্রয়োজনীয় তথ্য দিন 
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Label */}
          {inputFields?.map((items)=>(
            <span key={items?.keyName}>
              <label
                htmlFor={items.keyName}
                className="block text-left font-medium text-[#0A093D] mb-2"
              >
                {items?.title}
              </label>

            {/* Input */}
              <input
                id={items.keyName}
                type="text"
                value={data[items.keyName]}
                name={items.keyName}
                onChange={handleChange}
                placeholder={items.hint}
                required={true}
                className={`w-full border ${
                  error ? "border-red-400" : "border-gray-400"
                } rounded-xl py-1.5 px-2.5 text-gray-700 placeholder-gray-400 focus:outline-none text-cs2 focus:ring-2 focus:ring-pink-200 mb-2`}
              />

              {/* Error Message */}
              {/* {error && <p className="text-red-500 text-sm mb-4">{items?.emptyErrorMessage}</p>} */}
            </span>
          ))}

          {/* Success Message */}
          {/* {success && <p className="text-green-600 text-sm mb-4">{success}</p>} */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-cn bg-gradient-to-r from-[#F8B6B6] to-[#F3C2C2] text-[#BF2E2E] font-semibold py-1.5 rounded-full hover:opacity-90 transition"
          >
            {loading?<Spinner size="w-3 h-3"/>:''}
            জমা দিন
          </button>
        </form>
      </div>
    </div>
  );
}
