export interface HomeInfo {
  name: string;
  data: [
   {name:string,data:TBooks[]}
  ];
}

export type TBooks= {
  id: number;
  name: string;
  en_name: string;
  description: string;
  author_name: string;
  premium: number;
  thumb_path: string;
  price: number;
  play_count: number;
  rating: number;
  for_rent:0|1;
  total_played: number;
  rect_banner:string |null;
}

export interface CatagorySuggestionsInfo {

    "id": number,
    "name": string,
    "thumb_path": null,
    "priority": number,
    "deleted": number,
    "created_at": Date,
    "updated_at": Date,

}

export  interface CatagorySugges {
  data:CatagorySuggestionsInfo[]
}

export interface PromoBannerInfo {

    id: number,
    image_url: string,
    title: string,
    route: string,
    created_at: Date,
    updated_at: Date,
    status: number,
    audiobook_id: string,
    package_id: null,

}

export interface TopBannerImageInfo {
    id: number,
    name: string,
    description: string,
    author_name: string,
    premium: number,
    thumb_path: string,
    price: number,
    play_count: number,
    rating: number
}

