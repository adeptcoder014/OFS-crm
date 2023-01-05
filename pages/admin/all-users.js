import { Typography, Container, Box ,Button} from "@mui/material";
import { useTheme } from "@mui/system";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { useController } from "../../controller/user";
import Table from "../../components/table";
import Loading from "../../components/loading";
import { useRouter } from "next/router";
import NewRegisteredUsers from "../../components/NewRegisteredUsers";
import Users from "../../components/allUsers";
//==========================================
export default function AllUsers() {
  const theme = useTheme();
  const router = useRouter()
  const { queryAll } = useController();

  if (queryAll.isLoading) {
    return <Loading />;
  }

  // console.log("users -->", queryAll.data.data.user)


  
  //================================
  return (
    <>
      <Typography
        variant="h5"
        sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
      >
        All Users are :
      </Typography>
      <Users user={queryAll.data.data.user}/>
      <Container>
        {/* <Box sx={{ height: 400, minWidth: "100%" }}>
          <Table rows={queryAll?.data?.data?.user} columns={columns} />
        </Box> */}
      </Container>
    </>
  );
}

AllUsers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
