import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Typography, Container, Grid } from "@mui/material";
import Image from "next/image";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { useSidebarOpen } from "../../context/sidebarOpen";
import { useController } from "../../controller/user";
import Loading from "../../components/loading";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import Table from "../../components/table";
import { useRouter } from "next/router";
import { deleteUser } from "../../api/user";
import Swal from "sweetalert2" ;
import InfoCard from "../../components/cards/InfoCard";
import {TokenProvider} from "../../context/localStorageToken"
import axios from "axios";
//==========================================================
export default function Home(props) {
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = useSidebarOpen();
  const theme = useTheme();
  const { query } = useController({ filter: "NEW" });


  if(typeof window !== 'undefined'){

    const token = localStorage.getItem("Token")
    if(!token){
      router.push("/admin/login")
    }
  }

  if (query.isLoading) {
    return <Loading />;
  }

  // console.log("Query ---->", query.data.data.user);
  //===================================================
  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      renderCell: (params) => (
        <p style={{ color: "black", fontWeight: 600, fontFamily: "poppins" }}>
          {params.value}
        </p>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      renderCell: (params) => (
        <p style={{ color: "black", fontWeight: 500, fontFamily: "poppins" }}>
          {params.value}
        </p>
      ),
    },
    {
      field: "phone",
      headerName: "Mobile",
      minWidth: 150,
      renderCell: (params) => (
        <p style={{ color: "black", fontFamily: "poppins" }}>{params.value}</p>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      minWidth: 150,
      editable: true,
      renderCell: (params) => (
        <Button
          sx={{
            backgroundColor: "white",
            border: "1px solid #ff855f",
            color: "#ff855f",
          }}
          variant="outlined"
            onClick={() => {
              // console.log("------>",params.id)
              router.push(`/admin/register-user/?id=${params.id}`);
            }}
        >
          Register
        </Button>
      ),
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete",
      minWidth: 150,
      editable: true,
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
            deleteUser(params.id).then(() => {
              return Swal.fire(
                "User deleted ",
                "User has been un-registered",
                "success"
              ).then(() => {
                query.refetch(), router.push("/admin/home");
              });
            });
          }}
        >
          Delete
        </Button>
      ),
      flex: 1,
    },
  ];

  //========================================================

  return (
    <Box
      sx={{
        ...(sidebarOpen && {
          width: "calc(100% + 250px)",
        }),
      }}
    >
      <Grid  sx={{ cursor: "pointer" }} container>
        <InfoCard title="All Users" url="/admin/all-users" />
        <InfoCard title="All Registered Users" />
      </Grid>
      {/* ==========  Main_Content =========================== */}

      <Container>
        <Typography
          variant="h5"
          sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
        >
          Newly registered Users :
        </Typography>

        <Box sx={{ height: 400, minWidth: "100%" }}>
          <Table rows={query?.data?.data?.user} columns={columns} />
        </Box>
      </Container>
  {/* <Box>
    {axios.get("http://localhost:5000/array").then(res =>(
      
    ))}
  </Box> */}
    </Box>

  
  );
}
Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
