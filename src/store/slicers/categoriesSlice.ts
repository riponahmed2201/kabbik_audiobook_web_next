// store/slices/counterSlice.ts
import { TCategoriesSlice } from '@/components/ui/static/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TCategoriesSlice= { 
    CategoriesData:null
 };

const categoriesSlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {
    setCategories: (state,action) => { 
      return {CategoriesData:action.payload}
    },
    updateCategories: (state) => {  },
    deleteCategories: (state) => {  },
  },
});

export const { setCategories, updateCategories, deleteCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
