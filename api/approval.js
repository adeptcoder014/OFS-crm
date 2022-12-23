import { ADMIN_URL } from "../constants/url";
import axios from "axios";
//================================================

export const approval = ({ data, id }) => {
  return axios.patch(`${ADMIN_URL}/user/approval/${id}`, data);
};
