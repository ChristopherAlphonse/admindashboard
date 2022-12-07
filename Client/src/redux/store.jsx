import authReducer from "./features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/product/filterSlice";
import productReducer from "./features/product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
  },
});
