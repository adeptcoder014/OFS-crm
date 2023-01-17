import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { adminLoginValidation } from "../validation/adminLogin";
import { login } from "../api/auth/adminLogin";
import axios from "axios";
import { ADMIN_URL } from "../constants/url";
import { loginUser } from "../api/user";
//=========================================
export const useController = () => {
  const router = useRouter();

  //------------------ ADD_FORM -------------------------------------
  const loginForm = useFormik({
    initialValues: {
      phone: "",
    },
    onSubmit: (values) => {
      login.mutate(values);
    },
  });

  //------------------- LOGIN -------------------------------------
  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      //   console.log(res.data[0]._id);
      return Swal.fire(
        "Logged in !",
        "Continue with the OFS User Panel",
        "success"
      ).then(() => {
        localStorage.setItem("userId",res.data[0]._id )
        router.push(`/user/home?id=${res.data[0]._id}`)
    });
    },
    onError: (err) => {
      console.log("ERROr ---", err),
        Swal.fire("Error !", err.response.data, "error");
    },
  });

  return { login, loginForm };
};
