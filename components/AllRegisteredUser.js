import {
    Avatar,
    Button,
    Grid,
    TextField,
    Typography,
    InputAdornment,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
  import { useController } from "../controller/user";
  import { useState } from "react";
  import dayjs from "dayjs";
  import { useRouter } from "next/router";
  import SearchIcon from "@mui/icons-material/Search";
  import { useTheme } from "@mui/system";
  import { useDarkMode } from "../context/darkMode";
  import axiosInstance from "../api/axios";
  import { ADMIN_URL } from "../constants/url";
  import axios from "axios";
  //================================================
  export default function AllRegisteredUsers(props) {
    //================================================
    const { query } = useController({ filter: "REGISTERED" });
    const router = useRouter();
    const [user, setUser] = useState(query?.data?.data?.user);
    const theme = useTheme();
  
    const [w, setW] = useState("");
  
    const { darkMode } = useDarkMode();
    // console.log(query?.data?.data?.user)
  
  
    const filter = user?.filter(x =>{
      if(x.name.toLowerCase().includes(w.toLowerCase())){
        return(x)
      }
    })
    //================================================
  
    return (
      <Box
        sx={{
          p: 0,
          boxShadow: "0px 1px 3px 0px grey",
          borderRadius: 1,
          // width: "100%",
          mt: 2,
          backgroundColor: darkMode ? "#2c2f33" : "#ffffff",
          // height:400
        }}
      >
        {/* //======================================== */}
  
        <Typography
          sx={
            darkMode
              ? [
                  theme.lightText,
                  {
                    mb: 2,
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 15,
                      ml: 2,
                    },
                    [theme.breakpoints.up("sm")]: {
                      ml: 5,
                    },
                  },
                ]
              : [
                  theme.darkText,
                  {
                    mb: 2,
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 15,
                      ml: 2,
                    },
                    [theme.breakpoints.up("sm")]: {
                      ml: 5,
                    },
                  },
                ]
          }
        >
          {props.title}
        </Typography>
        {/* //======================================== */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            mb: 4,
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
          }}
        >
          <Typography
            sx={
              darkMode
                ? [
                    theme.lightText,
                    {
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 12,
                      },
                    },
                  ]
                : [
                    theme.darkText,
                    {
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 12,
                      },
                    },
                  ]
            }
          >
            {" "}
            Search
          </Typography>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
            variant="outlined"
            onChange={(e) => {
              setW(e.target.value);
              // axios.get(`${ADMIN_URL}/user/search?user=nischal`);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "white" : "gray",
                },
              },
              input: {
                color: darkMode ? "white" : "gray",
              },
            }}
          />
        </Box>
        {/* //======================================== */}
        <Box
          sx={{
            overflow: "auto",
            borderRadius: 1,
            height: 250,
            p: 2,
          }}
        >
          {filter?.map((x) => {
            
            // if (x.name.toLowerCase().includes(w)) {
              return (
                <Box
                  key={x}
                  sx={{
                    m: "auto",
                    // p: 1,
                    boxShadow: "0px 0px 2px 1px grey",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    mb: 1,
                    // width: "90%",
                  }}
                >
                  <Avatar />
                  <Box
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={darkMode ? [theme.lightText] : [theme.darkText]}
                    >
                      {x.name}
                    </Typography>
                    <Typography
                      sx={
                        darkMode
                          ? [theme.lightText, { color: "gray", fontSize: 12 }]
                          : [theme.darkText, { color: "gray", fontSize: 12 }]
                      }
                    >
                      joined : {dayjs(x.joiningDate).format("D-MMM")}
                    </Typography>
                  </Box>
                  <AppRegistrationIcon
                    onClick={() => {
                      // console.log("------>",params.id)
                      router.push(`${props.url}?id=${x._id}`);
                    }}
                    sx={{ cursor: "pointer", color: "gray", fontSize: "35px" }}
                  />
                </Box>
              );
            // }
          })}
        </Box>
        {/* //======================================== */}
      </Box>
    );
  }
  