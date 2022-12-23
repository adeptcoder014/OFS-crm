import { Query, useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { approvalValidation } from "../validation/approval";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
//=========================================================
export const useTokenQuery = () => {
  const tokenQuery = useQuery({
    queryKey: ["jwtToken"],
    queryFn: () => {
      if (typeof window !== "undefined") {
        try {
          const token = localStorage.getItem("Token");
          if (typeof token !== "undefined") {
            return jwt_decode(token);
          }
        } catch (err) {
          console.log("err ----", err);
        }
      }
    },
  });

  return {
    tokenQuery,
  };
};
