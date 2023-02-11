import { ADMIN_URL } from "../constants/url";
import axios from "axios";
import axiosInstance from "./axios";
//================================================

export const approval = ({ data, id }) => {
  return axiosInstance.patch(`${ADMIN_URL}/user/approval/${id}`, data);
};
