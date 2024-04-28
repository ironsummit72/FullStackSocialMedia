import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice/AuthSlice";
// TODO: import reducers here

const store=configureStore({
    reducer:authSlice
})
export default store