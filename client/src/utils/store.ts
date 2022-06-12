import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";
import categoryReducer from "../features/products/categorySlice";
import productsReducer from "../features/products/productsSlice";

const store = configureStore({
  reducer: { user: userReducer, products: productsReducer, category: categoryReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
