import * as yup from "yup";

export const adminLoginValidation = yup.object({
  email: yup.string("Enter email").required("Email is required"),
  password: yup.string("Enter password").required("Password is required"),
});
