// store/slices/counterSlice.ts
import { globalAudioPlayerSlice } from '@/shared/ui/static/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState:globalAudioPlayerSlice= { 
    bookIds:[],
    audibookDetailsData:null,
    playerBook:null,
    playerEpisodeInd:null,
    timer:0,
    speed:0,
    withBg:true,
    playAll:false,
};

const globalAudioPlayersSlice = createSlice({
  name: 'globalAudioPlayers',
  initialState,
  reducers: {
    setglobalAudioPlayers: (state,action:PayloadAction<globalAudioPlayerSlice>) => { 
      return {...action.payload}
    },
    updateglobalAudioPlayers: (state) => {  },
    deleteglobalAudioPlayers: (state) => {  },
  },
});

export const { setglobalAudioPlayers, updateglobalAudioPlayers, deleteglobalAudioPlayers } = globalAudioPlayersSlice.actions;
export default globalAudioPlayersSlice.reducer;
