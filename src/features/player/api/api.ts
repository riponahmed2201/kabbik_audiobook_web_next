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
