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
