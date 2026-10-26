"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useAppSelector } from '@/store/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { container } from '@/components/ui/static/tailwind.classes';
import Link from 'next/link';
import Image from 'next/image';
// import {container} from '@/components/ui/static/tailwind.classes'


import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { get_Quizes ,getWinners,join_quizes,prevMatches, subs_page_trackerApi} from '@/utils/apiServices';
import  QuizCard, { PrevQuizCard }  from '@/components/QuizCard/QuizCard';
import { MoveUpRight } from 'lucide-react';
import CommonModal from '@/components/ui/CommonModal/CommonModal.view';
import { WinnerModal } from '@/components/QuizCard/WinnerCard';
import QuizParticipationFee from '@/components/QuizCard/QuizPayment';
import MatchQuizCard from '@/components/QuizCard/QuizInitScreen';
import QuizScreen from '@/components/QuizCard/Quiz';
import QuizResultScreen from '@/components/QuizCard/QuizResult';
import { paths } from '@/utils/Paths';
import QuizTimeExpired from '@/components/QuizCard/QuizTimeEnd';
import { groupMatchesByDay, isTimePassed } from '@/helpers/commonFunction';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ReduxShowLoginModal } from '@/store/slicers/LoginSlice';
import FAQSection from '@/components/QuizCard/QuizFaq';

