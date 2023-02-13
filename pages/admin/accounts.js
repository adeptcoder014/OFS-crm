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
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import AccountTab from "../../components/accountTab";
import AccountEntry from "../../components/accountEntry";
import { useDarkMode } from "../../context/darkMode";
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
  const router = useRouter();
  const { darkMode } = useDarkMode();
  //-----------------------------

  useEffect(() => {
    axiosInstance
      .get("/account/total")
      .then((res) => setAccountTotal(res.data));

    // console.log(accountTotal);
  }, []);
  let Credits = accountTotal?.totalRent + accountTotal?.ebill;
  let Revenue =
    accountTotal?.totalRent + accountTotal?.ebill - accountTotal?.totalDebit;

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
      <Box
        sx={{
          backgroundColor: darkMode ? "#23272a" : "white",
          [theme.breakpoints.down("sm")]: {
            ml: -3,
          },
          [theme.breakpoints.up("sm")]: {
            ml: -3,
            p: 2,
          },
        }}
      >
        <Typography
          variant="h5"
          sx={
            darkMode
              ? [
                  theme.lightText,
                  {
                    [theme.breakpoints.down("sm")]: {
                      m: 2,
                      ml: 9,
                    },
                    [theme.breakpoints.up("sm")]: {
                      m: 2,
                      ml: 9,
                    },
                  },
                ]
              : [
                  theme.darkText,
                  {
                    [theme.breakpoints.down("sm")]: {
                      m: 2,
                      ml: 9,
                    },
                    [theme.breakpoints.up("sm")]: {
                      m: 2,
                      ml: 9,
                    },
                  },
                ]
          }
        >
          Accounts :
        </Typography>
        {/* ====================================== */}
        <Box
          sx={{
            // width: windowDimensions?.width < 550 ? "100%" : "100%",
            display: "flex",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
            justifyContent: "space-around",
            boxShadow: "0px 1px 2px 0px grey",
            p: 2,
            m: "auto",
            borderRadius: 2,
            backgroundColor: darkMode ? "#2c2f33" : "white",
            cursor: "pointer",
          }}
          onClick={() => {
            router.push("/admin/credits");
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.down("sm")]: {
                p: 1,
                width: 240,
                ml: 2,
              },
              [theme.breakpoints.up("sm")]: {
                p: 3,
              },
              borderRadius: 1,
              backgroundColor: "#4caf50",
              color: "white",
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
                {/* {accountTotal?.totalRent?.toLocaleString("en-IN")}₹{" "} */}
                ₹{Credits.toLocaleString("en-IN")}
              </Typography>
              <GroupRemoveIcon sx={{ fontSize: 55 }} />
            </Box>

            <Typography sx={{ fontWeight: "bolder", ml: 10 }}>
              Credit
            </Typography>
          </Box>

          <Box
            sx={{
              [theme.breakpoints.down("sm")]: {
                p: 1,
                width: 240,
                ml: 2,
                mt: 2,
              },
              [theme.breakpoints.up("sm")]: {
                p: 3,
              },
              borderRadius: 1,
              backgroundColor: "#ef5350",
              color: "white",

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
              [theme.breakpoints.down("sm")]: {
                p: 1,
                width: 240,
                ml: 2,
                mt: 2,
              },
              [theme.breakpoints.up("sm")]: {
                p: 3,
              },
              borderRadius: 1,
              backgroundColor: "#42a5f5",
              color: "white",
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
                ₹ {Revenue.toLocaleString("en-IN")}
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
            display: "flex",
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
      </Box>
    </>
  );
}

Accounts.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
