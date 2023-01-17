import {
  Grid,
  Typography,
  Box,
  Container,
  Avatar,
  TextField,
  InputAdornment,
  FormLabel,
  IconButton,
  Button,
} from "@mui/material";
import DashboardLayout from "../../components/layout/user-layout";
import BedIcon from "@mui/icons-material/Bed";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getUserById, userProfileUpdate } from "../../api/user";
import Loading from "../../components/loading";
import OutletIcon from "@mui/icons-material/Outlet";
import dayjs from "dayjs";
import axiosInstance from "../../api/axios";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/system";
import { useDarkMode } from "../../context/darkMode";
import { useController } from "../../controller/userRegistration";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { ADMIN_URL } from "../../constants/url";
import Swal from "sweetalert2";

//===========================================================

export default function Profile() {
  //=====================================
  const theme = useTheme();
  const { add, addForm } = useController();

  const { darkMode } = useDarkMode();
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }

  const query = useQuery({
    queryKey: ["getUserDetails"],
    queryFn: () => axiosInstance.get(`/user/${userId}`),
  });
  const [profilePhoto, setProfilePhoto] = useState("");

  const [name, setName] = useState(query?.data?.data?.name);

  const [email, setEmail] = useState(query?.data?.data?.email);

  const [phone, setPhone] = useState(query?.data?.data?.phone);

  if (query.isLoading) {
    return <Loading />;
  }
  //==============================

  //   console.log(query.data.data);
  //================================================
  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "#23272a" : "#99aab5",
      }}
    >
      <Box>
        {profilePhoto ? (
          <img
            src={profilePhoto}
            style={{
              width: 100,
              height: 100,
              margin: "10px",
              borderRadius: "100%",
            }}
          />
        ) : (
          <Avatar sx={{ width: 100, height: 100, m: 2 }} />
        )}
      </Box>

      <Box
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
        <form>
          {" "}
          <Grid
            spacing={5}
            fullWidth
            container
            // sx={{ width: "100%", mt: 5, display: "flex", p: 0 }}
          >
            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              xs={12}
              sm={12}
              //   sx={{ display: "flex", flexDirection: "column", mt: 5 }}
            >
              {/* =====================================================================00 */}
              <Typography
                sx={
                  darkMode
                    ? [theme.lightText, { mb: 1 }]
                    : [theme.darkText, { mb: 1 }]
                }
              >
                Photo
              </Typography>
              <TextField
                fullWidth
                type="file"
                //   error={
                //     addForm.touched.name && Boolean(addForm.errors.name)
                //   }
                //   helperText={addForm.touched.name && addForm.errors.name}
                id="profilePhoto"
                name="profilePhoto"
                onChange={(e) => {
                  setProfilePhoto(e.target.files[0]);
                }}
                sx={{
                  //   width: "90%",
                  backgroundColor: "#f6f8fb",
                  color: "white",
                }}
                size="small"
              />{" "}
              {/* ========================================================================>> */}
            </Grid>

            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              xs={12}
              sm={12}
              //   sx={{ display: "flex", flexDirection: "column", mt: 5 }}
            >
              {/* =====================================================================00 */}
              <Typography
                sx={
                  darkMode
                    ? [theme.lightText, { mb: 1 }]
                    : [theme.darkText, { mb: 1 }]
                }
              >
                Name
              </Typography>
              <TextField
                fullWidth
                //   error={
                //     addForm.touched.name && Boolean(addForm.errors.name)
                //   }
                //   helperText={addForm.touched.name && addForm.errors.name}
                //   id="name"
                name="name"
                defaultValue={query?.data?.data?.name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  //   width: "90%",
                  backgroundColor: "#f6f8fb",
                  color: "white",
                }}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <EmailIcon /> */}
                    </InputAdornment>
                  ),
                }}
              />{" "}
              {/* ========================================================================>> */}
            </Grid>

            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              xs={12}
              sm={12}
              //   sx={{ display: "flex", flexDirection: "column", mt: 5 }}
            >
              {/* =====================================================================00 */}
              <Typography
                sx={
                  darkMode
                    ? [theme.lightText, { mb: 1 }]
                    : [theme.darkText, { mb: 1 }]
                }
              >
                Email
              </Typography>
              <TextField
                fullWidth
                //   error={
                //     addForm.touched.name && Boolean(addForm.errors.name)
                //   }
                //   helperText={addForm.touched.name && addForm.errors.name}
                //   id="name"
                name="email"
                defaultValue={query?.data?.data?.email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  //   width: "90%",
                  backgroundColor: "#f6f8fb",
                  color: "white",
                }}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <EmailIcon /> */}
                    </InputAdornment>
                  ),
                }}
              />{" "}
              {/* ========================================================================>> */}
            </Grid>

            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              xs={12}
              sm={12}
              //   sx={{ display: "flex", flexDirection: "column", mt: 5 }}
            >
              {/* =====================================================================00 */}
              <Typography
                sx={
                  darkMode
                    ? [theme.lightText, { mb: 1 }]
                    : [theme.darkText, { mb: 1 }]
                }
              >
                Phone
              </Typography>
              <TextField
                fullWidth
                //   error={
                //     addForm.touched.name && Boolean(addForm.errors.name)
                //   }
                //   helperText={addForm.touched.name && addForm.errors.name}
                //   id="name"
                name="phone"
                defaultValue={query?.data?.data?.phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{
                  //   width: "90%",
                  backgroundColor: "#f6f8fb",
                  color: "white",
                }}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <EmailIcon /> */}
                    </InputAdornment>
                  ),
                }}
              />{" "}
              {/* ========================================================================>> */}
            </Grid>

            <Button
              //   disabled={add.isLoading}
              //   loading={add.isLoading}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                userProfileUpdate({ name, email, profilePhoto, phone });
              }}
              sx={[
                theme.primaryBtn,
                {
                  [theme.breakpoints.up("sm")]: {
                    m: "auto",
                    mt: 4,
                    width: "50%",
                  },
                },
              ]}
            >
              Update Profile
            </Button>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
//============================================================
Profile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
