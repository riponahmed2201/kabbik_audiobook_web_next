'use client';
import SecureShield from "@/svgs/SecureShield.svg";
import Tik from "@/svgs/Tik.svg";
import { useState } from "react";

export default function PaymentAi() {
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  const handlePromoApply = () => {
    //console.log("Applying promo code:", promoCode);
  };

  return (
    <div className=" bg-[#0E1D3F] px-4 py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-white text-3xl md:text-5xl font-semibold mb-16">
            পেমেন্ট পদ্ধতি নির্বাচন করুন
          </h1>
          
          {/* Promo Code Section */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            <div className="flex items-center gap-4 bg-[#253252] rounded-3xl px-6 py-8 flex-1 max-w-md">
              <div className="w-16 h-16 bg-[#253252] rounded-2xl flex items-center justify-center">
                <Tik/>
              </div>
              <span className="text-white text-3xl md:text-4xl font-medium">প্রোমো কোড</span>
            </div>
            
            <div className="bg-[#35405E] border border-[#515462] rounded-lg p-4 flex items-center gap-2 max-w-sm">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 flex-1 outline-none"
                placeholder="কোড লিখুন"
              />
              <button
                onClick={handlePromoApply}
                className="bg-[#23442F] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#2a5236] transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Local Payment Method */}
        <div className="mb-16">
          <div className="bg-[#0D244E] rounded-lg py-6 text-center mb-4">
            <h2 className="text-white text-3xl md:text-4xl font-medium">লোকাল পেমেন্ট মেথড</h2>
          </div>
          <p className="text-white text-xl md:text-2xl text-center">
            (দয়া করে আপনার পেমেন্ট মেথড নির্বাচন করুন)
          </p>
        </div>

        {/* Mobile Wallet Section */}
        <div className="mb-16">
          <div className="w-full h-px bg-white/40 mb-5"></div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-5">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-white text-3xl md:text-4xl font-semibold mb-2">মোবাইল ওয়ালেট</h3>
              <p className="text-white text-lg md:text-xl">মোবাইল ওয়ালেটের মাধ্যমে পেমেন্ট করুন।</p>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="w-5 h-5 inline-block"><SecureShield/></span>
              <div className="text-[#76DA84] text-2xl">Secure<br/>Payment</div>
            </div>
          </div>

          <div className="space-y-6">
            {/* bKash */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handlePaymentSelect('bkash')}
                className={`w-16 h-16 rounded-full border-2 border-white flex items-center justify-center ${
                  selectedPayment === 'bkash' ? 'bg-white' : 'bg-transparent'
                }`}
              >
                {selectedPayment === 'bkash' && <div className="w-8 h-8 bg-[#0E1D3F] rounded-full"></div>}
              </button>
              
              <div className="flex-1 bg-gradient-to-r from-[#767E91] to-[#1B2A4B] border border-[#CFCFCF] rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <img loading="lazy"
                    src="https://api.builder.io/api/v1/image/assets/TEMP/28ac107816076c7688daa2d06eb6eb14be5cad3e?width=440" 
                    alt="bKash" 
                    className="h-20 w-auto"
                  />
                  <div className="flex items-center gap-2">
                    <svg width="48" height="48" viewBox="0 0 64 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M47.5604 29.211C46.8739 29.211 46.2156 29.4837 45.7302 29.9691C45.2448 30.4545 44.9721 31.1128 44.9721 31.7993V43.4468C44.9721 45.8494 44.0176 48.1537 42.3187 49.8526C40.6198 51.5515 38.3155 52.506 35.9129 52.506C33.5103 52.506 31.206 51.5515 29.5071 49.8526C27.8082 48.1537 26.8538 45.8494 26.8538 43.4468V31.7993H32.0304C32.7169 31.7993 33.3752 31.5266 33.8606 31.0412C34.346 30.5558 34.6187 29.8975 34.6187 29.211C34.6187 28.5245 34.346 27.8662 33.8606 27.3808C33.3752 26.8954 32.7169 26.6227 32.0304 26.6227H26.8538V16.2693C26.8538 13.5235 25.763 10.8901 23.8213 8.94843C21.8797 7.00681 19.2463 5.91602 16.5004 5.91602C15.814 5.91602 15.1556 6.18871 14.6702 6.67412C14.1848 7.15953 13.9121 7.81788 13.9121 8.50435C13.9121 9.19081 14.1848 9.84917 14.6702 10.3346C15.1556 10.82 15.814 11.0927 16.5004 11.0927C17.8734 11.0927 19.1901 11.6381 20.1609 12.6089C21.1317 13.5797 21.6771 14.8964 21.6771 16.2693V26.6227H16.5004C15.814 26.6227 15.1556 26.8954 14.6702 27.3808C14.1848 27.8662 13.9121 28.5245 13.9121 29.211C13.9121 29.8975 14.1848 30.5558 14.6702 31.0412C15.1556 31.5266 15.814 31.7993 16.5004 31.7993H21.6771V43.4468C21.6771 47.2224 23.1769 50.8433 25.8467 53.513C28.5164 56.1828 32.1373 57.6826 35.9129 57.6826C39.6885 57.6826 43.3094 56.1828 45.9792 53.513C48.6489 50.8433 50.1487 47.2224 50.1487 43.4468V31.7993C50.1487 31.1128 49.876 30.4545 49.3906 29.9691C48.9052 29.4837 48.2469 29.211 47.5604 29.211Z" fill="white"/>
                    </svg>
                    <span className="text-white text-4xl font-medium">২৫০/-</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nagad */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handlePaymentSelect('nagad')}
                className={`w-16 h-16 rounded-full border-2 border-white flex items-center justify-center ${
                  selectedPayment === 'nagad' ? 'bg-white' : 'bg-transparent'
                }`}
              >
                {selectedPayment === 'nagad' && <div className="w-8 h-8 bg-[#0E1D3F] rounded-full"></div>}
              </button>
              
              <div className="flex-1 bg-gradient-to-r from-[#767E91] to-[#1B2A4B] border border-[#CFCFCF] rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <img loading="lazy"
                    src="https://api.builder.io/api/v1/image/assets/TEMP/dbc65d42503050ca819132cdc7671a4993b8f0ac?width=570" 
                    alt="Nagad" 
                    className="h-20 w-auto"
                  />
                  <div className="flex items-center gap-2">
                    <svg width="48" height="48" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M47.3983 28.7559C46.7118 28.7559 46.0535 29.0286 45.5681 29.514C45.0827 29.9994 44.81 30.6578 44.81 31.3442V42.9917C44.81 45.3944 43.8555 47.6986 42.1566 49.3975C40.4577 51.0964 38.1534 52.0509 35.7508 52.0509C33.3482 52.0509 31.0439 51.0964 29.345 49.3975C27.6461 47.6986 26.6916 45.3944 26.6916 42.9917V31.3442H31.8683C32.5548 31.3442 33.2131 31.0715 33.6985 30.5861C34.1839 30.1007 34.4566 29.4424 34.4566 28.7559C34.4566 28.0694 34.1839 27.4111 33.6985 26.9257C33.2131 26.4403 32.5548 26.1676 31.8683 26.1676H26.6916V15.8143C26.6916 13.0684 25.6009 10.435 23.6592 8.49335C21.7176 6.55173 19.0842 5.46094 16.3383 5.46094C15.6519 5.46094 14.9935 5.73364 14.5081 6.21904C14.0227 6.70445 13.75 7.3628 13.75 8.04927C13.75 8.73574 14.0227 9.39409 14.5081 9.87949C14.9935 10.3649 15.6519 10.6376 16.3383 10.6376C17.7113 10.6376 19.028 11.183 19.9988 12.1538C20.9696 13.1246 21.515 14.4413 21.515 15.8143V26.1676H16.3383C15.6519 26.1676 14.9935 26.4403 14.5081 26.9257C14.0227 27.4111 13.75 28.0694 13.75 28.7559C13.75 29.4424 14.0227 30.1007 14.5081 30.5861C14.9935 31.0715 15.6519 31.3442 16.3383 31.3442H21.515V42.9917C21.515 46.7673 23.0148 50.3882 25.6846 53.058C28.3543 55.7277 31.9752 57.2275 35.7508 57.2275C39.5264 57.2275 43.1473 55.7277 45.817 53.058C48.4868 50.3882 49.9866 46.7673 49.9866 42.9917V31.3442C49.9866 30.6578 49.7139 29.9994 49.2285 29.514C48.7431 29.0286 48.0848 28.7559 47.3983 28.7559Z" fill="white"/>
                    </svg>
                    <span className="text-white text-4xl font-medium">২৫০/-</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upay */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handlePaymentSelect('upay')}
                className={`w-16 h-16 rounded-full border-2 border-white flex items-center justify-center ${
                  selectedPayment === 'upay' ? 'bg-white' : 'bg-transparent'
                }`}
              >
                {selectedPayment === 'upay' && <div className="w-8 h-8 bg-[#0E1D3F] rounded-full"></div>}
              </button>
              
              <div className="flex-1 bg-gradient-to-r from-[#767E91] to-[#1B2A4B] border border-[#CFCFCF] rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <img loading="lazy"
                    src="https://api.builder.io/api/v1/image/assets/TEMP/91f590e31715d58d8fe9a4f0d6e5a87219ad201d?width=516" 
                    alt="Upay" 
                    className="h-20 w-auto"
                  />
                  <div className="flex items-center gap-2">
                    <svg width="48" height="48" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M47.3983 28.7559C46.7118 28.7559 46.0535 29.0286 45.5681 29.514C45.0827 29.9994 44.81 30.6578 44.81 31.3442V42.9917C44.81 45.3944 43.8555 47.6986 42.1566 49.3975C40.4577 51.0964 38.1534 52.0509 35.7508 52.0509C33.3482 52.0509 31.0439 51.0964 29.345 49.3975C27.6461 47.6986 26.6916 45.3944 26.6916 42.9917V31.3442H31.8683C32.5548 31.3442 33.2131 31.0715 33.6985 30.5861C34.1839 30.1007 34.4566 29.4424 34.4566 28.7559C34.4566 28.0694 34.1839 27.4111 33.6985 26.9257C33.2131 26.4403 32.5548 26.1676 31.8683 26.1676H26.6916V15.8143C26.6916 13.0684 25.6009 10.435 23.6592 8.49335C21.7176 6.55173 19.0842 5.46094 16.3383 5.46094C15.6519 5.46094 14.9935 5.73364 14.5081 6.21904C14.0227 6.70445 13.75 7.3628 13.75 8.04927C13.75 8.73574 14.0227 9.39409 14.5081 9.87949C14.9935 10.3649 15.6519 10.6376 16.3383 10.6376C17.7113 10.6376 19.028 11.183 19.9988 12.1538C20.9696 13.1246 21.515 14.4413 21.515 15.8143V26.1676H16.3383C15.6519 26.1676 14.9935 26.4403 14.5081 26.9257C14.0227 27.4111 13.75 28.0694 13.75 28.7559C13.75 29.4424 14.0227 30.1007 14.5081 30.5861C14.9935 31.0715 15.6519 31.3442 16.3383 31.3442H21.515V42.9917C21.515 46.7673 23.0148 50.3882 25.6846 53.058C28.3543 55.7277 31.9752 57.2275 35.7508 57.2275C39.5264 57.2275 43.1473 55.7277 45.817 53.058C48.4868 50.3882 49.9866 46.7673 49.9866 42.9917V31.3442C49.9866 30.6578 49.7139 29.9994 49.2285 29.514C48.7431 29.0286 48.0848 28.7559 47.3983 28.7559Z" fill="white"/>
                    </svg>
                    <span className="text-white text-4xl font-medium">২৫০/-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Balance Section */}
        <div className="mb-16">
          <div className="w-full h-px bg-white/40 mb-10"></div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-white text-3xl md:text-4xl font-semibold mb-2">মোবাইল ব্যালেন্স</h3>
              <p className="text-white text-lg md:text-xl">মোবাইল ব্যালেন্স দিয়ে পেমেন্ট করুন।</p>
            </div>
            
            <div className="flex items-center gap-6">
              <svg width="48" height="48" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.5451 9.73822L31.4374 5.12303C31.2373 5.0866 31.0322 5.0866 30.8321 5.12303C30.6649 5.09779 30.4949 5.09779 30.3277 5.12303L12.1192 9.73822C10.9646 10.0264 9.94919 10.7135 9.25232 11.6781C8.55544 12.6426 8.22202 13.8225 8.311 15.0091L9.37023 28.9051C9.79444 34.4175 11.7206 39.7083 14.9395 44.2032C18.1584 48.6981 22.5471 52.2254 27.6292 54.4022L29.8486 55.3605C30.1283 55.4771 30.4282 55.537 30.7312 55.537C31.0342 55.537 31.3342 55.4771 31.6139 55.3605L33.8333 54.4022C38.9154 52.2254 43.3041 48.6981 46.523 44.2032C49.7419 39.7083 51.6681 34.4175 52.0923 28.9051L53.1515 15.0091C53.2509 13.8493 52.9461 12.6909 52.2888 11.7302C51.6315 10.7695 50.6621 10.0657 49.5451 9.73822ZM40.1886 24.5674L30.1008 34.6552C29.8663 34.8916 29.5874 35.0792 29.2801 35.2072C28.9727 35.3353 28.6431 35.4012 28.3102 35.4012C27.9772 35.4012 27.6476 35.3353 27.3403 35.2072C27.033 35.0792 26.754 34.8916 26.5196 34.6552L21.4756 29.6113C21.0008 29.1364 20.734 28.4923 20.734 27.8207C20.734 27.1491 21.0008 26.505 21.4756 26.0301C21.9505 25.5552 22.5946 25.2884 23.2662 25.2884C23.9378 25.2884 24.5819 25.5552 25.0568 26.0301L28.3102 29.3086L36.6074 20.9862C37.0823 20.5113 37.7264 20.2445 38.398 20.2445C39.0696 20.2445 39.7137 20.5113 40.1886 20.9862C40.6635 21.4611 40.9303 22.1052 40.9303 22.7768C40.9303 23.4484 40.6635 24.0925 40.1886 24.5674Z" fill="#71DC7F"/>
              </svg>
              <div className="text-[#76DA84] text-2xl">Secure<br/>Payment</div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Robi Airtel */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handlePaymentSelect('robi-airtel')}
                className={`w-16 h-16 rounded-full border-2 border-white flex items-center justify-center ${
                  selectedPayment === 'robi-airtel' ? 'bg-white' : 'bg-transparent'
                }`}
              >
                {selectedPayment === 'robi-airtel' && <div className="w-8 h-8 bg-[#0E1D3F] rounded-full"></div>}
              </button>
              
              <div className="flex-1 bg-gradient-to-r from-[#767E91] to-[#1B2A4B] border border-[#CFCFCF] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <img loading="lazy"
                    src="https://api.builder.io/api/v1/image/assets/TEMP/910b1cba57fe0cdb804bcdffd26ec34a14fc3048?width=714" 
                    alt="Robi Airtel" 
                    className="h-20 w-auto"
                  />
                  <div className="flex items-center gap-2">
                    <svg width="48" height="48" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M46.8241 28.586C46.1376 28.586 45.4792 28.8587 44.9938 29.3441C44.5084 29.8295 44.2357 30.4878 44.2357 31.1743V42.8218C44.2357 45.2244 43.2813 47.5287 41.5824 49.2276C39.8835 50.9265 37.5792 51.881 35.1766 51.881C32.7739 51.881 30.4697 50.9265 28.7708 49.2276C27.0719 47.5287 26.1174 45.2244 26.1174 42.8218V31.1743H31.2941C31.9806 31.1743 32.6389 30.9016 33.1243 30.4162C33.6097 29.9308 33.8824 29.2725 33.8824 28.586C33.8824 27.8995 33.6097 27.2412 33.1243 26.7558C32.6389 26.2704 31.9806 25.9977 31.2941 25.9977H26.1174V15.6443C26.1174 12.8985 25.0266 10.2651 23.085 8.32343C21.1434 6.38181 18.51 5.29102 15.7641 5.29102C15.0776 5.29102 14.4193 5.56371 13.9339 6.04912C13.4485 6.53453 13.1758 7.19288 13.1758 7.87935C13.1758 8.56581 13.4485 9.22417 13.9339 9.70957C14.4193 10.195 15.0776 10.4677 15.7641 10.4677C17.137 10.4677 18.4538 11.0131 19.4246 11.9839C20.3954 12.9547 20.9408 14.2714 20.9408 15.6443V25.9977H15.7641C15.0776 25.9977 14.4193 26.2704 13.9339 26.7558C13.4485 27.2412 13.1758 27.8995 13.1758 28.586C13.1758 29.2725 13.4485 29.9308 13.9339 30.4162C14.4193 30.9016 15.0776 31.1743 15.7641 31.1743H20.9408V42.8218C20.9408 46.5974 22.4406 50.2183 25.1103 52.888C27.7801 55.5578 31.401 57.0576 35.1766 57.0576C38.9522 57.0576 42.5731 55.5578 45.2428 52.888C47.9126 50.2183 49.4124 46.5974 49.4124 42.8218V31.1743C49.4124 30.4878 49.1397 29.8295 48.6543 29.3441C48.1689 28.8587 47.5105 28.586 46.8241 28.586Z" fill="white"/>
                    </svg>
                    <span className="text-white text-4xl font-medium">২৫০.৫/-</span>
                  </div>
                </div>
                <p className="text-white text-center text-lg">(ভ্যাটসহ)</p>
              </div>
            </div>

            {/* Banglalink */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handlePaymentSelect('banglalink')}
                className={`w-16 h-16 rounded-full border-2 border-white flex items-center justify-center ${
                  selectedPayment === 'banglalink' ? 'bg-white' : 'bg-transparent'
                }`}
              >
                {selectedPayment === 'banglalink' && <div className="w-8 h-8 bg-[#0E1D3F] rounded-full"></div>}
              </button>
              
              <div className="flex-1 bg-gradient-to-r from-[#767E91] to-[#1B2A4B] border border-[#CFCFCF] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <img loading="lazy"
                    src="https://api.builder.io/api/v1/image/assets/TEMP/0dd6c6379bf5d4729bb3b94377a3b8efb4c8f32e?width=452" 
                    alt="Banglalink" 
                    className="h-20 w-auto"
                  />
                  <div className="flex items-center gap-2">
                    <svg width="48" height="48" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M46.8944 28.5098C46.2079 28.5098 45.5496 28.7825 45.0642 29.2679C44.5787 29.7533 44.3061 30.4117 44.3061 31.0981V42.7456C44.3061 45.1483 43.3516 47.4525 41.6527 49.1514C39.9538 50.8503 37.6495 51.8048 35.2469 51.8048C32.8443 51.8048 30.54 50.8503 28.8411 49.1514C27.1422 47.4525 26.1877 45.1483 26.1877 42.7456V31.0981H31.3644C32.0509 31.0981 32.7092 30.8254 33.1946 30.34C33.68 29.8546 33.9527 29.1963 33.9527 28.5098C33.9527 27.8233 33.68 27.165 33.1946 26.6796C32.7092 26.1942 32.0509 25.9215 31.3644 25.9215H26.1877V15.5682C26.1877 12.8223 25.097 10.1889 23.1553 8.24726C21.2137 6.30564 18.5803 5.21484 15.8344 5.21484C15.148 5.21484 14.4896 5.48754 14.0042 5.97295C13.5188 6.45835 13.2461 7.11671 13.2461 7.80317C13.2461 8.48964 13.5188 9.14799 14.0042 9.6334C14.4896 10.1188 15.148 10.3915 15.8344 10.3915C17.2074 10.3915 18.5241 10.9369 19.4949 11.9077C20.4657 12.8785 21.0111 14.1952 21.0111 15.5682V25.9215H15.8344C15.148 25.9215 14.4896 26.1942 14.0042 26.6796C13.5188 27.165 13.2461 27.8233 13.2461 28.5098C13.2461 29.1963 13.5188 29.8546 14.0042 30.34C14.4896 30.8254 15.148 31.0981 15.8344 31.0981H21.0111V42.7456C21.0111 46.5212 22.5109 50.1421 25.1807 52.8119C27.8504 55.4816 31.4713 56.9814 35.2469 56.9814C39.0225 56.9814 42.6434 55.4816 45.3131 52.8119C47.9829 50.1421 49.4827 46.5212 49.4827 42.7456V31.0981C49.4827 30.4117 49.21 29.7533 48.7246 29.2679C48.2392 28.7825 47.5808 28.5098 46.8944 28.5098Z" fill="white"/>
                    </svg>
                    <span className="text-white text-4xl font-medium">২৫০.৫/-</span>
                  </div>
                </div>
                <p className="text-white text-center text-lg">(ভ্যাটসহ)</p>
              </div>
            </div>

            {/* Grameenphone */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handlePaymentSelect('grameenphone')}
                className={`w-16 h-16 rounded-full border-2 border-white flex items-center justify-center ${
                  selectedPayment === 'grameenphone' ? 'bg-white' : 'bg-transparent'
                }`}
              >
                {selectedPayment === 'grameenphone' && <div className="w-8 h-8 bg-[#0E1D3F] rounded-full"></div>}
              </button>
              
              <div className="flex-1 bg-gradient-to-r from-[#767E91] to-[#1B2A4B] border border-[#CFCFCF] rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <img loading="lazy"
                    src="https://api.builder.io/api/v1/image/assets/TEMP/3093040d57806088648884e675dc2c6366fd951f?width=679" 
                    alt="Grameenphone" 
                    className="h-20 w-auto"
                  />
                  <div className="flex items-center gap-2">
                    <svg width="48" height="48" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M47.2479 28.5723C46.5614 28.5723 45.9031 28.845 45.4177 29.3304C44.9323 29.8158 44.6596 30.4742 44.6596 31.1606V42.8081C44.6596 45.2108 43.7051 47.515 42.0062 49.2139C40.3073 50.9128 38.003 51.8673 35.6004 51.8673C33.1978 51.8673 30.8935 50.9128 29.1946 49.2139C27.4957 47.515 26.5413 45.2108 26.5413 42.8081V31.1606H31.7179C32.4044 31.1606 33.0627 30.8879 33.5481 30.4025C34.0335 29.9171 34.3062 29.2588 34.3062 28.5723C34.3062 27.8858 34.0335 27.2275 33.5481 26.7421C33.0627 26.2567 32.4044 25.984 31.7179 25.984H26.5413V15.6307C26.5413 12.8848 25.4505 10.2514 23.5088 8.30976C21.5672 6.36814 18.9338 5.27734 16.1879 5.27734C15.5015 5.27734 14.8431 5.55004 14.3577 6.03545C13.8723 6.52085 13.5996 7.17921 13.5996 7.86567C13.5996 8.55214 13.8723 9.21049 14.3577 9.6959C14.8431 10.1813 15.5015 10.454 16.1879 10.454C17.5609 10.454 18.8776 10.9994 19.8484 11.9702C20.8192 12.941 21.3646 14.2577 21.3646 15.6307V25.984H16.1879C15.5015 25.984 14.8431 26.2567 14.3577 26.7421C13.8723 27.2275 13.5996 27.8858 13.5996 28.5723C13.5996 29.2588 13.8723 29.9171 14.3577 30.4025C14.8431 30.8879 15.5015 31.1606 16.1879 31.1606H21.3646V42.8081C21.3646 46.5837 22.8644 50.2046 25.5342 52.8744C28.2039 55.5441 31.8248 57.0439 35.6004 57.0439C39.376 57.0439 42.9969 55.5441 45.6667 52.8744C48.3364 50.2046 49.8362 46.5837 49.8362 42.8081V31.1606C49.8362 30.4742 49.5635 29.8158 49.0781 29.3304C48.5927 28.845 47.9344 28.5723 47.2479 28.5723Z" fill="white"/>
                    </svg>
                    <span className="text-white text-4xl font-medium">২৫০.৫/-</span>
                  </div>
                </div>
                <p className="text-white text-center text-lg">(ভ্যাটসহ)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Debit/Credit Card Section */}
        <div className="mb-16">
          <div className="w-full h-px bg-white/40 mb-16"></div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-white text-3xl md:text-4xl font-medium mb-2">ডেবিট/ক্রেডিট কার্ড</h3>
              <p className="text-white text-lg md:text-xl">পে ভিয়া ডেবিট/ ক্রেডিট কার্ড মেথড</p>
            </div>
            
            <div className="flex items-center gap-6">
              <svg width="48" height="48" viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50.1232 9.61712L32.0155 5.00193C31.8154 4.9655 31.6104 4.9655 31.4102 5.00193C31.2431 4.9767 31.073 4.9767 30.9059 5.00193L12.6973 9.61712C11.5428 9.90533 10.5273 10.5924 9.83044 11.557C9.13357 12.5215 8.80015 13.7014 8.88913 14.888L9.94835 28.784C10.3726 34.2964 12.2987 39.5872 15.5176 44.0821C18.7365 48.5771 23.1253 52.1043 28.2074 54.2811L30.4267 55.2394C30.7064 55.356 31.0064 55.416 31.3094 55.416C31.6124 55.416 31.9124 55.356 32.1921 55.2394L34.4114 54.2811C39.4935 52.1043 43.8822 48.5771 47.1011 44.0821C50.3201 39.5872 52.2462 34.2964 52.6704 28.784L53.7296 14.888C53.829 13.7282 53.5242 12.5698 52.8669 11.6091C52.2096 10.6484 51.2402 9.94462 50.1232 9.61712ZM40.7667 24.4463L30.6789 34.5341C30.4444 34.7705 30.1655 34.9581 29.8582 35.0861C29.5509 35.2142 29.2212 35.2801 28.8883 35.2801C28.5554 35.2801 28.2257 35.2142 27.9184 35.0861C27.6111 34.9581 27.3321 34.7705 27.0977 34.5341L22.0538 29.4902C21.5789 29.0153 21.3121 28.3712 21.3121 27.6996C21.3121 27.028 21.5789 26.3839 22.0538 25.909C22.5287 25.4341 23.1728 25.1673 23.8444 25.1673C24.516 25.1673 25.1601 25.4341 25.635 25.909L28.8883 29.1875L37.1855 20.8651C37.6604 20.3902 38.3045 20.1234 38.9761 20.1234C39.6477 20.1234 40.2918 20.3902 40.7667 20.8651C41.2416 21.34 41.5084 21.9841 41.5084 22.6557C41.5084 23.3273 41.2416 23.9714 40.7667 24.4463Z" fill="#71DC7F"/>
              </svg>
              <div className="text-[#76DA84] text-2xl">Secure<br/>Payment</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handlePaymentSelect('card')}
              className={`w-16 h-16 rounded-full border-2 border-white flex items-center justify-center ${
                selectedPayment === 'card' ? 'bg-white' : 'bg-transparent'
              }`}
            >
              {selectedPayment === 'card' && <div className="w-8 h-8 bg-[#0E1D3F] rounded-full"></div>}
            </button>
            
            <div className="flex-1 bg-gradient-to-r from-[#767E91] to-[#1B2A4B] border border-[#CFCFCF] rounded-lg p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-6 lg:mb-0">
                  <img loading="lazy"
                    src="https://api.builder.io/api/v1/image/assets/TEMP/dd6c6e79d46d0dc5591a998f044c1e470a3de821?width=840" 
                    alt="Visa Mastercard American Express" 
                    className="h-16 w-auto mb-4"
                  />
                  <div className="flex items-center gap-4">
                    <img loading="lazy"
                      src="https://api.builder.io/api/v1/image/assets/TEMP/fb35fb1ac4063ff890e695122d9a7a5571eb4788?width=210" 
                      alt="DBBL" 
                      className="h-16 w-auto"
                    />
                    <img loading="lazy"
                      src="https://api.builder.io/api/v1/image/assets/TEMP/42b9267061ebf8466f6374f5bbad15982e7e08af?width=202" 
                      alt="Nexus Pay" 
                      className="h-16 w-auto"
                    />
                    <img loading="lazy"
                      src="https://api.builder.io/api/v1/image/assets/TEMP/fa53627b073d4c66cc4fe10e1890368800042609?width=248" 
                      alt="Rocket" 
                      className="h-16 w-auto"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg width="48" height="48" viewBox="0 0 63 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.3963 29.3731C46.7099 29.3731 46.0515 29.6458 45.5661 30.1312C45.0807 30.6166 44.808 31.275 44.808 31.9614V43.6089C44.808 46.0115 43.8536 48.3158 42.1546 50.0147C40.4557 51.7136 38.1515 52.6681 35.7488 52.6681C33.3462 52.6681 31.042 51.7136 29.3431 50.0147C27.6441 48.3158 26.6897 46.0115 26.6897 43.6089V31.9614H31.8664C32.5528 31.9614 33.2112 31.6887 33.6966 31.2033C34.182 30.7179 34.4547 30.0596 34.4547 29.3731C34.4547 28.6866 34.182 28.0283 33.6966 27.5429C33.2112 27.0575 32.5528 26.7848 31.8664 26.7848H26.6897V16.4314C26.6897 13.6856 25.5989 11.0522 23.6573 9.11054C21.7157 7.16892 19.0822 6.07813 16.3364 6.07812C15.6499 6.07813 14.9916 6.35082 14.5062 6.83623C14.0207 7.32164 13.748 7.97999 13.748 8.66645C13.748 9.35292 14.0207 10.0113 14.5062 10.4967C14.9916 10.9821 15.6499 11.2548 16.3364 11.2548C17.7093 11.2548 19.026 11.8002 19.9968 12.771C20.9676 13.7418 21.513 15.0585 21.513 16.4314V26.7848H16.3364C15.6499 26.7848 14.9916 27.0575 14.5062 27.5429C14.0207 28.0283 13.748 28.6866 13.748 29.3731C13.748 30.0596 14.0207 30.7179 14.5062 31.2033C14.9916 31.6887 15.6499 31.9614 16.3364 31.9614H21.513V43.6089C21.513 47.3845 23.0129 51.0054 25.6826 53.6751C28.3523 56.3449 31.9733 57.8447 35.7488 57.8447C39.5244 57.8447 43.1454 56.3449 45.8151 53.6751C48.4848 51.0054 49.9847 47.3845 49.9847 43.6089V31.9614C49.9847 31.275 49.712 30.6166 49.2266 30.1312C48.7412 29.6458 48.0828 29.3731 47.3963 29.3731Z" fill="white"/>
                  </svg>
                  <span className="text-white text-4xl font-medium">২৫০/-</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-6 text-white/40">
          <svg width="36" height="40" viewBox="0 0 46 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.2656 1.76953L41.3057 6.36719V6.36816C42.2461 6.644 43.0628 7.23603 43.6162 8.04492C44.1697 8.85392 44.4265 9.82999 44.3428 10.8066L44.3418 10.8135L43.2822 24.709C42.8692 30.0761 40.9944 35.2279 37.8604 39.6045C34.7261 43.9811 30.4523 47.4157 25.5039 49.5352L25.502 49.5361L23.2871 50.4912C23.1058 50.5661 22.912 50.6054 22.7158 50.6055C22.5674 50.6055 22.4198 50.5842 22.2783 50.541L22.1396 50.4902L19.9297 49.5361L19.9268 49.5352C14.9786 47.4157 10.7054 43.981 7.57129 39.6045C4.43717 35.2279 2.56149 30.0762 2.14844 24.709L1.08984 10.8135C1.01526 9.81475 1.29536 8.82162 1.88184 8.00977C2.46868 7.19751 3.32465 6.61868 4.29688 6.37598L4.29883 6.375L22.457 1.77246C22.5369 1.7628 22.6177 1.76341 22.6973 1.77539L22.8291 1.7959L22.959 1.77148C23.0603 1.75304 23.1641 1.75266 23.2656 1.76953Z" stroke="currentColor" strokeWidth="1.6" fill="none"/>
            <path d="M30.3828 15.3135C29.5 15.3135 28.6526 15.6638 28.0283 16.2881L28.0273 16.2891L20.2949 24.0439L17.6064 21.334L17.6045 21.332L17.4844 21.2188C16.8738 20.6659 16.0785 20.3575 15.251 20.3574C14.3682 20.3574 13.5207 20.7078 12.8965 21.332C12.2724 21.9562 11.922 22.8029 11.9219 23.6855C11.9219 24.5684 12.2722 25.4158 12.8965 26.04L17.9404 31.083C18.2485 31.3932 18.615 31.6395 19.0186 31.8076C19.4229 31.976 19.8569 32.0625 20.2949 32.0625C20.7327 32.0624 21.1662 31.9759 21.5703 31.8076C21.9736 31.6396 22.3395 31.3929 22.6475 31.083L22.6484 31.084L32.7363 20.9961C33.3606 20.3718 33.7109 19.5244 33.7109 18.6416C33.7108 17.7589 33.3605 16.9122 32.7363 16.2881C32.1122 15.6639 31.2655 15.3136 30.3828 15.3135Z" fill="currentColor"/>
          </svg>
          <span className="text-2xl">সেফ ও সিকিউর পেমেন্ট মেথড</span>
        </div>
      </div>
    </div>
  );
}