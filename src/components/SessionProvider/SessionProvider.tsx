"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from 'js-cookie';
// import { ProductInfo } from "../../models/ProductInfo";
import SessionManager from "../../utils/SessionManager";
import { getDeviceList, getSessionInit } from "@/utils/apiServices";
import { DeviceSession, ProductInfo, RawItem } from "../ui/static/types";
import { clearSessionAndRedirect, convertToContinueBookStatus } from "@/helpers/commonFunction";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { usePathname } from "next/navigation";
import { setDeviceList } from "@/store/slicers/DeviceListSlice";

export type GlobalStateType = {
  cartItems: ProductInfo[];
  session: {
    type: "Activity" | "Stream";
    audiobookId: number | null;
    episodeId: number | null;
    isPlaying: boolean;
  };
};

type GlobalStateContextType = {
  globalState: GlobalStateType;
  setGlobalState: Dispatch<SetStateAction<GlobalStateType>>;
};

const GlobalStateContext = createContext({} as GlobalStateContextType);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const dispatch= useAppDispatch();
  const user=useAppSelector((store)=>store?.user?.userData);
  const [globalState, setGlobalState] = useState<GlobalStateType>({
    cartItems: [],
    session: {
      type: "Activity",
      audiobookId: null,
      episodeId: null,
      isPlaying: false,
    },
  });
  useEffect(() => {
    const hitInit = async () => {
      getSessionInit(
        globalState.session.audiobookId!,
        globalState.session.episodeId!
      );
    };
    hitInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const sessionManager = new SessionManager(null, null);
    sessionManager?.startSession(globalState.session.isPlaying);
    return () => sessionManager?.pauseSession();
  }, [globalState.session]);

  useEffect(()=>{
    if(!user?.id)return;

    let localContinueListenData = localStorage.getItem('continueListeningData');
    if(localContinueListenData?.length){
      let data:RawItem[] = JSON.parse(localContinueListenData)
      convertToContinueBookStatus(data,user?.id||0)
    }

  },[user?.id,pathname])

  const handleDeviceList=async()=>{
     let result:{result:DeviceSession[]} = await getDeviceList();
     let device_id= Cookies.get('device_id');
     let item = result?.result?.find((item : any)=>item.device_id===device_id);
     
     dispatch(setDeviceList(result?.result));

     if(!item?.device_id){
      clearSessionAndRedirect()
     }
    }


    


  useEffect(()=>{
    if(!user?.id)return;
    // if(user.user_email?.includes('@') && user.user_email?.includes('.')){
    //   return;
    // }
    handleDeviceList()

  },[user?.id])
  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
