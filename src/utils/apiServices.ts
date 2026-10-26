import Cookies from "js-cookie";
import { apiEndPoints } from "./apiEndpoints";
import { toast } from "react-toastify";
// import { formatTime, showToast } from "";
import { BkashOneTimePayload, BkashRecurringPayload, BlogInfo, DynamicSubscriptionPack, GPPayload, RobiPayload, TMethods, TtoastType } from "@/helpers/commonTypes";
import { formatTime, getCookiesAsObject, getCountryCode, getCountryCode2, getCurrentMonthFirstDate, getDeviceInfo, getOrCreateDeviceId, normalizeMsisdn, showToast } from "@/helpers/commonFunction";
import { CommonApiHandler, getHeaders } from "./CommonApicalls";
import { TGamezopTracker, TSponsorRequest } from "./types";
import { ContinueBookStatusResponse, UpdateUserPayload } from "@/components/ui/static/types";
import { siteConfig } from "@/config/config";
import { UserActionTrack } from "@/components/Profile/static/profile.type";

export const subscriptionPack = async (id: any) => {
  const url = `${apiEndPoints.packDetailsApi}${id}`;
 return await CommonApiHandler(
    {
      name: "subscriptionPack",
      url,
      method: TMethods.GET,
    }
 )
};

export const user_total_listening_time = async (user_id: number) => {
  const url = `${apiEndPoints.user_total_listening_time}?user_id=${user_id}`;
 return await CommonApiHandler(
    {
      name: "user_total_listening_time",
      url,
      method: TMethods.GET,
    }
 )
};

export const getNotifications = async (userId:number,page:number) => {
  const url = `${apiEndPoints.notificationGetUrl}?userId=${userId}&page=${page}&limit=15`;
 return await CommonApiHandler(
    {
      name: "getNotifications",
      url,
      method: TMethods.GET,
    }
 )
};

export const unreadNotificationCount = async (userId:number) => {
  const url = `${apiEndPoints.unreadCount}?userId=${userId}`;
 return await CommonApiHandler(
    {
      name: "unreadNotificationCount",
      url,
      method: TMethods.GET,
    }
 )
};


export const MakeReadNotification = async (
  userId: number,
  notificationId: number
) => {
  
  const url = apiEndPoints.markAsRead;
  const raw = JSON.stringify( {"userId": userId, "notificationId": notificationId});
  return await CommonApiHandler(
    {
      name: "MakeReadNotification",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
    }
 )
};


export const NewsLetterNotificationSubs = async (
  userId: number |string,
  email: string
) => {
  
  const url = apiEndPoints.create_email_notification;
  const raw = JSON.stringify( {"userId":userId,"email":email});
  return await CommonApiHandler(
    {
      name: "NewsLetterNotificationSubs",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
    }
 )
};


export const paymentMethodlist = async (
  forPackage: number,
  withRenewal: number
) => {
  let country = await getCountryCode()
  console.log(country, "country listing")  
  const url = apiEndPoints.paymentMethodList;
  const raw = JSON.stringify({
    forPackage,
    userId: Cookies.get("id"),
    userCountry:country,
    withRenewal,
  });
  return await CommonApiHandler(
    {
      name: "paymentMethodlist",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
    }
 )
};

export const loginWithPassword = async (
  password: string
) => {
  let msisdn=Cookies.get('msisdn')??'';
  const url = apiEndPoints.loginWithPassword;
  let device_id = getOrCreateDeviceId();
  let info=getDeviceInfo();
  const raw = JSON.stringify({
    msisdn:normalizeMsisdn(msisdn),
    password,
    device_name:info.device_name,
    os:info.os,
    device_id:device_id,
    model:info.model,
    user_agent:info.user_agent,
  });
  return await CommonApiHandler(
    {
      name: "loginWithPassword",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
    }
 )
};


export const logout = async (
  userId?:number,
  deviceId?:string
) => {
  const url = apiEndPoints.logOutApi;
  let device_id = getOrCreateDeviceId();

  const raw = JSON.stringify({
    user_id:userId,
    device_id: deviceId || device_id
  });
  return await CommonApiHandler(
    {
      name: "logout",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
    }
 )
};


export const getDeviceList = async () => {
  const url = apiEndPoints.deviceList;

  return await CommonApiHandler(
    {
      name: "deviceList",
      url,
      method: TMethods.GET,
    }
 )
};

export const bkashUnSubscribeUserApi = async (subscription_id: any) => {
  const url = `${apiEndPoints.bkashUnSubscribeApi}?userId=${Cookies.get(
    "id"
  )}&subscriptionid=${subscription_id}`;

  return await CommonApiHandler(
    {
      name: "bkashUnSubscribeUserApi",
      url,
      method: TMethods.DELETE,
      body:null,
      defaultTokenAllowed:false
    }
 )
};

export const RemoveBooksFromPlaylist = async (id: number|string) => {
  const url = `${apiEndPoints.removeBooksFromPlaylist}${id}`;

  return await CommonApiHandler(
    {
      name: "RemoveBooksFromPlaylist",
      url,
      method: TMethods.DELETE,
      body:null,
      defaultTokenAllowed:false
    }
 )
};

export const robiUnSubscribeUserApi = async (msisdn: any,packageId: any) => {
  const url = `${apiEndPoints.robiUnsubscribeApi}`;
  const raw = JSON.stringify({
    userId: Cookies.get("id"),
    msisdn: `+88${msisdn}`,
    packageId:packageId
  });
  return await CommonApiHandler(
    {
      name: "robiUnSubscribeUserApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
      defaultTokenAllowed:false
    }
 )
};

export const sponsor_request = async (payload:TSponsorRequest) => {
  const url = `${apiEndPoints.sponsor_request}`;
  const raw = JSON.stringify(payload);
  return await CommonApiHandler(
    {
      name: "sponsor_request",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
      defaultTokenAllowed:false
    }
 )
};

