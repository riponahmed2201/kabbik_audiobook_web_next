"use client";

import { useState } from "react";
import CommonButton from "../ui/button";
import { toast } from "react-toastify";
import { postBookRequest } from "@/utils/apiServices";
import { Languages } from "lucide-react";
import Spinner from "../ui/Spinner.view";
import BookIcon from "@/svgs/bookIcon";
import BookIcon2 from "@/svgs/BookIcon.svg";

const BookInfoForm = ({onclose}:{onclose:()=>void}) => {
  const [loading,setLoading]=useState(false);
  const [errors, setErrors] = useState({
    name: "",
    bookName: "",
    author: "",
    language: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    bookName: "",
    author: "",
    language: "",
    publisher: "",
  });

  const bookRequestForm = async (event: any) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const bookRequestData = await postBookRequest(
      formData.name,
      formData.bookName,
      formData.author,
      formData.language,
      formData.publisher
    );
    if (bookRequestData.data) {
      toast.success("Book Request Sent !", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.error(
        "Could not send request, Please fill the credentials again !",
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        }
      );
    }
    setLoading(false);
    onclose();
  };

   const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Remove error message as user types
    if (value.trim() !== "") {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim())
      newErrors.name = "অনুগ্রহ করে আপনার নাম লিখুন।";
    if (!formData.bookName.trim())
      newErrors.bookName = "অনুগ্রহ করে বই এর নাম লিখুন।";
    if (!formData.author.trim())
      newErrors.author = "অনুগ্রহ করে লেখকের নাম লিখুন।";
    if (!formData.language.trim())
      newErrors.language = "অনুগ্রহ করে ভাষার নাম লিখুন।";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className=" bg-slate-900 flex items-center mt-3 pt-10 rounded-[12px] justify-center p-4">
      <div className="max-w-sm w-full ">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10  rounded-[4px] flex items-center justify-center flex-shrink-0">
              <BookIcon2/>
            </div>
            <div>
              <h1 className="text-white text-base font-semibold">যে বইটি শুনতে চান, তার অডিও সংস্করণের জন্য অনুরোধ পাঠান</h1>
              {/* <p className="text-slate-400 text-xs">{`Can't find what you're looking for? Let us know`}</p> */}
            </div>
          </div>
          
        </div>

        {/* Form Fields */}
        <div className="space-y-3">
          {/* Book Title */}
          <div>
            <label className="text-white text-xs mb-1.5 block">
              আপনার নাম <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="আপনার নাম লিখুন"
              className="w-full bg-transparent border border-slate-700 rounded-[4px] px-3 py-2 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-slate-600 text-xs"
            />
          </div>
          <div>
            <label className="text-white text-xs mb-1.5 block">
              বইয়ের টাইটেল <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              placeholder="বইটির সম্পূর্ণ নাম লিখুন"
              className="w-full bg-transparent border border-slate-700 rounded-[4px] px-3 py-2 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-slate-600 text-xs"
            />
          </div>

          {/* Author Name */}
          <div>
            <label className="text-white text-xs mb-1.5 block">
              লেখকের নাম  <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="লেখকের নাম লিখুন"
              className="w-full bg-transparent border border-slate-700 rounded-[4px] px-3 py-2 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-slate-600 text-xs"
            />
          </div>

          {/* language */}
          <div>
            <label className="text-white text-xs mb-1.5 block">
              বই এর ভাষার নাম লিখুন <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="যেমন: বাংলা, ইংরেজি"
              className="w-full bg-transparent border border-slate-700 rounded-[4px] px-3 py-2 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-slate-600 text-xs"
            />
          </div>

          
          {/* প্রকাশনী  */}
          <div>
            <label className="text-white text-xs mb-1.5 block">
              প্রকাশনী (যদি থাকে) 
            </label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              placeholder="প্রকাশনীর নাম (ঐচ্ছিক)"
              className="w-full bg-transparent border border-slate-700 rounded-[4px] px-3 py-2 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-slate-600 text-xs"
            />
          </div>
          {/* Submit Button */}
          <button
            onClick={bookRequestForm}
            disabled={loading}
            className="w-full btn_gradient_new text-white font-medium py-2.5 rounded-[4px] transition-all text-xs"
          >
            {loading?<Spinner size="w-3 h-3"/>:''}
            অনুরোধ সাবমিট করুন
          </button>

          {/* Tips Box */}
          <div className="bg-slate-800 border border-slate-700 rounded-[4px] p-3">
            <h3 className="text-white text-xs font-semibold mb-1.5">পরামর্শ:</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              এটি একটি বই অনুরোধ ফর্ম। কাব্যিক টিম আপনার অনুরোধটি পেয়েছে এবং বইটির প্রাপ্যতা ও কপিরাইটের ভিত্তিতে অডিও সংস্করণ উপলব্ধ হবে কি না—তা সম্পূর্ণভাবে কাব্যিক টিম দ্বারা নির্ধারিত হবে।
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default BookInfoForm;
{/* <div className="w-full  max-h-[95vh] overflow-y-auto profile_btn_gradients max-w-md mx-auto px-8 pb-4 pt-7 mt-4 rounded-2xl shadow-2xl text-white relative">
      <h2 className="text-2xl font-semibold text-center mb-8 text-white drop-shadow-md">
        📚 বই সম্পর্কিত তথ্য দিন
      </h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            আপনার নাম লিখুন
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="আপনার নাম"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.name && <p className="text-yellow-300 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            বই এর নাম লিখুন
          </label>
          <input
            type="text"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            placeholder="বই এর নাম"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.bookName && <p className="text-yellow-300 text-xs mt-1">{errors.bookName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            বই এর লেখক এর নাম লিখুন
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="লেখকের নাম"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.author && <p className="text-yellow-300 text-xs mt-1">{errors.author}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            বই এর ভাষার নাম লিখুন
          </label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="যেমন: বাংলা, ইংরেজি"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
          {errors.language && <p className="text-yellow-300 text-xs mt-1">{errors.language}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-0.5 text-white/90">
            প্রকাশনী (যদি থাকে)
          </label>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="প্রকাশনীর নাম (ঐচ্ছিক)"
            className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <CommonButton
          handleClick={bookRequestForm}
          className="w-full py-2 bg-white text-[#3A2768] font-semibold rounded-[4px] 
                    hover:bg-gray-100 transition-all duration-200 shadow-md"
        >
          {loading ? <Spinner size="w-4 h-4" /> : ""}
          জমা দিন
        </CommonButton>
      </div>
    </div> */}