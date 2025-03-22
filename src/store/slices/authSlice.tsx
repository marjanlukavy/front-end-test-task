import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from "../../services/authService";

interface AuthState {
  isAuthenticated: boolean;
  user: LoginResponse | null;
  loading: boolean;
  error: string | null;
  data: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  userInfo: {
    email: string;
    name: string;
    id: number | null;
    role: string;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  data: {},
  status: "idle",
  userInfo: {
    email: "",
    name: "",
    id: null,
    role: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
      state.status = "loading";
      state.data = {};
    },
    loginSuccess(state, { payload }) {
      state.isAuthenticated = true;
      state.user = payload;
      state.loading = false;
      state.error = null;
      state.status = "succeeded";
      state.data = payload;
      state.userInfo = {
        ...state.userInfo,
        ...payload,
      };
    },
    loginFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
      state.status = "failed";
      state.data = {};
      state.user = null;
    },
    updateUserInfo(state, { payload }) {
      state.userInfo = {
        ...state.userInfo,
        ...payload,
      };
      state.user = {
        ...state.user,
        ...payload,
      };
      state.data = {
        ...state.data,
        ...payload,
      };
    },
  },
});

export const {
  setCredentials,
  logout,
  loginStart,
  loginSuccess,
  loginFailure,
  updateUserInfo,
} = authSlice.actions;
export default authSlice.reducer;
