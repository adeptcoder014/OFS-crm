import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  InputBase,
  InputAdornment,
} from "@mui/material";
import { Box, width } from "@mui/system";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useController } from "../controller/user";
import { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "./loading";
import InfoIcon from "@mui/icons-material/Info";
//================================================
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
//=============================
const rooms = [
  {
    room: "doubble",
    number: 211,
  },
  //   {
  //     room: "doubble",
  //     number: 588,
  //   },
];
//================================
export default function Users(props) {
  //================================================
  const { query } = useController({ filter: "REGISTERED" });
  const router = useRouter();
  const [user, setUser] = useState("");
  //================================================
  if (query.isLoading) {
    return <Loading />;
  }
  if (typeof query?.data?.data?.user !== "undefined") {
    return (
      <Box
        sx={{
          p: 5,
          boxShadow: "0px 1px 3px 0px grey",
          borderRadius: 1,
          // width: "70%",
          mt: 2,
        }}
      >
        {/* //======================================== */}

        {/* //======================================== */}
        <Box
          sx={{
            p: 5,
            boxShadow: "0px 1px 3px 0px grey",
            borderRadius: 1,
            // width: "70%",
            mt: 2,
          }}
        >
          {/* //======================================== */}

          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
              fontFamily: "poppins",
              mb: 2,
            }}
          >
            All Users:{" "}
            <span
              style={{
                backgroundColor: "black",
                color: "white",
                padding: 10,
                borderRadius: 20,
                marginLeft: 20,
              }}
            >
              {props.user.length}
            </span>
          </Typography>
          {/* //======================================== */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              boxShadow: "0px 1px 3px 0px grey",
              p: 2,
              borderRadius: 1,
            }}
          >
        
            <TextField
            placeholder="Search user ..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
              variant="outlined"
              onChange={(e) => setUser(e.target.value)}
            />
          </Box>
          {/* //======================================== */}
          <Box
            sx={{
              overflow: "auto",
              borderRadius: 1,
              height: "250px",
            }}
          >
            {props?.user?.map((x) => {
              console.log("---->", x);
              if (x.name.toLowerCase().startsWith(user)) {
                return (
                  <Box
                    sx={{
                      p: 1,
                      boxShadow: "0px 1px 3px 0px grey",
                      borderRadius: 1,
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      mb: 1,
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
                        sx={{
                          fontWeight: "bolder",
                          fontSize: "100%",
                          color: "gray",
                        }}
                      >
                        {x.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#205CBE",
                          fontWeight: "bolder",
                          fontSize: "80%",
                        }}
                      >
                        joined : {dayjs(x.joiningDate).format("D-MMM")}
                      </Typography>
                    </Box>
                    <InfoIcon
                      onClick={() => {
                        // console.log("------>",params.id)
                        router.push(`/admin/user/details/?id=${x._id}`);
                      }}
                      sx={{
                        cursor: "pointer",
                        color: "gray",
                        fontSize: "35px",
                      }}
                    />
                  </Box>
                );
              }
            })}
          </Box>
          {/* //======================================== */}
        </Box>
        {/* //======================================== */}
      </Box>
    );
  }
}
