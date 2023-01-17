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
import NewRegisteredUsers from "./NewRegisteredUsers";
import AllRegisteredUsers from "./AllRegisteredUser";
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
  const theme = useTheme();
  const { darkMode } = useDarkMode();
  //================================================
  if (query.isLoading) {
    return <Loading />;
  }
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

      <AllRegisteredUsers
        type="REGISTERED"
        title="All users :"
        url="/admin/user/details/"
      />
    </Box>
  );
}
