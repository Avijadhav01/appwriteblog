import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // console.log("Payload:", action.payload);

      state.status = true;
      state.userData = action.payload.userData;
    },

    logout: (state, action) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
