import DashboardLayout from "../../../components/layout/dashboard-layout";
import { Grid, Typography, Box, Container, Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import { useRouter } from "next/router";
import Loading from "../../../components/loading";
import Table from "../../../components/table";
import { useController } from "../../../controller/user";
import { useDarkMode } from "../../../context/darkMode";
//========================================
export default function UserRent() {
  const router = useRouter();
  const theme = useTheme();
  const { darkMode } = useDarkMode();
  const { query } = useController({ filter: "REGISTERED" });

  if (query.isLoading) {
    return <Loading />;
  }
  //=======================================
  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      renderCell: (params) => (
        <p
          style={{
            color: "black",
            fontWeight: 600,
            fontFamily: "poppins",
          
          }}
        >
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
      headerName: "Rent",
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
            router.push(`/admin/user/rental-detail/?id=${params.id}`);
          }}
        >
          Rental Details
        </Button>
      ),
      flex: 1,
    },
  ];

  // const filteredEmails = query?.data?.data?.user.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

  //===================================================

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: darkMode ? "#2c2f33" : "#ffffff",
        [theme.breakpoints.down("sm")]: {
          ml:-2,
        },
        [theme.breakpoints.up("sm")]: {
          ml:-2,
          // width:"450vw"
          p:5
        },

        // width: "150vw",
      }}
    >
      <Typography
        variant="h4"
        sx={
          darkMode
            ? [
                theme.lightText,
                {
                  mb: 1,
                  [theme.breakpoints.down("sm")]: {
                    fontSize: 15,
                  },
                },
              ]
            : [
                theme.darkText,
                {
                  mb: 1,
                  [theme.breakpoints.down("sm")]: {
                    fontSize: 15,
                  },
                },
              ]
        }
      >
        Newly registered Users :
      </Typography>
      {/* <SearchInput className="search-input"  /> */}

      <Box
        sx={{
          backgroundColor: darkMode ? "#2c2f33" : "#ffffff",
          minWidth: "100%",
        }}
      >
        <Table rows={query?.data?.data?.user} columns={columns} />
      </Box>
    </Container>
  );
}
UserRent.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
