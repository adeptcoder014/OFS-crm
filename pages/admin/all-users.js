import { Typography, Container, Box, Button } from "@mui/material";
import { useTheme } from "@mui/system";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { useController } from "../../controller/user";
import Table from "../../components/table";
import Loading from "../../components/loading";
import { useRouter } from "next/router";
import NewRegisteredUsers from "../../components/NewRegisteredUsers";
import Users from "../../components/allUsers";
import { useDarkMode } from "../../context/darkMode";
//==========================================
export default function AllUsers() {
  const theme = useTheme();
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const { queryAll } = useController();

  if (queryAll.isLoading) {
    return <Loading />;
  }

  // console.log("users -->", queryAll.data.data.user)

  //================================
  return (
    <>
      <Box sx={{ backgroundColor: darkMode ? "#23272a" : "white" ,
     [theme.breakpoints.down("sm")]: {
              
    },
    }}>
        <Typography
          variant="h5"
          sx={
            darkMode
              ? [
                  theme.lightText,
                  {
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 16,
                      m: 9,
                      mt: 5,
                    },
                    [theme.breakpoints.up("sm")]: {
                      m: 8,
                      mt: 5,
                    },
                  },
                ]
              : [
                  theme.darkText,
                  {
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 16,
                      m: 9,
                      mt: 5,
                    },
                    [theme.breakpoints.up("sm")]: {
                      m: 8,
                      mt: 5,
                    },
                  },
                ]
          }
        >
          All Users are :
        </Typography>
        <Users  />
      </Box>
    </>
  );
}

AllUsers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
