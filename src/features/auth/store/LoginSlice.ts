// store/slices/loginSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState:{value:boolean|string} = { value: false };

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    ReduxShowLoginModal: (state,action) => { 
      state.value =action.payload 
    },
    // decrement: (state) => { state.value =false },
    // reset: (state) => { state.value = 0 },
  },
});

export const { ReduxShowLoginModal } = loginSlice.actions;
export default loginSlice.reducer;
