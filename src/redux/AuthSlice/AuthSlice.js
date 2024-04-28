import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isUserAuthenticated: false,
  userData: null,
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser(state, action) {
      state.isUserAuthenticated = true,
        state.userData = action.payload;
    },
    logout(state) {
      state.isUserAuthenticated = false;
      state.userData = null;
    },
  },
});
export const { authenticateUser, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
