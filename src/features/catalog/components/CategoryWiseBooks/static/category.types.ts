import { TBooks } from "@/pageTypes/home.types";

export type TCategoryComponent={
    category: string; // encoded string like "%E0%A6%95..."
    categoryData: {
    data: {
        name: string;
        data: TBooks[]; // 140 items in example, type unknown
    }[];
    };
}

export type TCategoryWiseTopBooksSection={
    category:string;
    data:TBooks[]|null;
    playlistBooks?:{[key:string]:string};
    handleAddToBookList?:(id:number|string,name:string)=>void
}


export interface TAudiobookCardProps {
  audiobook: TBooks;
  className?: string;
  getPlaylistItems?:()=>{};
  category:string;
  isInPlayList?:string|number;
  handleAddToBookList?:(val1:number|string,name:string)=>void
}


export type TPlaylistBooks={
    categoryName:string;
    categoryData:TCategoryComponent['categoryData'];
    dict:any;
    isPodCast:boolean;
    folders:string;
}

interface PodcastInfo {

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
    rating: number,

}

export default PodcastInfo;