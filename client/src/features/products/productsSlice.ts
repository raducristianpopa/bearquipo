import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../utils/store";
import { API } from "../../api/index";

export interface IProducts {
  name: string;
  description: string;
  slug: string;
  price: number;
  supplier: {
    name: string;
  };
  category: {
    name: string;
  }[];
  ProductImage: {
    image: string;
  }[];
}

type ProductsState = {
  products: IProducts[] | null;
  loading: boolean;
};

const initialState: ProductsState = {
  products: null,
  loading: true,
};

export const setProducts = createAsyncThunk("products/setProducts", async () => {
  const response = await API.get("products");
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setProducts.pending, state => {
      state.products = null;
      state.loading = true;
    });

    builder.addCase(
      setProducts.fulfilled,
      (state, { payload: { products } }: PayloadAction<{ products: IProducts[] | null }>) => {
        state.products = products;
        state.loading = false;
      }
    );

    builder.addCase(setProducts.rejected, state => {
      state.products = null;
      state.loading = false;
    });
  },
});

export const selectCurrentProducts = (state: RootState) => state.products.products;
export const selectCurrentProductsState = (state: RootState) => state.products.loading;
export const selectCurentProductsStore = (state: RootState) => state.products;
export default productsSlice.reducer;
