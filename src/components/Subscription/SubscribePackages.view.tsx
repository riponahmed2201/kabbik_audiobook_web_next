"use client";

import Image from "next/image";
import newStyles from './static/SubscriptionPackage.module.css'
// import { imageLoader } from "../../utils/globalfunction";
import styles from "./static/subscribe.module.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import DynamicSubscriptionPack from "./static/subscription.type";
import { BadgeCheck, Zap } from "lucide-react";
import { convertToBanglaDigits, decodeWord, getCountryCode, normalizeBillingPeriod } from "@/helpers/commonFunction";
import Tik from "@/svgs/Tik.svg";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ReduxShowLoginModal } from "@/store/slicers/LoginSlice";
import { usePathname } from "next/navigation";
import { paths } from "@/utils/Paths";
import SubscribeCrown from "@/svgs/SubscribeCrown";
// import { LuBadgeCheck } from "react-icons/lu";

interface SubscribePackageProps {
  data: DynamicSubscriptionPack;
  selectedId?:number|null;
  cid?:number;
  onSelect?:()=>void;
  setTrialModal:()=>void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSubscriptionPackData: React.Dispatch<
    React.SetStateAction<
      DynamicSubscriptionPack 
    >
  >;
  paymentMethod: (packId: any, renewal: any) => Promise<void>;
}

const SubscribePackage = ({
  data,
  setTrialModal,
  selectedId,
  cid,
  onSelect,
  setSubscriptionPackData,
  paymentMethod,
  setShowModal
}: SubscribePackageProps) => {
  const user=useAppSelector((store)=>store?.user?.userData)
  const dispatch=useAppDispatch();
  const pathnameWithLang = usePathname();
  // const loginModal=useAppSelector((store)=>store?.loginSlice?.value)
  const pathname = pathnameWithLang.replace(/^\/(en|bl)/, "");
  const [countryCode,setCountryCode]=useState("BD");

  const handleDataLayer = () => {
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];

    (window as any).dataLayer.push({
      event: "select_item",
      currency: "BDT",
      value: data?.rawPrice,
      items: [
        {
          item_id: data?.subscriptionItemId,
          item_name: normalizeBillingPeriod(data?.name)?.name,
          item_category: "subscription",
          item_variant: `${data?.days}_days`,
          price: data?.rawPrice,
        }
      ]
    });
  }
};


  const handleClick = async () => {
    onSelect && onSelect();
    // const Modal = require("bootstrap/js/dist/modal");
    handleDataLayer();
    if (document) {
      if ((!user?.id && user?.id!==2820)  && pathname!==paths.subscribe_cpa) {
        toast.error("Please login first");
        dispatch(ReduxShowLoginModal(true));
        return;
        // const loginModal = new Modal(document?.getElementById("loginModal")!, {
        //   keyboard: true,
        // });
        // loginModal.show();
      } else {
        setShowModal(true);
        setSubscriptionPackData({...data});
        if(data?.is_free_trail){
          setTrialModal();
        }
        await paymentMethod(
          Number(data.subscriptionItemId),
          data.isOnetime ? 0 : 1
        );
        // const paymentModal = new Modal(
        //   document?.getElementById("paymentBackdrop")!,
        //   {
        //     keyboard: true,
        //   }
        // );
        // paymentModal.show();
      }
    }
  };

  const findCountryCode=async()=>{
    let Country =await getCountryCode()
    setCountryCode(Country);
  }

  useEffect(()=>{
    //console.log(data,"datasss");
    findCountryCode()
    
  },[])

  return (
    <div
      // key={index}
      className={`  packtrack ${newStyles.card} ${selectedId==cid ? newStyles.cardSelected : ''} ${newStyles.cardHover } my-1`}
      onClick={handleClick}
      // onMouseEnter={() => setHoveredCard(index)}
      // onMouseLeave={() => setHoveredCard(null)}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          className={`  ${newStyles.radioButton} ${selectedId==cid  ? newStyles.radioButtonSelected : ''}`}
        >
          {selectedId==cid  && <div className={newStyles.radioInner} />}
        </div>
       
        <div className={newStyles.cardContent}>
          <div className={newStyles.flex_cont}>
            <div className={newStyles.packageName}>{normalizeBillingPeriod(data?.name)?.name}</div>
            <div className={newStyles.packageType}>{data?.isOnetime === 0 && (
                  <small>(অটো রিনিউয়াল)</small>
                )}
            </div>
          </div>
          <div className='d-flex'>
            <span className={newStyles.price}>{countryCode==='BD'?data?.amount?.split(' ')?.[1]+"টাকা":data?.globalPrice} </span>
            {countryCode==='BD'?<div className={newStyles.old_price}>
              <span className={newStyles.old_price_text}>{data?.base_amount_bn?.split(' ')[1]}</span>
              <div className={newStyles.diagonal_line}></div>
            </div>:''}
            {/* <span className={newStyles.oldPrice}>{data?.base_amount_bn}</span> */}
          </div>
        </div>
      </div>
     
      {data?.banner_name?(
        <div className={newStyles.badge}>{decodeWord(data?.banner_name??'')}</div>
      ):''}
    </div>
  );
};

