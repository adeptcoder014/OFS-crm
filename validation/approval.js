import * as yup from "yup";

export const approvalValidation = yup.object({
  room: yup.string("Enter room number").required("Room number is required"),
  meterReading: yup.string("Enter electric meter reading").required("Electric meter reading is required"),
  // discount: yup.string("Enter discount").required("Discount is required"),
  // security: yup.string("Enter security").required("security is required"),
  remark: yup.string("Enter remark").required("Remark is required"),
});
