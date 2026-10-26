"use client";

import styles from "./static/audioBook.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  addFavorite,
  createNewPlaylistFolders,
  deleteFavoritesApi,
  getCurrentEpisodePath,
  getDynamicPaymentMethods,
  getPlayListBooks,
  getSessionInit,
  paymentForPurchaseAudiobook,
  postAudiobookPlayCountApi,
  postEpisodePlayCountApi,
  postFavoritesApi,
  postReview,
  promocodeHandlerForBook,
  RemoveBooksFromPlaylist,
  userProfile,
} from "@/utils/apiServices";


import { useCallback, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { PageProps, UserProfileInfo } from "./static/audiobook.type";
import {  Book, BookIcon, Calendar, ChevronRight, Clock, ExpandIcon, Headphones, Plus, X } from "lucide-react";
import {  convertToBanglaDigits, formatHM, getDominantColor, GetFloatNum, handleShare, handleShare2, isDirectEpisodeUrl, normalizeMsisdn, playCount, resolveEpisodeAudioSrc, scrollToTop, textSlice } from "@/helpers/commonFunction";
import LoveIcon from "@/svgs/LoveIcon";
import LinkIcon from "@/svgs/LinkIcon.svg";
// import CommonModal from "@/shared/ui/CommonModal/CommonModal.view";
// import PaymentOptions from "@/shared/ui/PaymentOptions/PaymentOptins.view";
import Tabs from "@/shared/ui/Tab/Tab.view";
// import EpisodeList from "./EpisodeList.view";
// import CastAndCrew from "./Cast&Crew.viw";
import Review from "./Review.view";
import ShareIcon from "@/svgs/ShareIcon.svg";
import Star from "@/svgs/Star.svg";
// import GradientAudioPlayer from "@/shared/ui/AudioPlayer.view";
import { container } from "@/shared/ui/static/tailwind.classes";
// import BigPlayerView from "./BigPlayer.view";
// import SleeperTimer from "./SleeperTime.view";
// import AudioSpeed from "./AudioSpeed.view";
import Spinner from "@/shared/ui/Spinner.view";
import EpisodeList from "./EpisodeList.view";
import { paths } from "@/utils/Paths";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ReduxShowLoginModal } from "@/features/auth/store/LoginSlice";
import { siteConfig } from "@/config/config";
import CityTouchPayment from "@/features/subscription/components/CityTouchPayment/CityTouchPayment.view";
import PlayIcon from "@/svgs/PlayIcon.svg";
import Biography from "./BiographyModal.view";
import DottedPlayer from "@/svgs/DottedPlayer.svg";
import Crown from "@/svgs/Crown.svg";
import Image from "next/image";
import AddIcon from "@/svgs/Add.svg";
import GreenTik from "@/svgs/GreenTik.svg";
import { PlaylistAudioBook } from "@/features/playlist/components/MyPlayList/static/myplaylist.type";
import FoldersModalForBookDetails from "@/features/playlist/components/MyPlayList/FoldersModalWithoutInput.view";
import { setPlaylistValue } from "@/features/playlist/store/PlaylistSlice";
import DeleteConfirmation from "@/shared/ui/CommonModal/DeleteConfirmation.view";
import { Ads } from "@/features/entertainment/components/Ads/Ads";
import { InFeedAds } from "@/features/entertainment/components/Ads/InFeedAdd";
import { useGlobalState } from "@/features/auth/components/SessionProvider/SessionProvider";
import GPNumberModal from "@/features/catalog/components/CategoryWiseBooks/GpModal";
// import SleeperTimer from "./SleeperTime.view";
// import PaymentOptions from "@/features/subscription/components/Subscription/PaymentOptions.view";



