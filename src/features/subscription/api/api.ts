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

export const subscriptionPack = async (id: any) => {
  const url = `${apiEndPoints.packDetailsApi}${id}`;
 return await CommonApiHandler(
    {
      name: "subscriptionPack",
      url,
      method: TMethods.GET,
    }
 )
};




export const paymentMethodlist = async (
  forPackage: number,
  withRenewal: number
) => {
  let country = await getCountryCode()
  console.log(country, "country listing")  
  const url = apiEndPoints.paymentMethodList;
  const raw = JSON.stringify({
    forPackage,
    userId: Cookies.get("id"),
    userCountry:country,
    withRenewal,
  });
  return await CommonApiHandler(
    {
      name: "paymentMethodlist",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
    }
 )
};



export const bkashUnSubscribeUserApi = async (subscription_id: any) => {
  const url = `${apiEndPoints.bkashUnSubscribeApi}?userId=${Cookies.get(
    "id"
  )}&subscriptionid=${subscription_id}`;

  return await CommonApiHandler(
    {
      name: "bkashUnSubscribeUserApi",
      url,
      method: TMethods.DELETE,
      body:null,
      defaultTokenAllowed:false
    }
 )
};



export const robiUnSubscribeUserApi = async (msisdn: any,packageId: any) => {
  const url = `${apiEndPoints.robiUnsubscribeApi}`;
  const raw = JSON.stringify({
    userId: Cookies.get("id"),
    msisdn: `+88${msisdn}`,
    packageId:packageId
  });
  return await CommonApiHandler(
    {
      name: "robiUnSubscribeUserApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null, 
      defaultTokenAllowed:false
    }
 )
};





export const gpUnsubscribeApi = async () => {
  const url = `${apiEndPoints.gpUnsubscribeApi}?userId=${Cookies.get("id")}`;
  return await CommonApiHandler(
    {
      name: "gpUnsubscribeApi",
      url,
      method: TMethods.GET,
      defaultTokenAllowed:false
    }
 )
};





