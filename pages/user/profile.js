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
//===========================================================

export default function Profile() {
  //=====================================
  const theme = useTheme();
  // const { add, addForm } = useController();

  const { darkMode } = useDarkMode();
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }

  const query = useQuery({
    queryKey: ["getUserDetails"],
    queryFn: () => axiosInstance.get(`/user/${userId}`),
  });

  const addForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      profilePhoto: "",
    },
    onSubmit: (values) => {
      add.mutate(values);
    },
  });

  const add = useMutation({
    mutationFn: userProfileUpdate,
    onSuccess: (res) => {
      return Swal.fire(
        "Logged in !",
        "profile updated",
        "success"
      )
      // .then(() => router.push("/admin/home"));
    },
    onError: (err) =>
      // console.log("ERROr ---",err),
      Swal.fire("Error !", err.response.data, "error"),
  });

  const [profilePhoto, setProfilePhoto] = useState("");

  // const [name, setName] = useState(query?.data?.data?.name);

  // const [email, setEmail] = useState(query?.data?.data?.email);

  // const [phone, setPhone] = useState(query?.data?.data?.phone);

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
                // defaultValue={query?.data?.data?.name}
                // onChange={(e) => setName(e.target.value)}
                value={addForm.values.name}
                onChange={addForm.handleChange}
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
                // defaultValue={query?.data?.data?.email}
                // onChange={(e) => setEmail(e.target.value)}
                value={addForm.values.email}
                onChange={addForm.handleChange}
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
                // defaultValue={query?.data?.data?.phone}
                // onChange={(e) => setPhone(e.target.value)}
                value={addForm.values.phone}
                onChange={addForm.handleChange}
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
