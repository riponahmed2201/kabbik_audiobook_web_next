"use client";

import styles from "@/components/audiobook//static/audioBook.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  addFavorite,
  audioBookDetailsClient,
  deleteFavoritesApi,
  getCurrentEpisodePath,
  getDynamicPaymentMethods,
  getSessionInit,
  paymentForPurchaseAudiobook,
  postAudiobookPlayCountApi,
  postEpisodePlayCountApi,
  promocodeHandlerForBook,
  userProfile,
} from "@/utils/apiServices";


import React, { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { PageProps, TAudioBookDetails, UserProfileInfo } from "@/components/audiobook/static/audiobook.type";
import {   Calendar, ExpandIcon,  X } from "lucide-react";
import {  convertToBanglaDigits,  scrollToTop } from "@/helpers/commonFunction";
import { container } from "../ui/static/tailwind.classes";
import Spinner from "../ui/Spinner.view";
import { paths } from "@/utils/Paths";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ReduxShowLoginModal } from "@/store/slicers/LoginSlice";
import { siteConfig } from "@/config/config";
import CityTouchPayment from "../CityTouchPayment/CityTouchPayment.view";
import Crown from "@/svgs/Crown.svg";
import { setglobalAudioPlayers } from "@/store/slicers/GlobalAudioPlayerSlice";
import GlobalBigPlayer from "./GlobalBigPlayer";
import { useGlobalState } from "../SessionProvider/SessionProvider";

