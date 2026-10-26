"use client";
import styles from "./static/style.module.css";
import Link from "next/link";
import OtpInput from "react-otp-input";

import Image from "next/image";
import dynamic from "next/dynamic";
import React, { useEffect, useRef } from "react";
import {
  paymentMethodlist,
  getPromoCodeApi,
  userProfile,
  robiPostApi,
  upayPostApi,
  nagadPostApi,
  bkashOneTimePostApi,
  bkashPostApi,
  aamarpayPostApi,
  gpPostApi,
  blDcbVerifyApi,
  promocodeHandlerV2,
  subs_page_trackerApi,
} from "@/utils/apiServices";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPInput from "react-otp-input";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import MsisdnTracker from "./MsisdnTracker.view";
import { convertToBanglaDigits, createBlPayment, extractNumber, getCountryCode, getSubscriptionPackKey, isPaymentMethodAllowedByPromo, isValidBLNumber, normalizeBLNumber, verifyConsent } from "@/helpers/commonFunction";
import DynamicSubscriptionPack from "./static/subscription.type";
import { UserProfileInfo } from "@/features/audiobook/components/audiobook/static/audiobook.type";
import Spinner from "@/shared/ui/Spinner.view";
import SubscribePackage from "./SubscribePackages.view";
import CommonModal from "@/shared/ui/CommonModal/CommonModal.view";
import PaymentOptions from "./PaymentOptions.view";
import { container } from "@/shared/ui/static/tailwind.classes";
import LeftAngle from "@/svgs/LeftAngle.svg";
import FreeTrialMessage from "./FreeTrailMessage.view";
import CityTouchPayment from "@/features/subscription/components/CityTouchPayment/CityTouchPayment.view";
// import TermsAndConditions from "./TermsAndCondition.view";
import Traingle from "@/svgs/Traingle.svg";
import { Triangle } from "lucide-react";
import TermsAndConditions from "@/app/[lang]/terms&condition/page";
import { paths } from "@/utils/Paths";
import RightArrow from "@/svgs/RightArrow";
import { useAppSelector } from "@/store/store";
import { StripePaymentArgs } from "@/helpers/commonTypes";
import { apiEndPoints } from "@/utils/apiEndpoints";

