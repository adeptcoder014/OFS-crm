import { Query, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { approvalValidation } from "../validation/approval";
import { useRouter } from "next/router";
import { approval } from "../api/approval";
//=========================================================
export const useController = () => { // Controller for all approval (PATCHing user-model)--server-side-state Managment
  const router = useRouter();
  //------------------ ADD_FORM -------------------------------------
  const patchForm = useFormik({
    initialValues: {
      room: "",
      meterReading: "",
      discount: "",
      security: false,
      remark: "",
    },
    validationSchema: approvalValidation,
    onSubmit: (values) => {
        // console.log("values---",values)
         
      patch.mutate({ data: values, id: values.id });
    },
  });
  //------------------- ADD -------------------------------------

  const patch = useMutation({
    mutationFn: approval,
    onSuccess: (res) => {
      //   query.refetch();
      Swal.fire("User Registered !", "Final Registration Completed", "success");
      router.push("/admin/home");
    },
    onError: (err) => Swal.fire("Error !", err.response.data, "error"),
  });

  return {
    patchForm,
    patch
  }
};
