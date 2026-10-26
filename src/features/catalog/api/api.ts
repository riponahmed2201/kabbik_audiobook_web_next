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
