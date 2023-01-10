import DashboardLayout from "../../../components/layout/dashboard-layout";
import { Grid, Typography, Box, Container, Button } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import { useRouter } from "next/router";
import Loading from "../../../components/loading";
import Table from "../../../components/table";
import { useController } from "../../../controller/user";

//========================================
export default function UserRent() {
  const router = useRouter();
  const theme = useTheme();

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
    <Container>
      <Typography
        variant="h5"
        sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
      >
        Newly registered Users :
      </Typography>
      {/* <SearchInput className="search-input"  /> */}

      <Box sx={{ height: 400, minWidth: "100%" }}>
        <Table rows={query?.data?.data?.user} columns={columns} />
      </Box>
    </Container>
  );
}
UserRent.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
