// store/slices/counterSlice.ts
import { TuserPreferenceSlice } from '@/components/ui/static/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState:TuserPreferenceSlice = { 
    userPreferenceData:null
 };

const userPreferenceSlice = createSlice({
  name: 'userPreference',
  initialState,
  reducers: {
    setuserPreference: (state,action) => { 
      return {userPreferenceData:action.payload}
    },
    updateuserPreference: (state) => {  },
    deleteuserPreference: (state) => {  },
  },
});

export const { setuserPreference, updateuserPreference, deleteuserPreference } = userPreferenceSlice.actions;
export default userPreferenceSlice.reducer;