export const robiPostApi = async (payloadData: any) => {
  const url = apiEndPoints.robiPaymentApi;
  let firstPrice =
    payloadData.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    userId: Cookies.get("id"),
    packageId: payloadData.subscriptionItemId,
    from_channel: "web",
    from_source: "web",
    from_autorenewal: payloadData.isOnetime ? 0 : 1,
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
    ...getCookiesAsObject()
  });
  return await CommonApiHandler(
    {
      name: "robiPostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};



export const blDcbPostApi = async (payloadData: any) => {
  const url = apiEndPoints.blDcbPaymentApiUrl;
  var raw = JSON.stringify({
    msisdn: payloadData.msisdn,
    userId: payloadData.userId,
    packageId: payloadData.packageId,
    fromRenewal: payloadData.fromRenewal ? 1 : 0,
  });
  return await CommonApiHandler(
    {
      name: "blDcbPostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
 )
};



export const blDcbVerifyApi = async (payloadData: any) => {
 const url = apiEndPoints.blDcbVerifyApiUrl;
  var raw = JSON.stringify({
    msisdn: payloadData.msisdn,
    consent: payloadData.consent,
  });
  return await CommonApiHandler(
    {
      name: "blDcbVerifyApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const blDcbUnsubscribeApi = async (userId: any) => {
  const url = apiEndPoints.blDcbUnsubscribeApiUrl;
  var raw = JSON.stringify({
    userId: userId,
  });
  return await CommonApiHandler(
    {
      name: "blDcbUnsubscribeApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const gpPostApi = async (
  payloadData: DynamicSubscriptionPack & {
    reduce_price?: number;
    promo_code?: string;
    msisdn: string;
  }
) => {
  const url = apiEndPoints.gpPaymentApi;

  const raw = JSON.stringify({
    amount: payloadData.rawPrice - (payloadData?.reduce_price ?? 0),
    currency: "BDT",
    userId: Cookies.get("id"),
    packageId: payloadData.subscriptionItemId,
    renewal: payloadData.isOnetime ? 0 : 1,
    promoCode: payloadData.promo_code,
    msisdn: "88" + payloadData.msisdn,
    firstPayment: 1,
    purpose: "subscription",
    trafficSource: "Kabbik",
    platform: "Web",
    ...getCookiesAsObject()
  });
  return await CommonApiHandler(
    {
      name: "gpPostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};

// export const stripePostApi = async () => {};



export const bkashOfferYearly = async (payloadData: any) => {
  const url = `${apiEndPoints.bkashOneTimePaymentApi}`;

  var raw = JSON.stringify({
    amount: payloadData.amount.toString(),
    packageId: payloadData.packageId,
    methodName: payloadData.methodName,
    source: payloadData.source,
    userId: Cookies.get("id"),
  });

  return await CommonApiHandler(
    {
      name: "bkashOfferYearly",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const bkashOneTimePostApi = async (payloadData: any) => {
  const url = `${apiEndPoints.bkashOneTimePaymentApi}`;
  let firstPrice =
    payloadData.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    packageId: payloadData.subscriptionItemId,
    methodName: "bkash",
    source: "web",
    userId: Cookies.get("id"),
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
  });
  return await CommonApiHandler(
    {
      name: "bkashOneTimePostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const bkashPostApi = async (payloadData: any) => {
  const url = `${apiEndPoints.bkashPaymentApi}`;
  let eDate = new Date().setDate(new Date().getDate() + 730);
  let firstPrice =
    payloadData.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  
  var raw = JSON.stringify({
    AMOUNT: payloadData.rawPrice?.toString(),
    FIRSTPAYMENTAMOUNT: firstPrice.toString(),
    CURRENCY: "BDT",
    FREQUENCY: payloadData.frequency,
    STARTDATE: new Date().toISOString().slice(0, 10),
    EXPIRYDATE: new Date(eDate).toISOString().slice(0, 10),
    USERID: Cookies.get("id"),
    PACKAGEID: payloadData.subscriptionItemId,
    subscripRequestFrom: "web",
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
    ...getCookiesAsObject()
  });
  return await CommonApiHandler(
    {
      name: "bkashPostApi",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const paymentForPurchaseAudiobook = async (
  url: string,
  payloadData: any
) => {
  const raw = JSON.stringify(payloadData);
  
  return await CommonApiHandler(
    {
      name: "paymentForPurchaseAudiobook",
      url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const nagadPurchaseAudiobook = async (payload: any) => {
  const raw = JSON.stringify(payload);

  return await CommonApiHandler(
    {
      name: "nagadPurchaseAudiobook",
      url:payload.url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const nagadPostApi = async (payloadData: any) => {
 const url = `${apiEndPoints.nagadPaymentApi}`;
  let firstPrice =
    payloadData?.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    userId: Cookies.get("id"),
    packageId: payloadData?.subscriptionItemId,
    from_channel: "web",
    from_source: "web",
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
  });
  return await CommonApiHandler(
    {
      name: "nagadPostApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const upayPostApi = async (payloadData: any) => {
 const url = `${apiEndPoints.upayPaymentApi}`;
  let firstPrice =
    payloadData?.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    userId: Cookies.get("id"),
    packageId: payloadData?.subscriptionItemId,
    from_channel: "web",
    from_source: "web",
    promo_code: payloadData.promo_code ? payloadData.promo_code : null,
  });
  return await CommonApiHandler(
    {
      name: "upayPostApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const aamarpayPostApi = async (payloadData: any, userData: any) => {
  const url = `${apiEndPoints.aamarpayPaymentAPi}`;
  let firstPrice =
    payloadData.rawPrice -
    (payloadData?.reduce_price ? payloadData.reduce_price : 0);
  var raw = JSON.stringify({
    amount: firstPrice.toString(),
    promo_code: payloadData.promo_code ? payloadData.promo_code : "",
    type: "subscription",
    source: "Kabbik",
    platform: "web",
    userId: userData.id,
    productId: payloadData.subscriptionItemId,
    name: userData.full_name,
    phone: userData.phone_no,
    address: userData.address,
  });
  return await CommonApiHandler(
    {
      name: "aamarpayPostApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const paymentVerify = async (order_id: any) => {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
  const url = `${apiEndPoints.verifyPayment}`;
  var raw = JSON.stringify({
    sp_order_id: order_id,
  });
  return await CommonApiHandler(
    {
      name: "paymentVerify",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const getPromoCodeApi = async (pack_id: any, promo_id: any) => {
 const url = `${
    apiEndPoints.promoCodeGet
  }for_package=${pack_id}&user_id=${Cookies.get("id")}&promocode=${promo_id}`;

  return await CommonApiHandler(
    {
      name: "getPromoCodeApi",
      url:url,
      method: TMethods.GET,
      defaultTokenAllowed:false 
    }
  )
};



export const redeemCodePostApi = async (redeemCode: any) => {
 const userId = Cookies.get("id");
const url = apiEndPoints.redeemCodeApi;
  var raw = JSON.stringify({
    code: redeemCode,
    userId: userId,
  });
  return await CommonApiHandler(
    {
      name: "redeemCodePostApi",
      url:url,
      method: TMethods.POST,
      body: raw ? raw : null,
      defaultTokenAllowed:false 
    }
  )
};



export const subscriptionList = async (source:any) => {
  let url = apiEndPoints.new_packageList ;
  if(source?.value==='city_touch'){
      url = apiEndPoints.new_packageList + "?domain=citytouch";
  }
  if(source==='web_cpa'){
      url = apiEndPoints.new_packageList + "?domain=web_cpa";
  }

  let countryCode = await getCountryCode()
  return await CommonApiHandler(
    {
      name: "subscriptionList",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify({ "countryAccess": countryCode  })
    }
  )
};



export const subs_page_trackerApi = async (payload: UserActionTrack) => {
  const url = `${apiEndPoints.subs_page_tracker}`;
  const raw = JSON.stringify(payload);
  return await CommonApiHandler(
    {
      name: "subs_page_trackerApi",
      url:url,
      method: TMethods.POST,
      body:raw
    }
  )
};



export const bkashOfferHalfYearly = async (payloadData: any) => {
  const url = `${apiEndPoints.bkashOneTimePaymentApi}`;

  var raw = JSON.stringify({
    amount: payloadData.amount.toString(),
    packageId: payloadData.packageId,
    methodName: payloadData.methodName,
    source: payloadData.source,
    userId: Cookies.get("id"),
  });
  return await CommonApiHandler(
    {
      name: "bkashOfferHalfYearly",
      url:url,
      method: TMethods.POST,
      body:raw,
      defaultTokenAllowed:false
    }
  )
};



export const getDynamicPaymentMethods = async (purpose: string) => {
  const url = `${apiEndPoints.getDynamicPaymentMethods}${purpose}`;

  return await CommonApiHandler(
    {
      name: "getDynamicPaymentMethods",
      url:url,
      method: TMethods.GET,
      extraHeaders:{ cache: "no-store" }
    }
  )
};



export const makeDynamicPayment = async (payload: any, option: any) => {
  const url = option.url;
  let result:any = await CommonApiHandler(
    {
      name: "makeDynamicPayment",
      url:url,
      method: TMethods.POST,
      body: JSON.stringify(payload),
      defaultTokenAllowed:false
    }
  )
  window.location.replace(
      option.method_name === "Bkash"
        ? result.data.bkashURL
        : option.method_name === "Nagad"
        ? result.data.callBackUrl
        : option.method_name === "AamarPay"
        ? result.data.callBackUrl
        : "/cart"
    );
    return result;
};



export const payWithBkashOneTime = async (payload: BkashOneTimePayload) => {
  let url = apiEndPoints.bkashOneTimePaymentApi;
 
  return await CommonApiHandler({
    name: "payWithBkashOneTime",
    url: url,
    method: TMethods.POST,
    body: JSON.stringify(payload),
    // POST /v3/bkash/bkash-onetime-create-payment
  });
};


 

export const payWithBkashRecurring = async (payload: BkashRecurringPayload) => {
  let url = apiEndPoints.bkashPaymentApi;
 
  return await CommonApiHandler({
    name: "payWithBkashRecurring",
    url: url,
    method: TMethods.POST,
    body: JSON.stringify(payload),
    // POST /v3/bkash/bkash-create-subscription-request-app
  });
};


 
export const payWithRobi = async (payload: RobiPayload) => {
  let url = apiEndPoints.robiPaymentApi;
 
  return await CommonApiHandler({
    name: "payWithRobi",
    url: url,
    method: TMethods.POST,
    body: JSON.stringify(payload),
    // POST /v4/robi/create-payment
  });
};


 
export const payWithGP = async (payload: GPPayload) => {
  let url = apiEndPoints.gpPaymentApi;
 
  return await CommonApiHandler({
    name: "payWithGP",
    url: url,
    method: TMethods.POST,
    body: JSON.stringify(payload),
    // POST /v4/gp/create-payment
  });
};



export const promocodeHandlerV2= async (bookId:number|string,promoData:string|null) => {
    if(!promoData){
      return;
    }
    let promoCodeData
    try{
      promoCodeData = await getPromoCodeApi(
        bookId,
        promoData
      );
      if (promoCodeData.success === "false") {
        toast.error("Invalid promo code");
        return;
      }
    }catch(e:any){
      //console.log(e.message);
      
    }
    if (Object.keys(promoCodeData).length) {
      // subscriptionPackData.reduce_price = promoCodeData.data.reduce_price;
      // subscriptionPackData.promo_code = promoData;
      // setPromoCode(promoCodeData.data);
      toast.success("Promo Code Added!", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.error("Invalid Promo Code!", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }
    return promoCodeData.data?.reduce_price;
  };




export const promocodeHandlerForBook= async (bookId:number|string,promoData:string|'',amount:number,type='rent') => {
    const url = `${
      apiEndPoints.bookPromoCode
    }`;
    const requestOptions = JSON.stringify({
        "promoCode": promoData.trim(),
        "promoType": type,
        "productId": bookId.toString(),
        "amount": amount.toString()
      })
    
    return await CommonApiHandler(
    {
      name: "postLoginApi",
      url,
      method: TMethods.POST,
      body: requestOptions ? requestOptions : null,
      defaultTokenAllowed:false 
    }
 )
};



export const cityBankApiTest = async () => {
  const url = "http://localhost:8097/api/routes/city-bank-payment-status";
  return await CommonApiHandler(
    {
      name: "cityBankApiTest",
      url:url,
      method: TMethods.POST,
      body:JSON.stringify({txnStatus:1,merchanRefNo:"fgfdhhfdfb436",
transactionId:"fhdh3747719084f2892710e9",txnamount:10000} )
    }
  )
};
