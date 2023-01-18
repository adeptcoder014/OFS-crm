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

      // console.log("VALUES ---", values)
      login.mutate(values);
    },
  });

  //------------------- LOGIN -------------------------------------
  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      return Swal.fire(
        "Logged in !",
        "Continue with the OFS User Panel",
        "success"
      )
        .then(() => {
          console.log("RES ----", res.data.token);
          localStorage.setItem("userToken", res.data.token);
        })
        .finally(() => {
          router.push(`/user/home`);
        });
    },
    onError: (err) => {
      // console.log("ERRPR ---------------------------->", err),
        Swal.fire("Error !", err.message, "error");
    },
  });

  return { login, loginForm };
};
