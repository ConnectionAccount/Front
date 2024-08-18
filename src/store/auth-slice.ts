import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "@/interface/auth";

const initialState: IAuth = {
  user: null,
  permissions: [],
  userId: null,
  customerId: null,
  accessToken: null,
  sessionScope: null,
  otp: {
    otpMethod: null,
    email: null,
    expiresAt: null,
    message: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOtp: (state, action) => {
      const { otpMethod, email, expiresAt, message } = action.payload;
      return {
        ...state,
        otp: {
          otpMethod,
          email,
          expiresAt,
          message,
        },
      };
    },
    setToken: (
      state,
      {
        payload,
      }: {
        payload: {
          accessToken: string;
          sessionScope: string;
        };
      },
    ) => ({ ...state, accessToken: payload.accessToken }),
    logout: () => {
      return initialState;
    },
    authMe: (state, { payload }: { payload: any }) => ({
      ...state,
      user: payload,
      userId: payload?._id,
      customerId: payload?.customer,
      permissions: payload.permissions,
    }),
  },
});

export const authReducer = authSlice.reducer;

export const { authMe, setToken, logout, setOtp } = authSlice.actions;