export default SubscribePackage;

//  <div
//       className="my-2 z-[3] relative"
//       onClick={handleClick}
//     >
//        <div className={`p-1 md:p-3  ${styles.cardBg}`}>
//       {data?.banner_name ?(
//         <p className={styles.corner_highlight}>
//         {decodeURIComponent(data?.banner_name ?? '')}
//       </p>
//       ):''}
     
//       <div className=" px-3 rounded-3xl">
//         <div className="flex items-center gap-4 mb-0">
//           <div className=" max-xs:hidden  w-11 ">
//             <SubscribeCrown/>
//           </div>
          
//           <div>
//             <h2 className="text-white text-cs2 md:text-cn2 font-semibold">{data?.bn_name}</h2>
//             <p className="text-[#8492AB] text-sm">{convertToBanglaDigits(data?.days)} দিন </p>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-4">
//           <div className="text-white text-cn2 md:text-cxl font-bold">
//             {convertToBanglaDigits(data?.amount)}
//           </div>
          
         
//           <div className={styles.old_price}>
//             <span className={styles.old_price_text}>{data?.base_amount_bn?.split(' ')[1]}</span>
//             <div className={styles.diagonal_line}></div>
//           </div>
//         </div>
//       </div>
//       <div className={"relative w-full max-w-sm "}>
//         <div className={"rounded-[8px] md:rounded-3xl  overflow-hidden p-1 md:px-3 "+styles.mid_box_gradient}>
          
//           <p className="text-gray-300 h-[20px] text-cs md:text-lg ">
//               {data?.isOnetime === 0 && (
//                 <small className="inline-block">(অটো রিনিউয়াল)</small>
//               )}
//             </p>
//           <p className="text-cs line-clamp-1 mt-2 md:text-cs2" style={{color:'white',height:'18px' , marginBottom:'8px'}}>{data.is_free_trail?data?.subtitle:' '}</p>
//           {/* Features List */}
//           <div className="space-y-1 md:space-y-1.5 mb-2">
//             {/* Feature 1 */}
//             {data?.benefit?.map((item,i)=>(
//               <div key={i} className="flex items-center gap-1 md:gap-1.5">
//                 <div className="flex-shrink-0 mt-0">
//                   <span className="w-4 h-4 inline-block"> 
//                     <Tik/>
//                   </span>
//                 </div>
//                 <div>
//                   <h3 className="text-white font-medium text-cxs md:text-cs  line-clamp-1">{item?.title}</h3>
//                   {item?.sub_title?<p className="text-gray-400 text-cxs md:text-cs mt-1 line-clamp-1">{item?.sub_title}</p>:''}
//                 </div>
//             </div>
//             ))}
            
            
//           </div>
//           <button className="w-full bg-[#FF8798] gradient_subscribe text-white font-semibold text-cs md:text-cn  py-1 md:py-2.5 px-8 rounded-[6px] shadow-lg transform hover:scale-105 transition-all duration-200">
//             সাবস্ক্রাইব
//           </button>
//         </div>
//       </div>
      
      
//       </div>
//     </div>