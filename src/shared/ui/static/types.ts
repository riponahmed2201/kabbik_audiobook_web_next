import { ReelType } from "@/features/home/components/Home/static/utils";

export type TCommonBtnProps={
    isLoading?:boolean;
    disabled?:boolean;
    children:string | React.ReactNode;
    handleClick?:(val:any) => void;
    className?:string;
    addiTionalClass?:string;
}

// কাব্যিক অ্যাপের গাইডলাইন/ফিচার সেকশনের টাইপ
export interface Feature {
  title: string;
  subtitle: string;
}

export interface FeatureSection {
  heading: string;
  image: string;           // image URL
  datas: Feature[];        // প্রত্যেক সেকশনের ফিচার লিস্ট
  link?:string;
}

export type staticTextSlice= {
  data: null |
  {
    home_page_steps_by_steps: {
      heading: string;
      datas: {
        title:string;
        subtitle:string
      }[];
    };
    guideline: FeatureSection[];
    best_collection: {
      bg: string;
      heading: string;
      para: string;
      category: string;
    }[];
    home_video:{
        videos: {
          link: string;
          thumbnail: string;
        }[]
    },
    big_book_banners:[
        {
            img:string,
            id:string,
            link?:string
        }
    ],
     big_book_banners_subscribed:[
        {
            img:string,
            id:string,
            link?:string,
        }
    ],
    upcoming:{
      thumb_path: string;
      date: string;
    }[];
    popular_categories:{
      img:string;
      path:string;
    }[],
    campaign_video:{
      videos: {
        link: string;
        thumbnail: string;
      }[]
    },
    nepal_tour_video:{
      videos: {
        video_url: string;
        heading: string;
        para: string;
        thumbnail: string;
      }[]
    },
    teamMembers:{
        name: string;
        title: string;
        description: string;
        imageUrl: string;
    }[],
    special_offers:{
      thumb: string;
      link: string;
      id: number;
    }[],
    reels:ReelType[]
  }
};


export type TCategoryItem= {
  id: number;
  name: string;
  price: number;
  color?:string;
  thumb_path: string;
  rent_duration_day: number;
  priority: number;
  isPurchased: number;
  for_rent: number;
  forAcademic: number;
  deleted: number;
  created_at: string;   // or Date, if you parse it
  updated_at: string;   // or Date, if you parse it
};

export type TCategoriesSlice={
  CategoriesData:TCategoryItem[]|null;
}

export type TUserSlice={
  userData:TUserProfile|null;
}

export type TUserProfile = {
  id: number;
  full_name: string;
  user_name: string;
  phone_no: string;
  address: string;
  city: string;
  post_code: string;
  user_email: string | null;
  image_url: string | null;
  role: number;
  status: string;
  message: string;
  premium: number;
  payment_method: string;
  auth_src: string;
  subscription_id: string;
  package_id: number;
  is_subscribed: number;
  canceled_subscription: number;
  purchase_time: number;
  next_purchase_time: number;
  total_earnings: number;
  total_payout: number;
  subscriptionDetails:SubscriptionPack;
  total_withdraw: number;
  refer_code: string | null;
  user_id_fb: string | null;
  client_id: string | null;
  client_secret: string | null;
  pass_hash: string | null;
  channel: string | null;
  deleted: number;
  created_at: string; // or Date if parsed
  updated_at: string; // or Date if parsed
};

type SubscriptionPack = {
  accessible_content: string;
  amount: string;
  banner_name: string;
  base_amount_bn: string;
  benefit: string; // JSON string — can parse into BenefitItem[]
  bn_name: string;
  country: string;
  country_access: string;
  created_at: string;
  days: number;
  description: string;
  display_pack_name: string;
  dynamicPrice: string;
  excluded_payment_methods: string | null;
  forDomain: string | null;
  for_affiliate: number;
  free_trial_in_day: number;
  frequency: string;
  globalPrice: string;
  id: number;
  isOnetime: number;
  is_free_trail: number;
  is_promo_applicable: number;
  length: string;
  name: string;
  priority: string;
  rawPrice: number;
  recommendation: string;
  recurring_banner_name: string | null;
  sku: string;
  status: string;
  subscriptionItemId: string;
  subtitle: string;
  updated_at: string | null;
  vat: number;
};



