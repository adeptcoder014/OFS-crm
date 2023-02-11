import {
  Typography,
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  InputAdornment,
} from "@mui/material";
import DashboardLayout from "../../components/layout/dashboard-layout";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import TotalCredits from "../../components/totalCredits";
import { getAdminById } from "../../api/admin";
import jwt_decode from "jwt-decode";
import { useTheme } from "@mui/system";
import { useDarkMode } from "../../context/darkMode";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";

//==========================================
export default function Credits() {
  const theme = useTheme();
  const { darkMode } = useDarkMode();
  //==========================
  const [search, setSearch] = useState("");

  const [admin, setAdmin] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Token");

      if (!token) {
        router.push("/admin/login");
      } else {
        getAdminById(jwt_decode(token)._id).then((res) =>
          setAdmin(res.data.data)
        );
      }
    }
  }, []);

  const filter = admin?.editedRents?.filter((x) => {
    if (dayjs(x.time).format("DD MM YYYY").split(" ")[1].includes(search)) {
      return x;
    }
  });
  //===============================
  return (
    <>
      <Box sx={{ mt: 2 }}>
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
              setSearch(e.target.value);
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
        
        {/* {data?.map((x) => x?.dues?.rents?.map((w) => <h1>{w.due.rentDue}</h1>))} */}
        {filter?.map((x) => {
          return (
            <TotalCredits
              key={x}
              time={x.time}
              rentCollected={x.rent}
              ebillCollected={x.ebillDue}
              mode={x.mode}
            />
          );
        })}
      </Box>
    </>
  );
}

Credits.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
