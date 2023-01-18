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
import React from "react";
import jwt_decode from "jwt-decode";
import { ADMIN_URL } from "../../constants/url";
import axios from "axios";

//===========================================================

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [user, setUser] = useState({});

  const router = useRouter();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userToken");

      if (!token) {
        router.push("/user/login");
      }
      if (token) {
        // console.log(jwt_decode(token).id);
        axios
          .get(`${ADMIN_URL}/user/${jwt_decode(token).id}`)
          .then((res) => setUser(res.data));
      }
    }
  }, []);

  useEffect(() => {
    axios.get(`${ADMIN_URL}/notice`).then((res) => setNotices(res.data));
  }, []);

  // const noticeQuery = useQuery({
  //   queryKey: ["noticeQuery"],
  //   queryFn: () => axios.get(`${ADMIN_URL}/notice`),
  // });

  // if (noticeQuery.isLoading) {
  //   return <Loading />;
  // }

  // console.log(noticeQuery.)

  //---------------------------------------------------
  const theme = useTheme();
  const { darkMode } = useDarkMode();

  // const query = useQuery({
  //   queryKey: ["userById", userId],
  //   queryFn: () => getUserById(userId),
  //   enabled: !!userId,
  // });

  // if (query.isLoading) {
  //   return <Loading />;
  // }
  // const user = query.data.data;
  // console.log("USER --->", user.dues.rents[0].due.rentDue);
  //================================================
  return (
    <Container
      maxWidth="md"
      sx={{
        background: darkMode
          ? "linear-gradient(#2c2f33, #2c2f33)"
          : "linear-gradient(#99aab5, #99aab5)",
        [theme.breakpoints.down("sm")]: {
          ml: -9,
          mt: -2,
          width: "130%",
        },
      }}
    >
      {/* ------------------- GENERAL_INFORMATION ------------------------------- */}

      <Typography
        variant="h6"
        sx={darkMode ? [theme.lightText, { m: 2 }] : [theme.darkText, { m: 2 }]}
      >
        General Information
      </Typography>

      <Grid
        container
        sx={{
          // width:"150%",
          // ml: -5,
          display: "flex",
          // justifyContent: "space-around",
          // alignItems:"space-between",
          boxShadow: "0px 2px 3px 0px grey",
          background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
          p: 1,
          borderRadius: "8px",
        }}
      >
        <Grid
          item
          sm={12}
          md={6}
          lg={6}
          xl={6}
          sx={{
            display: "flex",
            // background: "linear-gradient(252deg, #e1e1e1, red)",
          }}
        >
          <Avatar sx={{ mr: 1, fontSize: 5 }} />
          <Box>
            <Typography sx={{ fontFamily: "poppins" }}>{user?.name}</Typography>
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: 12,
                color: "gray",
                [theme.breakpoints.down("sm")]: {
                  mb: 2,
                },
              }}
            >
              {user?.email}
            </Typography>
          </Box>
        </Grid>
        {/* ------------------------------------------ */}

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          sx={{
            display: "flex",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: user?.status === "NEW" ? "red" : "#22BB33",
              // width: "20%",
              textAlign: "center",
              fontWeight: "bolder",
              color: "white",
              p: 1,
              borderRadius: "8px",
            }}
          >
            {user?.status}
          </Box>
        </Grid>
        {/* ------------------------------------------ */}

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          // sx={{ }}
        >
          <Typography sx={{ fontWeight: 600, color: "gray", mr: 1, mt: 2 }}>
            Joined on : {dayjs(user.joiningDate).format(`DD/MM/YYYY`)}
          </Typography>
        </Grid>
      </Grid>
      {/* ----------------- HOSTEL_INFORMATION --------------------------------- */}
      {user.status === "REGISTERED" ? (
        <>
          <Typography
            variant="h6"
            sx={
              darkMode
                ? [theme.lightText, { m: 2 }]
                : [theme.darkText, { m: 2 }]
            }
          >
            Stay Information
          </Typography>
          <Grid
            container
            sx={{
              // width:"150%",

              // mt: 5,
              display: "flex",
              // justifyContent: "space-around",
              // alignItems:"space-between",
              boxShadow: "0px 2px 3px 0px grey",
              background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
              p: 1,
              borderRadius: "8px",
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 3,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ fontWeight: 600, color: "gray" }}>
                  Room Number :
                </Typography>
                <Typography
                  // variant="caption"
                  sx={{
                    color: "#28282B",
                    ml: 1,
                    fontWeight: "bold",
                  }}
                >
                  {user.room}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 3,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography sx={{ fontWeight: 600, color: "gray" }}>
                  Room Preference :
                </Typography>
                <Typography
                  // variant="caption"
                  sx={{
                    color: "#28282B",
                    ml: 1,
                    fontWeight: "bold",
                  }}
                >
                  {user.roomPreference}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </>
      ) : null}

      {/* ------------ DUES_INFORMATION ------------------------------ */}

      {user.status === "REGISTERED" ? (
        <>
          <Typography
            variant="h6"
            sx={
              darkMode
                ? [theme.lightText, { m: 2 }]
                : [theme.darkText, { m: 2 }]
            }
          >
            Due(s) Information
          </Typography>
          <Grid
            maxWidth="sm"
            container
            sx={{
              display: "flex",
              boxShadow: "0px 2px 3px 0px grey",
              background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
              p: 1,
              borderRadius: "8px",
            }}
          >
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              sx={{
                display: "flex",
                justifyContent: "start",

                p: 1,
              }}
            >
              <Typography sx={{ fontWeight: 600, color: "gray" }}>
                Rent <span style={{ fontSize: 11 }}>(for this month)</span>
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
              }}
            >
              <Typography sx={{ fontWeight: 600, color: "#28282B" }}>
                ₹ {user.dues.rents[0].due.rentDue}
              </Typography>
            </Grid>

            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              sx={{
                display: "flex",
                justifyContent: "start",

                p: 1,
              }}
            >
              <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
                E-Bills :
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
              }}
            >
              <Typography sx={{ fontWeight: 600, color: "#28282B" }}>
                ₹ {user.dues.rents[0].due.ebillDue}
              </Typography>
            </Grid>

            {/* <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              sx={{
                display: "flex",
                justifyContent: "start",

                p: 1,
              }}
            >
              <Typography sx={{ fontWeight: 600, color: "gray" }}>
                Miscellaneous:
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: 600, color: "#28282B", fontSize: "20px" }}
              >
              </Typography>
            </Grid> */}
          </Grid>

          <Typography
            variant="h6"
            sx={
              darkMode
                ? [theme.lightText, { m: 2 }]
                : [theme.darkText, { m: 2 }]
            }
          >
            {" "}
            Laundary status:
          </Typography>
          <Grid
            maxWidth="sm"
            container
            sx={{
              display: "flex",
              boxShadow: "0px 2px 3px 0px grey",
              background: darkMode
                ? "linear-gradient(#2c2f33, #2c2f33)"
                : "linear-gradient(#99aab5, #99aab5)",
              p: 1,
              borderRadius: "8px",
            }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{
                display: "flex",
                justifyContent: "start",

                p: 1,
              }}
            >
              {/* <Typography sx={{ fontWeight: 600, color: "gray" }}>
                Rent <span style={{ fontSize: 11 }}>(for this month)</span>
              </Typography> */}
            </Grid>
            {notices?.map((x) => {
              if (x.type === "LAUNDARY") {
                return (
                  <Box
                    key={x}
                    // maxWidth="md"
                    container
                    sx={{
                      mb: 5,
                      width: "100%",
                      // display: "flex",
                      boxShadow: "0px 2px 3px 0px grey",
                      background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                      p: 1,
                      borderRadius: "8px",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor:
                          x.type === "FOOD"
                            ? "#4caf50"
                            : x.type === "LAUNDARY"
                            ? "#0288d1"
                            : x.type === "MISC"
                            ? "#ff9800"
                            : x.type === "RENTAL"
                            ? "#d32f2f"
                            : null,

                        color: "blue",
                        textAlign: "center",
                        fontWeight: "bolder",
                        // mb: 2,
                        p: 1,
                        borderRadius: "8px",
                        display: "inline-block",
                        color: "white",
                      }}
                    >
                      {x.type}
                    </Box>{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "gray",
                        fontSize: 12,
                      }}
                    >
                      {dayjs(x.time).format("DD MMM")} @
                      {
                        dayjs(x.time)
                          .format("YYYY-MM-DDTHH:mm:ssZ[Z]")
                          .split("T")[1]
                          .split("+")[0]
                          .split(":")[0]
                      }
                      {":"}
                      {
                        dayjs(x.time)
                          .format("YYYY-MM-DDTHH:mm:ssZ[Z]")
                          .split("T")[1]
                          .split("+")[0]
                          .split(":")[1]
                      }
                    </span>
                    <Box sx={{ p: 2 }}>
                      <Typography sx={{ fontWeight: 600, color: "gray" }}>
                        {x.notice}
                      </Typography>
                    </Box>
                  </Box>
                );
              }
            })}
          </Grid>
        </>
      ) : null}
    </Container>
  );
}
//============================================================
Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
