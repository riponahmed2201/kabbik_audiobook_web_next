// store/slices/counterSlice.ts
import { TUserSlice } from '@/components/ui/static/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState:TUserSlice = { 
    userData:null
 };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,action) => { 
      //console.log(action.payload,"action.payload")
      return {userData:action.payload}
    },
    updateUser: (state) => {  },
    deleteUser: (state) => {  },
  },
});

export const { setUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
