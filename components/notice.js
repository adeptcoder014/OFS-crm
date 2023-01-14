import { Grid, Box, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import Table from "./table";
import Swal from "sweetalert2";
import Loading from "./loading";
import { useTheme } from "@mui/system";
import { useDarkMode } from "../context/darkMode";
//==============================================
export default function ShowNotice() {
  //=============================
  const theme = useTheme();
  const { darkMode } = useDarkMode();

  const query = useQuery({
    queryKey: ["getNotices"],
    queryFn: () => axiosInstance.get("/notice"),
  });

  if (query.isLoading) {
    return <Loading />;
  }

  //=====================================
  const columns = [
    {
      field: "type",
      headerName: "Type",
      minWidth: 300,
      renderCell: (params) => (
        <p
          style={{
            backgroundColor:
              params.value === "FOOD"
                ? "#4caf50"
                : params.value === "LAUNDARY"
                ? "#0288d1"
                : params.value === "MISC"
                ? "#ff9800"
                : params.value === "RENTAL"
                ? "#d32f2f"
                : null,
            padding: "9px",
            borderRadius: "4px",
            color: "white",
            fontWeight: 600,
            fontFamily: "poppins",
          }}
        >
          {params.value}
        </p>
      ),
    },
    {
      field: "notice",
      headerName: "Notice",
      minWidth: 500,
      renderCell: (params) => (
        <p style={{ color: "black", fontWeight: 600, fontFamily: "poppins" }}>
          {params.value}
        </p>
      ),
    },

    {
      field: "delete",
      headerName: "Delete",
      minWidth: 150,
      renderCell: (params) => (
        <Button
          sx={{
            backgroundColor: "red",
            border: "1px solid #ff855f",
            color: "white",
          }}
          variant="outlined"
          onClick={() => {
            console.log(params.id);
            axiosInstance.delete(`/notice/${params.id}`).then((res) => {
              return Swal.fire(
                "Notice deleted ",
                "Notice has been deleted",
                "success"
              );
            });
          }}
        >
          Delete
        </Button>
      ),
      flex: 1,
    },
  ];
  //========================================
  return (
    // <Grid container>
    //   {/* ================================ */}
    //   <Grid item xl={4} lg={4} md={4} sm={12} x={12}>
    //     <Box
    //       sx={{
    //         color: "white",
    //         backgroundColor: "#42a5f5",
    //         borderRadius: 1,
    //         p: 1,
    //         width: "fit-content",
    //         fontWeight: "bolder",
    //       }}
    //     >
    //       LAUNDARY
    //     </Box>
    //   </Grid>
    //   {/* ================================ */}
    //   <Grid item xl={4} lg={4} md={4} sm={12} x={12}>
    //     <Box
    //       sx={{
    //        fontWeight:600,
    //       }}
    //     >
    //       Description of some sort ......
    //     </Box>
    //   </Grid>
    //   {/* ================================ */}
    //   <Grid item xl={4} lg={4} md={4} sm={12} x={12}>
    //     <Box
    //       sx={{
    //         color: "white",
    //         backgroundColor: "#ef5350",
    //         borderRadius: 1,
    //         p: 1,
    //         width: "fit-content",
    //         fontWeight: "bolder",
    //       }}
    //     >
    //       Delete
    //     </Box>
    //   </Grid>
    // </Grid>
    <Box
      sx={{
        minWidth: "100%",
        [theme.breakpoints.down("sm")]: {
          p:"0px 45px",
          ml:3
        },
      }}
    >
      <Table rows={query?.data?.data} columns={columns} />
    </Box>
  );
}