const AudioSpeed = dynamic(
        () => import(/* webpackChunkName: "AudioSpeed" */'./AudioSpeed.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const BigPlayerView = dynamic(
        () => import(/* webpackChunkName: "BigPlayerView" */'./BigPlayer.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const GradientAudioPlayer = dynamic(
        () => import(/* webpackChunkName: "GradientAudioPlayer" */'@/shared/ui/AudioPlayer.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const CastAndCrew = dynamic(
        () => import(/* webpackChunkName: "CastAndCrew" */'./Cast&Crew.viw'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const CommonModal = dynamic(
        () => import(/* webpackChunkName: "CommonModal" */'@/shared/ui/CommonModal/CommonModal.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const SleeperTimer = dynamic(
        () => import(/* webpackChunkName: "SleeperTimer" */'./SleeperTime.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const PaymentOptions = dynamic(
        () => import(/* webpackChunkName: "PaymentOptions" */'@/features/subscription/components/Subscription/PaymentOptions.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

const AddReviewForm = dynamic(
        () => import(/* webpackChunkName: "PaymentOptions" */'./AddReviewForm.view'
    ), {
  ssr: false, // optional: disable server-side rendering
  loading: () => <Spinner/>, // optional fallback
});

// AudioPlayer Configuration

const AudiobookComponent = ({
  bookId,
  audiobookData,
  authorDetailsData,
  castData,
  reviewDetailsData,
  episodeId,
  runningTime,
}: PageProps) => {
  const id = bookId;
  const audioBookDetailsData = audiobookData;
  const authorData = authorDetailsData?.data[0];
  const castCrewData = castData?.data;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const resumeTimeRef = useRef<number | null>(null);
  const continueRestoreStartedRef = useRef(false);
  const [isFavorite,setIsFavorite]=useState(audioBookDetailsData?.is_favorite??false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const reviewData = reviewDetailsData?.data;
  const [expand,setExpand] = useState(false);
  const continueEpisodeId = episodeId;
  const continueRunningTime = runningTime;
  const [userData, setUserData] = useState<UserProfileInfo | null>(null);
  const isSubscribed = userData?.is_subscribed === 1 ? true : false;
  const [continueEpisodeData, setContinueEpisodeData] = useState<any[]>([]);
  const [isBigger, setIsBigger] = useState(true);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [termsPrivacyAgreed, setTermsPrivacyAgreed] = useState(false);
  const router = useRouter();
  const [showBigPlayer, setShowBigPlayer] = useState(false);
  const rentAvailable = audiobookData.for_rent && audioBookDetailsData?.price;
  const [playbackRate, setPlaybackRate] = useState(1);
  const [timerMin, setTimerMin] = useState(0);
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [showSleeperModal, setShowSleeperModal] = useState(false);
  const [showPayModal,setShowPayModal]=useState(false)
  const [showPaymentOptions,setShowPaymentOptions]=useState<boolean>(false);
  const [withoutBGM,setWithoutBGM]=useState(false);
  const [showAddReviewModal,setShowAddReviewModal]=useState(false);
  const user=useAppSelector((store)=>store?.user?.userData)
  const [editLoader,setEditLoader]=useState(false);
  const [ShowDeleteModal,setShowDeleteModal]=useState<number|string|null>(null);
  const [promoData,setPromoData]=useState('');
  const [isMsisdnTakerModalOpened, setIsMsisdnTakerModalOpened] =useState(false);


  const toggleSize = () => {
    setIsBigger((prevSize) => !prevSize);
  };



  const [isFavBook, setIsfavBook] = useState(false);
  const [isAccordion, setIsAccordion] = useState(false);
  const [review, setreview] = useState("");
  const [star, setStar] = useState(5);
  const [isRunning, setIsRunning] = useState(true);

  const starHandler = (event: any) => {
    setStar(event);
  };

  const reviewHandler = (event: any) => {
    setreview(event.target.value);
  };

  //player!!!!!!!!
  const [audioPlayer,setAudioPlayer] = useState<string>("");
  const [playing, setPlaying] = useState(false);
  const { globalState, setGlobalState } = useGlobalState();
  // const progressBarRef: any = useRef(null);
  const [epList, setEpList]: any = useState(audioBookDetailsData?.episodes);
  const [currentPlay, setCurrentPlay]: any = useState({});
  const [index, setIndex] = useState(-1);
  // const 
  const [isPlaying, setisPlaying] = useState(false);
  const [elapsed, setElapsed]: any = useState();
  const [duration, setDuration]: any = useState(0);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioBookCount, setAudioBookCount] = useState(false);
  const [isLogin, setIsLogin]: any = useState();
  const [isFree, setIsFree] = useState();
  const dispatch=useAppDispatch();
  const searchParams = useSearchParams();
  const [isCityTouch,SetIsCityTouch]=useState(false);
  const timeParams = searchParams.get("time");
  const affId = searchParams.get("affId");
  const affProductId = searchParams.get("productId");
  const affProductType = searchParams.get("productType");
  let [affIdValue,setAffIdValue]=useState<string|null>(null);
  const [reducedPrice,setReducedPrice]=useState(0);
  const reducedPriceRef = useRef(reducedPrice);
  const [dominantColor,setDominantColor]=useState<string|null>(null);
  const playListData=useAppSelector(store=>store.playList.playlistData)
  const [playListBooks,setPlaylistBooks]=useState<{[key:number|string]:string|number}>({});
  let [folders,setFolders]=useState<{[key:number | string]:string}>({});
  const [showFolderModal,setFolderModal]=useState(false);
  const [paymentMethod,setPaymentMethod]=useState('');
  const [number,setNumber]=useState('');
    const [paymentUrl,setPaymentUrl]=useState('')





  const RemoveFromPlaylist=async(id:number|string)=>{
    let result =await RemoveBooksFromPlaylist(id)
    // await getPlaylistItems();
    if(result?.success===false){
      toast.error("Something Went wrong")
    }else{
      // getPlaylistItems && getPlaylistItems()
      toast.success("Removed From playlist")
      let result = await getPlayListBooks()
      dispatch(setPlaylistValue(result.data));
      // setPlaylistBooks({...playListBooks,[audioBookDetailsData.id]:''})
    }
    setTimeout(()=>setShowDeleteModal(null),50)
  }

  const getPlaylistItems=async()=>{
      let foldersFromResult:{[key:number | string]:string}={};
      playListData?.forEach((item:PlaylistAudioBook,index:number)=>{
        
        foldersFromResult[item.folder_id]=item.folder_name
      })
      setFolders(foldersFromResult);
  }

  useEffect(()=>{
    console.log(audioBookDetailsData,"heybook")
  },[])

  const isNextAllowed =
    index < epList?.length - 1 &&
    (epList?.[index + 1].isfree === 1 ||
      (!audioBookDetailsData?.isSubRestricted && isSubscribed) || (audioBookDetailsData?.isSubRestricted && audioBookDetailsData?.for_rent===0 && isSubscribed) ||
      audioBookDetailsData?.isPurchased === 1);
  const isPrevAllowed = index > 0;

  const isAuthenticated = useCallback(async () => {
    setIsLogin(Cookies.get("isLogin"));
  }, []);

  useEffect(()=>{
    if(!playListData.length)return;
    let playListBookMapper:{[key:number|string]:string|number}={};
    playListData.forEach((book)=>{
        playListBookMapper[book.audiobook_id]=book.playlist_book_id;
    })
    setPlaylistBooks(playListBookMapper);
    getPlaylistItems();
  },[playListData.length])


  useEffect(()=>{
    let sourceFromParams=Cookies.get('sourceFromParams')??'';
         let source=Cookies.get('source')??'';
        if(sourceFromParams==='city_touch'){
          SetIsCityTouch(true);
        }if(source?.includes('city')){
          SetIsCityTouch(true);
        }
  },[])

  useEffect(()=>{
    //console.log("crewwww",reviewDetailsData)
  },[])
  const audioBookDetails = useCallback(async () => {
    setIsfavBook(audioBookDetailsData.is_favorite);
    setEpList(audioBookDetailsData.episodes);
  

    if (index == -1) {
      if(episodeId){
        let index = epList?.findIndex((obj: any) => obj.id === episodeId);
        setIndex(index);
      }else{
        setIndex(0);
      }
      setCurrentPlay(audioBookDetailsData.episodes?.[0]);
    }
  }, [index, audioBookDetailsData.episodes, audioBookDetailsData.is_favorite]);

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

  useEffect(()=>{
    
  },[])


  useEffect(() => {
    audioBookDetails();
    isAuthenticated();
  }, [audioBookDetails, isAuthenticated]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await userProfile();
      console.log(userData,"userData_book_details")
      setUserData(userData);
    };
    fetchUserData();
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
    if(epList.length<1){
      return;
    }
    if(!audioBookDetailsData?.id){
      return;
    }
    if (!continueEpisodeId || !isRunning || continueRestoreStartedRef.current) {
      return;
    }

    const index = epList?.findIndex((obj: any) => obj.id === continueEpisodeId);
    if (index < 0) {
      return;
    }

    

    if (!hasAccess(index)) {
      return;
    }

    continueRestoreStartedRef.current = true;
    setIsRunning(false);
    setShowMiniPlayer(true);

    const seekTime = timeParams
      ? Number(timeParams)
      : continueRunningTime
        ? Number(continueRunningTime)
        : 0;

    if (seekTime > 0 && isFinite(seekTime)) {
      resumeTimeRef.current = seekTime;
      setCurrentTime(seekTime);
      let index = epList?.findIndex((obj: any) => obj.id === continueEpisodeId);
      console.log(index,episodeId,epList,"index")
      // setIndex(index);
    }

    void togglePlayList(index, continueEpisodeId, { seekTime });
  }, [continueEpisodeId, isRunning, continueRunningTime, epList, audioBookDetailsData, isSubscribed, epList?.length, timeParams]);

  const hasAccess=(episodeId:number,fromSource?:string)=>{
    if(fromSource==="continue"){
      console.log(!audioBookDetailsData?.isSubRestricted && isSubscribed || 
        (audioBookDetailsData?.isSubRestricted && audioBookDetailsData?.for_rent===0 && isSubscribed) || 
        audioBookDetailsData?.isPurchased === 1 ||
        audioBookDetailsData?.price === 0 ||
        epList?.[episodeId]?.isfree,epList?.[episodeId]?.isfree,epList?.[episodeId]?.id,"hasAccess(continueEpisodeId)")
    }
    

    return (!audioBookDetailsData?.isSubRestricted && isSubscribed) || 
    (audioBookDetailsData?.isSubRestricted && audioBookDetailsData?.for_rent===0 && isSubscribed) || 
    audioBookDetailsData?.isPurchased === 1 ||
    audioBookDetailsData?.price === 0 ||
    epList?.[episodeId]?.isfree
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
          audiobookId:   audioBookDetailsData?.id ,
          episodeId:  epList?.[index]?.id,
          isPlaying: !audioRef.current?.paused,
        },
      }));
      if(isPlaying){
        getSessionInit( audioBookDetailsData?.id, epList?.[index]?.id);
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

  const submitReviewForm = async (event: any) => {
    event.preventDefault();
    const reviewData = await postReview(id, star, review);

    toast.success("Rating & Review Added !", {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
    setTimeout(function () {
      window.location.reload();
    }, 2000);
  };



  // AudioPlayer Configuration

  const togglePlay = async () => {
    let isIconChanged = false;

    if (audioPlayer === "") {
      togglePlayList(0, epList?.[0].id);
      isIconChanged = true;
    }

    if (!isPlaying) {
      setIndex(index);

      // audioPlayer.current.play();
      setPlaying(true)
      setShowMiniPlayer(true);
      const audioBookPlayCount = async (id: any) => {
        setAudioBookCount(true);
        await postAudiobookPlayCountApi(id);
      };
      !audioBookCount ? await audioBookPlayCount(id) : "";
      await postEpisodePlayCountApi(currentPlay?.id);
    } else {
      // audioPlayer.current.pause();
      setPlaying(false)
    }

    setCurrentPlay(epList?.[index]);
  };

   const AddNewFolder=async(val:string)=>{
     if(val?.trim()?.length===0){
      toast.error("Please add a folder name")
      return;
    }
      setEditLoader(true);
      let result = await createNewPlaylistFolders(val)
      await getPlaylistItems();
      let result1 = await getPlayListBooks();
          // setbooks(result.data);
      dispatch(setPlaylistValue(result1.data));
      if(result.success!=='false'){
        toast.success("New folders added successfully")
      }else{
        toast.error("Something went wrong");
      }
      setEditLoader(false)
    }

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

  const togglePlayList = async (
    ind: any,
    episodeId: number,
    options?: { seekTime?: number }
  ) => {
    const apiStart = Date.now();
    let result = hasAccess(ind);
    
    if(!result){
      return;
    }

    const episode = epList?.[ind];
    const seekTime = options?.seekTime;
    if (seekTime != null && seekTime > 0 && isFinite(seekTime)) {
      resumeTimeRef.current = seekTime;
      setCurrentTime(seekTime);
    } else {
      resumeTimeRef.current = null;
    }

    setIndex(ind);
    setCurrentPlay(episode);
    setIsAudioLoading(true);
    setPlaying(true);
    showBigPlayer ? "" : setShowMiniPlayer(true);

    const directUrl = isDirectEpisodeUrl(episode?.file_path);
    const optimisticSrc = resolveEpisodeAudioSrc(episode);

    if (directUrl && optimisticSrc) {
      setAudioPlayer(optimisticSrc);
    } else if (optimisticSrc && !episode?.bgm_filepath) {
      setAudioPlayer(optimisticSrc);
    }

    let signedUrl: string | undefined;
    if (!directUrl || episode?.bgm_filepath) {
      signedUrl = (await getCurrentEpisodePath(audioBookDetailsData.id, episodeId))?.data;
    }

    const finalSrc = resolveEpisodeAudioSrc(episode, signedUrl);
    if (finalSrc) {
      setAudioPlayer(finalSrc);
    }

    setisPlaying(true);

    

    if (!audioBookCount) {
      setAudioBookCount(true);
      void postAudiobookPlayCountApi(id);
    }
    void postEpisodePlayCountApi(episode?.id);
  };

  const toggleSkipForward = async () => {
    setIndex((prev) => prev + 1);
    const current = (
      await getCurrentEpisodePath(audioBookDetailsData.id, epList?.[index + 1].id)
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

  const toggleSkipBackward = async () => {
    setIndex((prev) => prev - 1);
    const current = (
      await getCurrentEpisodePath(audioBookDetailsData.id, epList?.[index - 1].id)
    ).data;
    // audioPlayer.current.src = current;
    setAudioPlayer(!epList?.[index - 1]?.bgm_filepath ? epList?.[index - 1]?.file_path : current);
    setCurrentPlay(epList?.[index - 1]);
    // audioPlayer.current.play();
    setPlaying(true);
    // setisPlaying(true);
    // audioRef.current?.play()
    await postEpisodePlayCountApi(currentPlay?.id);
  };

  const toggleForward = () => {
    // audioPlayer.current.currentTime += 10;
  };

  const toggleBackward = () => {
    // audioPlayer.current.currentTime -= 10;
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
        audiobookImg: audioBookDetailsData.thumb_path,
        episodeId: currentPlay?.id,
        episodeName: currentPlay?.name,
        runningTime: elapsed_pass||audioRef?.current?.currentTime || 0,
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
            audiobookImg: audioBookDetailsData.thumb_path,
            episodeId: currentPlay?.id,
            episodeName: currentPlay?.name,
            runningTime: elapsed_pass||audioRef?.current?.currentTime || 0,
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
    [currentPlay, audioBookDetailsData, continueEpisodeData]
  );

  const CloseMiniPlayer=()=>{
    setShowMiniPlayer(false);
    setisPlaying(false);
    audioRef.current?.pause()
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
      setTimeout(()=>{setisPlaying(true)},200)
      
      setTimeout(()=>{
        if(audioRef?.current){
          audioRef.current.currentTime=(playtime??0);
        }
      },1)
    }
    //console.log(currentPlay,"current")
  },[withoutBGM])

  useEffect(() => {
    if (isPlaying) {
      setInterval(() => {
        const _duration = Math.floor(audioRef?.current?.duration||0);
        const _elapsed = Math.floor(audioRef?.current?.currentTime||0);
        setDuration(_duration);
        setElapsed(_elapsed);
      }, 100);
      contuinueEpisodeFunction(elapsed, duration);
    }
  }, [isPlaying, contuinueEpisodeFunction, currentTime, duration]);

  const handleMouseDown = () => {
    // audioPlayer.current.pause();
    setPlaying(false);
  };

  const handleMouseUp = (e: any) => {
    const newTime = e.target.value;
    // audioPlayer.current.currentTime = newTime;
    // if (isPlaying) audioPlayer.current.play();
  };

  const onPointerEnter = () => {};
  const onPointerLeave = () => {};
  const onPointerMove = (value: number, index: number) => {};

  const miniPlayerHandler = () => {
    // audioPlayer.current.pause();
    setPlaying(false);
    // setisPlaying(false);
    // audioRef.current?.pause()
    setShowMiniPlayer(false);
  };

  useEffect(()=>{console.log(reducedPrice,"reducedPrice",affIdValue)})

  useEffect(() => {
  reducedPriceRef.current = reducedPrice;
  console.log("reducedPrice updated:", reducedPrice);
}, [reducedPrice]);

  const makePayment = async (paymentName: string, url: string,reducedPrice2?:number) => {
    // console.log(reducedPrice,"haha",reducedPrice2)

     const currentReducedPrice = reducedPriceRef.current;
  
  // console.log("Current reducedPrice from ref:", currentReducedPrice);


    let payload:any = {
      userId: userData?.id,
      name: userData?.full_name,
      // email: userData?.user_email,
      phone: userData?.phone_no,
      address: userData?.address,
      amount: audioBookDetailsData.price-currentReducedPrice,
      audioBookId: audioBookDetailsData.id,
      type: "Audiobook",
      promo_code: affIdValue??"",
      productId: audioBookDetailsData.id,
      source: "Kabbik",
      platform: "web",
    };

    if(paymentName.toLocaleLowerCase()==='gpdcb' && number.trim()===''){
      setIsMsisdnTakerModalOpened(true);
      setShowPaymentOptions(false)
      setPaymentMethod(paymentName);
      setPaymentUrl(url);
      return;
    }
    else if(paymentName.toLocaleLowerCase()==='gpdcb'){
      console.log(paymentName,url,number)
      payload.msisdn=normalizeMsisdn(number)
      payload.currency='BDT',
      payload.purpose= "Rent Audiobook"
      payload.productName = "Kabbik- Audiobook Rent"
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
      if (result.data.bkashURL) {
        window.location.href = result.data.bkashURL;
        return ;
      }
    } else {
      if (paymentName.toLocaleLowerCase()==='gpdcb') {
          console.log(result,"resulttt")
          window.location.href = result.url;
          return ;
        }

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
      audioBookDetailsData.excluded_payment_methods as string
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

  const handleCloseBigPlayer=()=>{
    audioRef.current?.pause();
    //console.log(audioRef.current,"audioRef.current");
    setShowBigPlayer(false);
    
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
    console.log("something happeing here")
    
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

  const getDiscountedData=async(affId?:string|null)=>{
    let promo  = affId || affIdValue ;
    
    let result = await promocodeHandlerForBook(audioBookDetailsData.id,promo??'',audioBookDetailsData?.price)
    // //console.log(affIdValue,result,'affs2',result.data?.reduce_price)
    if(result?.data?.reduce_price){
      setReducedPrice(Number(result?.data?.reduce_price)??0)
    }
  };

  const handleFavourite=async()=>{
     if(!user?.id || user?.id===Number(siteConfig?.defaultUserId)){
       dispatch(ReduxShowLoginModal(true));
       return;
    }
    if(isFavorite){
      const result = await deleteFavoritesApi(audioBookDetailsData.id)
      if(result?.success){
        setIsFavorite(false);
        toast.info("Removed From Favorites")
      }else{
        toast.error("Something Went wrong");
      }
    }else{
      const result = await addFavorite(audioBookDetailsData.id)
      if(result?.id){
        setIsFavorite(true);
        toast.success("Favorites Created successfully")
      }else{
        toast.error("Something Went wrong");
      }
      
    }
  }

  const takeDominantColor=async()=>{
    // alert("dkkjfjdfff")
    let color = await getDominantColor(audioBookDetailsData?.thumb_path,10);
    setDominantColor(color as string)
    // alert(color)
  }

  useEffect(() => {
    if(typeof window != undefined){
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "view_item",
        content_type: "audiobook",
        content_id: audioBookDetailsData?.id,
        content_name: audioBookDetailsData?.name,
        content_category: audioBookDetailsData?.category_id,
        value: audioBookDetailsData?.price,
        currency: "BDT",
        author:audioBookDetailsData?.author_name
      });
    }
  }, []);

 
  return (
    <>
      {/* <div className="w-full  h-[100px]  bg-[#0E1D3F] mt-[-100px]"></div> */}
      <ToastContainer />
      <div 
          className={`absolute  left-0 w-full mt-[-100px]  ${styles.audioBookBg}`}
          style={{
            backgroundImage: `url('${bookId ? audioBookDetailsData?.thumb_path : ""}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
            height:'140vh'
          }}
        ></div>
      <div className={showBigPlayer?'hidden':"flex flex-col md:flex-row justify-around mt-7 items-start relative "+container('1300px') }
        
      >
        
        {/* <div className="h-40 absolute bottom-[-80px] z-2 w-full blur_gradient opacity-90"></div> */}
        <div className="circular_gradient left-0 bottom-[-10%] w-[35vw] h-[35vw] absolute rounded-[50%] "></div>

        <div className=" flex max-md:mx-auto mr-4 items-center z-[1] justify-center max-md:mb-4 md:p-1">
          <div className="w-full max-w-full min-w-[96vw] md:min-w-[30vw] md:max-w-[90%] md2:max-w-[80%] lg:max-w-[70%] md:max-h-[105vh] mx-auto">
            {/* Main Card Container */}
            <div  className={`bg-[#E6F7FA] rounded-[8px] md2:rounded-[14px]  overflow-hidden`}>
              {/* Book Cover Section */}
              <div className="relative m-3 md1:m-4 mb-0">
                <div 
                  className="w-full min-w-[28vw] aspect-[516/540] rounded-[12px]  overflow-hidden"
                  style={{
                    backgroundImage: `url('${bookId ? audioBookDetailsData?.thumb_path : ""}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top left'
                  }}
                >
                  {/* Top Icons */}
                  <div className="absolute top-0 left-0 w-full h-full bg-[#00000002] z-[2] ">

                  </div>
                  <div className=" absolute top-4 right-4 flex items-center gap-2 cursor-pointer z-[4]">
                    <div className={`w-8 h-8  rounded-full flex items-center justify-center`}>
                      <span  className={`${user?.id && user.id!==2820?'':'hidden'} w-8 z-[1] h-8 inline-block`}>
                          {!playListBooks[audioBookDetailsData.id]?
                            <span onClick={()=>setFolderModal(true)}  className='w-8 z-[1] h-8 inline-block '>
                              <AddIcon />
                            </span>:
                            <span onClick={()=>setShowDeleteModal(playListBooks[audioBookDetailsData.id])} className='w-7 z-[1] h-7 inline-block '>
                              <GreenTik />
                            </span>}
                        </span>
                    </div>
                    <div className={`w-8 h-8 ${isFavorite?"bg-white/70":"bg-red-500/50"} rounded-full flex items-center justify-center`}>
                      <span onClick={handleFavourite} className={`w-4 h-4 text-white fill-white`} >
                        <LoveIcon fill={isFavorite?'#D14874':'white'}/>
                      </span>
                    </div>
                    <div onClick={handleShare2} className="w-8 h-8 0/60 rounded-full bg-gray-500/50 flex items-center justify-center">
                      <span className="w-4 h-4 text-white inline-block" >
                        <ShareIcon />
                      </span>
                    </div>
                    
                  </div>

                  {/* Book Title Overlay */}
                  <div className="absolute bg_opacity_gradient bottom-0 left-0 right-0 p-4  rounded-b-xl z-[5]">
                    <div className="text-center">
                      <h1 className=" text-[#f9f9f9] text-clg font-bold leading-[34px] mb-1">
                        {audioBookDetailsData?.name}
                      </h1>
                      <p className="text-white text-cn cursor-pointer leading-normal">
                        <Link href={paths?.authors+audioBookDetailsData?.author_name}>{audioBookDetailsData?.author_name}</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div   className={` rounded-t-[32px] p-3  md2:px-6 pt-0`}>
                <div className="w-full">
                  <div className=" ">
                    {/* Stats Grid */}
                    <div className="flex justify-between gap-6 mb-3">
                      {/* Listens */}
                      <div className="flex  items-center ">
                        <div className="w-4 h-4  rounded-full flex items-center justify-center">
                          <Headphones className="w-4 h-4 text-gray-700" strokeWidth={2} />
                        </div>
                        <span className="text-cs sm:text-cs2 mt-0 ml-1 font-medium text-gray-900">{playCount(audioBookDetailsData?.play_count)}</span>
                        {/* <span className="text-sm text-gray-500">listens</span> */}
                      </div>

                      {/* Duration */}
                      <div className="flex items-center ">
                        <div className="w-4 h-4  rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4 text-gray-700" strokeWidth={2} />
                        </div>
                        <span className="text-cs md:text-cs2 ml-1 font-medium mt-0 pt-0 text-gray-900">{formatHM(audioBookDetailsData?.episodes?.reduce((a,c)=>a+c?.duration,0))}</span>
                        {/* <span className="text-sm text-gray-500">duration</span> */}
                      </div>

                      {/* Rating */}
                      <div className="flex  items-center ">
                        <div className="w-4 h-4  rounded-full flex items-center justify-center">
                          <Star  />
                        </div>
                        <span className="text-cs md:text-cs2 ml-1 font-medium mt-0 pt-0 text-gray-900">{audioBookDetailsData?.rating?.toFixed(1)}</span>
                        {/* <span className="text-sm text-gray-500">rating</span> */}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button onClick={()=>{
                        if(!user?.id || user?.id===2820){
                          dispatch(dispatch(ReduxShowLoginModal(true)))
                          return;
                        }else if(hasAccess(0)){
                          togglePlayList(0,audiobookData?.episodes[0]?.id)
                        }else{
                          setShowPayModal(true)
                        }
                      }} className="w-full mb-4 btn-gradient-2  text-gray-50 py-2 px-6 rounded-full text-cs2  transition-colors duration-200 flex items-center justify-center space-x-2 ">
                      <span className="w-4 h-4 inline-block">
                        <DottedPlayer   />
                      </span>
                      <span className="font-semibold">এখন শুনুন</span>
                    </button>
                  </div>
                </div>

                {/* Book Details */}
                <div className="space-y-3">
                  {/* Voice Artists */}
                  <div>
                    {/* <h3 className="text-black text-cn2 font-bold mb-2">কণ্ঠ: </h3> */}
                    <p className="text-black text-cs2 leading-relaxed">
                      <span className="font-semibold">কণ্ঠ: </span>
                      {audiobookData?.contributing_artists }
                    </p>
                  </div>

                  {/* Synopsis */}
                  <div className="tiny_scroll_bar2">
                    {/* <h3 className="text-black text-cn2 font-bold mb-2">সংক্ষিপ্ত জীবনী:</h3> */}
                    <div 
                      // dangerouslySetInnerHTML={{ __html: audiobookData?.description??'' }}
                      onClick={()=>setExpand(!expand)}
                      className="text-black text-cs2 cursor-pointer leading-relaxed max-h-56 overflow-x-hidden overflow-y-auto"
                    >
                      <span className="font-semibold">সংক্ষিপ্ত বিবরণী: </span>
                      { 
                      // expand? audiobookData?.description :
                        textSlice( audiobookData?.description,70, false,"এই বইটির সংক্ষিপ্ত বিবরণ এখানে দেওয়া হবে।") 
                      }
                      <span className=" text-deep_pink2 font-[600] ml-2" > আরো পড়ুন... </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" z-[1] w-full md:w-[60%] xl:w-[60%]">
          <div className="max-w-[700px] bg-white/[99] p-4 rounded-[8px] w-[100%] mx-auto  space-y-4 ">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#881D69] to-[#D34974] rounded-xl p-2 md:p-3 text-white">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 md:w-15 md:h-15 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                  <img
                    loading="lazy"
                    src={authorData?.imageUrl??''}
                    alt="Sir Arthur Conan Doyle"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <h1 className="text-cs2 md:text-cn font-medium">
                    {/* <p className="text-white text-cn cursor-pointer leading-normal"> */}
                        <Link href={paths?.authors+authorData?.name}>{authorData?.name}</Link>
                      {/* </p> */}
                    </h1>
                  <Link href={paths?.authors+authorData?.name} className="flex max-xxs:flex-col text-cs flex-row md:items-center justify-between gap-2 md:gap-4">
                    <div className="flex items-center gap-1">
                      <BookIcon className="w-4 md:w-4"/>
                      <span className="text-cs md:text-cn font-medium">{authorData?.total_audiobooks} অডিও বুক</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="bg-white text-black px-1 md:px-3 py-1 rounded-full text-cs font-medium shadow-lg whitespace-nowrap">
                        আরও অডিওবুক শুনুন
                      </button>
                      <div className="bg-white w-6 rounded-full p-2 shadow-lg">
                        <LinkIcon color="black"/>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex tiny_scroll_bar2 w-full">
              <Tabs tabs={[
                { name: 'এপিসোড', 
                  component: 
                    <EpisodeList 
                      hasAccess={hasAccess} 
                      book={audiobookData}
                      index={index}
                      isPlaying={isPlaying}
                      togglePlay={(i,episodeId)=>{
                        if( !user?.id || user?.id===Number(siteConfig?.defaultUserId)){
                          dispatch(ReduxShowLoginModal(true))
                        }
                        else if(hasAccess(i)){
                          togglePlayList(i,episodeId)
                        }else{
                          setShowPayModal(true)
                        }
                      }}
                    /> 
                  },
                { name: 'কলা কুশলীরা', 
                  component: <CastAndCrew
                                castCrewData={castCrewData}
                            /> 
                },
                { name: 'রিভিউ', component: <Review handleReveiw={()=>setShowAddReviewModal(true)} reviews={reviewDetailsData?.data}/> },
              ]} />
            </div>

          </div>
        </div>
      </div>
        <div className={showBigPlayer?'':'hidden'}>
          <BigPlayerView
            bookId={bookId}
            audioBookData={audioBookDetailsData}
            togglePlayList={togglePlayList}
            index={index}
            setWithoutBGM={()=>setWithoutBGM(!withoutBGM)}
            withoutBGM={withoutBGM}
            isPlaying={isPlaying}
            handleShrink={handleShrink}
            setIsPlaying={(val:boolean)=>setisPlaying(val)}
            hasAccess= {hasAccess}
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
            resumeTimeRef={resumeTimeRef}
            onAudioLoadingChange={setIsAudioLoading}
          />
        </div>
      
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
                  {console.log(epList?.[index]?.name,index,"epList?.[index]?.name")}
                  {epList?.[index]?.name}
                </h2>
                <p className="text-xs text-gray-500">{audiobookData?.name}</p>

                {/* Episode name (bigger) */}
                

                {/* Author name */}
                <p className="text-white text-cn cursor-pointer leading-normal">
                        <Link href={paths?.authors+audioBookDetailsData?.author_name}>{audioBookDetailsData?.author_name}</Link>
                      </p>
              </div>
            </div>
            <div>
              <GradientAudioPlayer 
                toogleForWard={()=>togglePlayList(index+1,epList?.[index+1]?.id)} 
                toogleBackWard={()=>togglePlayList(index-1,epList?.[index-1]?.id)}
                isPlaying={isPlaying} 
                isFirst={index===0}
                isLast={index===epList?.length-1}
                setIsPlaying={(boolean)=>setisPlaying(boolean)} 
                src={audioPlayer} 
                bookId={audioBookDetailsData.id}
                episodeId={epList?.[index]?.id}
                audioRef={audioRef}
                currentTime={currentTime} 
                setCurrentTime={setCurrentTime}
                setPlaybackRate={setPlaybackRate}
                playbackRate={playbackRate}
                setTimerMin={setTimerMin}
                timerMin={timerMin}
                resumeTimeRef={resumeTimeRef}
                onLoadingChange={setIsAudioLoading}
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
          onClose={()=>setShowPayModal(false)}
          // modalClassName="max-w-[680px] w-[90vw] bg-slate-800 w-full h-auto"
        >
          <div className="w-full max-w-[650px] p-4 pt-8 mt-4 rounded-[12px] bg-[#0F172B] relative">
            {/* Header with Book Icon */}
            <div className="text-center mb-5">
              <h1 className="text-cn md:text-xl font-bold text-white">আপনার লিসেনিং প্ল্যান বেছে নিন</h1>
            </div>

            {/* Plan Cards */} 
            <div className={`grid ${audioBookDetailsData?.isSubRestricted?'':"xs2:grid-cols-2"} gap-3`}>
              {/* Rent Plan */}
              <div className="bg-[#BC0974]/10 border-[1.5px] border-[#BC0974] rounded-xl p-1 xs2:p-5 flex flex-col items-center">
                <div className="w-12 h-12 bg-[#BC0974]/10  rounded-[8px] flex items-center justify-center mb-4 border-[1.5px] border-[#BC0974]">
                  <Calendar className="w-6 h-6 text-purple-300" />
                </div>
                
                <h2 className="text-base font-semibold text-white mb-1">এই অডিওবুক টি রেন্ট নিন</h2>
                <p className="text-sm text-gray-300 mb-5">{convertToBanglaDigits(audioBookDetailsData?.rent_duration_in_month*30)} দিন</p>
                
                <button onClick={purchaseAudiobook} className="w-full pink_gradient rounded-[6px] text-white text-sm font-semibold py-1.5 xs2:py-3 px-4  transition-all transform hover:scale-105 shadow-lg">
                  রেন্ট নিন - TK {convertToBanglaDigits(audioBookDetailsData?.price)}
                </button>
              </div>
 
              {/* Premium Plan */}
              {audioBookDetailsData?.isSubRestricted?"":
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
              </div>}
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
                audioBookDetailsData?.price??0
              }
              reducePrice={0}
              bookId={audioBookDetailsData?.id}
            />
          :
          <PaymentOptions
            options={paymentOptions.map((option: any) => ({
              methodName: option.method_name,
              logoUrl: option.image_url,
              apiUrl: option.url,
              vat: option.vat,
            }))}
            callback={(name,url,discountFromChild)=>{
                  console.log('about to pay with discount', discountFromChild);
              return makePayment(name,url,discountFromChild as number)
            }}
            removePromocodeHandler={removeHandler}
            promoData={affIdValue as string}
            addPromocodeHandler={getDiscountedData}
            setPromoData={setAffIdValue as any}
            price={audioBookDetailsData?.price-(Number(reducedPrice))}
            reducePrice={reducedPrice}
            isPromocodeApplied={reducedPrice>0?true:false}
            discountPriceFromChild={true}
          />}
        </div>
      </CommonModal>
      <CommonModal
        isOpen={showAddReviewModal}
        onClose={()=>{setShowAddReviewModal(false)}}
      >
        <AddReviewForm onClose={()=>{setShowAddReviewModal(false)}}  book={audioBookDetailsData}/>
      </CommonModal>
      <CommonModal
        isOpen={expand}
        onClose={()=>{setExpand(false)}}
      >
        <Biography heading="সংক্ষিপ্ত বিবরণী:" text={audiobookData?.description} />
      </CommonModal>
      <CommonModal
        isOpen={showFolderModal}
        onClose={()=>setFolderModal(false)}
      >
        <FoldersModalForBookDetails 
          audioBookId={audioBookDetailsData?.id} 
          closeModal={()=>setFolderModal(false)} 
          loader={editLoader} 
          AddNewFolder={AddNewFolder} 
          folders={folders}
        />
      </CommonModal>
      <CommonModal
        isOpen={ShowDeleteModal?true:false}
        onClose={()=>setShowDeleteModal(null)}
      >
        <DeleteConfirmation
          handleDelete={()=>{RemoveFromPlaylist(ShowDeleteModal||0)}}
          onClose={()=>setShowDeleteModal(null)}
        />
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
      
      {!(user?.is_subscribed===1) && <Ads slotId={3361836254} />}
      {!(user?.is_subscribed===1) && <InFeedAds slotId={1249366126} layoutKey="-fb+5w+4e-db+86" />}
    </>
  );
};

export default dynamic(() => Promise.resolve(AudiobookComponent), {
  ssr: false,
});
