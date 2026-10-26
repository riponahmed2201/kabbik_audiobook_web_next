"use client";
import { ReduxShowLoginModal } from "@/features/auth/store/LoginSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { subs_page_trackerApi } from "@/utils/apiServices";
import { paths } from "@/utils/Paths";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import ModalExamplePage from "../ReactBootstrapCustomModal/ReactBootstrapCustomModal";
// import PaymentStatusLogin from "../../../components/auth/PaymentStatusLogin";
// import { toLocalMsisdn } from "@/helper/commonFunction";

interface PageProps {
//   referenceId: string;
//   statusId: string;
//   status:string;
//   message: string;
}

export default function PaymentStatusComponent({
//   referenceId,
//   statusId,
//   status,
//   message,
}: PageProps) {
  const user=useAppSelector(store=>store?.user?.userData);
  const searchParams = useSearchParams();
  const [showLoginModal,setShowLoginModal]=useState(false);
  const phone = searchParams.get('phone'); 
  const statusId=searchParams.get('status');
  const referenceId = searchParams.get('referenceId');
  const message = searchParams.get('message');
  const paymentType=searchParams.get('paymentType');
  const dispatch=useAppDispatch();


  useEffect(()=>{
    // alert(status)
    let token = Cookies.get("token")
    if(!token || token==='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjgyMCIsInJvbGUiOjEsImlhdCI6MTY2NTc0NjIyNX0.dSY47sipaGTI_OtsysFWw_kaKZKWHWRtp4vklstVgVc' ){
      if(phone || Cookies.get('msisdn')){
        // alert(phone??'' + Cookies.get('msisdn'))
        setTimeout(()=>{dispatch(ReduxShowLoginModal(phone || Cookies.get('msisdn')));},1500)
      }else{
        window.location.href =(`http://api.kabbik.com/v3/bkash/bkash-redirect?reference=${referenceId}`)
      }
      // alert("kdjf")
    }
  },[])

  useEffect(() => {
    if(statusId?.toLocaleLowerCase()==='failed'){
      if(user?.id && user?.id!==2820){
        subs_page_trackerApi(
            {user_id:user?.id||0,
            email:user?.user_email||null,
            phone:user?.phone_no||null,
            action_type:'failed_payment',
            selected_pack_id:null,
            selected_pay_method:null,
            track_id:null
          })
        }
      return
    };
    if (user?.id && user.id !== 2820 && typeof window !== "undefined") {

    if (!user.subscriptionDetails) return;

      const payment_amount = Cookies.get("payment_amount");

      const value =
        payment_amount !== undefined && payment_amount !== null
          ? Number(payment_amount)
          : Number(user.subscriptionDetails.rawPrice) || 0;

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "purchase",
        transaction_id: referenceId,
        payment_type: paymentType,
        status: statusId,
        pck_id: user.subscriptionDetails.subscriptionItemId,
        pck_name: user.subscriptionDetails.bn_name,
        value,
        currency: "BDT",
      });
    }
      
    }, [user?.subscriptionDetails]);
  
  return (
    <>
        <div className="w-full max-w-md mx-auto mt-5">
        <div className="mt-5">
            <div className="text-center flex justify-center items-center mx-auto mb-2">
              <p id="value_track" className="font-poppins text-bg">
                value: {Cookies.get('payment_amount')??0}
            </p>
            {statusId?.toUpperCase() === "FAILED" ? (
                <Image
                src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/failed_logo.gif"
                height={200}
                loading="lazy"
                width={200}
                sizes="200px"
                alt=""
                unoptimized
                />
            ) : (
                <Image
                src="https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/sucess.gif"
                height={200}
                loading="lazy"
                width={200}
                sizes="200px"
                alt=""
                unoptimized
                />
            )}
            </div>

            <div>
            <p className="text-center mb-1 font-poppins text-white text-xl">
                {statusId?.toUpperCase() === "FAILED" ? "Failed" : "Success"} Transaction
            </p>
            </div>

            <div className="text-center text-white space-y-1">
            {referenceId && (
                <p className="font-poppins">Reference ID: {referenceId}</p>
            )}

            <p className="font-poppins">
                Status: {statusId?.toUpperCase() === "FAILED" ? "FAILED" : "SUCCESS"}
            </p>

             

            {message && <p className="font-poppins">Message: {message}</p>}
            </div>

            <div className="text-center text-white mt-4">
            {Cookies.get("token") ===
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjgyMCIsInJvbGUiOjEsImlhdCI6MTY2NTc0NjIyNX0.dSY47sipaGTI_OtsysFWw_kaKZKWHWRtp4vklstVgVc" ? (
                ""
            ) : (
              <div>
                {/* <Link href="/">
                <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md inline-flex items-center gap-2 transition"
                >
                    <i className="bi bi-house-fill text-white"></i>
                    Go Home
                </button>
                </Link> */}
                <Link href={'/'}>
                <button
                    type="button"
                    className="bg-blue-600 mx-3 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md inline-flex items-center gap-2 transition"
                >
                    <i className="bi bi-house-fill text-white"></i>
                    Back to Home
                </button>
                </Link>
              </div>
            )}
            </div>
        </div>
        </div>
      {/* {showLoginModal?
      <ModalExamplePage onHide={()=>setShowLoginModal(false)} show={showLoginModal}>
        <PaymentStatusLogin onClose={()=>setShowLoginModal(false)} phoneNo={toLocalMsisdn(phone || Cookies.get('msisdn') )||''}/>
      </ModalExamplePage>:''} */}
    </>
  );
}
