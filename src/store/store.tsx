import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/profile/store/userSlice";
import categoriesReducer from "@/features/catalog/store/categoriesSlice";
import StaticTextsSlice from "@/features/home/store/staticTextSlice";
import userPreferense from "@/features/profile/store/userPreferenceSlice";
import playListSlice from "@/features/playlist/store/PlaylistSlice";
import loginSlice from "@/features/auth/store/LoginSlice";
import deviceListSlice from "@/features/auth/store/DeviceListSlice";
import globalAudioPlayerSlice from "@/features/player/store/GlobalAudioPlayerSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    staticTexts: StaticTextsSlice,
    userPreference: userPreferense,
    playList: playListSlice,
    loginSlice: loginSlice,
    audioPlayerSlice: globalAudioPlayerSlice,
    deviceList: deviceListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
