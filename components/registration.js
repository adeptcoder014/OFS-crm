import {
  Box,
  Button,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import bg from "../public/Hostel.png";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HotelIcon from "@mui/icons-material/Hotel";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUsers } from "../api/user";
import { useController } from "../controller/userRegistration";
import LoadingButton from "@mui/lab/LoadingButton";
import Loading from "./loading";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useRentController } from "../controller/rental";
import { useTheme } from "@mui/system";
import axiosInstance from "../api/axios";
import { ADMIN_URL } from "../constants/url";
//===================================================



export default function Registration() {
  const theme = useTheme();

  const [double, setDouble] = React.useState(false);
  const [tripple, setTripple] = React.useState(false);
  const { query, add, addForm } = useController();
  const [image, setImage] = React.useState("");
  const [rentQuery, setRentQuery] = useState([]);

  // const { rentQuery } = useRentController();

  useEffect(() => {
    axios.get(`${ADMIN_URL}/rent`).then((res) => setRentQuery(res.data.data));
  }, []);
  // if (rentQuery.isLoading) {
  //   return <Loading />;
  // }
  console.log("--->>", rentQuery);
  //===================================================
  return (
    <Box
      maxWidth="lg"
      style={{
        backgroundColor: "white",
        // border: "1px solid gray",
        margin: "auto",
        height: "99vh",
        borderRadius: "10px",
      }}
    >
      {/* ====================================== */}
      <Box
        sx={{
          backgroundImage: `url('/hostel.jpg')`,
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // p: "20%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "space-between",

          // opacity: 0.5,
          maxWidth: "100%",
          minHeight: "80%",
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        }}
      ></Box>
      <Typography
        variant="h2"
        sx={{
          // zIndex:-888,
          color: "black",
          fontFamily: "poppins",
          fontWeight: "bolder",
          // p: 5,

          // width: "70%",
          mt: -10,
          [theme.breakpoints.down("sm")]: {
            fontSize: 24,
            mt: 5,
            p: 2,
          },
        }}
      >
        Welcome To One Fine Stay Hostel
      </Typography>
      {/* ============== FORM ======================== */}
      <form onSubmit={addForm.handleSubmit}>
        <Box
          sx={{
            //  backgroundImage: `url(${bg.src})`,
            backgroundColor: "white",
            //  border:"1px solid gray",
            boxShadow: "0px -4px 4px 0px #b1a1a1",

            // height: "100vh",
            display: "flex",
            p: 5,
            flexDirection: "column",
            //  minWidth: "100%",
            // borderTopLeftRadius: 50,
            // borderTopRightRadius: 50,
          }}
        >
          {" "}
          <Grid container sx={{ p: 3 }}>
            <Grid
              item
              md={12}
              xs={12}
              sx={{
                display: "flex",
                mt: 3,
                fontWeight: "bolder",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontFamily: "poppins", mb: 5, color: "black" }}
              >
                New Registeration
              </Typography>
              {/* <Typography variant="h4" sx={{ fontFamily: "poppins" }}>
                Registeration
              </Typography> */}
            </Grid>

            {/* <Grid sx={{ display: "flex", p: 3 }} item md={4} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{ display: "flex", flexDirection: "column" }}
                  for="file-input"
                >
                  {" "}
                  <AddAPhotoIcon
                    sx={{
                      border: "1px dashed brown",
                      p: 2,
                      mb: 1,

                      fontSize: 75,
                      borderRadius: "50%",
                    }}
                  />
                  Upload ID Proof
                </label>

                <TextField
                  id="file-input"
                  error={
                    addForm.touched.idPhoto && Boolean(addForm.errors.idPhoto)
                  }
                  helperText={addForm.touched.idPhoto && addForm.errors.idPhoto}
                  name="idPhoto"
                  type="file"
                  onChange={(e) =>
                    addForm.setFieldValue("idPhoto", e.target.files[0])
                  }
                />
              </Box>
            </Grid> */}

            <Grid sx={{ display: "flex", p: 1 }} item md={6} xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{ display: "flex", flexDirection: "column" ,color:"black"}}
                  for="file-input"
                >
                  {" "}
                  <AddAPhotoIcon
                    sx={{
                      border: "1px dashed brown",
                      p: 2,
                      fontSize: 75,
                      mb: 1,
                      borderRadius: "50%",
                      color:"black"
                    }}
                  />
                  Upload ID Proof
                </label>
                <TextField
                  id="file-input"
                  required
                  error={addForm.touched.photo && Boolean(addForm.errors.photo)}
                  helperText={addForm.touched.photo && addForm.errors.photo}
                  name="photo"
                  type="file"
                  sx={{ width: "90%" }}
                  onChange={(e) => {
                    addForm.setFieldValue("photo", e.target.files[0]);
                    if (e.target.files && e.target.files[0]) {
                      setImage(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />{" "}
              </Box>
            </Grid>
            <Grid sx={{ display: "flex", p: 0 }} item md={6} xs={6}>
              {image ? (
                <img
                className="register-image"
                  src={image}
                  style={{
                    width: "450px",
                    height: "250px",
                    // marginRight:"55px"
                  }}
                />
              ) : null}
            </Grid>
          </Grid>
          <Grid container sx={{ width: "100%", mt: 5, display: "flex", p: 0 }}>
            <Grid
              className="responsive"
              item
              md={6}
              xs={12}
              sx={{ display: "flex", flexDirection: "column", mb: 5 }}
            >
              <FormLabel sx={{ mb: 2 }}>Name</FormLabel>
              <TextField
                error={addForm.touched.name && Boolean(addForm.errors.name)}
                helperText={addForm.touched.name && addForm.errors.name}
                id="name"
                name="name"
                value={addForm.values.name}
                onChange={addForm.handleChange}
                sx={{
                  width: "90%",
                  "& label.Mui-focused": {
                    color: "red",
                  },
                }}
                size="small"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              className="responsive"
              item
              md={6}
              xs={12}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <FormLabel sx={{ mb: 2 }}>Email</FormLabel>
              <TextField
                error={addForm.touched.email && Boolean(addForm.errors.email)}
                helperText={addForm.touched.email && addForm.errors.email}
                id="email"
                name="email"
                value={addForm.values.email}
                onChange={addForm.handleChange}
                sx={{ width: "90%" }}
                size="small"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              className="responsive"
              item
              md={6}
              xs={12}
              sx={{ display: "flex", flexDirection: "column", mt: 5 }}
            >
              <FormLabel sx={{ mb: 2 }}>Mobile</FormLabel>

              <TextField
                error={addForm.touched.phone && Boolean(addForm.errors.phone)}
                helperText={addForm.touched.phone && addForm.errors.phone}
                id="phone"
                name="phone"
                type="number"
                value={addForm.values.phone}
                onChange={addForm.handleChange}
                sx={{ width: "90%" }}
                size="small"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              className="responsive"
              item
              md={6}
              xs={12}
              sx={{ display: "flex", flexDirection: "column", mt: 5 }}
            >
              <FormLabel sx={{ mb: 2 }}>DOB</FormLabel>

              <TextField
                error={addForm.touched.dob && Boolean(addForm.errors.dob)}
                helperText={addForm.touched.dob && addForm.errors.dob}
                id="dob"
                name="dob"
                type="date"
                value={addForm.values.dob}
                onChange={addForm.handleChange}
                sx={{ width: "90%" }}
                size="small"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              className="responsive"
              item
              md={6}
              xs={12}
              sx={{ display: "flex", flexDirection: "column", mt: 6 }}
            >
              <FormLabel sx={{ mb: -2 }}>Room Preference</FormLabel>

              {/* <InputAdornment position='start'><AccountCircleIcon/></InputAdornment> */}

              <FormControl>
                <Select
                  id="roomPreference"
                  name="roomPreference"
                  value={addForm.values.roomPreference}
                  onChange={(e) => {
                    if (e.target.value === "double") {
                      setDouble(true);
                      setTripple(false);
                    }
                    if (e.target.value === "tripple") {
                      setDouble(false);
                      setTripple(true);
                    }
                    addForm.setFieldValue("roomPreference", e.target.value);
                  }}
                  variant="standard"
                  startAdornment={
                    <InputAdornment position="start">
                      <HotelIcon />
                    </InputAdornment>
                  }
                  sx={{ width: "90%", mt: 4 }}
                >
                  <MenuItem value="double">Double</MenuItem>
                  <MenuItem value="tripple">Tripple</MenuItem>
                </Select>
              </FormControl>
              {/* ============= Conditional Rendering ====================== */}
              {double ? (
                <Typography sx={{ mt: 2, color: "black", fontWeight: 500 }}>
                  <span style={{ fontWeight: "bolder", color: "gray" }}>
                    Rent :
                  </span>{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      backgroundColor: "#28282B",
                      color: "white",
                      padding: 5,
                      borderRadius: 5,
                    }}
                  >
                    ₹ {rentQuery?.[0].doubble}
                  </span>
                </Typography>
              ) : tripple ? (
                <Typography sx={{ mt: 2, color: "black", fontWeight: 500 }}>
                  <span style={{ fontWeight: "bolder", color: "gray" }}>
                    Rent :
                  </span>{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      backgroundColor: "#28282B",
                      color: "white",
                      padding: 5,
                      borderRadius: 5,
                    }}
                  >
                    ₹ {rentQuery?.[0].tripple}
                  </span>
                </Typography>
              ) : null}
              {/* //=========================================================== */}
            </Grid>
          </Grid>
          <LoadingButton
            disabled={add.isLoading}
            loading={add.isLoading}
            type="submit"
            sx={[
              theme.primaryBtn,
              {
                [theme.breakpoints.up("sm")]: {
                  width: "70%",
                  m: "auto",
                  mt: 3,
                  fontSize: 18,
                },
                [theme.breakpoints.down("sm")]: {
                  width: "100%",
                  m: "auto",
                  mt: 3,
                  fontSize: 18,
                },
              },
            ]}
          >
            Register
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
