import * as yup from "yup";

export const adminRegistrationValidation = yup.object({
  name: yup.string("Enter Your Name").required("Name is required"),
  email: yup.string("Enter your email").required("email is required"),
  password: yup.string("Enter password").required("password  is required"),
});
