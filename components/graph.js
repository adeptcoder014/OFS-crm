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
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import axiosInstance from "../api/axios";
import { useTheme } from "@mui/system";
import { useDarkMode } from "../context/darkMode";

ChartJS.register(ArcElement, Tooltip, Legend);

//================================================
export default function Graph() {
  //================================================
  const { query } = useController({ filter: "NEW" });
  const router = useRouter();
  const [account, setAccount] = useState({});
  const theme = useTheme();
  const { darkMode } = useDarkMode();
  useEffect(() => {
    axiosInstance.get("/account/total").then((res) => setAccount(res.data));
  }, []);

  // console.log(account);
  //================================================
  const labels = ["credit", "debit"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: [account.totalRent, account.totalDebit],
        backgroundColor: ["#4caf50", "#ef5350"],
        borderColor: ["#4caf50", "#ef5350"],
        borderWidth: 1,
      },
    ],
  };
  //=================================
  return (
    <Box
      sx={{
        p: 5,
        boxShadow: "0px 1px 3px 0px grey",
        borderRadius: 1,
        // width: "70%",
        mt: 2,
        backgroundColor: darkMode ? "#2c2f33" : "#ffffff",


      }}
    >
      {/* //======================================== */}

      <Typography
        sx={
          darkMode ? [theme.lightText, { mb: 2 }] : [theme.darkText, { mb: 2 }]
        }
      >
        Bookings :
      </Typography>

      {/* //======================================== */}
      <Box
        sx={{
          overflow: "auto",
          borderRadius: 1,
          height:250,
          m:"auto"
        }}
      >
        <Pie data={data} />
      </Box>
      {/* //======================================== */}
    </Box>
  );
}
