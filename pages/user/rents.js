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
//===========================================================

export default function Rents() {
  //=====================================
  const theme = useTheme();
  const { darkMode } = useDarkMode();
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }

  const query = useQuery({
    queryKey: ["getUserRents"],
    queryFn: () => axiosInstance.get(`/user/get-rents/${userId}`),
  });

  if (query.isLoading) {
    return <Loading />;
  }

  //   console.log(query.data.data);
  //================================================
  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "#23272a" : "#99aab5",
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

      {query?.data?.data?.map((x) => (
        <Box
          sx={{
            backgroundColor: darkMode ? "#2c2f33" : "white",
            display: "flex",
            justifyContent: "space-around",
            mt: 5,
            boxShadow: darkMode
              ? "0px 0px 2px 0px white"
              : "0px 0px 2px 0px gray",
              p:1
          }}
        >
          <Box>
            <Typography sx={darkMode ? [theme.lightText,{color:"gray"}] : [theme.darkText]}>
              Month
            </Typography>
            <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
              {x.month}/{x.year}
            </Typography>
          </Box>
          <Box>
            <Typography sx={darkMode ? [theme.lightText,{color:"gray"}] : [theme.darkText]}>
              Rent
            </Typography>
            <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
              ₹ {x?.due?.rentdue?.toLocaleString("en-IN")}
            </Typography>
          </Box>
          <Box>
            <Typography sx={darkMode ? [theme.lightText,{color:"gray"}] : [theme.darkText]}>
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
                          textAlign:"center",
                          color:"white",
                          borderRadius:"4px"
                      },
                    ]
                  : [
                      theme.darkText,
                      {
                        backgroundColor:
                          x.status === "DUE" ? "#ef5350" : "#4caf50",
                          textAlign:"center",
                          color:"white",
                          borderRadius:"4px"
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
