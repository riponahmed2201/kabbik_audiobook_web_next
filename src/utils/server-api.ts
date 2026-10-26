import { cookies } from "next/headers";
import { apiEndPoints } from "./apiEndpoints";
import { BlogInfo } from "./types";
import { siteConfig } from "@/config/config";
// import { BlogInfo } from "../models/BlogInfo";

const defaultId = "2820";
const defaultToken =
  siteConfig.defaultToken;

const getCookieInServerByName = async (cookieName: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value ?? null;
};

export const audioBookDetails = async (id: any) => {
  const userId = (await getCookieInServerByName("id")) ?? defaultId;
  const userToken = (await getCookieInServerByName("token")) ?? defaultToken;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${apiEndPoints.audioBookDetails}/${id}?user_id=${userId}`;

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (err) {
    return false;
  }
};

export const getApprovedBlogs = async () => {
  try {
    const userToken = (await getCookieInServerByName("token")) ?? defaultToken;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(
      `${apiEndPoints.getApprovedBlogsUrl}?type=approved`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getBlogById = async (id: number) => {
  try {
    const userToken = (await getCookieInServerByName("token")) ?? defaultToken;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`${apiEndPoints.getApprovedBlogsUrl}/${id}`, {
      method: "GET",
      headers: myHeaders,
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getApprovedBlogBySlug = async (slug: string) => {
  try {
    const userToken = (await getCookieInServerByName("token")) ?? defaultToken;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(
      `${apiEndPoints.getApprovedBlogsUrl}/find/${slug}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const postBlog = async (payload: BlogInfo) => {
  try {
    const userToken = (await getCookieInServerByName("token")) ?? defaultToken;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userToken}`);
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(apiEndPoints.postBlogUrl, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        ...payload,
        userId: (await getCookieInServerByName("id")) ?? defaultId,
      }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const userDetailsFromServer = async () => {
  const userToken = (await getCookieInServerByName("token")) ?? defaultToken;
  const userId = (await getCookieInServerByName("id")) ?? defaultId;
  if(userId==='2820')return;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  myHeaders.append("Content-Type", "application/json");
  try {
    const response = await fetch(`${apiEndPoints.getuserProfileApi}${userId}`, {
      cache: "no-store",
      headers: {
        method: "GET",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    return false;
  }
};


export const getPurchasedAudiobooks = async (id: any) => {
  const userId = (await getCookieInServerByName("id")) ?? defaultId;
  const userToken = (await getCookieInServerByName("token")) ?? defaultToken;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${apiEndPoints.getPurchasedAudiobooks}/${id}`;

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (err) {
    return false;
  }
}


export const getPurchasedCourse = async (id: any) => {
  const userId = (await getCookieInServerByName("id")) ?? defaultId;
  const userToken = (await getCookieInServerByName("token")) ?? defaultToken;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${apiEndPoints.getPurchasedCourse}/${id}`;

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (err) {
    return false;
  }
}

export const getFavoriteBooks = async (id: any) => {
  const userId = (await getCookieInServerByName("id")) ?? defaultId;
  const userToken = (await getCookieInServerByName("token")) ?? defaultToken;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  myHeaders.append("Content-Type", "application/json");

  const url = `${apiEndPoints.favoriteAudioBookList}?user_id=${userId}`;

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
  } catch (err) {
    return false;
  }
}