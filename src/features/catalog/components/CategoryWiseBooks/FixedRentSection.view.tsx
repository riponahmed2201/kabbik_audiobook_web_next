'use client'
import { HeadphonesIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TCategoryComponent } from "./static/category.types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TCategoryItem } from "@/shared/ui/static/types";
import { convertToBanglaDigits, decodeWord, normalizeMsisdn } from "@/helpers/commonFunction";
import CommonModal from "@/shared/ui/CommonModal/CommonModal.view";
import PaymentOptions from "@/features/subscription/components/Subscription/PaymentOptions.view";
import { siteConfig } from "@/config/config";
import { ReduxShowLoginModal } from "@/features/auth/store/LoginSlice";
import { getDynamicPaymentMethods, paymentForPurchaseAudiobook, promocodeHandlerForBook } from "@/utils/apiServices";
import { toast } from "react-toastify";
import GPNumberModal from "./GpModal";

export default function RentBanner({categoryData,categoryName}:{categoryData:TCategoryComponent['categoryData'],categoryName:string}) {
  const [dismissed, setDismissed] = useState(false);
  const [seconds, setSeconds] = useState(8 * 3600 + 34 * 60 + 22);
  const [visible, setVisible] = useState(false);
  const [catItem,setCatItem]=useState<TCategoryItem|null>(null);
  const user = useAppSelector(store=>store?.user?.userData);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [reducedPrice,setReducedPrice]=useState(0);
  const reducedPriceRef=useRef(reducedPrice);
  const dispatch=useAppDispatch();
  const categories =useAppSelector(store=>store?.categories?.CategoriesData)
  const [showPaymentOptions,setShowPaymentOptions]=useState(false);
  const [isMsisdnTakerModalOpened, setIsMsisdnTakerModalOpened] =useState(false);
  const [number,setNumber]=useState('');
  const [paymentMethod,setPaymentMethod]=useState('');
  const [paymentUrl,setPaymentUrl]=useState('')
  let [affIdValue,setAffIdValue]=useState<string|null>(null);


  useEffect(() => {
    
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(()=>{
    reducedPriceRef.current=reducedPrice;
  },[reducedPrice])

  useEffect(()=>{
    if((categories?.length||0)<1)return;
    let item = categories?.find(item=>(item?.name||'')===decodeWord(categoryName))
    setCatItem(item||null);
    console.log(item,"itemss")
  },[categories])

  const getDiscountedData=async(affId?:string|null)=>{
    let promo  = affId || affIdValue ;
    
    let result = await promocodeHandlerForBook(catItem?.id||0,promo??'',catItem?.price||0,"category")
    // //console.log(affIdValue,result,'affs2',result.data?.reduce_price)
    if(result?.data?.reduce_price){
      setReducedPrice(Number(result?.data?.reduce_price)??0)
    }
  };


  const purchaseAudiobook = async () => {
      if(!user?.id || user?.id===Number(siteConfig?.defaultUserId)){
         dispatch(ReduxShowLoginModal(true));
         return;
      }
      setShowPaymentOptions(true)
      const result = await getDynamicPaymentMethods("category");
      const excludedPaymentMethods = '';
      // JSON.parse(
       
      // );
      //console.log(audioBookDetailsData.excluded_payment_methods)
      if (result.success) {
        setPaymentOptions(
          result.data.filter(
            (p: any) => !excludedPaymentMethods.includes(p.method_name)
          )
        );
      }
    };

    const removeHandler = async () => {
    setAffIdValue("");
    setReducedPrice(0)
    toast.info("Promo Code Removed!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
  };

     
 

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, []);


  if (dismissed) return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setDismissed(false)}
        className="px-4 py-2 rounded-full text-xs text-white/60 border border-white/10 bg-white/5 hover:bg-white/10 transition"
      >
        Show Offer
      </button>
    </div>
  );

   const makePayment = async (paymentName: string, url: string) => {
      let payload :any= {
        userId: user?.id,
        name: user?.full_name,
        // email: user?.user_email,
        phone: user?.phone_no,
        address: user?.address,
        amount:  (catItem?.price||0) - reducedPriceRef.current ,
        // audioBookId: audioBookDetailsData.id,
        type: "category",
        promo_code: "",
        productId: catItem?.id,
        source: "Kabbik",
        platform: "web",
      };
      console.log(paymentName.toLocaleLowerCase(),"gpdcbb working",number.trim())
      if(paymentName.toLocaleLowerCase()==='gpdcb' && number.trim()===''){
        setIsMsisdnTakerModalOpened(true);
        setShowPaymentOptions(false)
        setPaymentMethod(paymentName);
        setPaymentUrl(url);
        return;
      }
      else if(paymentName.toLocaleLowerCase()==='gpdcb'){
        payload.msisdn=normalizeMsisdn(number)
        payload.currency='BDT',
        payload.purpose= "Rent Category"
        payload.productName = "Kabbik- Romjan Special  Rent"
        payload.renewal= 0
        payload.durationDay=50
        payload.promo_code = ""
        payload.source = "web"
        payload.trafficSource =  "Kabbik"
        payload.platform =  "app"
        payload.firstPayment =  1
      }
      const result = await paymentForPurchaseAudiobook(url, payload);
      if (paymentName === "Bkash") {
        if (result.data?.bkashURL) {
          window.location.href = result.data.bkashURL;
          return ;
        }
      } else {
        if (result.data?.callBackUrl) {
          window.location.href = result.data.callBackUrl;
          return ;
        }
        if (paymentName.toLocaleLowerCase()==='gpdcb') {
          console.log(result,"resulttt")
          window.location.href = result.url;
          return ;
        }
      }
      toast.error("Could not make payment");
    };

  return (
    <div
      className={`${(catItem?.for_rent) && !catItem?.isPurchased && (!user?.is_subscribed)?'':'hidden'}  fixed bottom-0 btn-gradient-21 left-0 right-0 z-[11] transition-all duration-500`}
      style={{
        // background: "linear-gradient(135deg, #6d1f70 0%, #4a0e6b 50%, #1e0a3c 100%)",
        boxShadow: "0 -4px 40px rgba(109,31,112,0.6), 0 -1px 0 rgba(255,255,255,0.08)",
        borderTop: "1px solid rgba(255,255,255,0.10)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Glow orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-[500px] h-24 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(ellipse, #c84bdb 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-6">

          {/* LEFT */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            {/* Icon box */}
            <div
              className="flex-shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <HeadphonesIcon color="white"/>
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-white flex font-bold text-sm sm:text-base lg:text-lg leading-tight truncate">
                {/* Rent All &mdash;{" "}
                <span style={{ background: "linear-gradient(90deg,#f0abfc,#e879f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  TK 69 for 60 Days!
                </span> */}
                <span className="hidden md:block mr-1">
                     {decodeWord(categoryName)} প্যাকেজ: 
                </span>
                {convertToBanglaDigits(categoryData?.data[0].data.length)} টি বই মাত্র {convertToBanglaDigits(catItem?.price||0)} টাকা
              </p>
              <p className="text-white text-xs sm:text-sm mt-0.5 truncate">
                সাবস্ক্রিপশন ছাড়াই {convertToBanglaDigits(catItem?.rent_duration_day||60)} দিনের জন্য রেন্ট করুন
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Timer — hidden on small */}
            {/* <div className="hidden sm:flex items-center gap-1">
              <TimerBlock val={hh} label="hrs" />
              <span className="text-purple-300/40 font-bold text-sm mb-2">:</span>
              <TimerBlock val={mm} label="min" />
              <span className="text-purple-300/40 font-bold text-sm mb-2">:</span>
              <TimerBlock val={ss} label="sec" />
            </div> */}

            {/* CTA */}
            <button
              className="group relative overflow-hidden px-5 py-2.5 sm:px-8 sm:py-3 rounded-full font-semibold text-sm sm:text-base cursor-pointer active:scale-95 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg,#fde8ff 0%,#f9d0fb 100%)",
                color: "#7c1587",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              }}
              onClick={() =>{purchaseAudiobook(); }}
            >
              <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-white/40 skew-x-[-20deg] transition-[left] duration-500 group-hover:left-[130%]" />
              <span className="relative">Rent Now</span>
            </button>

            {/* Dismiss */}
            <button
              onClick={() => setDismissed(true)}
              className="text-purple-300/50 hover:text-white hover:bg-white/10 transition-all p-1.5 rounded-full cursor-pointer"
              aria-label="Dismiss"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <CommonModal
        isOpen={showPaymentOptions}
        onClose={()=>setShowPaymentOptions(false)} 
      >
        <div className={`  bg-navyblue modal-body text-center max-h-[96vh] overflow-y-scroll`}>
          <PaymentOptions
            options={paymentOptions.map((option: any) => ({
              methodName: option.method_name,
              logoUrl: option.image_url,
              apiUrl: option.url,
              vat: option.vat,
            }))}
            callback={makePayment}
            // price={catItem?.price}
             removePromocodeHandler={removeHandler}
            promoData={affIdValue as string}
            addPromocodeHandler={getDiscountedData}
            setPromoData={setAffIdValue as any}
            price={(catItem?.price||0)-(Number(reducedPrice))}
            reducePrice={reducedPrice}
            isPromocodeApplied={reducedPrice>0?true:false}
            discountPriceFromChild={true}
            // isMsisdnSubmitted={isMsisdnSubmitted}
            // setIsMsisdnTakerModalOpened={setIsMsisdnTakerModalOpened}
          />
        </div>
      </CommonModal>
      <CommonModal
        isOpen={isMsisdnTakerModalOpened}
        onClose={()=>setIsMsisdnTakerModalOpened(false)}
      >
        <GPNumberModal
            value={number}
            setValue={setNumber}
            handleSubmit={()=>{makePayment(paymentMethod,paymentUrl)}}
        />
      </CommonModal>
    </div>
  );
}