const SubscribeComponent = ({
  subscriptionPackList,
  categoryListData,
  track_id_param
}: {
  subscriptionPackList: DynamicSubscriptionPack[];
  categoryListData: any;
  track_id_param?:string;
}) => {
  const router = useRouter();
    const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [userData, setUserData] = useState<UserProfileInfo | null>(null);
  const [loader,setLoader]=useState(true);
  const [isSubscribed,setIsSubscribed]=useState(true);
  const searchParams = useSearchParams();
  const affId = searchParams.get("affId");
  const [promoData, setPromoData] = useState("");
  const [affPackageId,setAffPackageId]=useState("");
  const affProductId = searchParams.get("productId");
  const affProductType = searchParams.get("productType");
  let [affIdValue,setAffIdValue]=useState<string|null>(null)
  const [promoCode, setPromoCode]: any = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [subscriptionPackData, setSubscriptionPackData] = useState(
    {} as DynamicSubscriptionPack 
  );
  const [countryCode,setCountryCode]=useState('BD');
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [isMsisdnTakerModalOpened, setIsMsisdnTakerModalOpened] =
    useState(false);
  const isMsisdnSubmitted = useRef(false);
  const promoAppliedPackKeyRef = useRef<string | null>(null);
  const msisdnRef = useRef("");
  const [isCityTouch,setIsCityTouch]=useState(false);
  const isMsisdnValid = msisdn.length === 11;
  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);
    const [subscriptionPackDataList,setSubscriptionPackDataList]=useState(subscriptionPackList);
  const [blNumberModal,setBlNumberModal]=useState({show:false,value:''});
  const [blOtpModal,setBlOtpModal]=useState({show:false,value:''})
  const [blLoader,setBlLoader]=useState(false)
  const navigate=useRouter();
  const [openPaymentModal,setOpenPaymentModal]=useState(false);
  const [showTrailModal,setTrialModal]=useState(false);
  const hasRun=useRef(false);
   const utmSource = searchParams.get("utm_source");
   const track_id = searchParams.get("track_id");
   const pack_ids=searchParams.getAll('pack_id');
  const utmCampaign = searchParams.get("utm_campaign");
    let [reducedPrice,setReducedPrice]=useState(0);
    const user =useAppSelector((store)=>store?.user?.userData);
  const [selectedId,setSelectedId]=useState<null|number>(null);
  const [showFreeTrail,setShowFreeTrail]=useState(false);


  useEffect(()=>{
    if(pack_ids.includes('12')){
      setShowFreeTrail(true)
    }else{
      
    }
    console.log(pack_ids,"pack_ids")
  },[pack_ids])


  const findCountryCode=async()=>{
    const country=await getCountryCode();
    setCountryCode(country);
  }

  useEffect(()=>{
    findCountryCode();
  },[])

    useEffect(() => {
      Cookies.remove('affId')
      // alert(affId);
      if (affId) {
        const expiresIn2Min = new Date(new Date().getTime() + 2 * 60 * 1000);
        Cookies.set("affId", affId, { expires: expiresIn2Min });
        Cookies.set("affProductId", affProductId??'', { expires: expiresIn2Min });
        Cookies.set("affProductType", affProductType??'', { expires: expiresIn2Min });
      }
      let affIdFromCookies = Cookies.get('affId')
      let affProductIdFromCookies = Cookies.get('affProductId');
      let affProductTypeFromCookie = Cookies.get('affProductType');
      setAffPackageId(affProductId || affProductIdFromCookies || '');
      setAffIdValue(affId??affIdFromCookies??null);
      if(affProductType==="subscription_plan" || affProductTypeFromCookie==="subscription_plan"){
        // alert(affId);
       
        getDiscountedData(affId??affIdFromCookies??null)
      }
    }, [affId]);


    const getDiscountedData=async(affIdValue:string|null)=>{
      //  await setAffiliateApplied(true);
       if(hasRun.current)return;
       hasRun.current=true;
       
        // if(affLiateApplied)return;
      let discountedPrice = await promocodeHandlerV2(affProductId??'',affIdValue??null)
      // alert(discountedPrice);
      setReducedPrice(Number(discountedPrice)??0)
      let newPacksData=[...subscriptionPackDataList];
      newPacksData=newPacksData.map((item)=>{
        if(item.subscriptionItemId?.toString()===affProductId){
          item.amount= '৳'+convertToBanglaDigits(item.rawPrice-discountedPrice);
          item.reduce_price=discountedPrice||0
          item.promo_code=affIdValue||null;
          // item.re=item.rawPrice-discountedPrice
          // item.
        }
        //console.log(item,"item");
        
        return item
      })
      // alert(discountedPrice);

      setSubscriptionPackDataList(newPacksData);

    };

  const handleBlPayment=async()=>{
    if(isValidBLNumber(blNumberModal.value)){
      createBlPayment(
        normalizeBLNumber(blNumberModal.value ) ?? '', 
        subscriptionPackData, 
        userData?.id?userData?.id.toString():'' ,
        (value)=>{setBlLoader(value)},
        ()=>{
          setBlOtpModal({show:true,value:''});
          setBlNumberModal({...blNumberModal,show:false})
        }
      )
    }else{
      setBlNumberModal({show:true,value:''})
    }
  }

  useEffect(() => {
    let is_subscribed=Cookies.get('is_subscribed');
    if(user?.is_subscribed===1 && user?.id!==2820){
      setIsSubscribed(true)
      router.push('/');
    }else{
      setIsSubscribed(false)
      setTimeout(()=>{
        let is_subscribed=Cookies.get('is_subscribed');
        if(user?.is_subscribed===1 && user?.id!==2820){
          router.push('/');
          setIsSubscribed(true)
        }else{
          setIsSubscribed(false)
        }
        setLoader(false)
      },1000)
    }

  }, []);

  useEffect(()=>{
    let sourceFromParams=Cookies.get('sourceFromParams')??'';
     let source=Cookies.get('source')??'';
    if(sourceFromParams==='city_touch'){
      setIsCityTouch(true);
    }if(source?.includes('city')){
      setIsCityTouch(true);
    }
  },[])


  

  useEffect(() => {
    
    // if (isMsisdnTakerModalOpened) {
    //   const Modal = require("bootstrap/js/dist/modal");
    //   const msisdnTakerModal = new Modal(
    //     document?.getElementById("msisdnTakerModal")!,
    //     {
    //       keyboard: false,
    //     }
    //   );
    //   msisdnTakerModal.show();
    // }
  }, [isMsisdnTakerModalOpened]);
  const [blDcbMsisdnModalOpen, setBlDcbMsisdnModalOpen] = useState(false);
  const [blDcbMsisdn, setBlDcbMsisdn] = useState("");
  const [showBlDcbOtpSubmitButton, setShowBlDcbOtpSubmitButton] =
    useState(false);
  const modalRef = useRef(null);
  const [blDcbOtp, setBlDcbOtp] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await userProfile();
      setUserData(userData);
    };
    fetchUserData();
  }, []);


  useEffect(() => {
    const divs = document.getElementsByClassName("modal-backdrop fade show");
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].innerHTML === "") {
        divs[i].remove();
      }
    }
  });

  const paymentMethod = async (packId: number, renewal: number = 1) => {
    const methodData = await paymentMethodlist(packId, renewal);
    setPaymentMethodData(
      methodData.data.filter(
        (v: any) => v.name !== "googlePay1" && v.name !== "stripe1"
      )
    );
  };

  const resetPromoState = () => {
    setPromoData("");
    setPromoCode("");
    promoAppliedPackKeyRef.current = null;
    setSubscriptionPackData((prev) => {
      const next = { ...prev };
      delete next.reduce_price;
      delete next.promo_code;
      return next;
    });
  };

  const resetPaymentSubFlowState = () => {
    setIsMsisdnTakerModalOpened(false);
    setBlNumberModal({ show: false, value: "" });
    setBlOtpModal({ show: false, value: "" });
    isMsisdnSubmitted.current = false;
  };

  const handlePaymentModalClose = () => {
    setOpenPaymentModal(false);
    resetPromoState();
    resetPaymentSubFlowState();
  };

  const selectSubscriptionPack: React.Dispatch<
    React.SetStateAction<DynamicSubscriptionPack>
  > = (pack) => {
    setSubscriptionPackData((prev) => {
      const nextPack = typeof pack === "function" ? pack(prev) : pack;
      const nextKey = getSubscriptionPackKey(nextPack);

      if (promoAppliedPackKeyRef.current !== nextKey) {
        setPromoData("");
        setPromoCode("");
        promoAppliedPackKeyRef.current = null;

        const { reduce_price, promo_code, ...cleanPack } = nextPack;
        return { ...cleanPack } as DynamicSubscriptionPack;
      }

      return nextPack;
    });
  };

  const promocodeHandler = async () => {
    const promoCodeData = await getPromoCodeApi(
      subscriptionPackData.subscriptionItemId,
      promoData
    );
    if (!promoCodeData || promoCodeData.success === "false") {
      toast.error("Invalid promo code");
      return;
    }
    if (Object.keys(promoCodeData).length) {
      promoAppliedPackKeyRef.current = getSubscriptionPackKey(
        subscriptionPackData
      );
      setSubscriptionPackData((prev) => ({
        ...prev,
        reduce_price: promoCodeData.data.reduce_price,
        promo_code: promoData,
      }));
      setPromoCode(promoCodeData.data);
      toast.success("Promo Code Added!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.error("Invalid Promo Code!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const removeHandler = async () => {
    resetPromoState();
    toast.info("Promo Code Removed!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
  };

  const checkPromocodeCompatibility = (paymentType: string) =>
    isPaymentMethodAllowedByPromo(
      paymentType,
      promoCode?.promo_type,
      promoCode?.allowedPaymentMethods
    );

  const bkashPayment = async () => {
    if (checkPromocodeCompatibility("bkash")) {
      const bkashResponseData = await bkashPostApi(subscriptionPackData);
      router.push(bkashResponseData.data.redirectURL);
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const bkashOneTimePayment = async () => {
    if (checkPromocodeCompatibility("bkash")) {
      const bkashOneTimeResponseData = await bkashOneTimePostApi(
        subscriptionPackData
      );
      router.push(bkashOneTimeResponseData.data.bkashURL);
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const nagadPayment = async () => {
    if (checkPromocodeCompatibility("nagad")) {
      const nagadResponseData = await nagadPostApi(subscriptionPackData);
      router.push(nagadResponseData.data.callBackUrl);
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const upayPayment = async () => {
    if (checkPromocodeCompatibility("upay")) {
      const upayResponseData = await upayPostApi(subscriptionPackData);
      router.push(upayResponseData.data.data.gateway_url);
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const aamarpayPayment = async () => {
    if (checkPromocodeCompatibility("surjo")) {
      const aamarpayResponseData = await aamarpayPostApi(
        subscriptionPackData,
        userData
      );
      router.push(aamarpayResponseData.data.callBackUrl);
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const robiPayment = async () => {
    if (checkPromocodeCompatibility("robi")) {
      const robiResponseData = await robiPostApi(subscriptionPackData);
      router.push(robiResponseData.data.redirectUrl);
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const gpPayment = async () => {
    if (checkPromocodeCompatibility("gpdcb")) {
      const gpResponseData = await gpPostApi({
        ...subscriptionPackData as any,
        msisdn: msisdnRef.current,
      });
      if (gpResponseData?.resultCode === "SUCCESS") {
        router.push(gpResponseData.url);
      } else {
        toast.error("Payment failed, please try again");
      }
    } else {
      toast.error("Invalid promocode. Change payment method");
    }
  };

  const submitBlDcbMsisdn = async (event: any) => {
    // event.preventDefault();
    // const payload = {
    //   msisdn: String(blDcbMsisdn).slice(-10),
    //   userId: Cookies.get("id"),
    //   packageId: subscriptionPackData.subscriptionItemId,
    //   fromRenewal: subscriptionPackData.from_autorenewal,
    // };
    // //console.log(payload);
    // const result = await blDcbPostApi(payload);
    // if (result.success) {
    //   setShowBlDcbOtpSubmitButton(true);
    //   toast.success("OTP Sent!", {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //   });
    // } else {
    //   toast.error("Something went wrong, please try again.");
    // }
  };

  const submitBlDcbOtp = async (event: any) => {
    event.preventDefault();
    const payload = {
      msisdn: blDcbMsisdn,
      consent: blDcbOtp,
    };
    const result = await blDcbVerifyApi(payload);
    if (result.success) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      router.push("/");
    } else {
      toast.error(result.message || "Something went wrong, please try again");
    }
  };

  useEffect(() => {
    if(user?.id && user?.id!==2820){
      subs_page_trackerApi(
        {user_id:user?.id,
        email:user?.user_email,
        phone:user?.phone_no,
        action_type:'visit_subs_page',
        selected_pack_id:null,
        selected_pay_method:null,
        track_id:track_id_param || track_id||null
      }
      )
    }
    // if(typeof window != undefined){
    //   (window as any).dataLayer = (window as any).dataLayer || [];
    //   (window as any).dataLayer.push({
    //     event: 'view_item',
    //     page_type: 'subscribe',
    //     content_type: 'subscription',
    //     content_category: 'audiobook',
    //     page_name: 'Kabbik Subscription Page'
    //   });
    // }
  }, [user]);

  const startStripePayment = async () => {
    try {
      console.log("Please wait...");
      let selectedPack= {
        isOnetime: subscriptionPackData?.isOnetime,
        subscriptionItemId: subscriptionPackData?.subscriptionItemId
      };
      let userId = Cookies.get("id") 
      let isIOS = false;
  
      const fromRenewal = selectedPack.isOnetime === 1 ? 0 : 1;
      const source = isIOS ? "ios" : "android";
  
      const payload = {
        productId: selectedPack.subscriptionItemId,
        fromRenewal,
        platform: "Kabbik",
        source,
        userId,
        purchaseType: fromRenewal === 1 ? "subscription" : "payment",
      };
  
      const res = await fetch(apiEndPoints.stripe_payment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Payment request failed");
      }
  
      const data = await res.json();
  
      const callBackUrl = data?.data?.callBackUrl;
  
      if (!callBackUrl) {
        throw new Error("Failed to initiate payment");
      }
  
      // redirect to Stripe checkout
      window.location.href = callBackUrl;
  
    } catch (error) {
      console.error("Stripe payment failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const startGooglePayment = async () => {
    try {
      console.log("Please wait...");
      let selectedPack= {
        isOnetime: subscriptionPackData?.isOnetime,
        subscriptionItemId: subscriptionPackData?.subscriptionItemId
      };
      let userId = Cookies.get("id") 
      let isIOS = false;
  
      const fromRenewal = selectedPack.isOnetime === 1 ? 0 : 1;
      const source = isIOS ? "ios" : "android";
  
      const payload = {
        productId: selectedPack.subscriptionItemId,
        fromRenewal,
        platform: "WEB",
        paymentMethod:"GOOGLE_PAY",
        source,
        userId,
        purchaseType: fromRenewal === 1 ? "subscription" : "payment",
      };
  
      const res = await fetch(apiEndPoints.stripe_gPay_payment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Payment request failed");
      }
  
      const data = await res.json();
  
      const callBackUrl = data?.data?.callBackUrl;
  
      if (!callBackUrl) {
        throw new Error("Failed to initiate payment");
      }
  
      // redirect to Stripe checkout
      window.location.href = callBackUrl;
  
    } catch (error) {
      console.error("Stripe payment failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <>
       <div className="w-full h-[100px] bg-[#0E1D3F] mt-[-100px]"></div>
      <div className={`relative  ${container('1306px')} mt-12 `}>

      {/* Banner Section */}
      <div className="relative w-full object-center object-cover overflow-hidden max-h-[350px]">
        {/* Large Screen Banner */}
        <img loading="lazy"
          src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/banner.png"
          className="hidden sm:block w-full h-full object-cover"
          alt="banner"
        />

        {/* Small Screen Banner */}
        <img loading="lazy"
          src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/Frame%201618873934.png"
          className="block sm:hidden min-h-[200px] w-full h-full object-cover"
          alt="banner small"
        />

        {/* Logo + Text */}
        <div className="absolute bottom-0 sm:bottom-[7%] w-full text-center">
          <div className="text-center text-white mt-4 mb-3">
        <h1 className="text-[20px] font-bold">কাব্যিক প্রিমিয়াম সাবস্ক্রিপশন</h1>
        <p className="text-cn   text-center text-white mt-2">
          আনলক করুন ৩০০০টিরও বেশি দেশি এবং বিদেশি অডিওবুক
        </p>
        {/* Features Row 1 */}
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          <label className="flex items-center gap-2 text-[10px] text-gray-300">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-rose-500" />
            এক্সক্লুসিভ কনটেন্ট
          </label>

          <label className="flex items-center gap-2 text-[10px] text-gray-300">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-rose-500" />
            ১০০% বিজ্ঞাপনমুক্ত অভিজ্ঞতা
          </label>

          <label className="flex items-center gap-2 text-[10px] text-gray-300">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-rose-500" />
            ডাউনলোড ও অফলাইন শোনার সুবিধা
          </label>
          <label className="flex items-center gap-2 text-[10px] text-gray-300">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-rose-500" />
            বন্ধুদের কাব্যিক রেফার করুন, নগদ উপার্জন করুন!
          </label>

          <label className="flex items-center gap-2 text-[10px] text-gray-300">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-rose-500" />
            রিওয়ার্ড পয়েন্টস সংগ্রহ করুন এবং পুরষ্কার জিতুন
          </label>
        </div>

        {/* Features Row 2 */}
        {/* <div className="flex flex-wrap justify-center gap-2 mt-2">
          
        </div> */}

        
      </div>
        </div>
      </div>

      {/* Header */}
      <p className="text-cn2  font-semibold text-center text-white mt-4">
          আপনার জন্য সেরা প্যাকেজ টি বেছে নিন
        </p>

      

    </div>
    {loader?
      <div className="subscribe-loader"><Spinner/></div>
      :(
      <>
      <ToastContainer />
      <div className={`${styles.divBody}`}>
        <div className={"container relative "+container('1300px')}>
          <div className={"grid sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2  md:gap-4"}>
            {/* <div className="circular_gradient left-[-20%] top-[10%] w-[30vw] h-[30vw] absolute  "></div>
            <div className="circular_gradient right-[-20%] bottom-[0%] w-[30vw] h-[30vw] absolute  "></div> */}
            {subscriptionPackList?.map(
              (data: DynamicSubscriptionPack, index: number) => {
                return (
                  <React.Fragment key={`${data.id}-${index}`}>
                    {data.subscriptionItemId === "2" ? (
                      <>
                        <div 
                          onClick={()=>{
                            setIsMsisdnTakerModalOpened(false);
                            setBlNumberModal({value: '',show:false});
                            setBlOtpModal({value:'',show:false})
                          }}
                          className={`${!affPackageId?"":(
                            affPackageId===data?.subscriptionItemId?'':'hidden'
                          )} ${showFreeTrail?'hidden':''} col-12 col-sm-12 col-md-6 col-lg-3 cp ${styles.parentDiv}`}
                        >
                          <SubscribePackage
                            onSelect={()=>setSelectedId(index)}
                            cid={index}
                            selectedId={selectedId}
                            setTrialModal={()=>setTrialModal(true)}
                            key={`${data.id}-${index}-1`}
                            data={{ ...data, isOnetime: 0 }}
                            setSubscriptionPackData={selectSubscriptionPack}
                            paymentMethod={paymentMethod}
                            setShowModal={setOpenPaymentModal}
                          />
                        </div>
                        <div 
                          onClick={()=>{setIsMsisdnTakerModalOpened(false);
                            setBlNumberModal({value: '',show:false});
                            setBlOtpModal({value:'',show:false})
                          }}
                          className={` ${!affPackageId?"":(
                            affPackageId===data?.subscriptionItemId?'':'hidden'
                          )} ${showFreeTrail?'hidden':''} col-12 col-sm-12 col-md-6 col-lg-3 cp ${styles.parentDiv}`}
                        >
                          <SubscribePackage
                          onSelect={()=>setSelectedId(100)}
                            cid={100}
                            selectedId={selectedId}
                            setTrialModal={()=>setTrialModal(true)}
                            key={`${data.id}-${index}-2`}
                            data={{ ...data, isOnetime: 1 }}
                            setSubscriptionPackData={selectSubscriptionPack}
                            paymentMethod={paymentMethod}
                            setShowModal={setOpenPaymentModal}
                          />
                        </div>
                      </>
                    ) : (
                      <div 
                          className={` ${countryCode==='BD'?'':(data?.rawPrice<50?'hidden':'')} ${!affPackageId?"":(
                            affPackageId===data?.subscriptionItemId?'':'hidden'
                          )}
                          ${
                            !showFreeTrail?((data?.subscriptionItemId==='12')?'hidden':''):((data?.subscriptionItemId==='12')?'':'hidden')
                          }
                          col-12 col-sm-12 col-md-6 col-lg-3 cp ${styles.parentDiv}`} 
                          onClick={()=>{
                            setIsMsisdnTakerModalOpened(false);
                            setBlNumberModal({value: '',show:false});
                            setBlOtpModal({value:'',show:false})
                          }}
                          >
                        <SubscribePackage
                          onSelect={()=>setSelectedId(index)}
                          cid={index}
                          selectedId={selectedId}
                          setTrialModal={()=>setTrialModal(true)}
                          key={data.id}
                          data={data}
                          setSubscriptionPackData={selectSubscriptionPack}
                          paymentMethod={paymentMethod}
                          setShowModal={setOpenPaymentModal}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              }
            )}
          </div>

          <CommonModal
            isOpen={openPaymentModal}
            onClose={handlePaymentModalClose}
            // className={(blNumberModal.show || blOtpModal.show )?styles.blPaymentBg:''}
          >
            <div className="tiny_scroll_bar2">
              <div className="bg-[#0E1D3F] inline-block  h-[100%] rounded-[8px] max-h-[96vh] overflow-y-auto">
                {/* <h2>
                    {isMsisdnTakerModalOpened ?
                        "Enter your GP number" :
                        blNumberModal.show ? "Pay with your mobile balance":
                        blOtpModal.show ?"Enter Your OTP":
                        "Select Payment Method"
                    }
                </h2> */}
                {isCityTouch?(
                <div
                className="modal-body  text-center d-flex flex-column"
                style={{ gap: "1rem" }}
              >
                <CityTouchPayment
                  options={[]}
                  callbacks={[
                    // { methodName: "stripe", payment: stripePayment }
                  ]}
                  promoData={promoData}
                  setPromoData={setPromoData}
                  isPromocodeApplied={"reduce_price" in subscriptionPackData}
                  addPromocodeHandler={promocodeHandler}
                  removePromocodeHandler={removeHandler}
                  subscriptionPackId={subscriptionPackData.id}
                  price={
                    "reduce_price" in subscriptionPackData
                      ? subscriptionPackData.rawPrice -
                        subscriptionPackData.reduce_price!
                      : subscriptionPackData?.rawPrice
                  }
                  reducePrice={subscriptionPackData?.reduce_price??0}
                  isMsisdnSubmitted={isMsisdnSubmitted}
                  setIsMsisdnTakerModalOpened={setIsMsisdnTakerModalOpened}
                />
              </div>
              ):
                isMsisdnTakerModalOpened?(
                  
                  <MsisdnTracker
                    value={msisdnRef.current}
                    onChange={(e:any) => {
                      setMsisdn((prev) => e.target.value);
                      msisdnRef.current = e.target.value;
                      setIsNextButtonPressed(false);
                    }}
                    isMsisdnValid={isMsisdnValid}
                    isNextButtonPressed={isNextButtonPressed}
                    BtnBoxClass={' bg-[#18A7EF] '}
                    label={"Enter your GP number"}
                    errorMessage="Enter a valid grameen phone number!"
                    handleNext={() => {
                      setIsNextButtonPressed(true);
                      if (isMsisdnValid) {
                        gpPayment();
                        isMsisdnSubmitted.current = true;
                        // setIsMsisdnTakerModalOpened(false);
                      }
                    }}
                  />
                ):blNumberModal.show?(
                  <MsisdnTracker
                    value={blNumberModal.value}
                    onChange={(e:any) => {
                      setBlNumberModal({value: e.target.value,show:blNumberModal.show});
                      // msisdnRef.current = e.target.value;
                      setIsNextButtonPressed(false);
                    }}
                    isMsisdnValid={isValidBLNumber(blNumberModal.value)}
                    isNextButtonPressed={isNextButtonPressed}
                    errorMessage="Enter a valid Banglalink number!"
                    label={"Enter your Banglalink number"}
                    inputBoxClass={styles.blPaymentInputBg}
                    BtnBoxClass={styles.BtnBoxClass}
                    handleNext={() => {
                      setIsNextButtonPressed(true);
                      if (isValidBLNumber(blNumberModal.value)) {
                        handleBlPayment();
                        // isMsisdnSubmitted.current = true;
                        // setIsMsisdnTakerModalOpened(false);
                      }
                    }}
                  />
                ):blOtpModal.show?(
                <div className="flex flex-col items-center justify-center p-6 bg-gray-900/70 rounded-2xl shadow-lg backdrop-blur-md text-white w-full max-w-md mx-auto">
                    <p className="text-center text-lg font-medium mb-4">
                      An OTP was sent to your number
                    </p>
                    <div className="mx-auto mb-6">
                      <OtpInput
                        value={blOtpModal.value}
                        onChange={(e) => setBlOtpModal({ value: e, show: blOtpModal.show })}
                        numInputs={5}
                        renderSeparator={<span className="me-2"></span>}
                        inputType="tel"
                        inputStyle={styles.otpInputField}
                        shouldAutoFocus={true}
                        renderInput={(props) => <input {...props} />}
                      />
                    </div>
                    <button
                      type="submit"
                      className={`w-full py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition-all duration-200 font-semibold shadow-md ${styles.BtnBoxClass}`}
                      onClick={() => {
                        verifyConsent(
                          normalizeBLNumber(blNumberModal.value) ?? "",
                          blOtpModal.value,
                          navigate,
                          (value) => {
                            setBlLoader(value);
                          }
                        );
                      }}
                    >
                      Submit OTP
                    </button>
                  </div>
                ):
                (
                <div
                  className="modal-body  max-w-[97vw] overflow-x-hidden text-center d-flex flex-column"
                  // style={{ gap: "1rem" }}
                >
                  {/* {console.log(subscriptionPackData,"subscriptionPackData")} */}
                  <PaymentOptions
                    options={paymentMethodData.map((option: any) => ({
                      methodName: option.name,
                      logoUrl: option.thumbnail,
                      apiUrl: option.url,
                      vat: Number(subscriptionPackData.rawPrice) *  Number(option.vat_percentage),
                      extraChargeFor: option.extra_charge_for,
                    }))}
                    callbacks={[
                      { methodName: "bkash", payment: bkashPayment },
                      { methodName: "bkashOnetime", payment: bkashOneTimePayment },
                      { methodName: "nagad", payment: nagadPayment },
                      { methodName: "upay", payment: upayPayment },
                      { methodName: "surjopay", payment: aamarpayPayment },
                      { methodName: "robi", payment: robiPayment },
                      { methodName: "GPDCB", payment: gpPayment },
                      { methodName: "BLDCB", payment: handleBlPayment },
                      {methodName:'stripe',payment:startStripePayment},
                      {methodName:'googlePay',payment:startGooglePayment}
                      // { methodName: "stripe", payment: stripePayment }
                    ]}
                    promoData={promoData}
                    setPromoData={setPromoData}
                    isPromocodeApplied={"reduce_price" in subscriptionPackData}
                    addPromocodeHandler={promocodeHandler}
                    removePromocodeHandler={removeHandler}
                    price={
                      "reduce_price" in subscriptionPackData
                        ? subscriptionPackData.rawPrice -
                          subscriptionPackData.reduce_price!
                        : subscriptionPackData?.rawPrice
                    }
                    globalPrice={subscriptionPackData?.globalPrice}
                    isFreeTrial={subscriptionPackData?.is_free_trail}
                    reducePrice={subscriptionPackData?.reduce_price??0}
                    isMsisdnSubmitted={isMsisdnSubmitted}
                    setIsMsisdnTakerModalOpened={setIsMsisdnTakerModalOpened}
                    promoType={promoCode?.promo_type}
                    allowedPaymentMethods={promoCode?.allowedPaymentMethods}
                  />
                </div>
                )}
              </div>
            </div>
          </CommonModal>
          <CommonModal
            isOpen={showTrailModal}
            onClose={()=>{setTrialModal(false);handlePaymentModalClose();}}
          >
            <FreeTrialMessage data={subscriptionPackData} 
              // handleClose={()=>{setTrialModal(false)}} 
              onSubmit={()=>setTrialModal(false)} 
              handleClose={()=>{setTrialModal(false);handlePaymentModalClose();}}
            />
          </CommonModal>

          {/* <div className="text-center mt-3">
            <span className="bg-white px-3 py-2 rounded-2">
              মোস্ট পপুলার ক্যাটেগরিজ
            </span>
          </div> */}

          {/* {categoryListData && categoryListData.length ? (
            <ul className={`list-unstyled ${styles.categoriesList}`}>
              {categoryListData?.map((categorylist: any, index: any) => (
                <li key={categorylist?.id}>
                  <Link
                    href={`categoryItem_list/${categorylist?.id}/${categorylist?.name}`}
                  >
                    {categorylist.thumb_path ? (
                      <Image
                        // loader={imageLoader}
                        src={categorylist.thumb_path}
                        height={100}
                        width={100}
                        alt="audiobook-img"
                        className={`img-fluid round-16`}
                        quality={80}
                      />
                    ) : (
                      <Image
                        // loader={imageLoader}
                        src="/demo_book.jpg"
                        height={100}
                        width={100}
                        alt="audiobook-img"
                        className={`img-fluid round-16`}
                        quality={80}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )} */}
        </div>
        
      </div>
      <div
      className={`
        ${container("1306px")}
        max-w-[98%] mx-auto mt-8 mb-10
        border border-[#5b0d3c]
        rounded-[10px]
        overflow-hidden
        text-white
      `}
    >
      {/* Header */}
      <div
        className="
          flex justify-between items-center
          px-5 py-4
          cursor-pointer
          text-[16px]
        "
        onClick={() => setIsTermsOpen(!isTermsOpen)}
      >
        <span>নিয়ম ও শর্তাবলি</span>

        <span
          className={`
            transition-transform max-w-[12px] rotate-[-90deg] duration-300
            ${isTermsOpen ? "rotate-180" : ""}
          `}
        >
          <LeftAngle  />
        </span>
      </div>

      {/* Content */}
      {isTermsOpen && (
        <div className="md:px-5 pb-5 text-[14px] leading-[1.6] text-gray-300">
          <TermsAndConditions />
        </div>
      )}
      
    </div>
     {/* <div
      className={`
        ${container("1306px")}
        max-w-[98%] mx-auto mt-8 mb-10
        border border-[#5b0d3c]
        rounded-[10px]
        overflow-hidden
        text-white
      `}
    >
      <div
        className="
          flex justify-between items-center
          px-5 py-4
          cursor-pointer
          text-[16px]
        "
        onClick={()=>router?.push(paths.faq)}
        // onClick={() => setIsTermsOpen(!isTermsOpen)}
      >
        <span>সাধারণ প্রশ্নোত্তর</span>

        <span
          className={`
            transition-transform max-w-[12px]  duration-300
            ${isTermsOpen ? "rotate-180" : ""}
          `}
        >
          <span ><RightArrow  color="white"/></span>
        </span>
      </div>
    </div> */}
    </>
    )}</>
  );
};

export default dynamic(() => Promise.resolve(SubscribeComponent), {
  ssr: false,
});
