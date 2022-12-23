import axiosInstance from "../api/axios";
//=================================================
export const getAdminById = (id) => {
  return axiosInstance.get(`/admin/${id}`, id);
};
