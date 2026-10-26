import React, { ReactHTMLElement } from 'react'
// import { createTranslation } from 'next-international';
import { toast, ToastPosition } from 'react-toastify';
import { Edigit, TShareContent, TtoastType, TtranslatorNums } from './commonTypes';
import { apiEndPoints } from '../utils/apiEndpoints';
import { TBooks } from '@/pageTypes/home.types';
import Cookies from 'js-cookie';
import { ContinueBookStatusItem, RawItem } from '@/shared/ui/static/types';
import { continue_listen_stat_post, logout } from '@/utils/apiServices';
// import { headers } from 'next/headers';
// @ts-ignore
// import ColorThief  from 'color-thief-browser';


export const StringToJSX=(str:string)=>{

    return str.replaceAll('\n','<br/>')
}

export const showToast=(
    message:string,
    type:TtoastType=TtoastType.success,
    autoclose=3000,
    position='top-right'
)=>{
    toast[type](message, {
      position:position as ToastPosition,
      autoClose: autoclose,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      toastId:"1500",
      theme: "dark",
    });
}

export function formatTime(seconds:number|string) {
    seconds=Number(seconds)
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export function isValidBLNumber(number:string) {
  // Remove spaces, dashes, or any formatting
  const cleaned = number.replace(/[\s\-]/g, '');

  // Match Banglalink prefixes: 014 and 019
  const blRegex = /^(?:\+880|880|0|)?(14|19)\d{8}$/;

  return blRegex.test(cleaned);
}

export async function createBlPayment(
  phoneNumber:string, 
  selectedPack:any, 
  userId:string,
  setShowLoading:(b:boolean)=>void,
  handleNext:()=>void
) {
  if (
    phoneNumber &&
    phoneNumber.length === 10 &&
    (phoneNumber.startsWith("14") || phoneNumber.startsWith("19"))
  ) {
    try {
      // showLoading(); // Replace with your actual loader
      setShowLoading(true)
      const response = await fetch(apiEndPoints.blDcbPaymentApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          msisdn: phoneNumber,
          userId: userId,
          packageId: selectedPack.subscriptionItemId,
          fromRenewal: selectedPack.isOnetime === 1 ? 0 : 1,
          ...getCookiesAsObject()
        }),
      });

      const data = await response.json();

      if (data?.responseCode === "1" || data?.responseCode === "0") {
        // Use your routing logic here, like react-router's navigate
        // navigate('/dcb-consent-verify', {
        //   state: { phone_number: phoneNumber },
        // });
        handleNext()
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      // hideLoading(); // Dismiss loader
      setShowLoading(false)
    }
  } else {
    showToast("Please enter a valid Banglalink number",TtoastType.error);
  }
}

// utils/getCountryCode.ts

export async function getCountryCode(): Promise<'BD' | 'F'> {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Bangladesh timezone
    if (timezone === 'Asia/Dhaka') {
      return 'BD';
    }

    return 'F';
  } catch {
    return 'F';
  }
}


export function normalizeBLNumber(input:string ) {
  // Remove non-digit characters (optional, in case of formatting like +880-19...)
  if(!input){
    return
  }
  const digits = input?.replace(/\D/g, '');

  // Remove leading +880 / 880 / 0
  let normalized = digits;

  if (normalized.startsWith('880')) {
    normalized = normalized.slice(3);
  } else if (normalized.startsWith('0')) {
    normalized = normalized.slice(1);
  }

  // Now should start with 19 or 14 and be 10 digits
  if ((normalized.startsWith('19') || normalized.startsWith('14')) && normalized.length === 10) {
    //console.log(normalized)
    return normalized;
  }

  // Invalid BL number
  return null;
}

export async function getCountryCode2(): Promise<'BD' | 'F'> {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();

    return data.country_code === 'BD' ? 'BD' : 'F';
  } catch {
    return 'F';
  }
}

export function isValidMsisdn(msisdn: string): boolean {
  // Ensure only digits
  if (!/^\d+$/.test(msisdn)) return false;

  // Check length (10 or 11)
  if (!(msisdn.length === 10 || msisdn.length === 11)) return false;

  // Check prefix
  if (!(msisdn.startsWith("01") || msisdn.startsWith("1"))) return false;

  return true;
}

