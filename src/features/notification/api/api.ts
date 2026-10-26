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
