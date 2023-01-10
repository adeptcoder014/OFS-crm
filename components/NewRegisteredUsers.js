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

//================================================
export default function NewRegisteredUsers() {
  //================================================
  const { query } = useController({ filter: "NEW" });
  const router = useRouter();
  const [user, setUser] = useState("");
  //================================================

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

      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "18px",
          fontFamily: "poppins",
          mb: 2,
        }}
      >
        Latest Registration Bookings :
      </Typography>
      {/* //======================================== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          sx={{
            color: "blue",
            fontWeight: "bold",
            //   fontSize: "18px",
            fontFamily: "poppins",
            // mb: 2,
            alignSelf: "center",
          }}
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
          onChange={(e) => setUser(e.target.value)}
        />
      </Box>
      {/* //======================================== */}
      <Box
        sx={{
          overflow: "auto",
          borderRadius: 1,
          height: "180px",
        }}
      >
        {query?.data?.data?.user.map((x) => {
          if (x.name.toLowerCase().startsWith(user)) {
            return (
              <Box
              key={x}
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
                <AppRegistrationIcon
                  onClick={() => {
                    // console.log("------>",params.id)
                    router.push(`/admin/register-user/?id=${x._id}`);
                  }}
                  sx={{ cursor: "pointer", color: "gray", fontSize: "35px" }}
                />
              </Box>
            );
          }
        })}
      </Box>
      {/* //======================================== */}
    </Box>
  );
}
