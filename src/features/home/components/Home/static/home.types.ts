import { HomeInfo, PromoBannerInfo, TopBannerImageInfo } from "@/pageTypes/home.types";
import bn from '@/locales/bn/common.json';
import en from '@/locales/en/common.json';
import { BlogInfo } from "@/helpers/commonTypes";

export type TBestCollection={
    homeData:HomeInfo
}

export type TBigBanners={
    
}

export interface TUpcomingAudiobook {
  audiobook_id: number | null;
  author: string;
  book_banner?:string;
  contributingArtists: string;
  created_at: string; // ISO date string
  deleted: string; // "0" or "1"
  description: string;
  file_name: string;
  file_path: string;
  id: number;
  isFree: boolean | null;
  name: string;
  play_count: number | null;
  price: string; // keeping as string since it's quoted ("59")
  release_date: string; // "DD-MM-YYYY" format
  thumbPath: string;
  updated_at: string; // ISO date string
}

export type THomeProps = {
  homeData: HomeInfo;
  topBannerData: { data: TopBannerImageInfo[] | null };
  promoData: PromoBannerInfo;
  blogs: { list: BlogInfo[] };
  /** Server-fetched upcoming list; when provided (including `[]`), client does not call `/v4/upcoming` again */
  upcomingBooksInitial?: TUpcomingAudiobook[] | null;
};
