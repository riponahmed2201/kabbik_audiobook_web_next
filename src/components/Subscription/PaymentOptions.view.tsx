import { memo, MutableRefObject, useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
// import { formatPaymentName, imageLoader } from "../../utils/globalfunction";
import Image from "next/image";
import styles from "./static/PaymentOptions.module.css";
import Link from "next/link";
import { toast } from "react-toastify";
import { Check, Disc, X } from "lucide-react";
import Spinner from "../ui/Spinner.view";
import Tik from "@/svgs/Tik.svg";
import Percentage from "@/svgs/Percentage.view";
import SecureShield from "@/svgs/SecureShield.svg";
import SinglePaymentCard from "./SinglePaymentCard.view";
import {
  AllowedPaymentMethod,
  filterOptionsByPromoAllowList,
  findObj,
  getCountryCode,
} from "@/helpers/commonFunction";
import { usePathname } from "next/navigation";
import { paths } from "@/utils/Paths";
import { getCategoryData } from "@/utils/apiServices";
// import { TbDiscount2 } from "react-icons/tb";
// import { BiCheck, BiX } from "react-icons/bi";
// import { Spinner } from "react-bootstrap";

type Option = {
  methodName: string;
  logoUrl: string;
  apiUrl: string;
  vat: number;
};

type PaymentOptionsProps = {
  options: Option[];
  callback?: (methodName: string, apiUrl: string,reducePrice?:number) => Promise<void>;
  callbacks?: { methodName: string; payment: () => Promise<void> }[];
  promoData?: string;
  isFreeTrial?:boolean;
  setPromoData?: React.Dispatch<React.SetStateAction<string>>;
  isPromocodeApplied?: boolean;
  addPromocodeHandler?: () => Promise<void>;
  subscriptionPackData?:string;
  removePromocodeHandler?: () => Promise<void>;
  price?: number;
  discountPriceFromChild?:boolean;
  globalPrice?:string;
  reducePrice?: number;
  isMsisdnSubmitted?: MutableRefObject<boolean>;
  setIsMsisdnTakerModalOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  promoType?: string;
  allowedPaymentMethods?: AllowedPaymentMethod[];
};

const PaymentOptions = ({
  options,
  callback,
  callbacks,
  promoData,
  setPromoData,
  isPromocodeApplied,
  addPromocodeHandler,
  discountPriceFromChild,
  removePromocodeHandler,
  price,
  globalPrice,
  subscriptionPackData,
  isFreeTrial,
  reducePrice,
  isMsisdnSubmitted,
  setIsMsisdnTakerModalOpened,
  promoType,
  allowedPaymentMethods,
}: PaymentOptionsProps) => {
  const [isLoading,setIsLoading]=useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [termsPrivacyAgreed, setTermsPrivacyAgreed] = useState(false);
  const pathnameWithLang = usePathname();
    // const loginModal=useAppSelector((store)=>store?.loginSlice?.value)
    const pathname = pathnameWithLang.replace(/^\/(en|bl)/, "");
  const [promoLoader,setPromoLoader]=useState(false);
  const [countryCode,setCountryCode]=useState('BD');

  const visibleOptions = useMemo(() => {
    let filtered = filterOptionsByPromoAllowList(
      options,
      promoType,
      allowedPaymentMethods
    );

    if (isPromocodeApplied) {
      filtered = filtered.filter(
        (option) => !option.methodName.toLowerCase().includes("bldcb")
      );
    }

    return filtered;
  }, [options, promoType, allowedPaymentMethods, isPromocodeApplied]);

  const visibleOptionsKey = visibleOptions
    .map((option) => option.methodName)
    .join("|");

  const payNow = useCallback(async () => {
    // cookies.set()
    Cookies.set("payment_amount",(price||0+Number(selectedOption?.vat)||0).toString(),{
      expires: 0.01,secure: true,          
      sameSite: 'None'
    });
    if (!termsPrivacyAgreed) {
      toast.error(
        "To continue payment you need to accept 'terms and condition' & 'refund policy'"
      );
      return;
    }
    setIsLoading(true)
    if (callback) {
      if(discountPriceFromChild){
        await callback?.(selectedOption?.methodName!, selectedOption?.apiUrl!,reducePrice)
      }else{
        await callback?.(selectedOption?.methodName!, selectedOption?.apiUrl!);
      }
    } else {
      switch (selectedOption?.methodName) {
        case "bkash":
          await callbacks?.find((v) => v.methodName === "bkash")?.payment?.();
          break;
        case "bkashOnetime":
          await callbacks
            ?.find((v) => v.methodName === "bkashOnetime")
            ?.payment?.();
          break;
        case "nagad":
          await callbacks?.find((v) => v.methodName === "nagad")?.payment?.();
          break;
        case "upay":
          await callbacks?.find((v) => v.methodName === "upay")?.payment?.();
          break;
        case "robi":
          await callbacks?.find((v) => v.methodName === "robi")?.payment?.();
          break;
        case "surjopay":
          await callbacks
            ?.find((v) => v.methodName === "surjopay")
            ?.payment?.();
          break;
        case "GPDCB":
          if (isMsisdnSubmitted?.current) {
            await callbacks?.find((v) => v.methodName === "GPDCB")?.payment?.();
          } else {
            setIsMsisdnTakerModalOpened?.(true);
          }
          break;
        case "BLDCB":
            await callbacks?.find((v) => v.methodName === "BLDCB")?.payment?.();
          
          break;
        case "stripe":
          await callbacks?.find((v) => v.methodName === "stripe")?.payment?.();
          break;
        case "googlePay":
          await callbacks?.find((v) => v.methodName === "googlePay")?.payment?.();
          break;
        default:
          toast.error("Select another payment method");
      }
    }
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption,termsPrivacyAgreed]);

  const findAtLeastOne=(name:string)=>{
    if(name==='mobile_wallet'){
      if(findObj('bkash',visibleOptions))return true
      if(findObj('nagad',visibleOptions))return true
      if(findObj('upay',visibleOptions))return true
    }
    if(name==='mobile_balance'){
      if(findObj('robi',visibleOptions))return true
      if(findObj('gpdcb',visibleOptions))return true
      if(findObj('bldcb',visibleOptions))return true
    }
    if(name==='card'){
      if(findObj('surjopay',visibleOptions))return true
      if(findObj('aamarpay',visibleOptions))return true
    }
  }

  useEffect(() => {
    setTermsPrivacyAgreed(true);

    if (!visibleOptions.length) {
      setSelectedOption(null);
      return;
    }

    const currentStillVisible = visibleOptions.some(
      (option) => option.methodName === selectedOption?.methodName
    );
    if (currentStillVisible && selectedOption) {
      return;
    }

    const stripeOption = findObj("stripe", visibleOptions);
    if (stripeOption) {
      setSelectedOption(stripeOption);
      return;
    }

    setSelectedOption(visibleOptions[0]);
  }, [visibleOptionsKey]);

  const handlePromoCode=async()=>{
    if(!isPromocodeApplied){
      setPromoLoader(true);
      if(addPromocodeHandler){
        await addPromocodeHandler()
      }
      setPromoLoader(false);
    }else{
      removePromocodeHandler && removePromocodeHandler()
    }
                      
  }

  const findCountryCode=async()=>{
    let code = await getCountryCode();
    setCountryCode(code)
  }

  useEffect(()=>{
    findCountryCode();
  },[])
  return (
    <div className="mt-3 pt-3">
      {/* {//console.log(price,(price||0)>4)} */}
      {
      // (callbacks !== undefined) && 
      (((price||0)>6) )
      ? (
        <div className="text-white ">
          <div className="text-center mb-4 px-4">
            <h1 className="text-muted2 text-cs2 md:text-cn font-semibold mt-4 mb-3">
              পেমেন্ট পদ্ধতি নির্বাচন করুন
            </h1>
            
           {countryCode==='BD' && <div className="flex rounded-[4px] md:rounded-[8px] bg-[#253252] flex-row items-center px-0.5 md:px-3 mb-2">
              <div className="flex items-center   rounded-3xl  flex-1 max-w-[94vw] md:max-w-md">
                <div className="w-2 md:w-4 h-4  rounded-2xl flex items-center justify-center">
                  <Percentage/>
                </div>
                <span className="text-muted2 text-cxs md:text-cs2 whitespace-nowrap font-medium md:ml-1">প্রোমো কোড</span>
              </div>
              
              <div className="bg-[#35405E] rounded-[4px] border border-[#515462] p-1 m-0.5 md:m-1.5 flex items-center  ">
                <input
                  type="text"
                  value={promoData}
                  onChange={(e) => setPromoData?.(e.target.value)}
                  className="bg-transparent text-cs md:text-cs text-white placeholder-gray-400 flex-1 outline-none"
                  placeholder="কোড লিখুন"
                />
                <button
                  onClick={handlePromoCode}
                  disabled={promoLoader}
                  className={`${isPromocodeApplied?"bg-red-500/50 ":"green-gradient-1"} text-white px-1 md:px-2 py-1 rounded-[3px] shadow-md text-cxs md:text-cs  transition-colors`}
                >
                  {promoLoader?<Spinner size="w-3 h-3"/>:''}
                  {isPromocodeApplied?"Remove":"Apply"}
                </button>
              </div>
            </div>}
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
          <div className="bg-navyblue rounded-[4px] md:rounded-[8px] py-2 text-center mb-2">
            <h2 className="text-white text-cs md:text-cn font-medium">{countryCode==='BD'?"লোকাল":"ইন্টারন্যাশানাল"} পেমেন্ট মেথড</h2>
          </div>
          <p className="text-white text-cs md:text-cs2 text-center">
            (দয়া করে আপনার পেমেন্ট মেথড নির্বাচন করুন)
          </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={findAtLeastOne('mobile_wallet')?"px-4 border-t border-muted2":'hidden'}>
        <div className="flex flex-col lg:flex-row mx-2 lg:items-center lg:justify-between mb-2 md:mb-5">
          <div className="mb-0 md:mb-2 lg:mb-0 mt-4">
            <h3 className="text-white text-cs2 md:text-cn2  text-left font-semibold mb-0 md:mb-2">মোবাইল ওয়ালেট</h3>
            <p className="text-white text-cs md:text-cs2 ">মোবাইল ওয়ালেটের মাধ্যমে পেমেন্ট করুন।</p>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 inline-block"><SecureShield/></span>
            <div className="text-[#76DA84] text-cxs md:text-cs">SecurePayment</div>
          </div>
        </div>
      </div>
      <div className="d-flex mx-1.5 md:mx-4 flex-column gap-0">
            {findObj('stripe',visibleOptions)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('stripe',visibleOptions));
                  }}
              paymentName={findObj('stripe',visibleOptions)?.methodName}
              img={findObj('stripe',visibleOptions)?.logoUrl}
              globalPrice={globalPrice}
              amount={isFreeTrial?0:(price + (findObj('stripe',visibleOptions)?.vat ?? 0))}
            />:''}
            {findObj('googlePay',visibleOptions)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('googlePay',visibleOptions));
                  }}
              paymentName={findObj('googlePay',visibleOptions)?.methodName}
              img={findObj('googlePay',visibleOptions)?.logoUrl}
              globalPrice={globalPrice}
              amount={isFreeTrial?0:(price + (findObj('googlePay',visibleOptions)?.vat ?? 0))}
            />:''}
            {/* {console.log(options,"bkashOneTime")} */}
            {findObj('bkash',visibleOptions)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('bkash',visibleOptions));
                  }}
              paymentName={findObj('bkash',visibleOptions)?.methodName}
              img={findObj('bkash',visibleOptions)?.logoUrl}
              amount={isFreeTrial?0:(price + (findObj('bkash',visibleOptions)?.vat ?? 0))}
            />:''}
          {findObj('nagad',visibleOptions)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('nagad',visibleOptions));
                  }}
              paymentName={findObj('nagad',visibleOptions)?.methodName}
              img={findObj('nagad',visibleOptions)?.logoUrl}
              amount={price + (findObj('nagad',visibleOptions)?.vat ?? 0)}
            />:''}
          {findObj('upay',visibleOptions)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('upay',visibleOptions));
                  }}
              paymentName={findObj('upay',visibleOptions)?.methodName}
              img={findObj('upay',visibleOptions)?.logoUrl}
              amount={price + (findObj('upay',visibleOptions)?.vat ?? 0)}
            />:''}
      </div>
      <div className={findAtLeastOne('mobile_balance')?"  px-1.5 md:px-4 border-t-[1px] border-muted2 mt-4":'hidden'}>
        <div className="flex flex-col lg:flex-row mx-2 lg:items-center lg:justify-between mb-2">
          <div className="md:mb-2 lg:mb-0 mt-2">
            <h3 className="text-white text-cs2 md:text-cn2  text-left font-semibold mb-0.5 md:mb-2">মোবাইল ব্যালেন্স</h3>
            <p className="text-white text-cs md:text-cs2 "> মোবাইল ব্যালেন্স দিয়ে পেমেন্ট করুন।</p>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="w-2.5 md:w-4 h-4 inline-block"><SecureShield/></span>
            <div className="text-[#76DA84] text-cxs md:text-cs">Secure Payment</div>
          </div>
        </div>
      </div>
      <div className="d-flex mx-4 flex-column gap-2">
            {findObj('gpdcb',visibleOptions)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('gpdcb',visibleOptions));
                  }}
              paymentName={findObj('gpdcb',visibleOptions)?.methodName}
              img={findObj('gpdcb',visibleOptions)?.logoUrl}
              amount={price + (findObj('gpdcb',visibleOptions)?.vat ?? 0)}
            />:''}
          {findObj('robi',visibleOptions)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('robi',visibleOptions));
                  }}
              paymentName={findObj('robi',visibleOptions)?.methodName}
              img={findObj('robi',visibleOptions)?.logoUrl}
              amount={price + (findObj('robi',visibleOptions)?.vat ?? 0)}
            />:''}
          {findObj('bldcb',visibleOptions)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj('bldcb',visibleOptions));
                  }}
              paymentName={findObj('bldcb',visibleOptions)?.methodName}
              img={findObj('bldcb',visibleOptions)?.logoUrl}
              amount={price + (findObj('bldcb',visibleOptions)?.vat ?? 0)}
            />:''}
      </div>
      <div className={findAtLeastOne('card')?"px-4 border-t-[1px] border-muted2 mt-4":'hidden'}>
        <div className="flex flex-col lg:flex-row mx-2 lg:items-center lg:justify-between mb-2">
          <div className="md:mb-2 lg:mb-0 mt-2">
            <h3 className="text-white text-cs2 md:text-cn2  text-left font-semibold mb-0.5 md:mb-2">ডেবিট/ক্রেডিট কার্ড</h3>
            <p className="text-white text-cs  md:text-cs2">ডেবিট/ ক্রেডিট কার্ড দিয়ে পেমেন্ট করুন</p>
          </div>
          
          <div className="flex items-center gap-1 ">
            <span className="w-2.5 md:w-4 h-4 inline-block"><SecureShield/></span>
            <div className="text-[#76DA84] text-cxs md:text-cs">Secure Payment</div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-2 mx-4">
            {findObj("surjopay",visibleOptions)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj("surjopay",visibleOptions));
                  }}
              paymentName={findObj("surjopay",visibleOptions)?.methodName}
              img={findObj("surjopay",visibleOptions)?.logoUrl}
              amount={price + (findObj("surjopay",visibleOptions)?.vat ?? 0)}
            />:''}

             {findObj("AamarPay",visibleOptions)?<SinglePaymentCard
              selectedPayment={selectedOption?.methodName??''}
              handlePaymentSelect={() => {
                    setSelectedOption(findObj("AamarPay",visibleOptions));
                  }}
              paymentName={findObj("AamarPay",visibleOptions)?.methodName}
              img={findObj("AamarPay",visibleOptions)?.logoUrl}
              amount={price + (findObj("AamarPay",visibleOptions)?.vat ?? 0)}
            />:''}
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
          <div className="text-white text-cxs md:text-cs2">
            আমি{" "} 
            <Link href={"/terms&condition"} className="text-[#D24874]">
              শর্তাবলী
            </Link>{" "}
            এবং{" "}
            <Link href={"/returnpolicy"} className="text-[#D24874]">
              রিফান্ড{" "}
            </Link>
            নীতির সাথে একমত
          </div>
        </label>
      </div>
        <button
          disabled={!selectedOption || isLoading}
          onClick={payNow}
          id={`subs_pay_btn`}
          className={`w-[92%] mx-auto md:w-[95%] green-gradient-1 mt-2 text-white flex justify-center items-center 
                     
                      md:px-8 py-0.5  md:py-1.5 mb-4 md:mx-3 rounded-[6px]
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
    </div>
  );
};

export default memo(PaymentOptions);

