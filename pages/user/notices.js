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
import axios from "axios";
import { ADMIN_URL } from "../../constants/url";
//===========================================================

export default function Notices() {
  //=====================================

  const [type, setType] = useState("");

  const router = useRouter();
  const theme = useTheme();
  const { darkMode } = useDarkMode();
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }

  const [notices, setNotices] = useState([]);
  useEffect(() => {
    axios.get(`${ADMIN_URL}/notice`).then((res) => setNotices(res.data));
  }, []);
  // const noticeQuery = useQuery({
  //   queryKey: ["noticeQuery"],
  //   queryFn: () => axiosInstance.get("/notice"),
  // });

  // if (noticeQuery.isLoading) {
  //   return <Loading />;
  // }

  // console.log(noticeQuery);

  const filter = notices?.filter((x) => {
    if (x.type.toLowerCase().includes(type.toLowerCase())) {
      return x;
    }
  });
  //================================================
  return (
    <Box
      sx={{
        boxShadow: "0px 2px 3px 0px grey",
        background: darkMode
          ? "linear-gradient(#2c2f33, #2c2f33)"
          : "linear-gradient(#99aab5, #99aab5)",
        p: 1,
        borderRadius: "8px",
        mt: 2,
        [theme.breakpoints.down("sm")]: {
          ml: -9,
          mt: -2,
        },
      }}
    >
      <Typography
        variant="h6"
        sx={darkMode ? [theme.lightText, { m: 2 }] : [theme.darkText, { m: 2 }]}
      >
        General Notice
      </Typography>
      {/* ===================== */}
      <Box
        sx={{
          display: "flex",
          // justifyContent: "space-around",
          // alignItems: "center",
          mb: 4,
          ml: 1,
        }}
      >
        <TextField
          placeholder="Search by tag ..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          size="small"
          variant="outlined"
          onChange={(e) => setType(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: darkMode ? "white" : "black",
              },
            },
            input: {
              color: darkMode ? "white" : "gray",
            },
          }}
        />
      </Box>
      {/* ===================== */}
      {filter?.map((x) => {
        // if (x?.type?.toLowerCase().startsWith(type)) {
        return (
          <>
            <Box
              maxWidth="md"
              container
              sx={{
                mb: 5,

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
              <Box sx={{ width: "99%", p: 2 }}>
                <Typography sx={{ fontWeight: 600, color: "gray" }}>
                  {x.notice}
                </Typography>
              </Box>
            </Box>
          </>
        );
        // }
      })}
    </Box>
  );
}
//============================================================
Notices.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
