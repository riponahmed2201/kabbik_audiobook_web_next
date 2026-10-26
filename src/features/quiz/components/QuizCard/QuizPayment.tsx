'use client';
import { checkDateLabel, normalizeMsisdn } from '@/helpers/commonFunction';
import { useAppSelector } from '@/store/store';
import { payWithBkashOneTime, payWithBkashRecurring, payWithGP, payWithRobi, subs_page_trackerApi } from '@/utils/apiServices';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CommonModal from '@/shared/ui/CommonModal/CommonModal.view';
import GPNumberModal from '@/features/catalog/components/CategoryWiseBooks/GpModal';
import { toast } from 'react-toastify';


export default function QuizParticipationFee({QuizData}:{QuizData:any}) {
  const [accepted, setAccepted] = useState(true);
  const user = useAppSelector(store=>store?.user?.userData)
  const [selected, setSelected] = useState(null);
  const router= useRouter();
  const [showGpModal,setShowGpModal]=useState(false);
  const [value,setValue]=useState('');
  const [selectedPayment,setSelectedPayment]=useState('')


  const handleTracker=(method:string) => {
    const resolvedTrackId =  localStorage.getItem("track_id");
  
    if (user?.id && user?.id !== 2820 && resolvedTrackId) {
      subs_page_trackerApi({
        user_id: user?.id,
        email: user?.user_email,
        phone: user?.phone_no,
        action_type: "visit_quiz_page",
        selected_pack_id: null,
        selected_pay_method: method,
        track_id: resolvedTrackId,
      });
      // Clean up after firing so it doesn't persist across future visits
      localStorage.removeItem("track_id");
    }
  }

  const handleSubmit=async()=>{
    if(!accepted ){
      toast.error("Please accept terms and condition");
      return;
    }
    console.log(user);
    handleTracker("gp")
    let matchStartDate = QuizData?.match_starts;
    let isToday = checkDateLabel(matchStartDate)==='today';
      let payload = {
        "amount": "5",
        "currency": "BDT",
        "userId": user?.id?.toString(),
        "packageId": "4",
        "renewal": user?.is_subscribed?0: 1,
        "promoCode": isToday?"QUIZ26WORLDCUP":"QUIZ26WORLDCUPNEXT",
        "msisdn": normalizeMsisdn(value) as string,
        "firstPayment": 5,
        type:"quiz",
        "purpose": "subscription",
        "trafficSource": "Kabbik",
        "platform": "Web"
    }

    let result = await payWithGP(payload)
    if (result?.resultCode === "SUCCESS") {
      router.push(result.url);
    } else {
      toast.error("Payment failed, please try again");
    }

    
  }

  const bkashPaymentHandle=async()=>{
    if(!accepted){
      toast.error("Please accept terms and condition");
      return;
    }
    console.log(QuizData,"QuizData");
    handleTracker('bkash')
    let matchStartDate = QuizData?.match_starts;
    let isToday = checkDateLabel(matchStartDate)==='today';
    if(!user?.is_subscribed){
      let eDate = new Date().setDate(new Date().getDate() + 730);
      let payload= {
        AMOUNT: "50",
        FIRSTPAYMENTAMOUNT: "5",
        promo_code: isToday?"QUIZ26WORLDCUP":"QUIZ26WORLDCUPNEXT",
        CURRENCY: "BDT",
        STARTDATE: new Date().toISOString().slice(0, 10),
        EXPIRYDATE: new Date(eDate).toISOString().slice(0, 10),
        USERID: (user?.id)?.toString() ||'0',
        subscripRequestFrom: "web",
        PACKAGEID: '1',
      }

      let result = await payWithBkashRecurring(payload);
      router.push(result?.data.redirectURL);
    }else{
      let payload= {
          "amount": "5",
          "packageId": "1",
          "methodName": "bkash",
          "source": "web",
          "userId": user?.id?.toString(),
          "promo_code": isToday?"QUIZ26WORLDCUP":"QUIZ26WORLDCUPNEXT"
      }
      let result = await payWithBkashOneTime(payload);
      router.push(result?.data.bkashURL);

    }

  }

  const robiPayment=async()=>{
    if(!accepted){
      toast.error("Please accept terms and condition");
      return;
    }
    handleTracker("robi")
    let matchStartDate = QuizData?.match_starts;
    let isToday = checkDateLabel(matchStartDate)==='today';
    let payload:any = {
      "amount": "5",
      "userId": user?.id?.toString()||"0",
      "packageId": "1",
      // "from_channel": "web",
      "from_source": 'web',
      "from_autorenewal": user?.is_subscribed?0: 1,
      "promo_code": isToday?"QUIZ26WORLDCUP":"QUIZ26WORLDCUPNEXT"
    }
    if(user?.is_subscribed){
        payload = {
          "userId": user?.id,
          // "name": "md faishal",
          // "phone": "8801853837981",
          "address": "9 Bir Uttam AK Khandakar Rd, Dhaka",
          "amount": 5,
          "type": "quiz",
          "promo_code": isToday?"QUIZ26WORLDCUP":"QUIZ26WORLDCUPNEXT",
          "productId": 1,
          "source": "Kabbik",
          "platform": "web"
      }
    }
    let result = await payWithRobi(payload )
  
    if(user?.is_subscribed){
      router?.push(result.data.callBackUrl)
    }else{
      router.push(result.data.redirectUrl);
    }
  }

  const payments = [
    { id: "bkash", label: "bKash", src: "/bkash.png", action: () => bkashPaymentHandle() },
    { id: "robi",  label: "Robi | Airtel", src: "/robi.png",  action: () => robiPayment() },
    { id: "gp",    label: "Grameenphone", src: "/gp.png",   action: () => setShowGpModal(true) },
  ] as const;

  return (
    <div className="max-h-[99vh] no-scrollbar overflow-auto">
      <div
        className="relative  w-full max-w-[415px] rounded-[8px] overflow-hidden text-white select-none"
        style={{ background: 'url(/paymentB.png)',backgroundPosition:'top center',backgroundSize:'100%' }}
      >
        {/* ── Close ─────────────────────────────────────────── */}
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-[8px] flex items-center justify-center text-white text-sm font-bold transition-colors hover:bg-white/20"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          ✕
        </button> */}

        {/* ── Header ────────────────────────────────────────── */}
        <div className="text-center  pt-6 pb-0 px-6 relative z-10">
          <h1
            className="font-black leading-tight"
            style={{
              fontSize: '26px',
              letterSpacing: '0.01em',
              background: 'linear-gradient(180deg, #ffffff 0%, #d0d0d0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Quiz Participation Fee
          </h1>
          <p className="text-[12.5px] text-gray-300 mt-1.5 leading-snug">
            Pay just <span className="font-bold" style={{ color: '#f5c518' }}>৳5</span> {`to join today's all-match quiz!`}
          </p>
          <p className="text-[12.5px] text-gray-300 leading-snug">
            Enjoy audiobook access with monthly auto-renewal at ৳50.
          </p>
        </div>

        {/* ── Stadium + Glow Circle ─────────────────────────── */}
        <div className="relative h-[208px] flex items-center justify-center overflow-hidden">
          <img className='max-w-[120px]' src='/entryfee.png' />

          {/* Neon glow circle */}
          
        </div>

        {/* ── Secure Payment ────────────────────────────────── */}
        <div className="flex items-center justify-center gap-1.5 -mt-1 mb-3">
          {/* Shield + check */}
          <svg viewBox="0 0 22 24" className="w-5 h-5">
            <path d="M11 1 L2 5v7c0 6 4 11 9 13 5-2 9-7 9-13V5L11 1z" fill="#22c55e" />
            <polyline points="7,12 10,15 15,9" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[13.5px] font-semibold text-green-400">Select Payment Option</span>
        </div>

        {/* ── Payment Cards ─────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-2 sm:px-3 mb-3">
          {payments.map(({ id, label, src, action }) => {
            const selected = selectedPayment === id;
            return (
              <button
                key={id}
                onClick={() => { setSelectedPayment(id); action(); }}
                className="relative flex flex-col items-center justify-center gap-2 py-1 rounded-[8px] transition-all duration-200 active:scale-95"
                style={{
                  minHeight: "38px",
                  background: "rgba(255,255,255,0.03)",
                  // border: `1.5px solid ${selected ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.4)"}`,
                }}
              >
                {/* Radio */}
                <div
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    border: `1.5px solid ${selected ? "#ffffff" : "rgba(255,255,255,0.3)"}`,
                  }}
                >
                  {selected && (
                    <div className="w-2 h-2 max-sm:mr-1 rounded-full bg-white" />
                  )}
                </div>

                {/* Logo */}
                <img src={src} className="h-14 ml-4 object-contain max-w-[70%]" />

                {/* Label */}
                {/* <span
                  className="text-[11px] font-medium tracking-wide"
                  style={{ color: selected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)" }}
                >
                  {label}
                </span> */}
              </button>
            );
          })}
        </div>

        {/* ── T&C ───────────────────────────────────────────── */}
        <div className="flex items-start gap-2.5 px-3 mb-3">
          <button
            onClick={() => setAccepted(v => !v)}
            className="mt-0.5 flex-shrink-0 w-[18px] h-[18px] rounded flex items-center justify-center transition-colors"
            style={{
              background: accepted ? 'white' : 'transparent',
              border: `2px solid ${accepted ? 'white' : '#888'}`,
            }}
          >
            {accepted && (
              <svg viewBox="0 0 10 8" className="w-2.5 h-2">
                <polyline
                  points="1,4 3.5,6.5 9,1"
                  fill="none"
                  stroke="#06060f"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <p className="text-[11.5px] inline-block mt-1 text-gray-300 leading-snug">
            I have read, understood, and accept the Quiz Terms &amp; Conditions.
          </p>
        </div>

        {/* ── Rewards ───────────────────────────────────────── */}
        <div className="px-3 pb-1">
          {/* Section title */}
          <div className="flex items-center gap-2 mb-2.5">
            <div
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to right, transparent, #e01880)' }}
            />
            <div className="flex items-center gap-1">
              <svg viewBox="0 0 8 12" className="w-2 h-3" fill="#f5c518">
                <polygon points="8,6 0,0 2,6 0,12" />
              </svg>
              <span
                className="font-black tracking-wider whitespace-nowrap"
                style={{ fontSize: '11px', color: '#f5c518' }}
              >
                WINNING REWARDS PREVIEW
              </span>
              <svg viewBox="0 0 8 12" className="w-2 h-3" fill="#f5c518">
                <polygon points="0,6 8,0 6,6 8,12" />
              </svg>
            </div>
            <div
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(to left, transparent, #e01880)' }}
            />
          </div>

          {/* 4 reward cards */}
          <div className="grid grid-cols-[1fr_1fr_1fr_1.2fr] gap-1.5">

            <div>
                <img src='/ganCharger.png'/>
            </div>
            <div>
                <img src='/MobileRecharge.png'/>
            </div>
            <div>
                <img src='/eyeMessager.png'/>
            </div>
            <div>
                <img src='/iphone.png'/>
            </div>
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-4 py-2.5 mt-2"
          style={{ borderTop: '1px solid #18182a' }}
        >
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 20 22" className="w-4 h-4">
              <path d="M10 1 L2 5v6c0 5.5 3.5 10.5 8 12 4.5-1.5 8-6.5 8-12V5L10 1z" fill="#64748b" />
            </svg>
            <span className="text-[11px] text-gray-400">Play. Answer. Win Rig.</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-px h-3 bg-gray-600" />
            <span className="text-[11px] text-gray-400 ml-1">Good luck, champion! ⚽</span>
          </div>
        </div>
      </div>
      <CommonModal
        isOpen={showGpModal??false}
        onClose={()=>setShowGpModal(false)}
        // container_class='overflow-auto'
      >
        <GPNumberModal value={value} setValue={setValue} handleSubmit={handleSubmit}/>
      </CommonModal>
    </div>
  );
}