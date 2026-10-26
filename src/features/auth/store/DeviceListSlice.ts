// store/slices/counterSlice.ts
import { DeviceSession } from '@/shared/ui/static/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState:{data:DeviceSession[]|null} = { data: null };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setDeviceList: (state, action: PayloadAction<DeviceSession[]>) => {
      state.data = action.payload;
    },
    // decrement: (state) => { state.value -= 1 },
    // reset: (state) => { state.value = 0 },
  },
});

export const { setDeviceList } = counterSlice.actions;
export default counterSlice.reducer;
