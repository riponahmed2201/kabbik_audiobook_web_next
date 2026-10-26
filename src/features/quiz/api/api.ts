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
