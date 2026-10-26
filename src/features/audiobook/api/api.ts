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
