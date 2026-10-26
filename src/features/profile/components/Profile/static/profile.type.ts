export interface UserSummaryInfo {

    total_played_audiobook: number,
    most_played_audiobook: Array<any>,
}

export interface FavoriteAudioBookInfo {

    id: number,
    name: string,
    description: string,
    author_name: string,
    contributing_artists: string,
    price: number,
    discount_price: number,
    guid: string,
    publish_year: null,
    thumb_path: string,
    banner_path: null,
    rating?:number;
    premium: number,
    approval_status: number,
    play_count: number,
    for_app: number,
    deleted: number,
    created_at: Date,
    updated_at: Date,
    category_id: null,
    channel_id: number,
    podcast: number,
    en_name: null,
    en_author_name: null,
    en_contributing_artists: null,
    is_favorite: true,

}


export type TRentAudiobook = {
  user_id: string;
  audiobook_id: string;
  is_purchased: string;
  name: string;
  price: number;
  thumb_path: string;
  banner_path: string;
  play_count: number;
};

export type TMyCourse = {
  id: number;
  name: string;
  image_url: string;
  routine_path: string;
  excluded_payment_methods: string; // JSON string like ["Robi","Gp","Bl"]
  base_price: string;
  total_class: string;
  duration_hour: string;
  duration_month: string;
  description: string;
  fb_group_link: string | null;
  offer_price: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
  instructor: string;
  enrolled_count: string;
  is_active: number;
  user_id: string;
  is_purchased: number;
};


export interface AudiobookItem {
  user_id: string;
  audiobook_id: string;
  is_purchased: string | number; // because the second one uses number
  purchased_at: string;
  expired_at: string;
  name: string;
  price: number;
  thumb_path: string;
  banner_path: string;
  play_count: number;
  author_name: string;
  total_duration: number;
}

export interface AudiobookResponse {
  data: AudiobookItem[];
  expiredData: AudiobookItem[];
}


export type UserActionTrack = {
  user_id: number;
  email: string | null;
  phone: string | null;
  action_type: string;
  selected_pack_id: number | null;
  selected_pay_method: string | null;
  track_id: string|null;
};