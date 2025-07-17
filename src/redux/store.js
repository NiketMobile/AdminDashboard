import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/appReducer"
import pagesReducer from "./reducers/pagesReducer"

export const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    pages: pagesReducer
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(apiSlice.middleware),
    getDefaultMiddleware().concat(),
});
