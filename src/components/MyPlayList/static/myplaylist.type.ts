export interface PlaylistAudioBook {
  audiobook_id: number;
  author_name: string;
  banner_path: string;
  created_at: string; // ISO date string
  en_author_name: string | null;
  en_name: string;
  folder_id: number;
  thumb_path:string;
  folder_name: string;
  playlist_book_id:number|string;
  name: string;
}

export type TFolderModal={
    folders:{
        [key: string]: string;
        [key: number]: string;
    },
    AddNewFolder:(val:string)=>void;
    loader:boolean;
    audioBookId?:number;
    closeModal?:()=>void
}