export function normalizeMsisdn(input: string): string | null {
  // Remove spaces, dots, non-digits
  let msisdn = input.replace(/\D/g, "");

  // Case 1: Already in 8801XXXXXXXXX format (13 digits)
  if (/^8801\d{9}$/.test(msisdn)) {
    return msisdn;
  }

  // Case 2: Local 01XXXXXXXXX (11 digits)
  if (/^01\d{9}$/.test(msisdn)) {
    return "88" + msisdn;
  }

  // Case 3: Local 1XXXXXXXXX (10 digits, missing leading 0)
  if (/^1\d{9}$/.test(msisdn)) {
    return "880" + msisdn;
  }

  // Not valid
  return null;
}




export async function verifyConsent(
  phoneNumber:string, 
  otp:string, 
  navigate:any, 
  showLoading:(b:boolean)=>void
  // getUserWithDetails
) {

  if (phoneNumber && phoneNumber.length === 10) {
    try {
      showLoading(true); // Show loader

      const response = await fetch(apiEndPoints.blDcbVerifyApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          msisdn: phoneNumber,
          consent: otp,
        }),
      });

      const data = await response.json();

      if (data?.responseCode === "0") {
        navigate.push('/')
        setTimeout(()=>{window.location?.reload()},3000)
        showToast(data?.message , TtoastType.success);
        // await getUserWithDetails();
        // navigateToMainScreen(navigate); // Navigate to main screen
      } else {
        showToast(data?.message || "Something went wrong...", TtoastType.error);
      }
    } catch (error:any) {
      showToast(error?.message || "Server error", TtoastType.error);
    } finally {
      // hideLoading(); // Hide loader
      showLoading(false)
    }
  }
}


export function extractNumber(input:string) {
  if(!input){
    return ''
  }
  const match = input.match(/[\d,.]+/);
  if (!match) return null;

  // Remove commas and convert to float
  return parseFloat(match[0].replace(/,/g, ''));
}

export function add(a: number, b: number): number {
  return a+b;
}

export type TcatWiseData={data:TBooks[],name:string}

export const findCatwiseData=(arr:TcatWiseData[],catName:string):TcatWiseData | undefined=>{
  return arr.find((item)=>item.name===catName);
}

export const stopPropagation=(e:any)=>{
  e.stopPropagation();
  // e.preventDefault();
}

