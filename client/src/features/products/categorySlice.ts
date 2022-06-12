import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../utils/store";
import { API } from "../../api/index";

export interface ICategory {
  name: string;
  id: string;
}

type CategoryState = {
  category: ICategory[] | null;
  loading: boolean;
};

const initialState: CategoryState = {
  category: null,
  loading: true,
};

export const setCategory = createAsyncThunk("category/setCategory", async () => {
  const response = await API.get("products/categories");
  return response.data.categories;
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setCategory.pending, state => {
      state.category = null;
      state.loading = true;
    });

    builder.addCase(setCategory.fulfilled, (state, { payload }: PayloadAction<ICategory[] | null>) => {
      state.category = payload;
      state.loading = false;
    });

    builder.addCase(setCategory.rejected, state => {
      state.category = null;
      state.loading = false;
    });
  },
});

export const selectCurrentCategories = (state: RootState) => state.category;
export const selectCurrentCategoriesState = (state: RootState) => state.category.loading;
export const selectCurrentCategoriesStore = (state: RootState) => state.category;
export default categorySlice.reducer;
