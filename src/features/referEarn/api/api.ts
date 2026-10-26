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



export const insert_earn_log = async () => {
   return await CommonApiHandler(
    {
      name: "insert_earn_log",
      url:`${apiEndPoints.insert_earn_log}`,
      method: TMethods.GET,
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
