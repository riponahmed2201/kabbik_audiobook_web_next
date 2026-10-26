import Error from "next/error";

export enum TtoastType{'success'='success','error'='error'};

type BlogInfo = {
  id:number|string;
  featured_image:string;
  alter_text_for_featured_image:string;
  title: string;
  slug: string;
  // author:string;
  publish_date:string;
  excerpt: string;
  categories: string;
  contentBody: string;
  featuredImageUrl: string;
  alterTextForFeaturedImage: string;
  author: string;
  publishDate?: Date;
};

type BlogInfoFromDB = Omit<
  BlogInfo,
  | "contentBody"
  | "featuredImageUrl"
  | "alterTextForFeaturedImage"
  | "publishDate"
> & {
  id: number;
  created_at: Date;
  updated_at: Date;
  content_body: string;
  featured_image: string;
  alter_text_for_featured_image: string;
  publish_date: Date;
};

export interface DynamicSubscriptionPack {
  accessible_content: string;
  amount: string;
  bkashOnetime: number;
  bkashSubscription: number;
  canApplyPromo: number;
  country: string;
  created_at: Date | string;
  days: number;
  description: string;
  dynamicPrice: string;
  excluded_payment_methods: string | null;
  frequency: string;
  globalPrice: string;
  googlePay: number;
  id: number;
  isOnetime: number;
  length: string;
  nagadOnetime: number;
  name: string;
  priority: string;
  rawPrice: number;
  recommendation: string;
  redeem: number;
  sku: string;
  status: string;
  subscriptionItemId: string;
  surjoPay: number;
  updated_at: null;
  vat: number;
}

export enum TMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",  
  DELETE = "DELETE",
  PATCH = "PATCH",
  OPtions = "OPTIONS",
}

export type TCommonApiCallArgs={
    name:string;
    url:string;
    body?:JSON | string | null;
    method:TMethods;
    defaultTokenAllowed?:boolean;
    catchCB?:(err:any)=>void;
    noToken?:boolean;
    extraHeaders?:Object;
    notNeedHeaders?:boolean;
}

export type TtranslatorNums={"0":string;"1":string;"2":string;"3":string;"4":string;"5":string;"6":string;"7":string;"8":string;"9":string;}
export type Edigit="0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9";
export type { BlogInfo, BlogInfoFromDB };

export type TShareContent = {
  title?: string; 
  text: string;
  imageUrl?: string;
  url?: string;
};


export interface StripePaymentArgs {
  selectedPack: {
    isOnetime: number;
    subscriptionItemId: string;
  };
  userId: string;
  isIOS?: boolean;
  promoCode?: string;
  promoPrice?: number;
}

type Platform = "ios" | "android" | 'web';
 
export type BkashOneTimePayload = {
  promo_code: string;
  userId: string;
  packageId: string;
  amount: string;
};
 
export type BkashRecurringPayload = {
  AMOUNT: string;
  FIRSTPAYMENTAMOUNT: string;
  promo_code: string;
  CURRENCY: string;
  STARTDATE: string;
  EXPIRYDATE: string;
  USERID: string;
  // subscripRequestFrom: Platform;
  PACKAGEID: string;
};
 
export type RobiPayload = {
  // from_channel: Platform;
  from_source: string;
  from_autorenewal: number;
  amount: string;
  userId: string;
  packageId: string;
  promo_code: string;
};
 
export type GPPayload = {
  amount: string;
  userId: string |undefined;
  packageId: string;
  msisdn: string;
  promoCode: string;
  currency: string;
  renewal: number;
  firstPayment: number;
  purpose: string;
  trafficSource: string;
  platform: string;
};
 