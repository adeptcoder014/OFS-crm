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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
//================================================
export default function Graph() {
  //================================================
  const { query } = useController({ filter: "NEW" });
  const router = useRouter();
  const [user, setUser] = useState("");
  //================================================
  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 2, 4, 5, 78, 4],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [1, 2, 4, 5, 78, 4],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
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
        Bookings :
      </Typography>

      {/* //======================================== */}
      <Box
        sx={{
          overflow: "auto",
          borderRadius: 1,
          height: "250px",
        }}
      >
        <Bar options={options} data={data} />;
      </Box>
      {/* //======================================== */}
    </Box>
  );
}
