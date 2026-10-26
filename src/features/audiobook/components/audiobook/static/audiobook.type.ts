

export interface AuthorInfo {

    id: number,
    name: string,
    description: string,
    imageUrl: string,
    isActive: number,
    created_at: Date,
    updated_at: Date,
    deleted: number,
    en_name: string,
    total_audiobooks: number,

}

export interface castCrewInfo {

    id: number,
    name: string,
    en_name: string,
    description: string,
    imageUrl: string,
    deleted: number,
    isActive: number,
    created_at: Date,
    updated_at: Date,
    total_audiobooks: number

}

export interface RatingReviewInfo {

    user_name: string,
    full_name: string,
    image_url: null,
    id: number,
    rating: number,
    review: string,
    deleted: number,
    created_at: Date,
    updated_at: Date,
    audiobook_id: number,
    user_id: number

}

export interface PageProps {
  audiobookData: TAudioBookDetails;
  bookId: number;
  authorDetailsData: {data:TAuthor[]};
  castData: {data:castCrewInfo[]};
  reviewDetailsData: {data:RatingReviewInfo[]};
}

export interface UserProfileInfo {

    id: number,
    user_name: string,
    full_name: string,
    user_email: string,
    phone_no: string,
    city: string,
    address: string,
    post_code: string,
    auth_src: string,
    channel: string,
    pass_hash: null,
    premium: number,
    image_url: null,
    role: number,
    user_id_fb: null,
    deleted: number,
    created_at: Date,
    updated_at: Date,
    package_id: number,
    is_subscribed: number,
    payment_method: string,
    purchase_time: number,
    subscription_id: string,
    canceled_subscription: number,
    next_purchase_time: null,
    subscriptionDetails: Array<any>

}

export type TAudioBookDetails= {
  approval_status: number
  author_name: string
  banner_path: string
  c_name: string | null;
  total_played:number;
  category_id: number | null
  channel_id: number
  contributing_artists: string
  created_at: string
  deleted: number
  description: string
  discount_price: number
  en_name: string
  episodes: TEpisode[] // you can replace with proper episode type if known
  excluded_payment_methods: string[] |string;
  file_name: string | null
  file_path: string | null
  for_app: number
  for_rent: number
  guid: string | null
  id: number
  isAdsExits: number
  isPurchased: number
  isSubRestricted: number
  is_favorite: boolean
  name: string
  play_count: number
  podcast: number
  premium: number
  price: number
  publish_year: number | null
  publisher_id: number
  rating: number
  rating_count: number;
  rect_banner:string;
  rent_duration_in_day: number
  rent_duration_in_month: number
  review: string
  thumb_path: string
  updated_at: string
  user_rating: number
}


export type TEpisode={
  id: number
  audiobook_id: number
  name: string
  description: string | null
  bgm_filepath: string
  file_name: string | null
  file_path: string | null
  duration: number
  play_count: number | null
  isfree: number | null
  created_at: string
  updated_at: string
}

export type TAuthor={
  id: number
  name: string
  en_name: string
  description: string
  imageUrl: string
  total_audiobooks: number
  isActive: 0 | 1
  deleted: 0 | 1
  created_at: string // ISO date string
  updated_at: string // ISO date string
}