export function formatDate(dateString: string, lang: 'bn' | 'en' = 'en'): string {
  const date = new Date(dateString);

  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthsBn = ["জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন",
                    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

  const enDigits = ['0','1','2','3','4','5','6','7','8','9'];
  const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  if (lang === 'bn') {
    const bnDay = day.toString().replace(/\d/g, d => bnDigits[+d]);
    const bnYear = year.toString().replace(/\d/g, d => bnDigits[+d]);
    return `${bnDay} ${monthsBn[monthIndex]} ${bnYear}`;
  } else {
    return `${day} ${monthsEn[monthIndex]} ${year}`;
  }
}

export function scrollToTop() {
  //console.log("scroll");
  
  if (typeof window !== 'undefined') {
    //console.log("kdfjkdf");
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

export function addDaysToCurrentDate(days:number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toString(); // Returns format like "Thu Nov 06 2025 15:24:43 GMT+0600 (Bangladesh Standard Time)"
}



export  function decodeWord(encodedStr:string) {
  return decodeURIComponent(encodedStr);
}


export const numberTranslator=(num:number, map:any)=> {
  return String(num)
    .split('')
    .map(digit => map[digit as Edigit] || digit)
    .join('');
}



export const shareContent = async ({ title, text, imageUrl, url }: TShareContent) => {
  try {
    //console.log(text,"text");
    
    if (navigator.share) {
      await navigator.share({
        title: title || document.title,
        text,
        // url: imageUrl || url || window.location.href,
      });
      // //console.log("✅ Shared successfully!");
    } else {
      // alert("❌ Sharing is not supported on this device.");
    }
  } catch (err) {
    console.error("Share failed:", err);
  }
};

// export function convertSecondsToHourMin(seconds:number) {
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   return `${hours} h ${minutes} min`;
// }


export function convertSecondsToHourMin(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const banglaNumbers: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  const toBangla = (num: number): string => {
    return String(num)
      .split("")
      .map((d) => banglaNumbers[d] ?? d)
      .join("");
  };

  return `${toBangla(hours)} ঘন্টা ${toBangla(minutes)} মিনিট`;
}

export function dayDifferenceInBangla(dateStr: string): string {
  const today = new Date();
  const givenDate = new Date(dateStr);

  // Calculate difference in milliseconds
  const diffMs = today.getTime() - givenDate.getTime();

  // Convert to days
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Bangla digits mapping
  const banglaNumbers: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  // Convert number to Bangla digits
  const toBangla = (num: number): string =>
    String(num)
      .split("")
      .map((d) => banglaNumbers[d] ?? d)
      .join("");

  return toBangla(diffDays) + " দিন";
}




export const handleShare2 = async () => {
	if (navigator.share) {
		try {
			await navigator.share({
				title: document.title,
				text: 'Check this out!',
				url: window.location.href,
			});
		} catch (error) {
			console.error('Error sharing:', error);
		}
	} else {
		toast.info('Share not supported on this browser.');
	}
};

export const handleShare = async (
  text: string,
  title: string,
  imageUrl: string
) => {
  try {
    if (!navigator.share) {
      throw new Error("Web Share API not supported");
    }

    await navigator.share({
      title: title,
      text: text,
      url:''
    });

  } catch (err) {
    console.error("Share failed:", err);

    // WhatsApp fallback (text-only)
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        `${title}\n\n${text}`
      )}`,
      "_blank"
    );
  }
};


export function formatDateDDMMYY(dateStr: string): string {
  if(!dateStr)return '';
  // dateStr=dateStr??new Date().toISOString()
  const date = new Date(dateStr.replace(" ", "T")); // Ensure ISO format
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = String(date.getFullYear()).slice(-2); // Last two digits
  return `${day}/${month}/${year}`;
}

export function formatTimePlus6(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr.replace(" ", "T")); // ensure valid ISO

  // Add 6 hours for BD time
  date.setHours(date.getHours() + 6);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 -> 12

  return `${hours}:${minutes} ${ampm}`;
}


export function formatSeconds(seconds:number,lan:string) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  if (hrs > 0) {
    return `${convertToBanglaDigits(hrs)} ঘন্টা ${convertToBanglaDigits(mins)} মিনিট`;
  }

  return `${convertToBanglaDigits(mins)} মিনিট`;
}





export function formatTimeForAudio(secs: number) {
  if (!isFinite(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const clampAudio=(v: number, min: number, max: number) =>{
  return Math.max(min, Math.min(max, v));
}

type AudioReadyEvent = "loadedmetadata" | "canplay";

export const waitForAudioReady = (
  audio: HTMLAudioElement,
  event: AudioReadyEvent = "canplay",
  timeoutMs = 30000
): Promise<void> => {
  const minReadyState = event === "loadedmetadata" ? 1 : 3;
  if (audio.readyState >= minReadyState) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      audio.removeEventListener(event, onReady);
      audio.removeEventListener("error", onError);
      window.clearTimeout(timer);
    };
    const onReady = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error("audio load error"));
    };
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("audio load timeout"));
    }, timeoutMs);

    audio.addEventListener(event, onReady);
    audio.addEventListener("error", onError);
  });
};

export const seekAudioWhenReady = async (
  audio: HTMLAudioElement,
  seekTime: number,
  setCurrentTime?: (time: number) => void
) => {
  if (!seekTime || seekTime <= 0 || !isFinite(seekTime)) return;
  await waitForAudioReady(audio, "loadedmetadata");
  audio.currentTime = seekTime;
  setCurrentTime?.(seekTime);
};

export const resolveEpisodeAudioSrc = (
  episode: { file_path?: string; bgm_filepath?: string } | undefined,
  signedUrl?: string
) => {
  if (!episode) return signedUrl ?? "";
  if (episode.bgm_filepath) {
    return episode.bgm_filepath;
  }
  return episode.file_path || signedUrl || "";
};

export const isDirectEpisodeUrl = (filePath?: string) =>
  Boolean(filePath?.includes(".amazonaws.com"));

export const formatNumber = (num: number): any => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  }
  return num;
};

export const replacePlaceholder = (text: string, word: string): string => {
  return text.replace(/XXXXXX/g, word);
};

export const  GetFloatNum=(num:number|string,toPosition:number)=>{
  if( typeof num !== 'number' && typeof num !== 'string' || isNaN(Number(num)) || !isFinite(Number(num))) {
    return 0;
  } 
  return Number(Number(num).toFixed(toPosition));
}


export function textSlice(
  text: string,
  length: number,
  addEllipsis = true,
  defaultText = "N/A"
): string {
  if(!text)return '';
  if(text.length === 0) return defaultText;
  if (text.length <= length) return text
  return addEllipsis ? text.slice(0, length) + "…" : text.slice(0, length)
}

export const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setTimeout(() => toast.success("Copied Successfully !"), 200);
      })
      .catch((err) => toast.error("Failed to copy:"));
  };


export function normalizeBillingPeriod(text: string) {
  const normalizedText = text.toLowerCase();

  if (/6[\s-]*month|half[\s-]*yearly/.test(normalizedText)) {
    return { name: "৬ মাস", day: "(১৮০ দিন)" };
  }
  if (/1[\s-]*year|yearly/.test(normalizedText)) {
    return { name: "ইয়ারলি", day: "(৩৬০ দিন)" };
  }

  

  if (/1[\s-]*month|monthly/.test(normalizedText)) {
    return { name: "মান্থলি", day: "(৩০ দিন)" };
  }

  if (/biweekly|2[\s-]*weeks|fortnight/.test(normalizedText)) {
    return { name: "বাই-উইকলি", day: "(১৫ দিন)" };
  }

  if (/weekly|1[\s-]*week/.test(normalizedText)) {
    return { name: "উইকলি", day: "(৭ দিন)" };
  }

  if (/daily|1[\s-]*day/.test(normalizedText)) {
    return { name: "ডেইলি", day: "(১ দিন)" };
  }
  //console.log(text,)

  return {};
}
export function getCurrentMonthFirstDate() {
  const now = new Date();
  const firstDate = new Date(now.getFullYear(), now.getMonth(), 1);
  return firstDate.toISOString().split('T')[0];
}


export function convertToBanglaDigits(input:string|number) {
  if(!input)return 0;
  input=input.toString();
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return input.toString().split('').map((char:string) => {
    return /\d/.test(char) ? banglaDigits[Number(char)] : char;
  }).join('');
}

export const findObj=(name:string,arr:any)=>{
  let item = arr.find((item:any)=>item.methodName?.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
  return item;
}

export const getSubscriptionPackKey = (pack: {
  subscriptionItemId: string | number;
  isOnetime?: number;
}) => `${pack.subscriptionItemId}-${pack.isOnetime ?? 0}`;

export type AllowedPaymentMethod = {
  type: string;
  promoGreetings?: string;
  extraDiscount?: number;
};

const normalizePaymentMethodType = (type: string) => type.toLowerCase();

export const paymentMethodsMatch = (
  methodName: string,
  allowedType: string
) => {
  const method = normalizePaymentMethodType(methodName);
  const allowed = normalizePaymentMethodType(allowedType);

  if (method === allowed) return true;
  if (allowed === "bkash" && (method === "bkash" || method === "bkashonetime")) {
    return true;
  }
  if (method === "bkashonetime" && allowed === "bkash") {
    return true;
  }

  return method.includes(allowed) || allowed.includes(method);
};

export const isPaymentMethodAllowedByPromo = (
  methodName: string,
  promoType?: string,
  allowedPaymentMethods?: AllowedPaymentMethod[]
) => {
  if (promoType !== "restricted" || !allowedPaymentMethods?.length) {
    return true;
  }

  return allowedPaymentMethods.some((method) =>
    paymentMethodsMatch(methodName, method.type)
  );
};

export const filterOptionsByPromoAllowList = <
  T extends { methodName: string }
>(
  options: T[],
  promoType?: string,
  allowedPaymentMethods?: AllowedPaymentMethod[]
) => {
  if (promoType !== "restricted" || !allowedPaymentMethods?.length) {
    return options;
  }

  return options.filter((option) =>
    isPaymentMethodAllowedByPromo(
      option.methodName,
      promoType,
      allowedPaymentMethods
    )
  );
};

export const  clearSessionAndRedirect=(userId?:number)=> {
  // 1. Clear all cookies
  if(userId){
    logout(userId)
  }
  document.cookie.split(";").forEach(cookie => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  });
  if(userId){
    toast.success("Logged out Successfully")
  }

  // 2. Clear localStorage
  localStorage.clear();

  // 3. Redirect to home and reload
  window.location.reload();
  window.location.href = "/";
}

export function formatDateToBengali(dateString:string|number) {
  const bengaliMonths = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল",
    "মে", "জুন", "জুলাই", "আগস্ট",
    "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  // Convert string to Date
  const date = new Date(dateString);

  // Get month and year
  const month = bengaliMonths[date.getMonth()];
  const year = date.getFullYear().toString();
  const day = date.getDate().toString();

  // Convert year to Bengali digits
  const bengaliDigits:any = { 0: "০", 1: "১", 2: "২", 3: "৩", 4: "৪", 5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯" };
  const bengaliYear = year.split("").map(d => bengaliDigits[d]).join("");
  const bengaliDate= day.split("").map(d => bengaliDigits[d]).join("")

  return `${bengaliDate} ${month} ${bengaliYear}`;
}


export function formatToBengali(dateStr: string): string {
  const bengaliMonths = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল",
    "মে", "জুন", "জুলাই", "আগস্ট",
    "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];

  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  const toBengaliNumber = (num: number): string =>
    num.toString().split("").map(d => bengaliDigits[parseInt(d)]).join("");

  // Split input (supports "DD-MM-YYYY")
  const [day, month, year] = dateStr.split("-").map(Number);

  if (!day || !month || !year || month < 1 || month > 12) {
    '';
  }

  const bengaliDay = toBengaliNumber(day);
  const bengaliMonth = bengaliMonths[month - 1];
  const bengaliYear = toBengaliNumber(year);

  return `${bengaliDay} ${bengaliMonth} ${bengaliYear}`;
}




export function timeAgo(dateString:string) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return diffInSeconds <= 1 ? "just now" : `${diffInSeconds} secs ago`;
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return minutes === 1 ? "1 min ago" : `${minutes} mins ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }

  const years = Math.floor(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}


export function setCookiesFromParams(params: { clickId?: string; pubId?: string }) {
  const { clickId, pubId } = params;

  // 20 minutes in days (since js-cookie uses days)
  const expiresInDays = 20 / (24 * 60);

  if (clickId) {
    // Remove old value first (optional but clean)
    // Cookies.remove("clickId", { path: "/" });
    // Set new one
    Cookies.set("clickId", clickId, { expires: expiresInDays, path: "/" });
  }

  if (pubId) {
    // Cookies.remove("pubId", { path: "/" });
    Cookies.set("pubId", pubId, { expires: expiresInDays, path: "/" });
  }
}



export function getCookiesAsObject() {
  const clickId = Cookies.get("clickId");
  const pubId = Cookies.get("pubId");

  // If neither exists → return empty object
  if (!clickId && !pubId) return {};

  // Return only existing cookies
  const cookieData: Record<string, string | number> = {};

  if (clickId) cookieData.clickId = clickId;
  if (pubId) cookieData.pubId = isNaN(Number(pubId)) ? pubId : Number(pubId);
  //console.log(cookieData,"cookieData")
  return cookieData;
}


export async function getDominantColor(imageUrl: string, opacityPercent: number = 100) {
  return await new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      if (!ctx) return reject("Canvas not supported");

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let r = 0, g = 0, b = 0;
      let count = 0;

      // Sample every 10 pixels for performance
      for (let i = 0; i < imageData.length; i += 40) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
      }

      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);

      // Convert percentage → decimal (0–1)
      let opacity = Math.min(Math.max(opacityPercent / 100, 0), 1);

      // resolve(`rgba(${r}, ${g}, ${b}, ${opacity})`);
      resolve(`rgba(${r}, ${g}, ${b})`);
    };

    img.onerror = reject;

    img.src = imageUrl;
  });
}