const AudioSpeed = dynamic(
        () => import(/* webpackChunkName: "AudioSpeed" */'@/components/audiobook/AudioSpeed.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const BigPlayerView = dynamic(
        () => import(/* webpackChunkName: "BigPlayerView" */'@/components/audiobook/BigPlayer.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const GradientAudioPlayer = dynamic(
        () => import(/* webpackChunkName: "GradientAudioPlayer" */'../ui/AudioPlayer.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});


const CommonModal = dynamic(
        () => import(/* webpackChunkName: "CommonModal" */'../ui/CommonModal/CommonModal.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const SleeperTimer = dynamic(
        () => import(/* webpackChunkName: "SleeperTimer" */'@/components/audiobook/SleeperTime.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const PaymentOptions = dynamic(
        () => import(/* webpackChunkName: "PaymentOptions" */'../Subscription/PaymentOptions.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const AudiobookComponent = ({showBigPlayer,setShowBigPlayer}:{showBigPlayer:boolean,setShowBigPlayer:(val:boolean)=>void}) => {
  const audioPlayerInfo=useAppSelector((store)=>store?.audioPlayerSlice)
  const id = audioPlayerInfo?.playerBook;
  const { globalState, setGlobalState } = useGlobalState();

  // const audioBookDetailsData = audioPlayerInfo?.audibookDetailsData;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // const audioRef2 = useRef<HTMLAudioElement | null>(null);
  const [isFavorite,setIsFavorite]=useState(audioPlayerInfo?.audibookDetailsData?.is_favorite??false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const continueEpisodeId = audioPlayerInfo?.playerEpisodeInd;
  // const continueRunningTime = runningTime;
  // const [userData, setUserData] = useState<UserProfileInfo | null>(null);
  const [continueEpisodeData, setContinueEpisodeData] = useState<any[]>([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const router = useRouter();
  // const [showBigPlayer, setShowBigPlayer] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [timerMin, setTimerMin] = useState(0);
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [showSleeperModal, setShowSleeperModal] = useState(false);
  const [showPayModal,setShowPayModal]=useState(false)
  const [showPaymentOptions,setShowPaymentOptions]=useState<boolean>(false);
  const [withoutBGM,setWithoutBGM]=useState(false);
  const user=useAppSelector((store)=>store?.user?.userData)
  const userData=useAppSelector((store)=>store?.user?.userData);
  const isSubscribed = userData?.is_subscribed === 1 ? true : false;

  const [isFavBook, setIsfavBook] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  //player!!!!!!!!
  const [audioPlayer,setAudioPlayer] = useState<string>("");
  const [playing, setPlaying] = useState(false);
  // const progressBarRef: any = useRef(null);
  const [epList, setEpList]: any = useState(audioPlayerInfo?.audibookDetailsData?.episodes);
  const [currentPlay, setCurrentPlay]: any = useState({});
  const [index, setIndex] = useState(-1);
  // const 
  const [isPlaying, setisPlaying] = useState(false);
  const [elapsed, setElapsed]: any = useState();
  const [duration, setDuration]: any = useState(0);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [audioBookCount, setAudioBookCount] = useState(false);
  const [isLogin, setIsLogin]: any = useState();
  const dispatch=useAppDispatch();
  const searchParams = useSearchParams();
  const [isCityTouch,SetIsCityTouch]=useState(false);
  const affId = searchParams.get("affId");
  const affProductId = searchParams.get("productId");
  const affProductType = searchParams.get("productType");
  let [affIdValue,setAffIdValue]=useState<string|null>(null);
  const [reducedPrice,setReducedPrice]=useState(0);

  
  const isNextAllowed =
    index < epList?.length - 1 &&
    (epList?.[index + 1].isfree === 1 ||
      (!audioPlayerInfo?.audibookDetailsData?.isSubRestricted && isSubscribed) || (audioPlayerInfo?.audibookDetailsData?.isSubRestricted && audioPlayerInfo?.audibookDetailsData?.for_rent===0 && isSubscribed) ||
      audioPlayerInfo?.audibookDetailsData?.isPurchased === 1)
      || audioPlayerInfo.bookIds.length;
      
  const isPrevAllowed = index > 0;

  const isAuthenticated = useCallback(async () => {
    setIsLogin(Cookies.get("isLogin"));
  }, []);

  useEffect(()=>{
    let sourceFromParams=Cookies.get('sourceFromParams')??'';
         let source=Cookies.get('source')??'';
        if(sourceFromParams==='city_touch'){
          SetIsCityTouch(true);
        }if(source?.includes('city')){
          SetIsCityTouch(true);
        }
  },[])

  const closePayModal=()=>{
    setShowPayModal(false);
    if(!audioPlayerInfo?.audibookDetailsData){
      dispatch(
        setglobalAudioPlayers({
          speed:1,
          timer:0,
          bookIds:[],
          playerBook:null,
          playerEpisodeInd:0,
          audibookDetailsData:null,
          withBg:true,
          playAll:false,
        })
      )
    }
  }

  const getBookDetails=async()=>{
    const result:TAudioBookDetails=await audioBookDetailsClient(audioPlayerInfo?.playerBook,user?.id||0)
    const epiSodeId=result?.episodes[audioPlayerInfo?.playerEpisodeInd||0]?.id;
    // let index=result
    // console.log(result?.episodes,"episodesssssss")
    let accessible=hasAccess(0,result?.episodes);
    if(accessible===1 || accessible===true){
      setEpList(result?.episodes);
      console.log(result?.episodes,'barmuda')
      dispatch(setglobalAudioPlayers({...audioPlayerInfo,audibookDetailsData:result||null}))
    }
    setTimeout(()=>{
      console.log(accessible,"accessible23",epiSodeId,result?.episodes)
      if(accessible===1 || accessible===true){
        togglePlayList(audioPlayerInfo?.playerEpisodeInd||0,epiSodeId,accessible,result?.episodes)
      }else{
        dispatch(setglobalAudioPlayers({...audioPlayerInfo,playerBook:audioPlayerInfo?.audibookDetailsData?.id||null}))
        setShowPayModal(true)
      }
    },50);
  }

  useEffect(()=>{
    if(!audioPlayerInfo?.playerBook)return;
    getBookDetails()
  },[audioPlayerInfo?.playerBook])

  
  const audioBookDetails = useCallback(async () => {
    setIsfavBook(audioPlayerInfo?.audibookDetailsData?.is_favorite||false);
    // setEpList(audioPlayerInfo?.audibookDetailsData?.episodes);
  

    if (index == -1) {
      setIndex(0);
      setCurrentPlay(audioPlayerInfo?.audibookDetailsData?.episodes?.[0]);
    }
  }, [index, audioPlayerInfo?.audibookDetailsData?.episodes, audioPlayerInfo?.audibookDetailsData?.is_favorite]);

  useEffect(() => {
    const input: any = document.querySelector("input[type='range']");

    function setBackgroundSize(input: any) {
      input?.style.setProperty(
        "--background-size",
        `${getBackgroundSize(input)}%`
      );
    }
    function getBackgroundSize(input: any) {
      const min = +input.min || 0;
      const max = +input.max || 100;
      const value = +input.value;
      const size = ((value - min) / (max - min)) * 100;
      return size;
    }

    setBackgroundSize(input);
    input?.addEventListener("input", () => setBackgroundSize(input));
    return () => {
      input?.removeEventListener("input", () => setBackgroundSize(input));
    };
  }, []);


  useEffect(() => {
    audioBookDetails();
    isAuthenticated();
  }, [audioBookDetails, isAuthenticated]);

  useEffect(() => {
    if (localStorage.getItem("continueListeningData"))
      setContinueEpisodeData(
        JSON.parse(localStorage.getItem("continueListeningData")!)
      );
  }, []);

  useEffect(() => {
    const divs = document.getElementsByClassName("modal-backdrop fade show");
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].innerHTML === "") {
        divs[i].remove();
      }
    }
  });

  useEffect(() => {
    if (continueEpisodeId) {
      const indexNum = epList?.findIndex(
        (obj: any) => obj.id === continueEpisodeId
      );
      if (isRunning) {
        setIndex(indexNum);
        setAudioPlayer(
          epList?.[
            epList?.map((item: any) => item.id).indexOf(continueEpisodeId)
          ]?.file_path);

        setCurrentPlay(
          epList?.[epList?.map((item: any) => item.id).indexOf(continueEpisodeId)]
        );

        // audioPlayer.current.currentTime = continueRunningTime;
        if(
          hasAccess(continueEpisodeId)
        ){
          setPlaying(true);
          // setisPlaying(true);
          // audioRef.current?.play()
          setShowMiniPlayer(true);
          setIsRunning(false);
        }
        
      }
    }
  }, [continueEpisodeId, isRunning, epList,audioPlayerInfo?.audibookDetailsData,isSubscribed]);

  const hasAccess=(episodeId:number,newEpList?:any)=>{
    let episodes=newEpList||epList

    return (!audioPlayerInfo?.audibookDetailsData?.isSubRestricted && isSubscribed) || 
    (audioPlayerInfo?.audibookDetailsData?.isSubRestricted && audioPlayerInfo?.audibookDetailsData?.for_rent===0 && isSubscribed) || 
    audioPlayerInfo?.audibookDetailsData?.isPurchased === 1 ||
    audioPlayerInfo?.audibookDetailsData?.price === 0 ||
    episodes?.[episodeId]?.isfree
  }

  useEffect(() => {
    // const initialize = async () => {
    //   if(isPlaying){
    //     getSessionInit(currentPlay?.audiobook_id, currentPlay?.id);
    //   }
    // };
    // initialize();

    const initialize = async () => {
      setGlobalState((prev) => ({
        ...prev,
        session: {
          type: isPlaying ? "Stream" : "Activity",
          audiobookId: isPlaying ? (audioPlayerInfo?.audibookDetailsData?.id||0) : null,
          episodeId:  epList?.[index]?.id ,
          isPlaying: !audioRef.current?.paused,
        },
      }));
      if(isPlaying){
        getSessionInit(audioPlayerInfo?.audibookDetailsData?.id||0, currentPlay?.id);
      }
    };
    initialize();
  }, [
    isPlaying,
    currentPlay?.id,
    currentPlay?.audiobook_id,
    currentPlay?.episode_id,
    setGlobalState,
  ]);

  
  
  const togglePlayList = async (ind: any, episodeId: number,accessible?:boolean,episodes?:any) => {
    let result = hasAccess(ind);
    if(ind>=(audioPlayerInfo?.audibookDetailsData?.episodes?.length||100000)){
      let bookId=audioPlayerInfo?.bookIds[0];
      let books=[...audioPlayerInfo?.bookIds]?.splice(1,)
      dispatch(
        setglobalAudioPlayers({
          speed:1,
          timer:0,
          bookIds:books,
          playerBook:bookId,
          playerEpisodeInd:0,
          audibookDetailsData:audioPlayerInfo?.audibookDetailsData,
          withBg:true,
          playAll:true,
        })
      )
      return;
    }
    if(!result && !accessible){
      handleShowPayModal()
      return;
    }
    setIndex(ind);
    let audioBookId=audioPlayerInfo?.playerBook;
        // console.log(audioBookDetailsData?.id,episodeId,"aja",audioPlayerInfo?.audibookDetailsData?.id)
    const current = (
      await getCurrentEpisodePath(audioBookId||0, episodeId)
    )?.data;
    // console.log(current,"player")
    // audioPlayer.current.src = current;
    //console.log(current,"curentHala",epList?.[ind]?.bgm_filepath, epList?.[ind]?.file_path ,!epList?.[ind]?.bgm_filepath? epList?.[ind]?.file_path : current)
    if(current.includes(".mp3")){
      
      // setTimeout(()=>{
        console.log(epList?.[ind]?.file_path,'barmuda',epList,ind,episodes?.[ind]?.file_path)
        setAudioPlayer( (epList?.[ind]?.file_path) || episodes?.[ind]?.file_path )
      // },10)
    }else{
      // alert(epList?.[ind]?.file_path)
      // setAudioPlayer(!epList?.[ind]?.bgm_filepath? (epList?.[ind]?.file_path||current) : current);
      setAudioPlayer(current);
    }
    setCurrentPlay(epList?.[ind]);
    // audioPlayer.current.play();
    setPlaying(true);
    // setisPlaying(true);
    // //console.log("currentPlay", audioRef.current);
    setisPlaying(false)
    // if(index!==i || isPlaying===false){
      setTimeout(()=>{setisPlaying(true)},200)
    // }
    audioRef.current?.play()
    const audioBookPlayCount = async (id: any) => {
      setAudioBookCount(true);
      await postAudiobookPlayCountApi(id);
    };

    !audioBookCount ? await audioBookPlayCount(id) : "";
    await postEpisodePlayCountApi(currentPlay?.id);
    showBigPlayer?"":setShowMiniPlayer(true);
  };

  const toggleSkipForward = async () => {
    setIndex((prev) => prev + 1);
    const current = (
      await getCurrentEpisodePath(audioPlayerInfo?.audibookDetailsData?.id||0, epList?.[index + 1].id)
    ).data;
    // audioPlayer.current.src = current;
    // setAudioPlayer(current);
    setAudioPlayer(!epList?.[index + 1]?.bgm_filepath ? epList?.[index + 1]?.file_path : current);
    setCurrentPlay(epList?.[index + 1]);
    // audioPlayer.current.play();
    setPlaying(true);
    // setisPlaying(true);
    // audioRef.current?.play()
    await postEpisodePlayCountApi(currentPlay?.id);
  };


  const onEnded = async () => {
    if (!isNextAllowed) {
      setisPlaying(false);
    } else {
      await toggleSkipForward();
    }
  };

  const handleBigPlayer = ()=>{
    setShowBigPlayer(!showBigPlayer);
    // audioRef.current?.pause()
    setShowMiniPlayer(false)
    scrollToTop()
}

  const handleShrink = ()=>{
    setShowBigPlayer(!showBigPlayer);
    // audioRef.current?.pause()
    setShowMiniPlayer(true)
    scrollToTop()
}


  const contuinueEpisodeFunction = useCallback(
    (elapsed_pass: any, duration_pass: any) => {
      const continueListening = {
        audiobookId: currentPlay?.audiobook_id,
        audiobookImg: audioPlayerInfo?.audibookDetailsData?.thumb_path,
        episodeId: currentPlay?.id,
        episodeName: currentPlay?.name,
        runningTime: elapsed_pass,
        duration: duration_pass,
        isFree: currentPlay?.isfree,
      };

      if (continueEpisodeData.length <= 0) {
        continueEpisodeData.push(continueListening);
      } else {
        let aInd = 0;
        let inserted = 0;
        continueEpisodeData.forEach(function (data, index) {
          if (
            (!data.audiobookId && !currentPlay?.audiobook_id) ||
            data.audiobookId === currentPlay?.audiobook_id
          ) {
            inserted = 1;
            aInd = index;
          }
        });

        if (inserted === 0) {
          continueEpisodeData.push(continueListening);
        } else {
          continueEpisodeData[aInd] = {
            audiobookId: currentPlay?.audiobook_id,
            audiobookImg: audioPlayerInfo?.audibookDetailsData?.thumb_path,
            episodeId: currentPlay?.id,
            episodeName: currentPlay?.name,
            runningTime: elapsed_pass,
            duration: duration_pass,
            isFree: currentPlay?.isfree,
          };
        }
      }
      localStorage.setItem(
        "continueListeningData",
        JSON.stringify(continueEpisodeData)
      );
    },
    [currentPlay, audioPlayerInfo?.audibookDetailsData, continueEpisodeData]
  );

  const CloseMiniPlayer=()=>{
    setShowMiniPlayer(false);
    setisPlaying(false);
    audioRef.current?.pause()
    dispatch(setglobalAudioPlayers({
        speed:1,
        timer:0,
        bookIds:[],
        playerBook:null,
        playerEpisodeInd:null,
        audibookDetailsData:null,
        withBg:true
      })
    )
  }

  useEffect(()=>{
    if(!audioPlayer)return;
    if(!currentPlay?.bgm_filepath){
      toast.error("Not Available")
      setWithoutBGM(false);
      return;
    }else{
      let playtime=audioRef.current?.currentTime;
      if(withoutBGM){
        setAudioPlayer(currentPlay?.bgm_filepath);
      }else{
        setAudioPlayer( currentPlay?.file_path );
      }
      setPlaying(true);
      // setisPlaying(true);
      // //console.log("currentPlay", audioRef.current);
      setisPlaying(false)
      // if(index!==i || isPlaying===false){
        setTimeout(()=>{setisPlaying(true)},200)
      // }
      
      setTimeout(()=>{
        if(audioRef?.current){
          audioRef.current.currentTime=(playtime??0);
        }
        audioRef.current?.play()
      },1)
    }
    //console.log(currentPlay,"current")
  },[withoutBGM])

  useEffect(() => {
    if (isPlaying) {
      setInterval(() => {
      }, 100);
      contuinueEpisodeFunction(elapsed, duration);
    }
  }, [isPlaying, contuinueEpisodeFunction, elapsed, duration]);

  const miniPlayerHandler = () => {
    // audioPlayer.current.pause();
    setPlaying(false);
    // setisPlaying(false);
    // audioRef.current?.pause()
    setShowMiniPlayer(false);
  };

  const makePayment = async (paymentName: string, url: string) => {
    let payload = {
      userId: userData?.id,
      name: userData?.full_name,
      // email: userData?.user_email,
      phone: userData?.phone_no,
      address: userData?.address,
      amount: audioPlayerInfo?.audibookDetailsData?.price,
      audioBookId: audioPlayerInfo?.audibookDetailsData?.id,
      type: "Audiobook",
      promo_code: affIdValue??"",
      productId: audioPlayerInfo?.audibookDetailsData?.id,
      source: "Kabbik",
      platform: "web",
    };
    const result = await paymentForPurchaseAudiobook(url, payload);
    if (paymentName === "Bkash") {
      if (result.data.bkashURL) {
        window.location.href = result.data.bkashURL;
        return ;
      }
    } else {
      if (result.data.callBackUrl) {
        window.location.href = result.data.callBackUrl;
        return ;
      }
    }
    toast.error("Could not make payment");
  };

  const purchaseAudiobook = async () => {
    if(!user?.id || user?.id===Number(siteConfig?.defaultUserId)){
       dispatch(ReduxShowLoginModal(true));
       setShowPayModal(false)
       return;
    }
    setShowPaymentOptions(true)
    const result = await getDynamicPaymentMethods("audiobook");
    const excludedPaymentMethods = 
    // JSON.parse(
      audioPlayerInfo?.audibookDetailsData?.excluded_payment_methods as string
    // );
    //console.log(audioBookDetailsData?.excluded_payment_methods)
    if (result.success) {
      setPaymentOptions(
        result.data.filter(
          (p: any) => !excludedPaymentMethods.includes(p.method_name)
        )
      );
    }
  };

  const handleCloseBigPlayer=()=>{
    audioRef.current?.pause();
    //console.log(audioRef.current,"audioRef.current");
    setShowBigPlayer(false);
    dispatch(setglobalAudioPlayers({
        speed:1,
        timer:0,
        bookIds:[],
        playerBook:null,
        playerEpisodeInd:null,
        audibookDetailsData:null,
        withBg:true
      })
    )

    setTimeout(()=>{
      setisPlaying(false);
      setAudioPlayer("");
      // audioRef.current = null;
      setShowMiniPlayer(false);
    },1000)
  }

  // const hand

  const handleShowPayModal =()=>{
    if(!user?.id || user?.id===Number(siteConfig?.defaultUserId)){
      //  dispatch(ReduxShowLoginModal(true));
      //  return;
    }
    setShowPayModal(true)
  }

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
    // //console.log(affIdValue,affId,affProductType==='book','affs')
    setAffIdValue(affId??affIdFromCookies??null);
    if(affProductType==="book"){
      getDiscountedData(affId??affIdFromCookies??null)
    }
  }, [affId]);

  const getDiscountedData=async(affIdValue:string|null)=>{
    let result = await promocodeHandlerForBook(audioPlayerInfo?.audibookDetailsData?.id||0,affIdValue??'',audioPlayerInfo?.audibookDetailsData?.price||0)
    // //console.log(affIdValue,result,'affs2',result.data?.reduce_price)
    setReducedPrice(Number(result?.data?.reduce_price)??0)
  };

  const handleFavourite=async()=>{
     if(!user?.id || user?.id===Number(siteConfig?.defaultUserId)){
       dispatch(ReduxShowLoginModal(true));
       return;
    }
    if(isFavorite){
      const result = await deleteFavoritesApi(audioPlayerInfo?.audibookDetailsData?.id)
      if(result?.success){
        setIsFavorite(false);
        toast.info("Removed From Favorites")
      }else{
        toast.error("Something Went wrong");
      }
    }else{
      const result = await addFavorite(audioPlayerInfo?.audibookDetailsData?.id||0)
      if(result?.id){
        setIsFavorite(true);
        toast.success("Favorites Created successfully")
      }else{
        toast.error("Something Went wrong");
      }
      
    }
  }

  return (
    <>
      <ToastContainer />
        {/* <CommonModal isOpen={showBigPlayer} onClose={handleShrink} showCloseButton={false}> */}
          <div className={showBigPlayer?'':'hidden'}>
          <GlobalBigPlayer
            bookId={audioPlayerInfo?.playerBook}
            audioBookData={audioPlayerInfo?.audibookDetailsData as TAudioBookDetails}
            togglePlayList={togglePlayList}
            index={index}
            setWithoutBGM={()=>setWithoutBGM(!withoutBGM)}
            withoutBGM={withoutBGM}
            isPlaying={isPlaying}
            handleShrink={handleShrink}
            setIsPlaying={(val:boolean)=>setisPlaying(val)}
            hasAccess= {hasAccess}
            audioPlayerInfo={audioPlayerInfo}
            audioPlayer={audioPlayer}
            audioRef={audioRef}
            epList={epList}
            currentTime={currentTime} 
            setCurrentTime={setCurrentTime}
            setPlaybackRate={setPlaybackRate}
            playbackRate={playbackRate}
            setTimerMin={setTimerMin}
            timerMin={timerMin}
            favSubmit={handleFavourite}
            setShowBigPlayer={handleCloseBigPlayer}
            setShowSpeedModal={setShowSpeedModal}
            setShowSleeperModal={setShowSleeperModal}
            isFavorite={isFavorite}
          />
        </div>
        {/* </CommonModal> */}
      
      <div className={showMiniPlayer?"fixed bottom-0 left-0 min-w-[100vw] right-0 h-[210px] z-[5] bg-bg shadow-lg  ":'hidden'}>
        <div className={'w-full'}>
          <div className={container('1300px')}>
            <div className="absolute top-0 right-5 p-2 cursor-pointer" >
              <span className="w-5 h-5 inline-block mr-6" onClick={handleBigPlayer}>
                <ExpandIcon className="text-white w-[18px] " />
              </span>
              <span className="w-5 h-5 inline-block" onClick={CloseMiniPlayer}>
                  <X color="white" className="text-4xl"/>
              </span>
            </div>
            <div className="rounded-2xl flex justify-start  xs:justify-center items-center  overflow-hidden ">
              <div className="p-3 space-y-1">
                {/* Book name (small) */}
                <h2 className="text-base font-semibold text-white">
                  {epList?.[index]?.name}
                </h2>
                <p className="text-xs text-gray-500">{audioPlayerInfo?.audibookDetailsData?.name||''}</p>

                {/* Episode name (bigger) */}
                

                {/* Author name */}
                <p className="text-white text-cn cursor-pointer leading-normal">
                        <Link href={paths?.authors+audioPlayerInfo?.audibookDetailsData?.author_name}>{audioPlayerInfo?.audibookDetailsData?.author_name}</Link>
                      </p>
              </div>
            </div>
            <div>
              <GradientAudioPlayer 
                toogleForWard={()=>togglePlayList(index+1,epList?.[index+1]?.id)} 
                toogleBackWard={()=>togglePlayList(index-1,epList?.[index-1]?.id)}
                isPlaying={isPlaying} 
                isFirst={index===0}
                isLast={(index===epList?.length-1)&&(audioPlayerInfo?.bookIds.length===0)}
                setIsPlaying={(boolean)=>setisPlaying(boolean)} 
                src={audioPlayer} 
                audioRef={audioRef}
                currentTime={currentTime} 
                setCurrentTime={setCurrentTime}
                setPlaybackRate={setPlaybackRate}
                playbackRate={playbackRate}
                setTimerMin={setTimerMin}
                timerMin={timerMin}
              />
            </div>
            </div>
        </div>
      </div>
      {showSpeedModal?(
        <CommonModal 
          isOpen={showSpeedModal}
          onClose={()=>{setShowSpeedModal(false)}}
          container_class="rounded-[18px] w-[75vw]"
          modalClassName="max-w-[680px] w-[90vw] w-full h-auto"
        >
          <AudioSpeed value={playbackRate} handleChange={(val)=>{setPlaybackRate(val)}}/>
        </CommonModal>
      ):''}
      {showSleeperModal?(
        <CommonModal 
          isOpen={showSleeperModal}
          onClose={()=>{setShowSleeperModal(false)}}
          container_class="rounded-[18px] w-[75vw]"
          modalClassName="max-w-[680px] w-[90vw] w-full h-auto"
        >
          <SleeperTimer value={timerMin} handleChange={(val:any)=>{setTimerMin(val)}}/>
        </CommonModal>
      ):''}

      {showPayModal?(
        <CommonModal
          isOpen={showPayModal}
          onClose={closePayModal}
          // modalClassName="max-w-[680px] w-[90vw] bg-slate-800 w-full h-auto"
        >
          <div className="w-full max-w-[650px] p-4 pt-8 mt-4 rounded-[12px] bg-[#0F172B] relative">
            {/* Header with Book Icon */}
            <div className="text-center mb-5">
              <h1 className="text-cn md:text-xl font-bold text-white">আপনার লিসেনিং প্ল্যান বেছে নিন</h1>
            </div>

            {/* Plan Cards */} 
            <div className="grid xs2:grid-cols-2 gap-3">
              {/* Rent Plan */}
              <div className="bg-[#BC0974]/10 border-[1.5px] border-[#BC0974] rounded-xl p-1 xs2:p-5 flex flex-col items-center">
                <div className="w-12 h-12 bg-[#BC0974]/10  rounded-[8px] flex items-center justify-center mb-4 border-[1.5px] border-[#BC0974]">
                  <Calendar className="w-6 h-6 text-purple-300" />
                </div>
                
                <h2 className="text-base font-semibold text-white mb-1">এই অডিওবুক টি রেন্ট নিন</h2>
                <p className="text-sm text-gray-300 mb-5">{convertToBanglaDigits((audioPlayerInfo?.audibookDetailsData?.rent_duration_in_month||0)*30)} দিন</p>
                
                <button onClick={purchaseAudiobook} className="w-full pink_gradient rounded-[6px] text-white text-sm font-semibold py-1.5 xs2:py-3 px-4  transition-all transform hover:scale-105 shadow-lg">
                  রেন্ট নিন - TK {convertToBanglaDigits(audioPlayerInfo?.audibookDetailsData?.price||0)}
                </button>
              </div>
 
              {/* Premium Plan */}
              <div className="gradient_subscribe_10 border-[1.5px] border-orange-600 rounded-xl p-1 xs2:p-5 flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-900/30 rounded-[6px] flex items-center justify-center mb-4 border-[1.5px] border-orange-600">
                  <span className="w-8 h-8 inline-block"><Crown  /></span>
                </div>
                
                <p className="text-sm text-gray-300 mb-1 ">সমস্ত অডিওবুকে </p>
                <h2 className="text-base font-semibold text-white mb-5">আনলিমিটেড অ্যাক্সেস</h2>
                {/* <p className="text-sm text-gray-300 mb-5"></p> */}
                
                <button onClick={() => router.push("/subscribe")}  className="w-full gradient_subscribe text-white text-sm font-semibold py-1.5 xs2:py-2 px-4 rounded-[8px] transition-all transform hover:scale-105 shadow-lg">
                  সাবস্ক্রাইব করুন 
                </button>
              </div>
            </div>
          </div>
        </CommonModal>
      ):''}
      <CommonModal
        isOpen={showPaymentOptions}
        onClose={()=>setShowPaymentOptions(false)}
      >
        <div className={`${styles.modalBody}  bg-navyblue modal-body text-center max-h-[96vh] overflow-y-scroll`}>
          {isCityTouch?    
          <CityTouchPayment
              options={[]}
              // callbacks={[
              // ]}
              subscriptionPackId={1}
             
              price={
                audioPlayerInfo?.audibookDetailsData?.price??0
              }
              reducePrice={0}
              bookId={audioPlayerInfo?.audibookDetailsData?.id}
            />
          :
          <PaymentOptions
            options={paymentOptions.map((option: any) => ({
              methodName: option.method_name,
              logoUrl: option.image_url,
              apiUrl: option.url,
              vat: option.vat,
            }))}
            callback={makePayment}
            price={(audioPlayerInfo?.audibookDetailsData?.price||0)-(Number(reducedPrice))}
          />}
        </div>
      </CommonModal>
      
    </>
  );
};

// export default dynamic(() => Promise.resolve(React.memo(AudiobookComponent)), {
//   ssr: false,
// });

const MemoAudiobookComponent = React.memo(AudiobookComponent);

export default dynamic(() => Promise.resolve(MemoAudiobookComponent), {
  ssr: false,
});
