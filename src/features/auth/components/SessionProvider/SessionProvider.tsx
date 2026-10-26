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
import Cookies from "js-cookie";
import { getDeviceList } from "@/utils/apiServices";
import { DeviceSession, ProductInfo } from "@/shared/ui/static/types";
import { clearSessionAndRedirect } from "@/helpers/commonFunction";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setDeviceList } from "@/features/auth/store/DeviceListSlice";

export type GlobalStateType = {
  cartItems: ProductInfo[];
};

type GlobalStateContextType = {
  globalState: GlobalStateType;
  setGlobalState: Dispatch<SetStateAction<GlobalStateType>>;
};

const GlobalStateContext = createContext({} as GlobalStateContextType);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store?.user?.userData);
  const [globalState, setGlobalState] = useState<GlobalStateType>({
    cartItems: [],
  });

  const handleDeviceList = async () => {
    const result: { result: DeviceSession[] } = await getDeviceList();
    const device_id = Cookies.get("device_id");
    const item = result?.result?.find(
      (item: DeviceSession) => item.device_id === device_id
    );
    dispatch(setDeviceList(result?.result));
    if (!item?.device_id) {
      clearSessionAndRedirect();
    }
  };

  useEffect(() => {
    try {
      localStorage.removeItem("continueListeningData");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    void handleDeviceList();
  }, [user?.id]);

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
