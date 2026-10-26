"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { reward_faq } from "@/utils/apiServices";
import { TFaq } from "../reward-point.type";

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number|null>(null);
  let [faqs,setFaqs]=useState<TFaq[]>([]);

    const getFaq=async()=>{
        let result=await reward_faq();
        setFaqs(result?.data?.data??[]);
    }

  useEffect(()=>{
    getFaq();
  },[])

  const toggle = (index:number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className=" text-white relative flex items-center justify-center px-4 py-12">
        <div className="circular_gradient left-[20%] top-[10%] w-[25vw] h-[25vw] absolute  "></div>
        <div className="circular_gradient right-[20%] top-[40%] w-[25vw] h-[25vw] absolute  "></div>
        <div className="circular_gradient left-[20%] bottom-[5%] w-[25vw] h-[25vw] absolute  "></div>
      <div className="w-full z-[2] relative max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          সচরাচর জিজ্ঞাসা
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-100 rounded-lg overflow-hidden "
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center md:px-5 py-2 md:py-4 text-left font-medium text-cs md:text-base focus:outline-none"
              >
                {faq.question}
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-100" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-100" />
                )}
              </button>

              <div
                className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
                  activeIndex === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="md:px-5 pb-4 text-gray-300 text-cs md:text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
