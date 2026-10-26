// type BlogInfo = {
//   id:number | string;
//   title: string;
//   slug: string;
//   excerpt: string;
//   categories: string;
//   contentBody: string;
//   featuredImageUrl: string;
//   alterTextForFeaturedImage: string;
//   author: string;
//   publishDate?: Date;
// };

import { BlogInfo } from "@/helpers/commonTypes";

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

export type TBlogsProps={
  blogs:{
        list:BlogInfo[]
    }
}

export interface UpComingInfo {
  status: string;
  data?: Data[] | null;
}
export interface Data {
  id: number;
  name: string;
  description: string;
  file_name: string;
  file_path: string;
  isFree?: null;
  play_count?: null;
  audiobook_id?: null;
  created_at: string;
  updated_at: string;
  author: string;
  contributingArtists: string;
  price: string;
  thumbPath: string;
  deleted: string;
  release_date: string;
}

export type TSponsorRequest= {
  userId: number | string;
  productName: string;
  companyProductDetails: string;
  productLink: string;
  contactPersonName: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
};

export type TGamezopTracker = {
    game_type:string;
    game_category:string;
    game_name:string;
    user_id:number;
}


export type { BlogInfo, BlogInfoFromDB };
