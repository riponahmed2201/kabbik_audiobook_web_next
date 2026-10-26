import Cookies from "js-cookie";
import { apiEndPoints } from "@/shared/api/apiEndpoints";
import { toast } from "react-toastify";
// import { formatTime, showToast } from "";
import { BkashOneTimePayload, BkashRecurringPayload, BlogInfo, DynamicSubscriptionPack, GPPayload, RobiPayload, TMethods, TtoastType } from "@/helpers/commonTypes";
import { formatTime, getCookiesAsObject, getCountryCode, getCountryCode2, getCurrentMonthFirstDate, getDeviceInfo, getOrCreateDeviceId, normalizeMsisdn, showToast } from "@/helpers/commonFunction";
import { CommonApiHandler, getHeaders } from "@/shared/api/CommonApicalls";
import { TGamezopTracker, TSponsorRequest } from "@/utils/types";
import { ContinueBookStatusResponse, UpdateUserPayload } from "@/shared/ui/static/types";
import { siteConfig } from "@/config/config";
import { UserActionTrack } from "@/features/profile/components/Profile/static/profile.type";


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
