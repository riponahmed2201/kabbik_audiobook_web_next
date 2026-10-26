import { Dispatch, LegacyRef, RefObject, SetStateAction } from "react"

export type TVideoPlayerProps={
    url:string,
    playing:boolean,
    setPlaying:Dispatch<SetStateAction<boolean>>,
    videoRef:RefObject<HTMLVideoElement>,
    togglePlay:()=>void;
    height?:string;
    poster?:string;
    width?:string;
    muted?:boolean;
}