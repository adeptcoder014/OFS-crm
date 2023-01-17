import { useQuery, useMutation } from "@tanstack/react-query";
import { register } from "../api/auth/userRegistration";
import { getUsers } from "../api/user";
import { registrationValidation } from "../validation/userRegistration";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { useRouter } from "next/router";
//=========================================
export const useController = () => {

  const router = useRouter();

  //------------------ ADD_FORM -------------------------------------
  const addForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      dob: "",
      idPhoto: "",
      photo: "",
      roomPreference: "",
    },
    validationSchema: registrationValidation,
    onSubmit: (values) => {
      console.log("client payload --", values);
      add.mutate(values);
    },
  });

  //------------------- ADD -------------------------------------
  const add = useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      console.log("Yeh aaya re ---__>", res.data.user._id)
      return Swal.fire(
        "Registration Done ",
        "Wait for the Admin approval",
        "success"
      ).then(() => router.push(`/user/pending/?id=${res.data.user._id}`));
    },
    onError: (err) =>
      Swal.fire(
        "Error !",
        err.response.data.errors
          ? err.response.data.errors.phone.message
          : err.response.data,
        "error"
      ),
  });

  return { add, addForm };
};