export function formatHM(totalMinutes: number): string {
  if (totalMinutes < 0) totalMinutes = 0;

  const hours = Math.floor(totalMinutes / 3600);
  const minutes = (totalMinutes/60) % 60;

  if (hours === 0) return `${convertToBanglaDigits(minutes?.toFixed(0))} মিনিট`;       // only minutes
  if (minutes === 0) return `${convertToBanglaDigits(hours?.toFixed(0))} ঘণ্টা`;      // only hours

  let hourText = hours>0?`${convertToBanglaDigits(hours?.toFixed())} ঘণ্টা`:'';
  let minuteText = hours>0?`${convertToBanglaDigits(minutes?.toFixed())} মিনিট`:''

  return `${hourText} ${minuteText}`;             // both
}

export function getBanglaDateDifference(isoDate: string,countOnly?:boolean): string|number {
  const previous = new Date(isoDate);
  const today = new Date();

  if (isNaN(previous.getTime())) {
    return "ভুল তারিখ";
  }

  let years = today.getFullYear() - previous.getFullYear();
  let months = today.getMonth() - previous.getMonth();

  // Adjust months and fix negative values
  if (months < 0) {
    years--;
    months += 12;
  }

  if(countOnly){
    return months;
  }

  // Convert numbers to Bangla
  const toBn = (num: number) =>
    num.toString().replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

  // If at least 1 full year is completed
  if (years >= 1) {
    return `${toBn(years)} বছর`;
  }

  // Otherwise show months
  return `${toBn(months)} মাস`;
}

