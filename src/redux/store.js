import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice/AuthSlice";


const store=configureStore({
    reducer:authSlice
})
export default store