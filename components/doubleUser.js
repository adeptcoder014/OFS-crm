import {
    Avatar,
    Button,
    Grid,
    TextField,
    Typography,
    InputBase,
    InputAdornment,
  } from "@mui/material";
  import { Box, useTheme, width } from "@mui/system";
  import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
  import { useController } from "../controller/user";
  import { useState } from "react";
  import dayjs from "dayjs";
  import { useRouter } from "next/router";
  import { styled, alpha } from "@mui/material/styles";
  import SearchIcon from "@mui/icons-material/Search";
  import Loading from "./loading";
  import InfoIcon from "@mui/icons-material/Info";
  import { useDarkMode } from "../context/darkMode";
  import DoubleRegisteredUsers from "./doubleRegisteredUser";
  import AllRegisteredUsers from "./AllRegisteredUser";
import TrippleRegisteredUsers from "./trippleUserRegistered";
  
  //===============================
  export default function DoubleUser(props) {
    const theme = useTheme()
    //================================================
  
    return (
      <Box
        sx={{
          p: 5,
          boxShadow: "0px 1px 3px 0px grey",
          borderRadius: 1,
          mt: 2,
          [theme.breakpoints.down("sm")]: {
            p:0
          },
        }}
      >
        {/* //======================================== */}
  
        <DoubleRegisteredUsers
          type="REGISTERED"
          title="All double bed users :"
          url="/admin/user/details/"
          />
      </Box>
    );
  }
  