export const playCount=(val:number)=>{
  if(val<1000)return val
  else return `${(val/1000).toFixed(2)}k listens`
}


export async function convertToContinueBookStatus(
  data: RawItem[],
  userId: number
) {
  let payloadData= data.map(item => ({
    bookId: item.audiobookId,
    user_id: userId,
    current_episode: item.episodeId,
    total_duration: item.duration,
    total_listen_time: Math.floor(item.runningTime),
    current_timer: Math.floor(item.runningTime)
  }));

  return await continue_listen_stat_post({data:payloadData});

}


export function generateDeviceId(length = 16) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

export function getOrCreateDeviceId() {
  let deviceId = Cookies.get('device_id');

  if (deviceId) {
    return deviceId;
  }

  deviceId = generateDeviceId(16);

  Cookies.set('device_id', deviceId, {
    expires: 365,        // 1 year
    path: "/",
    sameSite: "Lax",
    secure: window.location.protocol === "https:",
  });

  return deviceId;
}





export function getDeviceInfo() {
  // 1️⃣ Device ID (stable)
  

  // 2️⃣ User Agent
  const user_agent = navigator.userAgent;

  // 3️⃣ Platform (Windows / Mac / Linux)
  const platform = navigator.platform || 'unknown';

  // 4️⃣ Browser detection (lightweight)
  let browser = 'Unknown';

  if (user_agent.includes('Edg')) browser = 'Edge';
  else if (user_agent.includes('Chrome')) browser = 'Chrome';
  else if (user_agent.includes('Firefox')) browser = 'Firefox';
  else if (user_agent.includes('Safari')) browser = 'Safari';

  // 5️⃣ OS detection (basic & safe)
  let os = 'Unknown OS';

  if (user_agent.includes('Windows NT 10.0')) os = 'Windows 10';
  else if (user_agent.includes('Windows NT 11.0')) os = 'Windows 11';
  else if (user_agent.includes('Mac OS X')) os = 'macOS';
  else if (user_agent.includes('Linux')) os = 'Linux';
  else if (/Android/i.test(user_agent)) os = 'Android';
  else if (/iPhone|iPad/i.test(user_agent)) os = 'iOS';

  // 6️⃣ Device name (human-readable label)
  const device_name = `${os} - ${browser}`;

  // 7️⃣ Model (desktop vs mobile)
  const model = /Mobi|Android/i.test(user_agent) ? 'mobile' : 'desktop';

  return {
    device_name,
    os,
    model,
    user_agent,
  };
}