// export type TCommonBtnProps={
//   isLoading:boolean;
//   disabled:boolean;
//   children:boolean;
//   handleClick:boolean;
//   className:boolean;
// }

export  type RatingProps = {
  /** Current rating value (controlled). Supports fractions. */
  value?: number;
  /** Initial value (uncontrolled). */
  defaultValue?: number;
  /** Called when user selects a value. */
  onChange?: (value: number) => void;
  /** Minimum value (inclusive). Default: 1 */
  min?: number;
  /** Maximum value (inclusive). Default: 5 */
  max?: number;
  /** Step for interaction (mouse/keyboard). Default: 0.5 */
  step?: number;
  /** If true, disables interactions. */
  readOnly?: boolean;
  /**
   * Render prop for the full icon. Should be a component that respects currentColor
   * and accepts className.
   * Example: ({ className }) => <Star className={className} />
   */
  icon:  React.ReactNode;
  /** Size utility classes, e.g., "w-6 h-6". Default: "w-6 h-6" */
  sizeClasses?: string;
  /** Extra classes for the root container. */
  className?: string;
  /** Color classes for filled and empty states. */
  fillClassName?: string; // e.g., "text-yellow-500"
  emptyClassName?: string; // e.g., "text-gray-300 dark:text-gray-600"
  /** Accessible label prefix */
  ariaLabel?: string;
};

export type TuserPreferenceSlice={
  userPreferenceData:null | TUserPreferenceResponse
}

export type TUserPreferenceResponse={
  id: number|string;
  authors: (string|number)[] | null;
  categories: (string|number)[] | null;
}

export type TprofileFields ='name'|
'phoneNo'|
'city_name'|
'address'|
'postCode'


export  type UpdateUserPayload = {
  full_name: string;
  phone_email: string;
  city_name: string;
  address: string;
  post_code: string;
  file: File|null;
};


export interface ProductInfo {
  id: number;
  name: string;
  image_url: string;
  type: string;
  base_price: string;
  offer_price: string;
  property: null;
  stock: number;
  total_sold: string;
  quantity?: number;
}


export type TDelete={
  heading?:string;
  subTitle?:string;
  onClose:()=>void;
  handleDelete:()=>void;
}

export  interface TConinueBooks {
  audiobookId: number;
  audiobookImg: string;
  duration: number;
  episodeId: number;
  episodeName: string;
  runningTime:number;
  isFree: 0 | 1; // backend sends 1 or 0
}


export type ContinueBookStatusItem = {
  bookId: number;
  user_id: number;
  current_episode: number;
  total_duration: number;
  total_listen_time: number;
  current_timer: number;
};

export type ContinueBookStatusResponse = {
  data: ContinueBookStatusItem[];
};

export type ContinueReadingItem = {
  book_id: number;
  current_episode: number;
  current_timer: number;
  complete_percentage: number;
  book_name: string;
  banner: string;
  book_cover: string;
};

export type ContinueReadingResponse = {
  status: boolean;
  message: string;
  data: ContinueReadingItem[];
};


export type FinishedBookStats = {
  total_book_finished: number;
  today_finished_count: number;
  this_monthly_finished_count: number;
  this_yearly_finished_count: number;
};

export type FinishedBookStatsResponse = {
  status: boolean;
  message: string;
  data: FinishedBookStats[];
};

export interface DeviceSession {
  id: number;
  device_name: string;
  user_id: number;
  os: string;
  device_id: string;
  model: string; // Could also be a union like 'desktop' | 'mobile'
  ip: string;
  brand: string | null;
  is_physical_device: number; // 1 for true, 0 for false
  systemVersion: string | null;
  user_agent: string;
  app_version: string;
  jwt_token: string;
  is_active: number;
  deleted: number;
  last_login: string; // ISO Date string
  created_at: string;
  updated_at: string;
}

export interface DeviceListResponse {
  result: DeviceSession[];
}
