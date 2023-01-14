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
  const { darkMode } = useDarkMode();
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
      <Box sx={{ backgroundColor: darkMode ? "#23272a" : "white" }}>
        <Typography
          variant="h5"
          sx={
            darkMode
              ? [
                  theme.lightText,
                  {
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 16,
                      m: "auto",
                      ml: 9,
                      mb: 5,
                      mt: 5,
                    },
                    [theme.breakpoints.up("sm")]: {
                      ml: 9,
                      mt: 5,
                    },
                  },
                ]
              : [
                  theme.darkText,
                  {
                    [theme.breakpoints.down("sm")]: {
                      m: "auto",
                      ml: 9,
                      mb: 5,
                      mt: 5,
                    },
                    [theme.breakpoints.up("sm")]: {
                      ml: 9,

                      mt: 5,
                    },
                  },
                ]
          }
        >
          Create Notice
        </Typography>
        {/* ====================================== */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            boxShadow: "0px 1px 2px 0px grey",
            p: 2,
            borderRadius: 2,
            backgroundColor: darkMode ? "#2c2f33" : "white",
            [theme.breakpoints.up("sm")]: {
              width: "50%",
              ml: 8,
            },
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
                        fontSize: 16,
                        m: "auto",
                      },
                      [theme.breakpoints.up("sm")]: {
                        m: 1,
                        mt: 5,
                      },
                    },
                  ]
                : [
                    theme.darkText,
                    {
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 16,
                        m: "auto",
                      },
                      [theme.breakpoints.up("sm")]: {
                        m: 1,
                        mt: 5,
                      },
                    },
                  ]
            }
          >
            Choose Label{" "}
          </Typography>
          <FormControl
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "white" : "gray",
                },
              },
              input: {
                color: darkMode ? "white" : "gray",
              },
              [theme.breakpoints.up("sm")]: {
                width: "50%",
                mt: 4,
              },
              [theme.breakpoints.down("sm")]: {
                width: "80%",
                ml: 8,
                mt: 2,
              },
            }}
          >
            <InputLabel id="demo-simple-select-label">Notice Type</InputLabel>
            <Select
              id="type"
              onChange={(e) => setType(e.target.value)}
              label="Notice Type"
            >
              {noticeTypes.map((x) => (
                <MenuItem
                  sx={{
                    input: {
                      color: darkMode ? "white" : "gray",
                    },
                  }}
                  key={x}
                  value={x.value}
                >
                  {x.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* ====================================== */}

        <Box
          sx={{
            backgroundColor: darkMode ? "#2c2f33" : "white",
            boxShadow: "0px 1px 2px 0px grey",
            p: 2,
            borderRadius: 2,
            mt: 5,
            mb: 5,
            [theme.breakpoints.up("sm")]: {
              ml: 8,
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
                        fontSize: 16,
                        m: "auto",
                        ml: 15,
                        mb: 2,
                      },
                      [theme.breakpoints.up("sm")]: {
                        m: 1,
                        mt: 5,
                      },
                    },
                  ]
                : [
                    theme.darkText,
                    {
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 16,
                        m: "auto",
                        ml: 15,
                        mb: 2,
                      },
                      [theme.breakpoints.up("sm")]: {
                        m: 1,
                        mt: 5,
                      },
                    },
                  ]
            }
          >
            Enter notice{" "}
          </Typography>
          <form
            id="notice"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              onChange={(e) => setNotice(e.target.value)}
              multiline
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "white" : "gray",
                  },
                },
                "& .MuiInputBase-root": {
                  color: darkMode ? "white" : "gray",
                },
                [theme.breakpoints.down("sm")]: {
                  width: "80%",
                  ml: 8,
                },
              }}
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
              sx={[
                theme.primaryBtn,
                {
                  [theme.breakpoints.up("sm")]: {
                    width: "100%",
                    mt: 4,
                  },
                  [theme.breakpoints.down("sm")]: {
                    width: "80%",
                    ml: 8,
                    mt: 3,
                  },
                },
              ]}
            >
              Create <AddIcon sx={{ ml: 2 }} />
            </Button>
          </form>
        </Box>
        <Typography
          variant="h5"
          sx={
            darkMode
              ? [
                  theme.lightText,
                  {
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 16,
                      m: 1,
                      mt: 5,
                      ml:9
                    },
                    [theme.breakpoints.up("sm")]: {
                      m: 1,
                      mt: 5,
                      ml:9
                    },
                  },
                ]
              : [
                  theme.darkText,
                  {
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 16,
                      m: 1,
                      mt: 5,
                      ml:9
                    },
                    [theme.breakpoints.up("sm")]: {
                      m: 1,
                      mt: 5,
                      ml:9
                    },
                  },
                ]
          }
        >
          Notices :
        </Typography>
        <ShowNotice />
      </Box>
      {/* ====================================== */}
    </>
  );
}

Notice.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
