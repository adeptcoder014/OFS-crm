import axios from "axios";
import { ADMIN_URL } from "../constants/url";
import jwt_decode from 'jwt-decode'
//================================================
const axiosInstance = axios.create({
  baseURL: ADMIN_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("Token");
    // console.log("---- TOKEN", jwt_decode(token)._id)
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Admin_User = jwt_decode(token)._id

  }

  return config;
});

export default axiosInstance;
