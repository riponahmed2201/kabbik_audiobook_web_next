'use client'
import { fetchDataFromJson, getCategoryData, getPlayListBooks, getPreferenceData, getUserProfile, postSendOtp } from "@/utils/apiServices"
import { MouseEvent, RefObject, useCallback, useEffect, useRef, useState } from "react"
import Cookies from "js-cookie";
import { TCategoryItem, TUserProfile } from "../ui/static/types";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCategories } from "@/store/slicers/categoriesSlice";
import { setUser } from "@/store/slicers/userSlice";
import { decodeWord, isValidMsisdn, normalizeMsisdn } from "@/helpers/commonFunction";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { apiEndPoints } from "@/utils/apiEndpoints";
import { setuserPreference } from "@/store/slicers/userPreferenceSlice";
import { siteConfig } from "@/config/config";
import { paths } from "@/utils/Paths";
import { ReduxShowLoginModal } from "@/store/slicers/LoginSlice";
import { setStaticTexts } from "@/store/slicers/staticTextSlice";
import { setPlaylistValue } from "@/store/slicers/PlaylistSlice";


const useNavbar = () => {
    const [showCategories,setShowCategories]=useState<boolean>(false)
    const [mobileMenu,setMobileMenu]=useState<boolean>(false);
    const [showLoginModal,setShowLoginModal]=useState(false);
    const [showOTPModal,setShowOTPModal]=useState(false);
    const [showPasswordModal,setShowPasswordModal]=useState(false);
    const [showLoginPasswordModal,setShowLoginPasswordModal]=useState(false);
    const [showPhoneOfChangePass,setShowPhoneOfChangePass]=useState(false);
    const header = usePathname();
    const dispatch=useAppDispatch();
    const [showPreferenceCatModal,setShowPreferenceCatModal]=useState(false);
    const [showPreferenceAuthorModal,setShowPreferenceAuthorModal]=useState(false);
    const user=useAppSelector(store=>store.user?.userData)
    const categories=useAppSelector(store=>store.categories?.CategoriesData)

  const [categoryNameData, setCategoryNameData]: any = useState();
  const [userData, setUserData]: any = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribed, setIsSubscribed]: any = useState();

  const [isLoading, setIsLoading] = useState(true);
  const boxRef=useRef<HTMLLIElement>(null);

  const staticText=useAppSelector((store)=>store?.staticTexts?.data?.home_page_steps_by_steps)
  const playListData=useAppSelector(store=>store.playList.playlistData)

  const getPlaylistItems=async()=>{
    let result = await getPlayListBooks();
    dispatch(setPlaylistValue(result.data));
  }
  useEffect(()=>{
    if(playListData.length){
      return
    }
    getPlaylistItems();
  },[])
  
  const getStaticData=async()=>{
      let result = await fetchDataFromJson();
      //console.log(result);
      dispatch(setStaticTexts(result));
  }
  
  useEffect(()=>{
      if(staticText)return;
      getStaticData();
  },[])


  useEffect(() => {
    getProfileData();
    getCategoryData();
    const checkLoginStatus = () => {
      const storedLoginStatus = Cookies.get("isLogin");
      // Use the stored value or a default value if it's not set
      const loginStatus = storedLoginStatus === "true";
      // const subscribeStatus = storedSubscribeStatus === "1";

      setIsLoggedIn(loginStatus);
      // setIsSubscribed(subscribeStatus);
      setIsLoading(false);
    };

    checkLoginStatus();
  }, [getCategoryData, getUserProfile]);

  

    const getCategories=async()=>{
      if(categories && categories.length){
        return;
      }
      const data:TCategoryItem[] | null = await getCategoryData()
      console.log("categories already fetched",data)
      // setCategoriesData(data );
      dispatch(setCategories(data))
    }

    const getProfileData=async()=>{
      if(user?.id){
        return
      }
      const data:TUserProfile|null = await getUserProfile()
        if (data){ 
          dispatch(setUser(data))
          // setUserData(data);
          // setIsSubscribed((data && data?.is_subscribed) ? true : false);
          // Cookies.set("is_subscribed",(data && data?.is_subscribed) ?'1' : '0');
        }
    }

    const getPreference=async()=>{
      if(user?.id){
        let data=await getPreferenceData(user.id as number);
        // alert(JSON.stringify(data.data))
        if(data && data.data.length===0){
          setShowPreferenceCatModal(true);
        }else{
          dispatch(setuserPreference({id:data?.data[0].id,authors:JSON.parse(data?.data[0].authors),categories:JSON.parse(data?.data[0].categories)}))
        }
      }
    }

    useEffect(()=>{
      if(user?.id && (user.id!=Number(siteConfig.defaultUserId)) && !showLoginPasswordModal && !showOTPModal && !showPasswordModal && !showLoginModal ){
        getPreference();
      }
    },[user?.id,showLoginPasswordModal,showOTPModal,showPasswordModal,showLoginModal])

    useEffect(()=>{
      getCategories();
      getProfileData();
    },[])

    useEffect(() => {
      function handleClickOutside(event: globalThis.MouseEvent) {
        if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
          setShowCategories(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleLoginClick=()=>{
      setShowLoginModal(true)
    }

    const closeLoginClick=()=>{
      setShowLoginModal(false)
      dispatch(ReduxShowLoginModal(false));
    }

    const closePasswordClick=()=>{
      setShowPasswordModal(false);
    }

    const closeOTPClick=()=>{
      setShowOTPModal(false);
      // setShowPasswordModal(true);
    }

     const closeLoginPasswordClick=()=>{
      setShowLoginPasswordModal(false);
    }

    const handleloginSubmit=()=>{
      setShowOTPModal(true);
    }

    const handleVerifyOtp=()=>{
      setShowPasswordModal(true);
    }

    const handleShowPasswordModal=()=>{
      setShowPasswordModal(true);
    }

    const closeShowPhoneOfChangePass=()=>{
      setShowPhoneOfChangePass(false);
    }

    const handleSubmit=async(e:MouseEvent<HTMLButtonElement>,phoneNumbers:string)=>{
      e.preventDefault();
      Cookies.set("msisdn", normalizeMsisdn(phoneNumbers)??'',{
        expires: 365,secure: true,          
        sameSite: 'None'
      });
      
      // setSubmitLoader(true);
      const data = await postSendOtp(normalizeMsisdn(phoneNumbers));
      setShowLoginModal(false)
       dispatch(ReduxShowLoginModal(false));

      if(data.created){
        setShowOTPModal(true);
      }else if(data.message==="password settled"){
        setShowLoginPasswordModal(true);
      }else{
        toast.error("কিছু ভুল হয়েছে। দয়া করে গ্রাহক সেবার সাথে যোগাযোগ করুন।")
      }
      
      // setSubmitLoader(false)
    }

    const handleClickForgetPassword=()=>{
      setShowLoginPasswordModal(false);
      setShowPhoneOfChangePass(true);
    }

    const handlePhoneOfChangePassword= async(phone:string):Promise<void>=>{
      let result=await  postSendOtp(phone,true)
      if(!result?.created){
      }else{
        setShowOTPModal(true);
        setShowPhoneOfChangePass(false);
      }
    }

    const closePreferenceCatModal=()=>{
      setShowPreferenceCatModal(false);
    }
    const closePreferenceAuthorModal=()=>{
      setShowPreferenceAuthorModal(false);
    }

    const showPrepAuthorModal=()=>{
      setShowPreferenceCatModal(false);
      setShowPreferenceAuthorModal(true);
    }

    const isCategoryPage=(pathname:string)=>{
      let result = true;
      
      if(pathname==='')return false;
      
      Object.values(paths).forEach((item)=>{
        if(typeof item ==='string' && decodeWord(pathname).includes(item) && pathname!=='' ){
          //console.log(item,decodeWord(pathname))
          result= false;
          return;
        }
      })
      return result;
    }

    const isloggedIn=()=>{
      //console.log(user?.id , user?.id!==2820,"userhala")
      if(user?.id && user?.id!==2820){
        return true
      }else{
        return false
      }
    }
  return {showCategories,isCategoryPage,boxRef,setShowCategories,user,categories,setMobileMenu,mobileMenu,showLoginModal,showOTPModal,showPasswordModal,showLoginPasswordModal,handleLoginClick,handleloginSubmit,handleVerifyOtp,closeLoginClick,closePasswordClick,closeOTPClick,handleSubmit,closeLoginPasswordClick,handleShowPasswordModal,handlePhoneOfChangePassword,showPhoneOfChangePass,closeShowPhoneOfChangePass,handleClickForgetPassword,showPreferenceCatModal,showPreferenceAuthorModal,closePreferenceCatModal,closePreferenceAuthorModal,showPrepAuthorModal,isloggedIn}
}

export default useNavbar