import axiosInstance from "../api/axios";
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
