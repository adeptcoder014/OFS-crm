import axios from "axios";
import axiosInstance from "../api/axios";
import { ADMIN_URL } from "../constants/url";
//=================================================
export const getFilteredUsers = (filter) => {
  return axiosInstance.post(`/user`, filter);
};
export const getAllUsers = () => {
  return axiosInstance.get(`/user/list`);
};
//------------------------------------
export const getUserById = (id) => {
  return axiosInstance.get(`/user/${id}`);
};
//----------------------------------
export const deleteUser = (id) => {
  return axiosInstance.delete(`/user/${id}`);
};
//----------------------------------
export const loginUser = (data) => {
  return axiosInstance.post(`/user/login`, data);
};

//-------------------------------------
export const userProfileUpdate = (data) => {
  const formData = new FormData();
  let { name, email, phone, profilePhoto } = data;
  // console.log("Name --", name);
  // console.log("email --", email);
  // console.log("profilePhoto --", profilePhoto);

  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);

  if (profilePhoto instanceof File) {
    formData.append("profilePhoto", profilePhoto);
  }
  console.log("<----", formData.get("profilePhoto"));

  return axios.post(`${ADMIN_URL}/user/profile`, formData, {
    headers: {
      "Content-Type":"application/json",
    },
  });
};
