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
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { useFormik } from "formik";
import jwt_decode from "jwt-decode";

//===========================================================

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(`${ADMIN_URL}/user/${router.query.id}`)
      .then((res) => setUser(res.data));
  }, []);
  //=====================================
  const theme = useTheme();
  // const { add, addForm } = useController();

  const { darkMode } = useDarkMode();

  const addForm = useFormik({
    initialValues: {
      profilePhoto: "",
    },
    onSubmit: (values) => {
      add.mutate(values);
    },
  });

  // console.log(user.id);

  const add = useMutation({
    // mutationFn: userProfileUpdate,
    mutationFn: (values) => {
      const formData = new FormData();
      console.log("||-----------><----", values);
      let { profilePhoto } = values;

      if (profilePhoto instanceof File) {
        formData.append("profilePhoto", profilePhoto);
      }

      return axiosInstance.post(`${ADMIN_URL}/user/profile/${user.id}`, formData);
    },

    onSuccess: (res) => {
      return Swal.fire("Profile updated !", "profile updated", "success");
      // .then(() => router.push("/admin/home"));
    },
    onError: (err) =>
      // console.log("ERROr ---",err),
      Swal.fire("Error !", err.response.data, "error"),
  });

  const [profilePhoto, setProfilePhoto] = useState("");

  //================================================
  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "#23272a" : "#99aab5",
        [theme.breakpoints.down("sm")]: {
          ml: -9,
          mt: -2,
        },
      }}
    >
      <Box>
        {profilePhoto ? (
          <img
            src={profilePhoto}
            style={{
              width: 200,
              height: 200,
              padding: 15,
              borderRadius: "100%",
              marginBottom: -45,
            }}
          />
        ) : (
          // <Avatar sx={{ width: 100, height: 100, m: 2 }} />
          <img
          src={`${ADMIN_URL}/${user.profilePhoto}`}

          style={{
            width: 200,
            height: 200,
            padding: 15,
            borderRadius: "100%",
            marginBottom: -45,
          }}
        />
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
        <form onSubmit={addForm.handleSubmit}>
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
                error={
                  addForm.touched.profilePhoto &&
                  Boolean(addForm.errors.profilePhoto)
                }
                helperText={
                  addForm.touched.profilePhoto && addForm.errors.profilePhoto
                }
                id="profilePhoto"
                name="profilePhoto"
                onChange={(e) => {
                  addForm.setFieldValue("profilePhoto", e.target.files[0]);

                  if (e.target.files && e.target.files[0]) {
                    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                sx={{
                  //   width: "90%",
                  backgroundColor: "#f6f8fb",
                  color: "white",
                  [theme.breakpoints.down("sm")]: {
                    width: "70%",
                    borderRadius: 1,
                  },
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
                error={addForm.touched.name && Boolean(addForm.errors.name)}
                helperText={addForm.touched.name && addForm.errors.name}
                id="name"
                name="name"
                value={user?.name}
                // onChange={(e) => setName(e.target.value)}
                // value={addForm.values.name}
                onChange={addForm.handleChange}
                sx={{
                  //   width: "90%",
                  backgroundColor: "#f6f8fb",
                  color: "white",
                  [theme.breakpoints.down("sm")]: {
                    width: "70%",
                    borderRadius: 1,
                  },
                }}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <EmailIcon /> */}
                    </InputAdornment>
                  ),
                }}
              />
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
                // defaultValue={query?.data?.data?.email}
                // onChange={(e) => setEmail(e.target.value)}
                value={user?.email}
                onChange={addForm.handleChange}
                sx={{
                  //   width: "90%",
                  backgroundColor: "#f6f8fb",
                  color: "white",
                  [theme.breakpoints.down("sm")]: {
                    width: "70%",
                    borderRadius: 1,
                  },
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
                // defaultValue={query?.data?.data?.phone}
                // onChange={(e) => setPhone(e.target.value)}
                value={user?.phone}
                onChange={addForm.handleChange}
                sx={{
                  //   width: "90%",
                  backgroundColor: "#f6f8fb",
                  color: "white",
                  [theme.breakpoints.down("sm")]: {
                    width: "70%",
                    borderRadius: 1,
                  },
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

            <LoadingButton
              disabled={add.isLoading}
              loading={add.isLoading}
              type="submit"
              // onClick={(e) => {
              //   e.preventDefault();
              //   userProfileUpdate({ name, email, profilePhoto, phone });
              // }}
              sx={[
                theme.primaryBtn,
                {
                  [theme.breakpoints.up("sm")]: {
                    m: "auto",
                    mt: 4,
                    width: "50%",
                  },
                  [theme.breakpoints.down("sm")]: {
                    ml: 5,
                    mt: 4,
                    width: "50%",
                  },
                },
              ]}
            >
              Update Profile
            </LoadingButton>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
//============================================================
Profile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
