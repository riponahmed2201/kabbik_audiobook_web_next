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
