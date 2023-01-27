import { Typography, Container, Box, Button } from "@mui/material";
import { useTheme } from "@mui/system";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { useController } from "../../controller/user";
import Table from "../../components/table";
import Loading from "../../components/loading";
import { useRouter } from "next/router";
import NewRegisteredUsers from "../../components/NewRegisteredUsers";
import TrippleUser from "../../components/trippleuser";
import { useDarkMode } from "../../context/darkMode";
import axiosInstance from "../../api/axios";
import { useQuery } from "@tanstack/react-query";
//==========================================
export default function TrippleUsers() {
  const theme = useTheme();
  const { darkMode } = useDarkMode();
  //================================
  return (
    <>
      <Box
        sx={{
          backgroundColor: darkMode ? "#23272a" : "white",
          [theme.breakpoints.down("sm")]: {
            ml: -2,
          },
          [theme.breakpoints.up("sm")]: {
            ml: -2,
          },
        }}
      >
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
          All Tripple Bed Users are :
        </Typography>
        <TrippleUser />
      </Box>
    </>
  );
}

TrippleUsers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
