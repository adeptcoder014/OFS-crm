import { Typography, Container, Box ,Button} from "@mui/material";
import { useTheme } from "@mui/styles";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { useController } from "../../controller/user";
import Table from "../../components/table";
import Loading from "../../components/loading";
import { useRouter } from "next/router";
//==========================================
export default function AllUsers() {
  const theme = useTheme();
  const router = useRouter()
  const { queryAll } = useController();

  if (queryAll.isLoading) {
    return <Loading />;
  }
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
      field: "Details",
      headerName: "More details",
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
            router.push(`/admin/user/details/?id=${params.id}`);
          }}
        >
          Details
        </Button>
      ),
      flex: 1,
    },
   
  ];

  //===============================
  return (
    <>
      <Typography
        variant="h5"
        sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
      >
        All Users are :
      </Typography>
      <Container>
        <Box sx={{ height: 400, minWidth: "100%" }}>
          <Table rows={queryAll?.data?.data?.user} columns={columns} />
        </Box>
      </Container>
    </>
  );
}

AllUsers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
