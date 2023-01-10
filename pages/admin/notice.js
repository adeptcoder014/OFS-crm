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

const noticeTypes = [
  {
    type: "Laundary",
    value: "LAUNDARY",
  },
  {
    type: "Food",
    value: "FOOD",
  },
  {
    type: "Rental",
    value: "RENTAL",
  },
  {
    type: "Misc",
    value: "MISC",
  },
];
//==========================================
export default function Notice() {
  //==========================
  const [type, setType] = useState("");
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [ressponse, setRessponse] = useState("");
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
  }, []);

  //   console.log(windowDimensions.width);
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
      {/* ======= ERROR_DIALOGUE =============== */}
      <Dialog
        scroll="body"
        open={error}
        closeAfterTransition
        onClose={() => setError(false)}
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
            backgroundColor: "#ff9800",
            color: "white",
          }}
        >
          <ReportProblemIcon
            sx={{
              fontSize: 55,
              mb: 3,
            }}
          />
          <Typography
            sx={{
              fontWeight: "bolder",
            }}
          >
            {ressponse}
            {/* Please enter all the required feilds ! */}
          </Typography>
        </Box>
      </Dialog>
      {/* =========================== */}
      <Typography
        variant="h5"
        sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
      >
        Create Notice
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
        <Typography sx={{ fontWeight: "bolder" }}>Choose Label </Typography>
        <FormControl
          size="small"
          sx={{
            //  width: "30%" ,
            width: windowDimensions?.width < 550 ? "100%" : "30%",
            mt: windowDimensions?.width < 550 ? 5 : 0,
          }}
        >
          <InputLabel id="demo-simple-select-label">Notice Type</InputLabel>
          <Select
            id="type"
            onChange={(e) => setType(e.target.value)}
            label="Notice Type"
          >
            {noticeTypes.map((x) => (
              <MenuItem key={x} value={x.value}>
                {x.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* ====================================== */}

      <Box
        sx={{
          width: windowDimensions?.width < 550 ? "100%" : "100%",
          boxShadow: "0px 1px 2px 0px grey",
          p: 2,
          borderRadius: 2,
          mt: 5,
          mb: 5,
        }}
      >
        <Typography sx={{ fontWeight: "bolder" }}>Enter notice </Typography>
        <form id="notice">
          <TextField
            onChange={(e) => setNotice(e.target.value)}
            fullWidth
            multiline
            sx={{ mt: 3 }}
          />
          <Button
            onClick={() => {
              //   if (type === "" || notice === "") {       /// CLIENT_SIDE-VALIDATION
              //     setError(true);
              //     return;
              //   }
              axiosInstance
                .post(`${ADMIN_URL}/notice`, {
                  type,
                  notice,
                })
                .then((res) => {
                  setOpen(true);
                  <ShowNotice yes={true} />;
                })
                .catch((e) => {
                  setError(true);
                  setRessponse(e.response.data.message);
                });
            }}
            sx={{
              backgroundColor: "#f76334",
              color: "white",
              width: windowDimensions?.width < 550 ? "100%" : "50%",
              fontSize: 16,
              fontWeight: "bolder",

              m: "auto",
              mt: 5,
              borderRadius: "100px",
              p: 2,
              ml: windowDimensions?.width < 550 ? 0 : 40,

              "&:hover": {
                color: "red",
                border: "2px solid #ff7f56",
                backgroundColor: "white",
              },
            }}
          >
            Create <AddIcon sx={{ ml: 2 }} />
          </Button>
        </form>
      </Box>
      <Typography
        variant="h5"
        sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
      >
        Notices :
      </Typography>
      <ShowNotice />
      {/* ====================================== */}
    </>
  );
}

Notice.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