export type QuizStatus = "upcoming" | "live" | "ended";

// Timezone the kickoff time is displayed in ("BD" = Bangladesh).
const DISPLAY_TZ = "Asia/Dhaka";

export function quizEndsAt(m: any): Date {
  return new Date(new Date(m.quiz_starts_at).getTime() + m.quiz_duration * 1000);
}

/** Whether the quiz can be played right now. */
export function getQuizStatus(m: any, now: Date = new Date()): QuizStatus {
  if (!m.isActive) return "upcoming";
  const start = new Date(m.quiz_starts_at);
  const end = quizEndsAt(m);
  if (now < start) return "upcoming";
  if (now > end) return "ended";
  return "live";
}

/** e.g. "1:30 AM" in the display timezone, prefixed with "BD". */
export function formatKickoff(iso: string): string {
  const t = new Intl.DateTimeFormat("en-US", {
    timeZone: DISPLAY_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
  return `BD ${t}`;
}

/** e.g. "12 JUN 2026" in the display timezone. */
export function formatDateNew(iso: string): string {
  const date = new Date(iso);

  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date).toUpperCase();
}

export function convertToDhakaTime(dateStr:any) {
  // console.log(utcDates,"utcDates") 
    const date = new Date(dateStr);

    const dhakaTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);

    return  dhakaTime
  
}


