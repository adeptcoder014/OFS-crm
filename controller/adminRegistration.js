import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { adminRegistrationValidation } from "../validation/adminRegistration";
import { register } from "../api/auth/adminRegistration";
//=========================================
export const useController = () => {
  const router = useRouter();

  //------------------ ADD_FORM -------------------------------------
  const addForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: adminRegistrationValidation,
    onSubmit: (values) => {
      console.log("-------->",values),
      add.mutate(values);
    },
  });

  //------------------- ADD -------------------------------------
  const add = useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      return Swal.fire(
        "Registration Done",
        "Please Login to continue with the Admin Panel",
        "success"
      ).then(() => router.push("/admin/login"));
    },
    onError: (err) => 
    // console.log(err.response.data.message)
    Swal.fire("Error !", err.response.data.message, "error"),
  });

  return { add, addForm };
};
