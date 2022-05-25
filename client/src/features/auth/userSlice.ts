import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../utils/store";
import { API } from "../../api/index";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  tokens?: ITokens[] | null;
  addresses?: IAddresses | null;
}

interface ITokens {
  issuedAt: Date;
  browser: string;
  browserVersion: string;
  os: string;
  platform: string;
}

interface IAddresses {
  id: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

type AuthState = {
  user: IUser | null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: true,
};

export const setUser = createAsyncThunk("user/setUser", async () => {
  const response = await API.get("user");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setUser.pending, state => {
      state.user = null;
      state.loading = true;
    });

    builder.addCase(
      setUser.fulfilled,
      (state, { payload: { user } }: PayloadAction<{ user: IUser | null }>) => {
        state.user = user;
        state.loading = false;
      }
    );

    builder.addCase(setUser.rejected, state => {
      state.user = null;
      state.loading = false;
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.user.user;
export const selectCurrentUserState = (state: RootState) => state.user.loading;
export const selectCurentUserStore = (state: RootState) => state.user;
export default userSlice.reducer;