export function isTimePassed(iso: string): boolean {
  const targetTime = new Date(iso).getTime();

  // current time in Asia/Dhaka (still based on real UTC clock)
  const now = Date.now();

  return targetTime < now;
}



export function groupByDayDhaka(data:any) {
  const groups:any = {};

  for (const item of data) {
    const dateObj = new Date(item.match_starts);

    // Use as sort key
    const sortKey = dateObj.toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });

    // Human-readable label
    const label = dateObj.toLocaleDateString("en-GB", {
      timeZone: "Asia/Dhaka",
      day: "numeric",
      month: "long",
      year: "numeric",
    }); // e.g. "12 June 2026"

    if (!groups[sortKey]) groups[sortKey] = { date: label, records: [] };
    groups[sortKey].records.push(item);
  }

  return Object.entries(groups)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => value);
}

export function groupMatchesByDay(matches: any[]) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const toLocalDate = (date: string | Date): string =>
    new Date(date).toLocaleDateString('en-CA', { timeZone });

  const today    = toLocalDate(new Date());
  const tomorrow = toLocalDate(new Date(Date.now() + 86_400_000));

  return matches.reduce(
    (acc, match) => {
      const matchDate = toLocalDate(match.match_starts);
      if (matchDate === today)              acc.todayMatches.push(match);
      else if (matchDate === tomorrow)      acc.tomorrowMatches.push(match);
      return acc;
    },
    { todayMatches: [], tomorrowMatches: [] }
  );
}

export function checkDateLabel(dateStr: string): "today" | "tomorrow" | "other" {
  const input = new Date(dateStr);
  const now = new Date();

  const toMidnight = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const inputDay = toMidnight(input).getTime();
  const todayDay = toMidnight(now).getTime();
  const tomorrowDay = todayDay + 24 * 60 * 60 * 1000;

  if (inputDay === todayDay) return "today";
  if (inputDay === tomorrowDay) return "tomorrow";
  return "other";
}

// Usage
console.log(checkDateLabel("2026-06-09T07:00:00.000Z")); // "today" or "tomorrow"