// store/slices/playlistSlice.ts
import { PlaylistAudioBook } from '@/features/playlist/components/MyPlayList/static/myplaylist.type';
import { createSlice } from '@reduxjs/toolkit';

const initialState:{
  playlistData:PlaylistAudioBook[],
  playListCurrentBooks?:[key:number|string]|null
} = { playlistData:[],playListCurrentBooks:null };

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylistValue: (state,action) => { 
        return {playlistData:action.payload,playListCurrentBooks:action.payload?.playListCurrentBooks};
     },
    // decrement: (state) => { state.value -= 1 },
    // reset: (state) => { state.value = 0 },
  },
});

export const { setPlaylistValue } = playlistSlice.actions;
export default playlistSlice.reducer;
