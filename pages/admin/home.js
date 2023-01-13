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
import Swal from "sweetalert2";
import InfoCard from "../../components/cards/InfoCard";
import { TokenProvider } from "../../context/localStorageToken";
import axios from "axios";
import Card from "../../components/cards/card";
import Banner from "../../components/banner";
import NewRegisteredUsers from "../../components/NewRegisteredUsers";
import Graph from "../../components/graph";
import PeopleIcon from "@mui/icons-material/People";
import BedIcon from "@mui/icons-material/Bed";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import { getAdminById } from "../../api/admin";
import jwt_decode from "jwt-decode";
import axiosInstance from "../../api/axios";
import { useQuery } from "@tanstack/react-query";
import { useDarkMode } from "../../context/darkMode";
//==========================================================
export default function Home(props) {
  React.useEffect(() => {
    axiosInstance.get("/dashboard").then((res) => setDashboard(res.data));
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("Token");
    getAdminById(jwt_decode(token)._id).then((res) => setAdmin(res.data.data));
  }, []);
  //========================================================
  const [Token, setToken] = React.useState("");
  const [admin, setAdmin] = React.useState({});
  const [dashboard, setDashboard] = React.useState({});
  //========================================================
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = useSidebarOpen();
  const theme = useTheme();
  const { query } = useController({ filter: "NEW" });
  const { darkMode, setDarkMode } = useDarkMode();

  if (query.isLoading) {
    return <Loading />;
  }

  //===================

  // const dashboardQuery = useQuery({
  //   queryKey: ["dashboad"],
  //   queryFn: () => {
  //     axios.get("/dashboard");
  //   },
  //   onSuccess:(res)=> console.log("res -->",res)
  // });

  //========================================================

  return (
    <>
      <Box
        sx={{
          ...(sidebarOpen && {
            width: "calc(100% + 250px)",
          }),
          // p: 5,
          backgroundColor: darkMode ? "#23272a" : "",
          [theme.breakpoints.down("sm")]: {
            ml: -3,
          },
          [theme.breakpoints.up("sm")]: {
            m: -1,
            ml: -3,
          },
        }}
      >
        {/* ======= Banner =============== */}
        <Banner name={admin.name} />

        {/* ==========  Main_Content =========================== */}

        <Grid
          sx={{
            cursor: "pointer",
            mb: 5,
            display: "flex",
            justifyContent: "space-around",
            // maxWidth:"80%",
            [theme.breakpoints.down("sm")]: {
              maxWidth: "80%",
            },
            ml: 5,
          }}
          container
        >
          <InfoCard
            title="Total Hosteler"
            url="/admin/all-users"
            color="#205CBE"
            total={dashboard.total}
            icon={
              <svg
                width="64"
                height="64"
                viewBox="0 0 74 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.5 25.7895C20.9533 25.7895 23.306 24.8191 25.0407 23.0918C26.7754 21.3645 27.75 19.0217 27.75 16.5789C27.75 14.1362 26.7754 11.7934 25.0407 10.0661C23.306 8.33881 20.9533 7.36842 18.5 7.36842C16.0467 7.36842 13.694 8.33881 11.9593 10.0661C10.2246 11.7934 9.25 14.1362 9.25 16.5789C9.25 19.0217 10.2246 21.3645 11.9593 23.0918C13.694 24.8191 16.0467 25.7895 18.5 25.7895ZM18.5 33.1579C16.3135 33.1579 14.1484 32.7291 12.1283 31.8959C10.1082 31.0627 8.27277 29.8415 6.72667 28.302C5.18058 26.7625 3.95415 24.9349 3.11741 22.9234C2.28066 20.912 1.85 18.7561 1.85 16.5789C1.85 14.4018 2.28066 12.2459 3.11741 10.2345C3.95415 8.22301 5.18058 6.39536 6.72667 4.85586C8.27277 3.31636 10.1082 2.09517 12.1283 1.262C14.1484 0.428827 16.3135 -3.24425e-08 18.5 0C22.9159 6.55206e-08 27.1508 1.74671 30.2733 4.85586C33.3958 7.96502 35.15 12.1819 35.15 16.5789C35.15 20.976 33.3958 25.1929 30.2733 28.302C27.1508 31.4112 22.9159 33.1579 18.5 33.1579ZM57.35 40.5263C59.3126 40.5263 61.1948 39.75 62.5826 38.3682C63.9704 36.9863 64.75 35.1121 64.75 33.1579C64.75 31.2037 63.9704 29.3295 62.5826 27.9476C61.1948 26.5658 59.3126 25.7895 57.35 25.7895C55.3874 25.7895 53.5052 26.5658 52.1174 27.9476C50.7296 29.3295 49.95 31.2037 49.95 33.1579C49.95 35.1121 50.7296 36.9863 52.1174 38.3682C53.5052 39.75 55.3874 40.5263 57.35 40.5263ZM57.35 47.8947C53.4248 47.8947 49.6604 46.3421 46.8848 43.5784C44.1093 40.8147 42.55 37.0663 42.55 33.1579C42.55 29.2494 44.1093 25.5011 46.8848 22.7374C49.6604 19.9737 53.4248 18.4211 57.35 18.4211C61.2752 18.4211 65.0396 19.9737 67.8152 22.7374C70.5907 25.5011 72.15 29.2494 72.15 33.1579C72.15 37.0663 70.5907 40.8147 67.8152 43.5784C65.0396 46.3421 61.2752 47.8947 57.35 47.8947ZM66.6 70V68.1579C66.6 65.7151 65.6255 63.3724 63.8907 61.6451C62.156 59.9178 59.8033 58.9474 57.35 58.9474C54.8967 58.9474 52.544 59.9178 50.8093 61.6451C49.0746 63.3724 48.1 65.7151 48.1 68.1579V70H40.7V68.1579C40.7 65.9807 41.1307 63.8249 41.9674 61.8134C42.8041 59.802 44.0306 57.9743 45.5767 56.4348C47.1228 54.8953 48.9583 53.6741 50.9783 52.8409C52.9984 52.0078 55.1635 51.5789 57.35 51.5789C59.5365 51.5789 61.7016 52.0078 63.7217 52.8409C65.7418 53.6741 67.5772 54.8953 69.1233 56.4348C70.6694 57.9743 71.8959 59.802 72.7326 61.8134C73.5693 63.8249 74 65.9807 74 68.1579V70H66.6ZM29.6 70V55.2632C29.6 52.3318 28.4305 49.5205 26.3489 47.4478C24.2672 45.375 21.4439 44.2105 18.5 44.2105C15.5561 44.2105 12.7328 45.375 10.6511 47.4478C8.56946 49.5205 7.4 52.3318 7.4 55.2632V70H0V55.2632C0 50.3776 1.9491 45.6921 5.41852 42.2375C8.88795 38.7829 13.5935 36.8421 18.5 36.8421C23.4065 36.8421 28.1121 38.7829 31.5815 42.2375C35.0509 45.6921 37 50.3776 37 55.2632V70H29.6Z"
                  fill="white"
                />
              </svg>
            }
          />
          <InfoCard
            title="New Booking"
            url="/admin/rooms"
            color="#53A0E8"
            total={dashboard.new}
            icon={
              <svg
                width="64"
                height="64"
                viewBox="0 0 71 71"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.85 0V7.1H46.15V0H53.25V7.1H67.45C68.3915 7.1 69.2945 7.47402 69.9602 8.13977C70.626 8.80552 71 9.70848 71 10.65V67.45C71 68.3915 70.626 69.2945 69.9602 69.9602C69.2945 70.626 68.3915 71 67.45 71H3.55C2.60848 71 1.70552 70.626 1.03977 69.9602C0.374017 69.2945 0 68.3915 0 67.45V10.65C0 9.70848 0.374017 8.80552 1.03977 8.13977C1.70552 7.47402 2.60848 7.1 3.55 7.1H17.75V0H24.85ZM63.9 24.85H7.1V63.9H63.9V24.85ZM46.2778 32.4328L51.2975 37.4525L33.725 55.025L21.1722 42.4722L26.199 37.4525L33.7285 44.9856L46.2813 32.4328H46.2778Z"
                  fill="white"
                />
              </svg>
            }
          />
          <InfoCard
            title="Double Bed"
            url="/admin/all-users"
            color="#6853E8"
            total={dashboard.double}
            icon={<BedIcon sx={{ fontSize: 76, ml: 4, color: "white" }} />}
          />
          <InfoCard
            title="Tripple bed"
            url="/admin/rooms"
            total={dashboard.tripple}
            color="#3BC98D"
            icon={<BedIcon sx={{ fontSize: 76, ml: 4, color: "white" }} />}
          />
        </Grid>
        <Grid container spacing={5}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <NewRegisteredUsers />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Graph />
          </Grid>
        </Grid>
        {/* ==========  Main_Content =========================== */}
      </Box>
    </>
  );
}
Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
