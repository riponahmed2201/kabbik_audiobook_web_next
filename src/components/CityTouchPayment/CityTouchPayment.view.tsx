'use client'
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/components/ui/PaymentOptions/static/payment.module.css";
import Link from "next/link";
import { toast } from "react-toastify";
import { BicepsFlexed, Check, DiscAlbumIcon } from "lucide-react";
import Spinner from "../ui/Spinner.view";
import { useAppSelector } from "@/store/store";
import SecureShield from "@/svgs/SecureShield.svg";
import { findObj } from "@/helpers/commonFunction";
import SinglePaymentCard from "../Subscription/SinglePaymentCard.view";
import TakaIcon from "@/svgs/TakaIcon.svg";
import Percentage from "@/svgs/Percentage.view";

type Option = {
  methodName: string;
  logoUrl: string;
  apiUrl: string;
  vat: number;
};

type PaymentOptionsProps = {
  options: Option[];
  callback?: (methodName: string, apiUrl: string) => Promise<void>;
  callbacks?: { methodName: string; payment: () => Promise<void> }[];
  promoData?: string;
  setPromoData?: React.Dispatch<React.SetStateAction<string>>;
  isPromocodeApplied?: boolean;
  addPromocodeHandler?: () => Promise<void>;
  removePromocodeHandler?: () => Promise<void>;
  price?: number;
  reducePrice?: number;
  bookId?:number|string;
  isMsisdnSubmitted?: MutableRefObject<boolean>;
  subscriptionPackId?:number;
  vat?:number;
  setIsMsisdnTakerModalOpened?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CityTouchPayment = ({
  options,
  callback,
  callbacks,
  promoData,
  setPromoData,
  isPromocodeApplied,
  addPromocodeHandler,
  removePromocodeHandler,
  price,
  vat=0,
  reducePrice,
  isMsisdnSubmitted,
  setIsMsisdnTakerModalOpened,
  subscriptionPackId,
  bookId
}: PaymentOptionsProps) => {
  const [isLoading,setIsLoading]=useState(false);
  const [selectedOption, setSelectedOption] = useState<boolean | null>(true);
  const [termsPrivacyAgreed, setTermsPrivacyAgreed] = useState(false);
  const user=useAppSelector((store)=>store?.user?.userData)


  const cityTouch = async () => {
    // Step 1: Get token from your backend
    let data:any={
      packageId:subscriptionPackId,
      promoCode:isPromocodeApplied?promoData:'',
      userId:user?.id
    }
    if(bookId){
      data.bookId=bookId
    }
    const tokenRes:any = await fetch("https://api.kabbik.com/v4/city-pay/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data)
    }).then((res) => res.json());
    
    const payload = tokenRes.data;
    // const payload={mydata:"habijabi",transactionId:'124232322555'}
    
    const form = document.createElement("form");
    form.method = "POST";
    const url = "https://www.citytouch.com.bd/CityBank/merchant/userlogin";
    // const url="https://kabbik.com/api/routes/city-bank-payment-status";
    // const url="https://kabbik.com"
    // const url="http://localhost:8097/api/routes/city-bank-payment-status";
    form.action=url;
    // debugger;
    // form.action="http://localhost:8097/";
    // payload.resendpoint="http://localhost:8097/api/routes/city-bank-payment-status"



    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const payNow = async () => {
    if (!termsPrivacyAgreed) {
      toast.error(
        "To continue payment you need to accept 'terms and condition' & 'refund policy'"
      );
      return;
    }
    setIsLoading(true)
    cityTouch()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  return (
    <>
       {
      callbacks !== undefined 
      ? (
        <div className="text-white ">
          <div className="text-center mb-4 px-4">
            <h1 className="text-muted2 text-clg font-semibold my-4">
              পেমেন্ট পদ্ধতি নির্বাচন করুন
            </h1>
            
            {/* Promo Code Section */}
            <div className="flex rounded-[8px] bg-[#253252] flex-row items-center px-3 mb-2">
              <div className="flex items-center   rounded-3xl  flex-1 max-w-md">
                <div className="w-4 h-4  rounded-2xl flex items-center justify-center">
                  <Percentage/>
                </div>
                <span className="text-muted2 text-cn whitespace-nowrap font-medium ml-1">প্রোমো কোড</span>
              </div>
              
              <div className="bg-[#35405E] rounded-[4px] border border-[#515462] p-1 m-1.5 flex items-center  ">
                <input
                  type="text"
                  value={promoData}
                  onChange={(e) => setPromoData?.(e.target.value)}
                  className="bg-transparent text-cs2 text-white placeholder-gray-400 flex-1 outline-none"
                  placeholder="কোড লিখুন"
                />
                <button
                  onClick={
                    !isPromocodeApplied
                      ? addPromocodeHandler
                      : removePromocodeHandler
                  }
                  className="bg-[#23442F] text-white px-2 py-1 rounded-[3px] shadow-md text-cs hover:bg-[#2a5236] transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
            {isPromocodeApplied ? (
              <div className="mt-0 fs-14 text-start mb-3">
                You are saving{" "}
                <span className="fw-bolder" style={{ color: "#11af37" }}>
                  {reducePrice}
                </span>{" "}
                Tk by using this promo code
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-4 px-4 ">
          <div className="bg-navyblue rounded-[8px] py-2 text-center mb-2">
            <h2 className="text-white text-cn font-medium">লোকাল পেমেন্ট মেথড</h2>
          </div>
          <p className="text-white text-cs2 text-center">
            (দয়া করে আপনার পেমেন্ট মেথড নির্বাচন করুন)
          </p>
          </div>
        </div>
      ) : (
        <></>
      )}
       <div className={true?"px-4 border-t-[1px] border-muted2 mt-4":'hidden'}>
        <div className="flex flex-col lg:flex-row mx-2 lg:items-center lg:justify-between mb-2">
          <div className="mb-2 lg:mb-0 mt-2">
            <h3 className="text-white text-cn2  text-left font-semibold mb-2">ডেবিট/ক্রেডিট কার্ড</h3>
            <p className="text-white  text-cs2">পে ভিয়া ডেবিট/ ক্রেডিট কার্ড মেথড</p>
          </div>
          
          <div className="flex items-center gap-1 ">
            <span className="w-4 h-4 inline-block"><SecureShield/></span>
            <div className="text-[#76DA84] text-cs">Secure Payment</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-2 mx-4">
             <div className="flex items-center gap-2 m-1">
        <button
        //   onClick={() => handlePaymentSelect(paymentName)}
          className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
            true ? ' bg-white' : 'bg-transparent'
          }`}
        >
          {true && <div className="w-2 h-2 bg-[#0E1D3F] rounded-full"></div>}
        </button>
        
        <div className="flex-1 bg-gradient-to-r rounded-[8px] from-[#767E91] to-[#1B2A4B] border border-[#CFCFCF] px-3">
          <div className="flex items-center justify-between">
            <img 
              loading="lazy"
               src={"https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/citylogo.png"}
              alt="bKash" 
              className="h-14  w-auto"
            />
            <div className="flex items-center gap-2">
              <span className='w-6 h-6 inline-block'>
                <TakaIcon/>
              </span>
              <span className="text-white text-2xl font-medium"> {price??0 + (vat ?? 0)}/-</span>
            </div>
          </div>
        </div>
    </div>
      </div>
      
     <div className="flex items-center mt-4 mx-7">
        <input
          id="termsPrivacy"
          style={{  marginRight: "10px", marginTop: "3px",border:'1px solid' }}
          type="checkbox"
          checked={termsPrivacyAgreed}
          onChange={(evt) => setTermsPrivacyAgreed(!termsPrivacyAgreed)}
        />
        <label htmlFor="termsPrivacy" className="d-flex items-start">
          <div className="text-white text-cs2">
            আমি{" "} 
            <Link href={"/terms&condition"} className="text-[#0200FF]">
              শর্তাবলী
            </Link>{" "}
            এবং{" "}
            <Link href={"/returnpolicy"} className="text-[#0200FF]">
              রিফান্ড{" "}
            </Link>
            নীতির সাথে একমত
          </div>
        </label>
      </div>
        <button
          disabled={!selectedOption || isLoading}
          onClick={payNow}
          className={`w-[95%] bg-[#0D244E] text-white flex justify-center items-center 
                     border border-muted2 
                      px-8 py-2  md:py-1.5 mb-4 mx-3 rounded-[6px]
                      transition-colors duration-200
                      ${(!selectedOption || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#132f63]'}`}
        >
          {isLoading ? (
            <Spinner size="w-5 h-5" />
          ) : null}
          <span className="ml-2">
            {!isMsisdnSubmitted?.current ? "পেমেন্ট করুন" : "Continue"}
          </span>
        </button>
    </>
  );
};

export default CityTouchPayment;
