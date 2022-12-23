import axios from "axios";
import { ADMIN_URL } from "../../constants/url";

export const register = (data) => {
  const formData = new FormData();
  let { name, email, dob, phone, idPhoto, photo, roomPreference } = data;

  formData.append("name", name);
  formData.append("email", email);
  formData.append("dob", dob);
  formData.append("phone", phone);
  // if (idPhoto instanceof File) {
  //   formData.append("idPhoto", idPhoto);
  // }
  if (photo instanceof File) {
    formData.append("photo", photo);
  }
  formData.append("roomPreference", roomPreference);

  return axios.post(`${ADMIN_URL}/register`, formData);
};
