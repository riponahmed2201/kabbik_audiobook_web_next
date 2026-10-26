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


export const getPreferenceData = async (userId: string |number) => {
 const url = apiEndPoints.get_preference;
  const raw = JSON.stringify({
    user_id: userId
  });
  return await CommonApiHandler(
    {
      name: "getPreferenceData",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};



export const updateProfile = async (payloadData: any) => {
  const url = `${apiEndPoints.updateProfile}${Cookies.get("id")}`;
  var raw = JSON.stringify({
    full_name: payloadData.full_name,
    phone_email: `${Cookies.get("msisdn")}`,
    city_name: payloadData.city_name,
    address: payloadData.address,
    post_code: payloadData.post_code,
  });

  return await CommonApiHandler(
    {
      name: "updateProfile",
      url,
      method: TMethods.PUT,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};




export async function updateUser(
  userId: number,
  payload: UpdateUserPayload
): Promise<{ success: boolean }> {
  const formData = new FormData();

  // Text fields
  formData.append("full_name", payload.full_name);
  formData.append("phone_email", payload.phone_email);
  formData.append("city_name", payload.city_name);
  formData.append("address", payload.address);
  formData.append("post_code", payload.post_code);

  // File field (MUST be "files")
  formData.append("files", payload.file||'');

  const userToken = Cookies.get("token") ? Cookies.get("token") : siteConfig.defaultToken;

  const response = await fetch(
    `${apiEndPoints.updateProfileWithImage}${userId}`,
    {
      method: "PUT", // or POST (match backend)
      body: formData,
      credentials: "include", // only if cookies/auth needed
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  // const myHeaders = new Headers();
  // if(!noToken){
  //     myHeaders.append("Authorization", `Bearer ${userToken}`);
  // }

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to update user");
  }

  return response.json();
}



export const userProfile = async () => {
  const userId = Cookies.get("id") ;
  if(userId==='2820')return;
   return await CommonApiHandler(
    {
      name: "userProfile",
      url:`${apiEndPoints.getuserProfileApi}${userId}`,
      method: TMethods.GET,
    }
  )
};



export const userSummary = async () => {
  const userId = Cookies.get("id") ? Cookies.get("id") : "2820";
  const url = `${apiEndPoints.userSummary}${userId}`;

  return await CommonApiHandler(
    {
      name: "userSummary",
      url:url,
      method: TMethods.GET,
    }
  )
};



export const userContinue = async () => {
    const defaultUserId = "2820";
    const userId = Cookies.get("id") ? Cookies.get("id") : defaultUserId;
    return await CommonApiHandler(
        {
            name: "userContinue",
            url: `${apiEndPoints.continueListeningGet}${userId}`,
            method: TMethods.GET,
        }
    )
};



export const favoriteAudiobook = async () => {
  
    const userId = Cookies.get("id") ? Cookies.get("id") : "2820";
    const url = `${apiEndPoints.favoriteAudioBookList}?user_id=${userId}`;
  return await CommonApiHandler(
    {
      name: "favoriteAudiobook",
      url:url,
      method: TMethods.GET,
    }
  )
};



export const postFavoritesApi = async (id: any) => {
 const url = apiEndPoints.favPostApi;
  const raw = JSON.stringify({
    user_id: Cookies.get("id"),
    audiobook_id: id,
  });
  return await CommonApiHandler(
    {
      name: "postFavoritesApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};






export const deleteFavoritesApi = async (id: any) => {
    const url = `${
        apiEndPoints.favDeleteApi
    }?audiobook_id=${id}&user_id=${Cookies.get("id")}`;
    return await CommonApiHandler(
        {
        name: "deleteFavoritesApi",
        url,
        method: TMethods.DELETE,
        defaultTokenAllowed:false 
        }
    )
}



export async function addFavorite( audioBookId:string|number) {
  const userId= Cookies.get("id");
  const bodyData = {
    user_id: userId,
    audiobook_id: audioBookId.toString(),
  };
  return await CommonApiHandler(
    {
      name: "addFavorite",
      url:apiEndPoints.favPostApi,
      method: TMethods.POST,
      body:JSON.stringify(bodyData)
    }
  )
}



export const getPurchasedAudiobooks = async (userId: number|string) => {
  const url = `${apiEndPoints.getPurchasedAudiobooks}${userId}`;
 
  return await CommonApiHandler(
    {
      name: "getPurchasedAudiobooks",
      url:url,
      method: TMethods.GET,
    }
  )
};



export const getAllCourse = async () => {
  const userId = Cookies.get("id");
  const url = apiEndPoints.getAllCourse + userId;
  
  return await CommonApiHandler(
    {
      name: "getAllCourse",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false 
    }
  )
};



export const bkashPurchaseCourse = async (payloadData: any) => {
    const url = `${apiEndPoints.bkashPurchaseCourse}`;
    const raw = JSON.stringify(payloadData);
  
  return await CommonApiHandler(
    {
      name: "bkashPurchaseCourse",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const getPurchasedCourse = async (id:number|string) => {
    // const userId = Cookies.get("id");
  const url = `${apiEndPoints.getPurchasedCourse}${id}`;
  return await CommonApiHandler(
    {
      name: "getPurchasedCourse",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false 
    }
  )
};



export const sponsor_request = async (payload:TSponsorRequest) => {
  const url = `${apiEndPoints.sponsor_request}`;
  const raw = JSON.stringify(payload);
  return await CommonApiHandler(
    {
      name: "sponsor_request",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
      defaultTokenAllowed:false
    }
 )
};



export const postBookRequest = async (
  user_name: any,
  bookname: any,
  writer: any,
  language: any,
  category: any
) => {
  const url = apiEndPoints.bookRequestPostApi;
  const raw = JSON.stringify({
    name: user_name,
    bookname: bookname,
    writer: writer,
    language: language,
    category: category,
  });
  return await CommonApiHandler(
    {
      name: "postBookRequest",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};




export const create_preference = async (payload:any):Promise<any> => {
  const url = apiEndPoints.create_preference ;
  return await CommonApiHandler(
    {
      name: "create_preference",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify(payload)
    }
  )
};



export const getAuthors = async (searchparams?:string) => {
  let url = `${apiEndPoints.get_authors}?limit=100`;
  if(searchparams){
    url=url+`&search=${searchparams}`
    //console.log(url,"url")
  }
  return await CommonApiHandler(
    {
      name: "getAuthors",
      url:url,
      method: TMethods.GET,
      noToken:true
    }
  )
};



export const getMembershipData = async (card: any) => {
  const url = `https://membership.apars.shop/api/card/check/${card}`;
  
  return await CommonApiHandler(
    {
      name: "getMembershipData",
      url:url,
      method: TMethods.GET,
    }
  )
};



export const book_finished_stats = async (userId:number) => {
  const url = `${apiEndPoints.book_finished_stats}${userId}`;
    return await CommonApiHandler(
    {
      name: "getStoreProducts",
      url:url,
      method: TMethods.GET,
      extraHeaders:{ cache: "no-store" }
    }
  )
};



export const uploadFile = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("size", file.size);
    const response = await fetch(
      "https://api.kabbik.com/v3/audiobooks/upload-image-in-stack",
      {
        method: "POST",
        body: formData,
      }
    );
    const res = await response.json();
    return res.image_file_url;
  } catch (err) {
    console.error(err);
    return false;
  }
};



export const get_continue_listen_data = async (userId: number) => {
  const url = `${apiEndPoints.get_continue_listen_data}${userId}`;
  return await CommonApiHandler(
    {
      name: "ratingReviewList",
      url:url,
      method: TMethods.GET,
    }
  )
};



export const continueListeningPostApi = async (payload: any) => {
  const url = `${apiEndPoints.continueListeningPost}${Cookies.get("id")}`;
  const raw = JSON.stringify({
    data: payload,
  });
  return await CommonApiHandler(
    {
      name: "continueListeningPostApi",
      url:url,
      method: TMethods.POST,
      body:raw
    }
  )
};
