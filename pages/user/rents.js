import {
  Grid,
  Typography,
  Box,
  Container,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import DashboardLayout from "../../components/layout/user-layout";
import BedIcon from "@mui/icons-material/Bed";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/user";
import Loading from "../../components/loading";
import OutletIcon from "@mui/icons-material/Outlet";
import dayjs from "dayjs";
import axiosInstance from "../../api/axios";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/system";
import { useDarkMode } from "../../context/darkMode";
import { ADMIN_URL } from "../../constants/url";
import jwt_decode from "jwt-decode";
import axios from "axios";
//===========================================================
export default function Rents() {
  //=====================================
  const theme = useTheme();
  const { darkMode } = useDarkMode();
  const [user, setUser] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userToken");

      if (!token) {
        router.push("/user/login");
      }
      if (token) {
        axios
          .get(`${ADMIN_URL}/user/${jwt_decode(token).id}`)
          .then((res) => setUser(res.data));
      }
    }
  }, []);


  // const query = useQuery({
  //   queryKey: ["getUserRents"],
  //   queryFn: () => axiosInstance.get(`/user/get-rents/${user.id}`),
  // });

  // if (query.isLoading) {
  //   return <Loading />;
  // }
  // console.log(user.dues.rents);

  //================================================
  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "#23272a" : "#99aab5",
        [theme.breakpoints.down('sm')]:{
          // backgroundColor:"red",
          mt:-2,
          ml:-9,
          height:"100vh"
        },
        [theme.breakpoints.up('sm')]:{
          // backgroundColor:"red",
          mt:-2,
          ml:-9,
          height:"100vh"
        }
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
                    m: "auto",
                    ml: 9,
                    mb: 5,
                    mt: 5,
                  },
                  [theme.breakpoints.up("sm")]: {
                    ml: 9,
                    mt: 5,
                  },
                },
              ]
            : [
                theme.darkText,
                {
                  [theme.breakpoints.down("sm")]: {
                    m: "auto",
                    ml: 9,
                    mb: 5,
                    mt: 5,
                  },
                  [theme.breakpoints.up("sm")]: {
                    ml: 9,

                    mt: 5,
                  },
                },
              ]
        }
      >
        Yours Rents :{" "}
      </Typography>

      {user?.dues?.rents?.map((x) => (
        <Box
          key={x}
          sx={{
            backgroundColor: darkMode ? "#2c2f33" : "white",
            display: "flex",
            justifyContent: "space-around",
            mt: 5,
            boxShadow: darkMode
              ? "0px 0px 2px 0px white"
              : "0px 0px 2px 0px gray",
            p: 1,
          }}
        >
          <Box>
            <Typography
              sx={
                darkMode
                  ? [theme.lightText, { color: "gray" }]
                  : [theme.darkText]
              }
            >
              Month
            </Typography>
            <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
              {x.month}/{x.year}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={
                darkMode
                  ? [theme.lightText, { color: "gray" }]
                  : [theme.darkText]
              }
            >
              Rent
            </Typography>
            <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
              ₹ {x?.due?.rentdue?.toLocaleString("en-IN")}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={
                darkMode
                  ? [theme.lightText, { color: "gray" }]
                  : [theme.darkText]
              }
            >
              Status
            </Typography>
            <Typography
              sx={
                darkMode
                  ? [
                      theme.lightText,
                      {
                        backgroundColor:
                          x.status === "DUE" ? "#ef5350" : "#4caf50",
                        textAlign: "center",
                        color: "white",
                        borderRadius: "4px",
                      },
                    ]
                  : [
                      theme.darkText,
                      {
                        backgroundColor:
                          x.status === "DUE" ? "#ef5350" : "#4caf50",
                        textAlign: "center",
                        color: "white",
                        borderRadius: "4px",
                      },
                    ]
              }
            >
              {x.status}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
//============================================================
Rents.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
