// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/store/slicers/testSlice'; // Adjust the import path as necessary
import userReducer from '@/store/slicers/userSlice';
import categoriesReducer from '@/store/slicers/categoriesSlice';
import StaticTextsSlice from '@/store/slicers/staticTextSlice';
import userPreferense from '@/store/slicers/userPreferenceSlice';
import playListSlice from '@/store/slicers/PlaylistSlice'
import loginSlice from '@/store/slicers/LoginSlice';
import deviceListSlice from '@/store/slicers/DeviceListSlice'

import globalAudioPlayerSlice from '@/store/slicers/GlobalAudioPlayerSlice'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:userReducer,
    categories:categoriesReducer,
    staticTexts:StaticTextsSlice, 
    userPreference:userPreferense,
    playList:playListSlice,
    loginSlice:loginSlice,
    audioPlayerSlice:globalAudioPlayerSlice,
    deviceList:deviceListSlice
  },
});

// Types for TypeScript (optional)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
