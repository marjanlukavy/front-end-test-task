import { configureStore } from "@reduxjs/toolkit";
import { catsApi } from "../services/catsService";
import { authApi } from "../services/authService";
import authReducer from "./slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [catsApi.reducerPath]: catsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(catsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T,>(selector: (state: RootState) => T): T =>
  useSelector(selector);

export { store };
