import axios from "axios";
import envVar from "@/conf/env.js";
const axiosInstanceWithCredentials = axios.create({
  baseURL: envVar.backendUrl,
  withCredentials: true,
});
const axiosInstance = axios.create({
  baseURL: envVar.backendUrl,
});
export { axiosInstanceWithCredentials, axiosInstance };
