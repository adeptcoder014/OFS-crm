import axios from "axios";
import { ADMIN_URL } from "../../constants/url";

export const register = (data) => {
  return axios.post(`${ADMIN_URL}/admin`, data);
};
