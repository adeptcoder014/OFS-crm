import axiosInstance from "../api/axios";
//========================================

export const getRent = () => {
  return axiosInstance.get(`/rent`);
};
//------------------------------------
export const getRentById = (joiningDate) => {
    // console.log("joiningDate --------------->",joiningDate)

  return axiosInstance.get(`/rent/structure/?date=${joiningDate}`);
};
