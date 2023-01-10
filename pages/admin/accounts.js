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
} from "@mui/material";
import { useTheme } from "@mui/system";
import DashboardLayout from "../../components/layout/dashboard-layout";
import Loading from "../../components/loading";
import { useRouter } from "next/router";
import Users from "../../components/allUsers";
import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_URL } from "../../constants/url";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../../api/axios";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ShowNotice from "../../components/notice";
import Dialogue from "../../components/Dialog";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import AccountTab from "../../components/accountTab";
import AccountEntry from "../../components/accountEntry";
//====================================
function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
}

//==========================================
export default function Accounts() {
  //==========================
  const [type, setType] = useState("");
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [accountTotal, setAccountTotal] = useState([]);
  //==========================
  const theme = useTheme();

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
    //-----------------------------
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/account/total")
      .then((res) => setAccountTotal(res.data));

    // console.log(accountTotal);
  }, []);

  //===============================
  return (
    <>
      {/* ======= NOTICE_DIALOGUE =============== */}
      <Dialog
        scroll="body"
        open={open}
        closeAfterTransition
        onClose={() => setOpen(false)}
        sx={{
          mt: 5,
          // p:15,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 5,
            backgroundColor: "#4caf50",
            color: "white",
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 55,
              mb: 3,
            }}
          />
          <Typography sx={{ fontWeight: "bolder" }}>
            New notice has been created !
          </Typography>
        </Box>
      </Dialog>

      {/* =========================== */}
      <Typography
        variant="h5"
        sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
      >
        Accounts :
      </Typography>
      {/* ====================================== */}
      <Box
        sx={{
          width: windowDimensions?.width < 550 ? "100%" : "100%",
          display: "flex",
          flexDirection: windowDimensions?.width < 550 ? "column" : "row",
          justifyContent: "space-around",
          boxShadow: "0px 1px 2px 0px grey",
          p: 2,
          m: "auto",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            backgroundColor: "#4caf50",
            color: "white",
            width: windowDimensions?.width < 550 ? "100%" : "20%",
            mb: windowDimensions?.width < 550 ? 5 : 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bolder", alignSelf: "center" }}
            >
              ₹ {accountTotal?.totalRent?.toLocaleString("en-IN")}
            </Typography>
            <GroupRemoveIcon sx={{ fontSize: 55 }} />
          </Box>

          <Typography sx={{ fontWeight: "bolder", ml: 10 }}>Credit</Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            backgroundColor: "#ef5350",
            color: "white",
            width: windowDimensions?.width < 550 ? "100%" : "20%",

            // width:"20%"
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bolder", alignSelf: "center" }}
            >
              ₹ {accountTotal?.totalDebit?.toLocaleString("en-IN")}
            </Typography>
            <GroupAddIcon sx={{ fontSize: 55 }} />
          </Box>

          <Typography sx={{ fontWeight: "bolder", ml: 10 }}>Debit</Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            backgroundColor: "#42a5f5",
            color: "white",
            width: windowDimensions?.width < 550 ? "100%" : "20%",
            mb: windowDimensions?.width < 550 ? 5 : 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bolder" }}>
              ₹{" "}
              {(
                accountTotal?.totalRent - accountTotal?.totalDebit
              ).toLocaleString("en-IN")}
            </Typography>
          </Box>

          <Typography sx={{ fontWeight: "bolder", ml: 10, mt: 2 }}>
            Revenue
          </Typography>
        </Box>
      </Box>
      {/* ====================================== */}

      {/* <AccountTab /> */}
      <Box
        sx={{
          width: windowDimensions?.width < 550 ? "100%" : "100%",
          display: "flex",
          flexDirection: windowDimensions?.width < 550 ? "column" : "row",
          //   justifyContent: "space-around",
          boxShadow: "0px 1px 2px 0px grey",
          p: 2,
          m: "auto",
          borderRadius: 1,
          mt: 4,
        }}
      >
        <AccountEntry />
      </Box>

      {/* ====================================== */}
    </>
  );
}

Accounts.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