export const gamezop_stat_tracker = async (payload:TGamezopTracker) => {
  const url = `${apiEndPoints.gamezop_stat_tracker}`;
  const raw = JSON.stringify(payload);
  return await CommonApiHandler(
    {
      name: "sponsor_request",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
    }
 )
};

export const postFavoritesApi = async (id: any) => {
 const url = apiEndPoints.favPostApi;
  const raw = JSON.stringify({
    user_id: Cookies.get("id"),
    audiobook_id: id,
  });
  return await CommonApiHandler(
    {
      name: "postFavoritesApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const setPasswordApi = async (password: string) => {
 const url = apiEndPoints.setPassword;
  const raw = JSON.stringify({
    user_id: Cookies.get("id") ?? Cookies.get("user_id"),
    password,
  });
  return await CommonApiHandler(
    {
      name: "setPasswordApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const getPreferenceData = async (userId: string |number) => {
 const url = apiEndPoints.get_preference;
  const raw = JSON.stringify({
    user_id: userId
  });
  return await CommonApiHandler(
    {
      name: "getPreferenceData",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};


export const claim_reward = async (userId:number,tierId:number,rewardId:number,payload:any) => {
 const url = apiEndPoints.claim_reward;
  const raw = JSON.stringify({
    userId,
    tierId,
    rewardId,
    user_additional_info:payload
  });
  return await CommonApiHandler(
    {
      name: "claim_reward",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};


export const create_reward = async (userId:number|string,taskId:number|string) => {
  const url = `${apiEndPoints.create_reward}?userId=${userId}&taskId=${taskId}`;
  return await CommonApiHandler(
    {
      name: "create_reward",
      url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
 )
};

export const all_tier_reward = async (userId:number|string) => {
  const url = `${apiEndPoints.all_tier_reward}?userId=${userId}`;
  return await CommonApiHandler(
    {
      name: "all_tier_reward",
      url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
 )
};

export const getUser_reward_profile = async (userId:number|string) => {
  const url = `${apiEndPoints.getUser_reward_profile}?userId=${userId}`;
  return await CommonApiHandler(
    {
      name: "getUser_reward_profile",
      url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
 )
};

export const reward_faq = async () => {
  const url = `${apiEndPoints.reward_faq}`;
  return await CommonApiHandler(
    {
      name: "reward_faq",
      url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
 )
};

export const reward_tasks = async () => {
  const url = `${apiEndPoints.reward_tasks}`;
  return await CommonApiHandler(
    {
      name: "reward_tasks",
      url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
 )
};


export const user_point_details = async (userId:number|string,type:string,page=1) => {
  const url = `${apiEndPoints.user_point_details}?type=${type}&userId=${userId}&page=${page}&limit=30`;
  return await CommonApiHandler(
    {
      name: "user_point_details",
      url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
 )
};



export const gpUnsubscribeApi = async () => {
  const url = `${apiEndPoints.gpUnsubscribeApi}?userId=${Cookies.get("id")}`;
  return await CommonApiHandler(
    {
      name: "gpUnsubscribeApi",
      url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
 )
};




export const deleteFavoritesApi = async (id: any) => {
    const url = `${
        apiEndPoints.favDeleteApi
    }?audiobook_id=${id}&user_id=${Cookies.get("id")}`;
    return await CommonApiHandler(
        {
        name: "deleteFavoritesApi",
        url,
        method: TMethods.DELETE,
        defaultTokenAllowed:false 
        }
    )
}

export const postVerifyOtp = async (otp: any) => {
  const url = apiEndPoints.verifyOtp;
  let device_id = getOrCreateDeviceId();
  let info=getDeviceInfo();
  const raw = JSON.stringify({
    msisdn: `${Cookies.get("msisdn")}`,
    password: otp,
    device_id,
    device_name:info.device_name,
    os:info.os,
    model:info.model,
    user_agent:info.user_agent,
  });
  return await CommonApiHandler(
    {
      name: "postVerifyOtp",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false,
      catchCB: (err:any) => {
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        });
      }
    }
 )
};



export const postSendOtp = async (msisdn: any,set_password?:boolean) => {
    const url = apiEndPoints.sendOtp;
    const currentTimeLong = Date.now();
    const raw = JSON.stringify({
        msisdn: `${msisdn}`,
        currentTimeLong: currentTimeLong,
        passKey:Cookies.get('passKey'),
        set_password
    });
    let data:any=await CommonApiHandler(
        {
            name: "postSendOtp",
            url,
            method: TMethods.POST,
            body: raw ? raw : null,
            defaultTokenAllowed:false,
            catchCB: (err:any) => {
                showToast('Something went wrong',TtoastType?.error,3000)
            }
        }
    )
    if (
    data?.remainingTime && data?.created!=true
    ) {
    showToast(`Please try after ${formatTime(data.remainingTime)}`,TtoastType.success,3000)
    return data;
    }else{
      //console.log(data,"data")
      if(data.message!=="password settled" && data?.created===true){
        showToast("OTP Sent!",TtoastType?.success,3000)
      }else{
        if(data.message!=="password settled"){
          data.message!=="password settled"
        }
      }
    }
    return data;
};

export const postSendOtpOlder = async (msisdn: any) => {
    const url = apiEndPoints.sendOtpOlder;
    const currentTimeLong = Date.now();
    const raw = JSON.stringify({
        msisdn: `88${msisdn}`,
        currentTimeLong: currentTimeLong,
    });
    let data:any= CommonApiHandler(
        {
            name: "postSendOtp",
            url,
            method: TMethods.POST,
            body: raw ? raw : null,
            defaultTokenAllowed:false,
            catchCB: (err:any) => {
                showToast('Something went wrong',TtoastType?.error,3000)
            }
        }
    )
    if (
    data?.remainingTime && data?.created!=true
    ) {
    showToast(`Please try after ${formatTime(data.remainingTime)}`,TtoastType.success,3000)
    return data;
    }else{
      if(data.message!=="password settled" && data?.created==true){
        showToast("OTP Sent!",TtoastType?.success,3000)
      }else{
        showToast("Something went wrong!",TtoastType?.error,3000)
      }
    }
    return data;
};

export const postLoginApi = async () => {
  const url = apiEndPoints.loginApi;
  const raw = JSON.stringify({
    user_name: `88${Cookies.get("msisdn")}`,
    full_name: "user",
    auth_src: "phone",
    image_url: null,
    channel: "web",
  });
  return await CommonApiHandler(
    {
      name: "postLoginApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const promocodeHandlerV2= async (bookId:number|string,promoData:string|null) => {
    if(!promoData){
      return;
    }
    let promoCodeData
    try{
      promoCodeData = await getPromoCodeApi(
        bookId,
        promoData
      );
      if (promoCodeData.success === "false") {
        toast.error("Invalid promo code");
        return;
      }
    }catch(e:any){
      //console.log(e.message);
      
    }
    if (Object.keys(promoCodeData).length) {
      // subscriptionPackData.reduce_price = promoCodeData.data.reduce_price;
      // subscriptionPackData.promo_code = promoData;
      // setPromoCode(promoCodeData.data);
      toast.success("Promo Code Added!", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.error("Invalid Promo Code!", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }
    return promoCodeData.data?.reduce_price;
  };


  export const promocodeHandlerForBook= async (bookId:number|string,promoData:string|'',amount:number,type='rent') => {
    const url = `${
      apiEndPoints.bookPromoCode
    }`;
    const requestOptions = JSON.stringify({
        "promoCode": promoData.trim(),
        "promoType": type,
        "productId": bookId.toString(),
        "amount": amount.toString()
      })
    
    return await CommonApiHandler(
    {
      name: "postLoginApi",
      url,
      method: TMethods.POST,
      body: requestOptions ? requestOptions : null,
      defaultTokenAllowed:false 
    }
 )
};

export const postLoginApi1 = async (number:string) => {
  const url = apiEndPoints.loginApi;
  const raw = JSON.stringify({
    user_name: `88${number}`,
    full_name: "user",
    auth_src: "phone",
    image_url: null,
    channel: "web",
  });
  return await CommonApiHandler(
    {
      name: "postLoginApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const postReview = async (id: any, rating_num: any, review: any) => {
  const url = `${apiEndPoints.addReview}${id}/analytics/ratings`;
  const raw = JSON.stringify({
    rating: rating_num,
    review: review,
    user_id: Cookies.get("id"),
  });
   return await CommonApiHandler(
    {
      name: "postReview",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const postSearch = async (search_text: any) => {
  const url = apiEndPoints.searchApi;
  const raw = JSON.stringify({
    text: search_text,
  });
  return CommonApiHandler(
    {
      name: "postSearch",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const addBooksToPlaylistFolders = async (audiobook_id:number|string,folders_id:string) => {
  const url = apiEndPoints.add_books_tofolder;
  const raw = JSON.stringify({
    folders_id,
    audiobook_id
  });
  return CommonApiHandler(
    {
      name: "addBooksToPlaylistFolders",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const postBookRequest = async (
  user_name: any,
  bookname: any,
  writer: any,
  language: any,
  category: any
) => {
  const url = apiEndPoints.bookRequestPostApi;
  const raw = JSON.stringify({
    name: user_name,
    bookname: bookname,
    writer: writer,
    language: language,
    category: category,
  });
  return await CommonApiHandler(
    {
      name: "postBookRequest",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const updateProfile = async (payloadData: any) => {
  const url = `${apiEndPoints.updateProfile}${Cookies.get("id")}`;
  var raw = JSON.stringify({
    full_name: payloadData.full_name,
    phone_email: `${Cookies.get("msisdn")}`,
    city_name: payloadData.city_name,
    address: payloadData.address,
    post_code: payloadData.post_code,
  });

  return await CommonApiHandler(
    {
      name: "updateProfile",
      url,
      method: TMethods.PUT,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};


export async function updateUser(
  userId: number,
  payload: UpdateUserPayload
): Promise<{ success: boolean }> {
  const formData = new FormData();

  // Text fields
  formData.append("full_name", payload.full_name);
  formData.append("phone_email", payload.phone_email);
  formData.append("city_name", payload.city_name);
  formData.append("address", payload.address);
  formData.append("post_code", payload.post_code);

  // File field (MUST be "files")
  formData.append("files", payload.file||'');

  const userToken = Cookies.get("token") ? Cookies.get("token") : siteConfig.defaultToken;

  const response = await fetch(
    `${apiEndPoints.updateProfileWithImage}${userId}`,
    {
      method: "PUT", // or POST (match backend)
      body: formData,
      credentials: "include", // only if cookies/auth needed
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  // const myHeaders = new Headers();
  // if(!noToken){
  //     myHeaders.append("Authorization", `Bearer ${userToken}`);
  // }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to update user");
  }

  return response.json();
}



export const robiPostApi = async (payloadData: any) => {
  const url = apiEndPoints.robiPaymentApi;
  let firstPrice =
    payloadData.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    userId: Cookies.get("id"),
    packageId: payloadData.subscriptionItemId,
    from_channel: "web",
    from_source: "web",
    from_autorenewal: payloadData.isOnetime ? 0 : 1,
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
    ...getCookiesAsObject()
  });
  return await CommonApiHandler(
    {
      name: "robiPostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const blDcbPostApi = async (payloadData: any) => {
  const url = apiEndPoints.blDcbPaymentApiUrl;
  var raw = JSON.stringify({
    msisdn: payloadData.msisdn,
    userId: payloadData.userId,
    packageId: payloadData.packageId,
    fromRenewal: payloadData.fromRenewal ? 1 : 0,
  });
  return await CommonApiHandler(
    {
      name: "blDcbPostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};

export const blDcbVerifyApi = async (payloadData: any) => {
 const url = apiEndPoints.blDcbVerifyApiUrl;
  var raw = JSON.stringify({
    msisdn: payloadData.msisdn,
    consent: payloadData.consent,
  });
  return await CommonApiHandler(
    {
      name: "blDcbVerifyApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const blDcbUnsubscribeApi = async (userId: any) => {
  const url = apiEndPoints.blDcbUnsubscribeApiUrl;
  var raw = JSON.stringify({
    userId: userId,
  });
  return await CommonApiHandler(
    {
      name: "blDcbUnsubscribeApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const gpPostApi = async (
  payloadData: DynamicSubscriptionPack & {
    reduce_price?: number;
    promo_code?: string;
    msisdn: string;
  }
) => {
  const url = apiEndPoints.gpPaymentApi;

  const raw = JSON.stringify({
    amount: payloadData.rawPrice - (payloadData?.reduce_price ?? 0),
    currency: "BDT",
    userId: Cookies.get("id"),
    packageId: payloadData.subscriptionItemId,
    renewal: payloadData.isOnetime ? 0 : 1,
    promoCode: payloadData.promo_code,
    msisdn: "88" + payloadData.msisdn,
    firstPayment: 1,
    purpose: "subscription",
    trafficSource: "Kabbik",
    platform: "Web",
    ...getCookiesAsObject()
  });
  return await CommonApiHandler(
    {
      name: "gpPostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

// export const stripePostApi = async () => {};

export const bkashOfferYearly = async (payloadData: any) => {
  const url = `${apiEndPoints.bkashOneTimePaymentApi}`;

  var raw = JSON.stringify({
    amount: payloadData.amount.toString(),
    packageId: payloadData.packageId,
    methodName: payloadData.methodName,
    source: payloadData.source,
    userId: Cookies.get("id"),
  });

  return await CommonApiHandler(
    {
      name: "bkashOfferYearly",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const bkashOneTimePostApi = async (payloadData: any) => {
  const url = `${apiEndPoints.bkashOneTimePaymentApi}`;
  let firstPrice =
    payloadData.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    packageId: payloadData.subscriptionItemId,
    methodName: "bkash",
    source: "web",
    userId: Cookies.get("id"),
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
  });
  return await CommonApiHandler(
    {
      name: "bkashOneTimePostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const bkashPostApi = async (payloadData: any) => {
  const url = `${apiEndPoints.bkashPaymentApi}`;
  let eDate = new Date().setDate(new Date().getDate() + 730);
  let firstPrice =
    payloadData.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  
  var raw = JSON.stringify({
    AMOUNT: payloadData.rawPrice?.toString(),
    FIRSTPAYMENTAMOUNT: firstPrice.toString(),
    CURRENCY: "BDT",
    FREQUENCY: payloadData.frequency,
    STARTDATE: new Date().toISOString().slice(0, 10),
    EXPIRYDATE: new Date(eDate).toISOString().slice(0, 10),
    USERID: Cookies.get("id"),
    PACKAGEID: payloadData.subscriptionItemId,
    subscripRequestFrom: "web",
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
    ...getCookiesAsObject()
  });
  return await CommonApiHandler(
    {
      name: "bkashPostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const paymentForPurchaseAudiobook = async (
  url: string,
  payloadData: any
) => {
  const raw = JSON.stringify(payloadData);
  
  return await CommonApiHandler(
    {
      name: "paymentForPurchaseAudiobook",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const nagadPurchaseAudiobook = async (payload: any) => {
  const raw = JSON.stringify(payload);

  return await CommonApiHandler(
    {
      name: "nagadPurchaseAudiobook",
      url:payload.url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const nagadPostApi = async (payloadData: any) => {
 const url = `${apiEndPoints.nagadPaymentApi}`;
  let firstPrice =
    payloadData?.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    userId: Cookies.get("id"),
    packageId: payloadData?.subscriptionItemId,
    from_channel: "web",
    from_source: "web",
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
  });
  return await CommonApiHandler(
    {
      name: "nagadPostApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const upayPostApi = async (payloadData: any) => {
 const url = `${apiEndPoints.upayPaymentApi}`;
  let firstPrice =
    payloadData?.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    userId: Cookies.get("id"),
    packageId: payloadData?.subscriptionItemId,
    from_channel: "web",
    from_source: "web",
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
  });
  return await CommonApiHandler(
    {
      name: "upayPostApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const aamarpayPostApi = async (payloadData: any, userData: any) => {
  const url = `${apiEndPoints.aamarpayPaymentAPi}`;
  let firstPrice =
    payloadData.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    promo_code: payloadData.promo_code ? payloadData.promo_code : "",
    type: "subscription",
    source: "Kabbik",
    platform: "web",
    userId: userData.id,
    productId: payloadData.subscriptionItemId,
    name: userData.full_name,
    phone: userData.phone_no,
    address: userData.address,
  });
  return await CommonApiHandler(
    {
      name: "aamarpayPostApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const paymentVerify = async (order_id: any) => {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
  const url = `${apiEndPoints.verifyPayment}`;
  var raw = JSON.stringify({
    sp_order_id: order_id,
  });
  return await CommonApiHandler(
    {
      name: "paymentVerify",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const postEpisodePlayCountApi = async (id: any) => {
  const url = `${apiEndPoints.episodePlayCount}${id}/analytics/play-counts-episode?id=${id}`;

  const raw = JSON.stringify({
    userId: Cookies.get("id"),
    fromChannel: "web",
  });
  return await CommonApiHandler(
    {
      name: "postEpisodePlayCountApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const postAudiobookPlayCountApi = async (id: any) => {
 const url = `${apiEndPoints.audioBookPlayCount}${id}/analytics/play-counts?id=${id}`;

  const raw = JSON.stringify({
    userId: Cookies.get("id"),
    fromChannel: "web",
  });
  return await CommonApiHandler(
    {
      name: "postAudiobookPlayCountApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const getPromoCodeApi = async (pack_id: any, promo_id: any) => {
 const url = `${
    apiEndPoints.promoCodeGet
  }for_package=${pack_id}&user_id=${Cookies.get("id")}&promocode=${promo_id}`;

  return await CommonApiHandler(
    {
      name: "getPromoCodeApi",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false 
    }
  )
};

export const redeemCodePostApi = async (redeemCode: any) => {
 const userId = Cookies.get("id");
const url = apiEndPoints.redeemCodeApi;
  var raw = JSON.stringify({
    code: redeemCode,
    userId: userId,
  });
  return await CommonApiHandler(
    {
      name: "redeemCodePostApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const postGoogleLogin = async (token_id: any) => {
  const url = apiEndPoints.postGooglAuth;
  
  let info=getDeviceInfo();
  let device_id = getOrCreateDeviceId();

  var raw = JSON.stringify({
    token: token_id,
    channel: "web",
    device_name:info.device_name,
    os:info.os,
    device_id:device_id,
    model:info.model,
    user_agent:info.user_agent,
  });
  return await CommonApiHandler(
    {
      name: "postGoogleLogin",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false,
      noToken:true 
    }
  )
};

export const postFacebookLogin = async (facebookAuth: {
  providerAccountId: string;
  accessToken?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}) => {
  const url = apiEndPoints.postFacebookAuth;
  const device_id = getOrCreateDeviceId();
  const info = getDeviceInfo();

  let email = facebookAuth.email ?? null;
  if (!email && facebookAuth.accessToken) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/me?fields=email&access_token=${facebookAuth.accessToken}`
      );
      const data = await res.json();
      email = data?.email ?? null;
    } catch {
      // keep null
    }
  }

  const body = JSON.stringify({
    data: {
      id: facebookAuth.providerAccountId,
      name: facebookAuth.name,
      email,
      picture: facebookAuth.image,
    },
    access_token: facebookAuth.accessToken ?? null,
    device_info: {
      id: device_id,
      os: info.os ?? "Web",
      name: info.device_name ?? "Browser",
      model: info.model ?? "Browser",
      brand: "Web",
      version: "1.0.0",
      isPhysicalDevice: false,
      systemVersion: "Web",
    },
  });

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const resData = await response.json();

  if (response.status === 403) {
    return {
      ...resData,
      deviceId: device_id,
      deviceLimitExceed: true,
    };
  }

  return {
    ...resData,
    deviceId: device_id,
    deviceLimitExceed: resData?.deviceLimitExceed === true,
  };
};

export const accountDeletion = async (
  userName: any,
  phoneNo: any,
  userEmail: any,
  reason: any
) => {
  const url = apiEndPoints.accountDelete;

  const raw = JSON.stringify({
    name: userName,
    phone: phoneNo,
    email: userEmail,
    reason: reason,
  });
  return await CommonApiHandler(
    {
      name: "accountDeletion",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const getPurchasedAudiobooks = async (userId: number|string) => {
  const url = `${apiEndPoints.getPurchasedAudiobooks}${userId}`;
 
  return await CommonApiHandler(
    {
      name: "getPurchasedAudiobooks",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const getAllCourse = async () => {
  const userId = Cookies.get("id");
  const url = apiEndPoints.getAllCourse + userId;
  
  return await CommonApiHandler(
    {
      name: "getAllCourse",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false 
    }
  )
};

export const bkashPurchaseCourse = async (payloadData: any) => {
    const url = `${apiEndPoints.bkashPurchaseCourse}`;
    const raw = JSON.stringify(payloadData);
  
  return await CommonApiHandler(
    {
      name: "bkashPurchaseCourse",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

export const getPurchasedCourse = async (id:number|string) => {
    // const userId = Cookies.get("id");
  const url = `${apiEndPoints.getPurchasedCourse}${id}`;
  return await CommonApiHandler(
    {
      name: "getPurchasedCourse",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false 
    }
  )
};

export async function homeListData() {
 const url = apiEndPoints.homeList;
  console.log(url,"url-apiService")
  return await CommonApiHandler(
    {
      name: "homeListData",
      url:url,
      method: TMethods.GET,
    }
  )
}

export async function topBanner() {
  const url = apiEndPoints.topbannerImage;
  
  return await CommonApiHandler(
    {
      name: "topBanner",
      url:url,
      method: TMethods.GET,
    }
  )
}

export const premiumList = async () => {
 return await CommonApiHandler(
    {
      name: "premiumList",
      url:apiEndPoints.premuimAudioBookList,
      method: TMethods.GET,
    }
  )
};

export const promoBannerList = async () => {
  const url = apiEndPoints.promoBannerList;
  return await CommonApiHandler(
    {
      name: "promoBannerList",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const categorySuggestions = async () => {
  const url = apiEndPoints.catagorySuggestions;
   return await CommonApiHandler(
    {
      name: "categorySuggestions",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const fetchDataFromJson = async () => {
  const url =
    "https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-jsons/kabbik_new_jest.json";
   const result = await CommonApiHandler(
    {
      name: "fetchDataFromDigitalSpaceJson",
      url:url,
      method: TMethods.GET,
      notNeedHeaders:true
    }
  );
  return result;
};

export const fetchReferAndEarn = async () => {
  const url =
    "https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-jsons/refer_style.json";
   return await CommonApiHandler(
    {
      name: "fetchDataFromDigitalSpaceJson",
      url:url,
      method: TMethods.GET,
      notNeedHeaders:true
    }
  )
};

export const userProfile = async () => {
  const userId = Cookies.get("id") ;
  if(userId==='2820')return;
   return await CommonApiHandler(
    {
      name: "userProfile",
      url:`${apiEndPoints.getuserProfileApi}${userId}`,
      method: TMethods.GET,
    }
  )
};

export const insert_earn_log = async () => {
   return await CommonApiHandler(
    {
      name: "insert_earn_log",
      url:`${apiEndPoints.insert_earn_log}`,
      method: TMethods.GET,
    }
  )
};

export const userContinue = async () => {
    const defaultUserId = "2820";
    const userId = Cookies.get("id") ? Cookies.get("id") : defaultUserId;
    return await CommonApiHandler(
        {
            name: "userContinue",
            url: `${apiEndPoints.continueListeningGet}${userId}`,
            method: TMethods.GET,
        }
    )
};

export const academicList = async () => {
 const url = apiEndPoints.academicList;
 return await CommonApiHandler(
    {
      name: "academicList",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const upcomingList = async () => {
  const url = apiEndPoints.upComingApi+"?version=2";
  
   return await CommonApiHandler(
    {
      name: "upcomingList",
      url:url,
      method: TMethods.GET
    }
  )
};

export const leaderboard_top_listners = async (userId:number) => {
  let endDate= new Date().toISOString().split('T')[0];;
  const url = apiEndPoints.leaderboard_top_listners+`?startDate=${getCurrentMonthFirstDate()}&endDate=${endDate}&user_id=${userId}`;
  
   return await CommonApiHandler(
    {
      name: "leaderboard_top_listners",
      url:url,
      method: TMethods.GET
    }
  )
};

export const podcastList = async () => {
    const url = apiEndPoints.podcastList;
    
    return await CommonApiHandler(
        {
            name: "podcastList",
            url:url,
            method: TMethods.GET,
        }
    )
};

export const freeAudiobookList = async () => {
  const url = apiEndPoints.freeAudioBookList;
 
  return await CommonApiHandler(
    {
      name: "freeAudiobookList",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const userSummary = async () => {
  const userId = Cookies.get("id") ? Cookies.get("id") : "2820";
  const url = `${apiEndPoints.userSummary}${userId}`;

  return await CommonApiHandler(
    {
      name: "userSummary",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const favoriteAudiobook = async () => {
  
    const userId = Cookies.get("id") ? Cookies.get("id") : "2820";
    const url = `${apiEndPoints.favoriteAudioBookList}?user_id=${userId}`;
  return await CommonApiHandler(
    {
      name: "favoriteAudiobook",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const authorDetails = async (name: string) => {
  const url = `${apiEndPoints.authorDetails}${name}`;
  
  return await CommonApiHandler(
    {
      name: "authorDetails",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const authorEpisodes = async (name: string) => {
  const url = `${apiEndPoints.authorEpisodes}${name}`;
 
  return await CommonApiHandler(
    {
      name: "authorEpisodes",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const castDetails = async (name: string) => {
  const url = `${apiEndPoints.castCrewDetails}${name}`;
  return await CommonApiHandler(
    {
      name: "castDetails",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const castEpisodes = async (name: string) => {
 const url = `${apiEndPoints.castCrewEpisodes}${name}`;
  
  return await CommonApiHandler(
    {
      name: "castEpisodes",
      url:url,
      method: TMethods.GET
    }
  )
};

export const homeCatagoryItems = async (name: any) => {
  const url = `${apiEndPoints.homeCategoryItems}${name}`;
  
  return await CommonApiHandler(
    {
      name: "homeCatagoryItems",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const catagoryItemList = async (id: any) => {
  const url = `${apiEndPoints.catagoryItems}${id}`;
  
  return await CommonApiHandler(
    {
      name: "catagoryItemList",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const catagoryList = async () => {
  const url = apiEndPoints.catagoryList;
  return await CommonApiHandler(
    {
      name: "catagoryList",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const getPlayListBooks = async () => {
  const url = apiEndPoints.get_playlist_books;
  return await CommonApiHandler(
    {
      name: "getPlayListBooks",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
  )
};

export const user_earning = async (userId:number) => {
  const url = apiEndPoints.user_earning+`?userId=${userId}`;
  return await CommonApiHandler(
    {
      name: "user_earning",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
  )
};

export const user_claim_history = async (userId:number,fromDate:string,toDate:string,status='ALL') => {
  const url = apiEndPoints.user_claim_history+`?userId=${userId}&fromDate=${fromDate}&toDate=${toDate}&status=${status}`;
  return await CommonApiHandler(
    {
      name: "user_claim_history",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
  )
};

export const get_total_earn = async (userId:number) => {
  const url = apiEndPoints.get_total_earn+`?userId=${userId}`;
  return await CommonApiHandler(
    {
      name: "get_total_earn",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
  )
};

export const get_refer_history = async (userId:number,fromDate:string,toDate:string,status='ALL') => {
  const url = apiEndPoints.get_refer_history+`?userId=${userId}&fromDate=${fromDate}&toDate=${toDate}`;
  return await CommonApiHandler(
    {
      name: "get_refer_history",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
  )
};

export const subscriptionList = async (source:any) => {
  let url = apiEndPoints.new_packageList ;
  if(source?.value==='city_touch'){
      url = apiEndPoints.new_packageList + "?domain=citytouch";
  }
  if(source==='web_cpa'){
      url = apiEndPoints.new_packageList + "?domain=web_cpa";
  }

  let countryCode = await getCountryCode()
  return await CommonApiHandler(
    {
      name: "subscriptionList",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify({ "countryAccess": countryCode  })
    }
  )
};


export const continue_listen_stat_post = async (payload:ContinueBookStatusResponse) => {
  let url = apiEndPoints.continue_listen_stat_post ;
  
  return await CommonApiHandler(
    {
      name: "continue_listen_stat_post",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify(payload)
    }
  )
};

export const join_quizes = async (payload:any) => {
  let url = apiEndPoints.join_quizes ;
  
  return await CommonApiHandler(
    {
      name: "join_quizes",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify(payload)
    }
  )
};


export const submit_quizes = async (payload:any) => {
  let url = apiEndPoints.submit_quizes ;
  
  return await CommonApiHandler(
    {
      name: "submit_quizes",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify(payload)
    }
  )
};


export const get_Quizes = async (userId:number|string) => {
  let url = apiEndPoints.get_Quizes+`?userId=${userId}` ;
  
  return await CommonApiHandler(
    {
      name: "get_Quizes",
      url:url,
      method: TMethods.GET,
      // body:JSON.stringify(payload)
    }
  )
};



export const prevMatches = async () => {
  let url = apiEndPoints.prevMatches ;
  
  return await CommonApiHandler(
    {
      name: "prevMatches",
      url:url,
      method: TMethods.GET,
      // body:JSON.stringify(payload)
    }
  )
};



export const getWinners = async () => {
  let url = apiEndPoints.getWinners ;
  
  return await CommonApiHandler(
    {
      name: "getWinners",
      url:url,
      method: TMethods.GET,
      // body:JSON.stringify(payload)
    }
  )
};


export const claim_request = async (userId:number,amount:number) => {
  const url = apiEndPoints.claim_request ;
  return await CommonApiHandler(
    {
      name: "claim_request",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify({
        "userId": userId,
        "amount": amount   
      }),
      defaultTokenAllowed:false
    }
  )
};


export const debuggerLog = async (payload:any) => {
  const url = apiEndPoints.debugger ;
  return await CommonApiHandler(
    {
      name: "debuggerLog",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify(payload),
      defaultTokenAllowed:false
    }
  )
};


export const create_preference = async (payload:any):Promise<any> => {
  const url = apiEndPoints.create_preference ;
  return await CommonApiHandler(
    {
      name: "create_preference",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify(payload)
    }
  )
};

export async function addFavorite( audioBookId:string|number) {
  const userId= Cookies.get("id");
  const bodyData = {
    user_id: userId,
    audiobook_id: audioBookId.toString(),
  };
  return await CommonApiHandler(
    {
      name: "addFavorite",
      url:apiEndPoints.favPostApi,
      method: TMethods.POST,
      body:JSON.stringify(bodyData)
    }
  )
}

export const cityBankApiTest = async () => {
  const url = "http://localhost:8097/api/routes/city-bank-payment-status";
  return await CommonApiHandler(
    {
      name: "cityBankApiTest",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify({txnStatus:1,merchanRefNo:"fgfdhhfdfb436",
transactionId:"fhdh3747719084f2892710e9",txnamount:10000} )
    }
  )
};

export const getAuthors = async (searchparams?:string) => {
  let url = `${apiEndPoints.get_authors}?limit=100`;
  if(searchparams){
    url=url+`&search=${searchparams}`
    //console.log(url,"url")
  }
  return await CommonApiHandler(
    {
      name: "getAuthors",
      url:url,
      method: TMethods.GET,
      noToken:true
    }
  )
};

export const ratingReviewList = async (id: number) => {
  const url = `${apiEndPoints.reviewList}${id}`;
  return await CommonApiHandler(
    {
      name: "ratingReviewList",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const get_continue_listen_data = async (userId: number) => {
  const url = `${apiEndPoints.get_continue_listen_data}${userId}`;
  return await CommonApiHandler(
    {
      name: "ratingReviewList",
      url:url,
      method: TMethods.GET,
    }
  )
};


export const audioBookDetailsClient = async (id: any,userId:number) => {
  const url = `${apiEndPoints.audioBookDetails}/${id}?user_id=${userId}`;

  try {
    return await CommonApiHandler(
      {
        name: "audioBookDetailsClient",
        url:url,
        method: TMethods.GET,
      }
    )
    // const response = await fetch(url, requestOptions);
    // const result = await response.json();
    // return result;
  } catch (err) {
    return false;
  }
};

export const getMembershipData = async (card: any) => {
  const url = `https://membership.apars.shop/api/card/check/${card}`;
  
  return await CommonApiHandler(
    {
      name: "getMembershipData",
      url:url,
      method: TMethods.GET,
    }
  )
};

export const continueListeningPostApi = async (payload: any) => {
  const url = `${apiEndPoints.continueListeningPost}${Cookies.get("id")}`;
  const raw = JSON.stringify({
    data: payload,
  });
  return await CommonApiHandler(
    {
      name: "continueListeningPostApi",
      url:url,
      method: TMethods.POST,
      body:raw
    }
  )
};

export const subs_page_trackerApi = async (payload: UserActionTrack) => {
  const url = `${apiEndPoints.subs_page_tracker}`;
  const raw = JSON.stringify(payload);
  return await CommonApiHandler(
    {
      name: "continueListeningPostApi",
      url:url,
      method: TMethods.POST,
      body:raw
    }
  )
};

export const bkashOfferHalfYearly = async (payloadData: any) => {
  const url = `${apiEndPoints.bkashOneTimePaymentApi}`;

  var raw = JSON.stringify({
    amount: payloadData.amount.toString(),
    packageId: payloadData.packageId,
    methodName: payloadData.methodName,
    source: payloadData.source,
    userId: Cookies.get("id"),
  });
  return await CommonApiHandler(
    {
      name: "bkashOfferHalfYearly",
      url:url,
      method: TMethods.POST,
      body:raw,
      defaultTokenAllowed:false
    }
  )
};

export const getStoreProducts = async () => {
  const url = `${apiEndPoints.getStoreItem}`;
    return await CommonApiHandler(
    {
      name: "getStoreProducts",
      url:url,
      method: TMethods.GET,
      extraHeaders:{ cache: "no-store" }
    }
  )
};

export const book_finished_stats = async (userId:number) => {
  const url = `${apiEndPoints.book_finished_stats}${userId}`;
    return await CommonApiHandler(
    {
      name: "getStoreProducts",
      url:url,
      method: TMethods.GET,
      extraHeaders:{ cache: "no-store" }
    }
  )
};

export const getDynamicPaymentMethods = async (purpose: string) => {
  const url = `${apiEndPoints.getDynamicPaymentMethods}${purpose}`;

  return await CommonApiHandler(
    {
      name: "getDynamicPaymentMethods",
      url:url,
      method: TMethods.GET,
      extraHeaders:{ cache: "no-store" }
    }
  )
};

export const makeDynamicPayment = async (payload: any, option: any) => {
  const url = option.url;
  let result:any = await CommonApiHandler(
    {
      name: "makeDynamicPayment",
      url:url,
      method: TMethods.POST,
      body: JSON.stringify(payload),
      defaultTokenAllowed:false
    }
  )
  window.location.replace(
      option.method_name === "Bkash"
        ? result.data.bkashURL
        : option.method_name === "Nagad"
        ? result.data.callBackUrl
        : option.method_name === "AamarPay"
        ? result.data.callBackUrl
        : "/cart"
    );
    return result;
};

export const getCurrentEpisodePath = async (
  audiobookId: number,
  episodeId: number
) => {
    const url = `${apiEndPoints.currentEpisodePath}?audiobookId=${audiobookId}&episodeId=${episodeId}`;
    return await CommonApiHandler(
    {
      name: "getCurrentEpisodePath",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
  )
};

export const getSessionInit = async (id: number|string, episode_id: number|string) => {
  const url = `${apiEndPoints.sessionInit}id=${id}&episode_id=${episode_id}`;
  
  return await CommonApiHandler(
    {
      name: "getSessionInit",
      url:url,
      method: TMethods.GET,
      extraHeaders:{credentials: "include"},
      defaultTokenAllowed:false
    }
  )
};

export const getSessionLog = async (play: boolean) => {
  const url = `${apiEndPoints.sessionLog}play=${play}`;
  
  return await CommonApiHandler(
    {
      name: "getSessionLog",
      url:url,
      method: TMethods.GET,
      extraHeaders:{credentials: "include"},
      defaultTokenAllowed:false
    }
  )
};

export const uploadFile = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("size", file.size);
    const response = await fetch(
      "https://api.kabbik.com/v3/audiobooks/upload-image-in-stack",
      {
        method: "POST",
        body: formData,
      }
    );
    const res = await response.json();
    return res.image_file_url;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const postBlog = async (payload: BlogInfo) => {
    return await CommonApiHandler(
    {
      name: "postBlog",
      url:apiEndPoints.postBlogUrl,
      method: TMethods.POST,
      body: JSON.stringify({ ...payload, userId: Cookies.get("id") }),
      defaultTokenAllowed:false
    }
  )
};

export const createNewPlaylistFolders = async (folder_name: string) => {
    return await CommonApiHandler(
    {
      name: "createNewPlaylistFolders",
      url:apiEndPoints.create_new_folders,
      method: TMethods.POST,
      body: JSON.stringify({ folder_name:folder_name }),
      defaultTokenAllowed:false
    }
  )
};

export const updatePlaylistFolders = async (folderId:number|string,folder:string) => {
    return await CommonApiHandler(
    {
      name: "updatePlaylistFolders",
      url:apiEndPoints.update_playlist_folder,
      method: TMethods.PATCH,
      body: JSON.stringify({ id:folderId,folder_name:folder }),
      defaultTokenAllowed:false
    }
  )
};


export const testGet = async () => {
  const url = `https://api.kabbik.com/v4/test/sample`;
  
  return await CommonApiHandler(
    {
      name: "testGet",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
  )
};

export const testPost = async () => {
  const url = `https://api.kabbik.com/v4/test/sample`;
  return await CommonApiHandler(
    {
      name: "testPost",
      url:url,
      method: TMethods.POST,
      defaultTokenAllowed:false
    }
  )
};

export const getCategoryData = async () => {
  return await CommonApiHandler(
    {
      name: "getCategoryData",
      url:apiEndPoints.catagoryList,
      method: TMethods.GET,
      extraHeaders:{cache: "no-store"}
    }
  )
}


export const getUserProfile =async () => {  
  const userId = Cookies.get("id") ? Cookies.get("id") : "2820";
  if(userId==='2820' )return;

  return await CommonApiHandler(
    {
      name: "getUserProfile",
      url:`${apiEndPoints.getuserProfileApi}${userId}`,
      method: TMethods.GET,
      extraHeaders:{cache: "no-store"}
    }
  )
};

export const payWithBkashOneTime = async (payload: BkashOneTimePayload) => {
  let url = apiEndPoints.bkashOneTimePaymentApi;
 
  return await CommonApiHandler({
    name: "payWithBkashOneTime",
    url: url,
    method: TMethods.POST,
    body: JSON.stringify(payload),
    // POST /v3/bkash/bkash-onetime-create-payment
  });
};
 

export const payWithBkashRecurring = async (payload: BkashRecurringPayload) => {
  let url = apiEndPoints.bkashPaymentApi;
 
  return await CommonApiHandler({
    name: "payWithBkashRecurring",
    url: url,
    method: TMethods.POST,
    body: JSON.stringify(payload),
    // POST /v3/bkash/bkash-create-subscription-request-app
  });
};
 
export const payWithRobi = async (payload: RobiPayload) => {
  let url = apiEndPoints.robiPaymentApi;
 
  return await CommonApiHandler({
    name: "payWithRobi",
    url: url,
    method: TMethods.POST,
    body: JSON.stringify(payload),
    // POST /v4/robi/create-payment
  });
};
 
export const payWithGP = async (payload: GPPayload) => {
  let url = apiEndPoints.gpPaymentApi;
 
  return await CommonApiHandler({
    name: "payWithGP",
    url: url,
    method: TMethods.POST,
    body: JSON.stringify(payload),
    // POST /v4/gp/create-payment
  });
};