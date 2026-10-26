// store/slices/counterSlice.ts
import { staticTextSlice } from '@/components/ui/static/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState:staticTextSlice= { 
    data:null
 };

const StaticTextsSlice = createSlice({
  name: 'StaticTexts',
  initialState,
  reducers: {
    setStaticTexts: (state,action) => { 
      return {data:action.payload}
    },
    updateStaticTexts: (state) => {  },
    deleteStaticTexts: (state) => {  },
  },
});

export const { setStaticTexts, updateStaticTexts, deleteStaticTexts } = StaticTextsSlice.actions;
export default StaticTextsSlice.reducer;
