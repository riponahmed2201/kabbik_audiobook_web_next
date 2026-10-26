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
