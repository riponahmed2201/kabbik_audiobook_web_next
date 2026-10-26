"use client";

import { useAppSelector } from "@/store/store";
import { sponsor_request } from "@/utils/apiServices";
import { useState } from "react";
import Spinner from "@/shared/ui/Spinner.view";
import { toast } from "react-toastify";
import UserIcon from "@/svgs/UserIcon";
import UserIcon2 from "@/svgs/UserIcon.svg";

interface SponsorFormModalProps {
  onClose: () => void;
}





const SponsorFormModal = ({  onClose }: SponsorFormModalProps) => {
  const [loading,setLoading]=useState(false);
  const user=useAppSelector(store=>store.user?.userData);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    productName: "",
    productLink: "",
    details: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrors({...errors,[e.target.name]:''})
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Valid email required";
    if (!form.productName.trim()) newErrors.productName = "Product name is required";
    if (!form.productLink.trim()) newErrors.productLink = "Product link is required";
    if (!form.details.trim()) newErrors.details = "Please add company/product details";
    //console.log(newErrors);
    return newErrors;
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setLoading(true);
      let result=await sponsor_request({
        userId:user?.id??0,
        productName:form.productName,
        companyProductDetails:form.details,
        productLink:form.productLink,
        contactPersonName:form.fullName,
        contactPersonPhone:form.phone,
        contactPersonEmail:form.email
      })
      if(result.affectedRows){
        toast.success("Sponsorship details send to kabbik.com")
      }
      onClose();
    }
    setLoading(false);
  };

  return (
     <div className="rounded-[12px] bg-gradient-to-br  from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm  rounded-xl   ">
        {/* Header */}
        <div className="relative  rounded-t-xl p-4">
          <div className="flex items-center gap-2">
            <div className="w-12">
              <UserIcon2 />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">আপনার ব্র্যান্ডকে এগিয়ে নিন অডিওবুক স্পন্সরশিপের মাধ্যমে</h1>
              {/* <p className="text-orange-100 text-xs">Grow your brand with audiobook sponsorship</p> */}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-4 pb-4 space-y-3">
          <h2 className="text-base font-bold text-white text-center mb-2">স্পন্সরশিপ অনুরোধ</h2>

          {/* Full Name */}
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              আপনার নাম  <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="আপনার নাম"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-[4px] px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {errors.fullName && (
              <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              ফোন নম্বর <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="ফোন নম্বর"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-[4px] px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              ইমেইল এড্রেস <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ইমেইল এড্রেস"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-[4px] px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>
           <div>
            <label className="block text-xs text-slate-300 mb-1">
              প্রোডাক্ট এর নাম <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
                name="productName"
                value={form.productName}
                onChange={handleChange}
                placeholder="প্রোডাক্ট এর নাম"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-[4px] px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {errors.productName && (
                <p className="text-red-400 text-xs mt-1">{errors.productName}</p>
              )}
          </div>

          {/* Product Link */}
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              প্রোডাক্ট এর লিংক <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              name="productLink"
              value={form.productLink}
              onChange={handleChange}
              placeholder="প্রোডাক্ট এর লিংক"
              className="w-full bg-slate-900/50 border border-slate-600 rounded-[4px] px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {errors.productLink && (
              <p className="text-red-400 text-xs mt-1">{errors.productLink}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              কোম্পানি ও প্রোডাক্ট এর বিস্তারিত <span className="text-red-400">*</span>

            </label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder="কোম্পানি ও প্রোডাক্ট এর বিস্তারিত"
              rows={3}
              className="w-full bg-slate-900/50 border border-slate-600 rounded-[4px] px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
            />
            {errors.details && (
              <p className="text-red-400 text-xs mt-1">{errors.details}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full  disabled:opacity-50 text-white font-semibold py-2 text-sm rounded-[4px] transition-all duration-200 shadow-lg btn_gradient_new flex items-center justify-center gap-2"
          >
            {loading?<Spinner size="w-3 h-3"/>:''}
            সাবমিট
          </button>

          {/* Why Sponsor */}
          {/* <div className="mt-4 pt-4 border-t border-slate-700">
            <h3 className="text-sm font-semibold text-white mb-2">কেন আমাদের স্পন্সর করবেন?</h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>কয়েক মিলিয়ন উচ্চশিক্ষিত দর্শকের কাছে আপনার প্রোডাক্ট  পৌঁছে দিন</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>আপনার  ফ্লেক্সিবল এবং সুন্দর প্লেসমেন্ট </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Details analytics and performance reports</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Custom branded content opportunities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Dedicated account management</span>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SponsorFormModal;
{/* <div className="tiny_scroll_bar">
        <div
          className="profile_btn_gradients  max-h-[95vh] pt-5 mt-3 overflow-y-auto text-white rounded-2xl p-6 sm:p-8 shadow-lg 
                    transition-all duration-300"
        >
          <div className="text-center mb-6 space-y-2">
            <h2 className="text-2xl font-semibold leading-snug">
              গল্পের গভীরে থাকুক আপনার ব্রান্ডের ছায়া
            </h2>
            <p className="text-sm text-gray-200 max-w-md mx-auto leading-relaxed">
              Let your brand live within every story. স্পনসর হয়ে আপনার পন্যকে পৌছে দিন
              মিলিয়নস অফ গল্পপ্রেমীর কাছে।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
            <div>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              {errors.fullName && (
                <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="productName"
                value={form.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              {errors.productName && (
                <p className="text-red-400 text-xs mt-1">{errors.productName}</p>
              )}
            </div>

            <div>
              <input
                type="url"
                name="productLink"
                value={form.productLink}
                onChange={handleChange}
                placeholder="Product Link"
                className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              {errors.productLink && (
                <p className="text-red-400 text-xs mt-1">{errors.productLink}</p>
              )}
            </div>

            <div>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Company & Product Details"
                rows={4}
                className="w-full px-4 py-2 rounded-[4px] bg-white/10 text-white placeholder-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-white/40 transition resize-none"
              />
              {errors.details && (
                <p className="text-red-400 text-xs mt-1">{errors.details}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2 rounded-[4px] font-semibold bg-white text-[#3A2768]
                        hover:bg-gray-200 transition-all shadow-md"
            >
              {loading?<Spinner size="w-3 h-3"/>:''}
              Submit
            </button>
          </form>
        </div>
      </div> */}