const Page = () => {
    const prevRef = useRef(null);
    const user=useAppSelector((store)=>store?.user?.userData)
    const nextRef = useRef(null);
    const router= useRouter();
    const [quizes, setQuizes] = useState<any[]>([]);
    const [prevMatchesData,setPrevMatchesData]=useState<any[]>([]);
    const [showWinners,setShowWinners]=useState<any>(false);
    const [winnerData,setWinnerData]=useState([]);
    const dispatch=useDispatch();
    const [selectedMatch,setSelectedMatch]=useState<any>({});
    const [selectedQuizData,setSelectedQuizData]=useState([]);
    const [showPaymentModal,setShowPaymentModal]=useState<boolean>();
    const [showQuizData,setShowQuizData]=useState<any>(null)
    const [QuizInitScreen,setQuizInitScreen]=useState<any>(0);
    const [resultData,setResultData]=useState<any|null>(null);
    const searchParams = useSearchParams();
    const utmSource = searchParams.get("utm_source");
    const track_id=searchParams.get('track');

    const getQuizesData = async () => {
        const res = await get_Quizes(user?.id||0);
        setQuizes(res.data);
    }

    const getPrevWinnersQuizesData = async () => {
        const res = await getWinners();
        setWinnerData(res.winners);
    }
    useEffect(() => {
        getQuizesData();
        getPrevWinnersQuizesData();
    }, [user?.id]);

    const handleShowWinners=(winners:any)=>{
      setShowWinners(winners);
    }

    const joinQuiz=async(match:any)=>{
      let payload = {
        "user_id": user?.id,
        "match_id": match?.id ,
        "timezone": "Asia/Dhaka"
      }

      setSelectedMatch(match);

      let result = await join_quizes(payload);
      if(result?.questions){
        setQuizInitScreen(1)
        console.log(result,"rrrrrrres")
        setShowQuizData(result);
        // setResultData
      }else if(result?.message){
        toast.info(result?.message)
      }
      else{
        if(user?.id){
          setShowPaymentModal(true)
        }else{
          dispatch(ReduxShowLoginModal(true))
        }
      }
      console.log(result,"resulttttt");
    }

    // Save on page load
    useEffect(() => {
      if (track_id) {
        localStorage.setItem("track_id", track_id);
      }
    }, [track_id]);

    const resolvedTrackId = track_id || localStorage.getItem("track_id");

    useEffect(() => {
      
      if (user?.id && user?.id !== 2820 && resolvedTrackId) {
        subs_page_trackerApi({
          user_id: user?.id,
          email: user?.user_email,
          phone: user?.phone_no,
          action_type: "visit_quiz_page",
          selected_pack_id: null,
          selected_pay_method: null,
          track_id: resolvedTrackId,
        });

        // Clean up after firing so it doesn't persist across future visits
        localStorage.removeItem("track_id");
      }
    }, [user]);


    const handleOnSubmit=(result:any)=>{
      setResultData(result)
      setQuizInitScreen(-1);
    }

    const getQuizStatus=(match:any)=>{
      if( isTimePassed(match.match_starts))return "Quiz Ended";
      if(match?.played===true)return "Submitted"
      else return "Join Quiz Now"
    }
  return (
    <div className={container('1306px')}>
        <div className={` pb-0 mt-5 md:mt-10 md:pb-7 mx-auto  overflow-hidden text-white   `}>
            <Swiper
                // slidesPerView={1}
                // spaceBetween={1}
                loop={true}
                pagination={{ clickable: true }}
                style={{ paddingBottom: '40px' }}
                // modules={[Navigation, Pagination]}
                // centeredSlides={true}
                modules={[Navigation, Autoplay,Pagination]}
                navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
                }}
                autoplay={{
                delay: 7000, // 3 seconds
                disableOnInteraction: false, // keeps autoplay even after user interaction
                }}
                breakpoints={{
                0: {
                slidesPerView: 1,
                },
                768: {
                slidesPerView: 1,
                },
                1024: {
                slidesPerView: 1,
                },
                }}
                onBeforeInit={(swiper:any) => {
                if (
                    swiper.params.navigation &&
                    typeof swiper.params.navigation !== "boolean"
                ) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }
                }}
            >
                <>
                    {quizes?.map((item,index:number)=>(
                        <SwiperSlide
                            key={index}
                            onClick={() => {
                                
                            }}
                            // className={styles.swiper_slider_custom}
                            >
                            {/* <Link href={`/${item?.id}`}> */}
                                <div onClick={()=>{
                                    let result  = getQuizStatus(item)
                                    if(result==="Join Quiz Now"){
                                      joinQuiz(item)
                                    }else if(result==='Submitted'){
                                      toast.info("Quiz allready submitted")
                                    }else{
                                      toast.error("Quiz Joining Time Ended")
                                    }
                                  }} className='w-full  '>
                                    <figure className='max-w-[100%] text-left max-xs:overflow-x-hidden  max-h-[100%]'>
                                        <img
                                        loading="lazy"
                                        className=" max-h-[400px] object-cover object-right max-sm:min-w-[103%] max-sm:h-[110%] max-w-[100%] max-sm:min-h-[103%] xs:max-h-[100%]"
                                        src={item.banner}
                                        alt=""
                                        width={1210}
                                        height={455}
                                        sizes="(max-width: 768px) 100vw, min(1210px, 90vw)"
                                        />
                                    </figure>
                                </div>
                            {/* </Link> */}
                            </SwiperSlide>
                        ))}
                </>
            </Swiper>
        </div>
        {groupMatchesByDay(quizes)?.todayMatches?.length === 0 ? (
          ''
        ) : (
          <div className="mx-auto max-w-7xl">
            
              <>
                <h1 className="mb-6 text-2xl font-extrabold text-white sm:text-3xl">
                আজকের ওয়ার্ল্ড কাপ ২০২৬ ম্যাচ কুইজ
                </h1>        
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {groupMatchesByDay(quizes)?.todayMatches?.map((match:any) => (
                    // <span key={match.id} className='' >
                      <QuizCard key={match.id} handleClick={()=>joinQuiz(match)}  match={match} />
                    // </span>
                  ))}
                </div>
              </>
          </div>
        )}
        {groupMatchesByDay(quizes)?.tomorrowMatches?.length === 0 ? (
          ''
        ) : (
        <div className="mx-auto max-w-7xl mt-5 sm:mt-10">
          <h1 className="mb-6 text-2xl font-extrabold text-white sm:text-3xl">
          আগামীকালের ওয়ার্ল্ড কাপ ২০২৬ ম্যাচ কুইজ
          </h1>
  
          
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {groupMatchesByDay(quizes)?.tomorrowMatches?.map((match:any) => (
                // <span key={match.id} className='' >
                  <QuizCard key={match.id} handleClick={()=>joinQuiz(match)}  match={match} />
                // </span>
              ))}
            </div>
        </div>
        )}
      
      <div className="mx-auto max-w-7xl mt-12">
        <h1 className="mb-6 text-2xl text-center font-extrabold text-white sm:text-3xl">
        {`কুইজে অংশ নিন এবং আকর্ষণীয় পুরস্কার জিতে নিন!`}
        </h1>
 
        <div>
          <img className='w-full' src={'/prizeskk.png'}/>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-12">
        <div className='flex justify-between'>
            <h1 className="mb-6 text-2xl font-extrabold text-white sm:text-3xl">
            ম্যাচভিত্তিক বিজয়ী
            </h1>
            <span onClick={()=>router.push(paths.winners)} className='text-[#FE9900] cursor-pointer flex items-center justify-center'>
              <span className='mr-2'>See All</span> 
              <MoveUpRight className=' w-4' color='#FE9900'/>
            </span>
        </div>
 
        {winnerData?.length === 0 ? (
          <p className="text-white/60">প্রতিটি ম্যাচের বিজয়ীদের তালিকা কুইজ শেষ হওয়ার পরদিন এখানে দেখা যাবে।</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {winnerData?.slice(0,4)?.map((match:any) => (
              <span key={match.id} onClick={()=>setShowWinners(match)}>
                <PrevQuizCard  key={match.id} match={match} />
              </span>
            ))}
          </div>
        )}
      </div>
      <div className='mt-16'>
        <FAQSection/>
      </div>
      {/* <div>
          <img className='w-full mt-12' src={'/bottomImg.png'}/>
        </div> */}

      <CommonModal
        isOpen={showWinners}
        onClose={()=>setShowWinners(false)}
      >
        <WinnerModal winner={showWinners}/>
      </CommonModal>

     
        <div>
          <CommonModal
        isOpen={showWinners}
        onClose={()=>setShowWinners(false)}
      >
        <WinnerModal winner={showWinners}/>
      </CommonModal>
        </div>
      {/* </CommonModal> */}
      <CommonModal
        isOpen={showPaymentModal??false}
        onClose={()=>setShowPaymentModal(false)}
        // container_class='overflow-auto'
      >
        <QuizParticipationFee QuizData={selectedMatch}/>
      </CommonModal>
      <CommonModal
        isOpen={QuizInitScreen>=1 || QuizInitScreen===-1}
        onClose={()=>{setQuizInitScreen(0);getQuizesData()}}
        // container_class='overflow-auto'
      >
        {QuizInitScreen===1 &&<MatchQuizCard data={showQuizData} matchNo={showQuizData?.matchNo} onStart={()=>setQuizInitScreen(2)} />}
        {QuizInitScreen>1 && <QuizScreen onComplete={handleOnSubmit} userId={user?.id??0} data={showQuizData} matchNo={1}/>}
        {QuizInitScreen===-1 && 
          <QuizResultScreen 
            onStartNextQuiz={()=>{setQuizInitScreen(0);getQuizesData()}} 
            onBackToHome={()=>router.push('/')} 
            result={resultData||{result:0,total_question:showQuizData?.questions?.length}} 
            data={showQuizData} 
            matchNo={1}
          />
        }
      </CommonModal>

      {/* <CommonModal
        isOpen={true}
        onClose={()=>setShowPaymentModal(false)}
        // container_class='overflow-auto'
      >
        <QuizTimeExpired />
      </CommonModal> */}
      
        
    </div>
  )
}

export default Page