import {
  Grid,
  TextField,
  Typography,
  Button,
  Avatar,
  Box,
  Modal,
  Backdrop,
  Fade,
  Slide,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUserById } from "../api/user";
import { useRouter } from "next/router";
import React from "react";
import axios from "axios";
import { ADMIN_URL } from "../constants/url";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Loading from "./loading";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import axiosInstance from "../api/axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useToken } from "../context/localStorageToken";
import { getAdminById } from "../api/admin";
import jwt_decode from "jwt-decode";
import RentCard from "./RentCard";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { useTheme } from "@mui/system";
import { useDarkMode } from "../context/darkMode";
//=====================================

const Checks = [
  {
    month: "01",
    name: "Jan",
    color: "#f29d38",
  },
  {
    month: "02",
    name: "Feb",
    color: "#8d2095",
  },
  {
    month: "03",
    name: "Mar",
    color: "#5d1793",
  },
  {
    month: "04",
    name: "Apr",
    color: "#1452cf",
  },
  {
    month: "05",
    name: "May",
    color: "#52b4c4",
  },
  {
    month: "06",
    name: "Jun",
    color: "#409629",
  },
  {
    month: "07",
    name: "Jul",
    color: "#7fc73d",
  },
  {
    month: "08",
    name: "Aug",
    color: "#fffe54",
  },
  {
    month: "09",
    name: "Sep",
    color: "#f9cd46",
  },
  {
    month: "10",
    name: "Oct",
    color: "#f29d38",
  },
  {
    month: "11",
    name: "Nov",
    color: "#ef6f2e  ",
  },
  {
    month: "12",
    name: "Dec",
    color: "#ec3223",
  },
];
//============================================
export default function RentShow(props) {
  const router = useRouter();
  const token = useToken();

  const theme = useTheme();
  const { darkMode } = useDarkMode();

  //=======================================
  const [rent, setRent] = useState(0);
  const [reading, setReading] = useState(0);
  const [duration, setDuration] = useState(0);
  const [openHai, setOpenHai] = useState(false);
  const [cash, setCash] = useState(false);
  const [online, setOnline] = useState(false);
  const [admin, setAdmin] = useState({});
  const [collectedBy, setCollectedBy] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [open, setOpen] = React.useState(false);
  const [openEditedBy, setOpenEditedBy] = React.useState(false);

  const [rentDue, setRentDue] = React.useState(0);
  const [ebillDue, setEbillDue] = React.useState(0);

  const [editedRents, setEditedRents] = React.useState([]);

  const handleClose = () => setOpen(false);
  //=========================================

  const patch = useMutation({
    // mutationFn: login,
    onSuccess: (res) => {
      return Swal.fire(
        "Logged in !",
        "Continue with the OFS Admin Panel",
        "success"
      ).then(() => router.push("/admin/home"));
    },
    onError: (err) => Swal.fire("Error !", err.message, "error"),
  });

  const patchForm = useFormik({
    initialValues: {
      month: "",
      year: 0,
      eBills: 0,
      due: 0,
    },
    onSubmit: (values) => {
      patch.mutate(values);
    },
  });

  useEffect(() => {
    getAdminById(jwt_decode(token)._id).then((res) => setAdmin(res.data.data));
  }, []);

  // const query = useQuery({
  //   queryKey: ["getRensOfUsers"],
  //   queryFn: () => {
  //     axiosInstance.post(`/user/get-rent/${props.rentId}`,{userId:router.query.id});
  //   },

  // });

  // if (query.isLoading) {
  //   return <Loading />
  // }
  // console.log("<--",query);

  useEffect(() => {
    axiosInstance
      .post(`/user/get-rent/${props.rentId}`, {
        userId: router.query.id,
      })
      .then((res) => {
        patchForm.setValues(res.data.rent);
        setRent(res.data.rent);
      });
  }, []);

  const getRentDetails = () => {
    axiosInstance
      .post(`/user/get-rent/${props.rentId}`, {
        userId: router.query.id,
      })
      .then((res) => {
        patchForm.setValues(res.data.rent);
        // setRent(res.data.rent);
      });
  };

  // console.log("patchForm -->", patchForm.values);
  //========================================

  return (
    <>
      {/* ============== UPDATE_MODAL_FORM =====================================  */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 50,
        }}
        sx={{ overflow: "scroll" }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              boxShadow: "inset 0px -2px 6px 0px grey",
              backgroundColor: darkMode ? "#23272a" : "white",
              borderRadius: "8px",
              p: 4,
            }}
          >
            <form onSubmit={patchForm.handleSubmit}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={
                  darkMode
                    ? [
                        theme.lightText,
                        {
                          [theme.breakpoints.down("sm")]: {
                            fontSize: 16,
                            m: 1,
                            mt: 5,
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
                            m: 1,
                            mt: 5,
                          },
                          [theme.breakpoints.up("sm")]: {
                            m: 1,
                            mt: 5,
                          },
                        },
                      ]
                }
              >
                Edit Rent
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={
                    darkMode
                      ? [theme.lightText, { mr: 1, mb: 2 }]
                      : [theme.darkText, { mr: 1, mb: 2 }]
                  }
                >
                  For:{" "}
                </Typography>
                <Typography
                  sx={darkMode ? [theme.lightText] : [theme.darkText]}
                >
                  {rent.month}/{rent.year}
                </Typography>
              </Box>
              {/* ============= HAVE_GIVEN =========================== */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  boxShadow: " 0px -2px 6px 0px grey",
                  backgroundColor: darkMode ? "#2c2f33" : "white",
                  borderRadius: "8px",
                  mb: 1,
                }}
              >
                <FormLabel sx={darkMode ? [theme.lightText] : [theme.darkText]}>
                  Have given
                </FormLabel>
                {rent?.due?.rentDue === 0 ? (
                  <Typography
                    sx={darkMode ? [theme.lightText] : [theme.darkText]}
                  >
                    Fuck off
                  </Typography>
                ) : (
                  <TextField
                    id="due.rentDue"
                    name="due.rentDue"
                    size="small"
                    type="number"
                    variant="standard"
                    // defaultValue={patchForm?.values?.due?.rentDue}
                    defaultValue={rent?.due?.rentDue}
                    onChange={patchForm.handleChange}
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
                )}
              </Box>

              {/* ============= EBILL_DUE =========================== */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  boxShadow: " 0px -2px 6px 0px grey",
                  backgroundColor: darkMode ? "#2c2f33" : "white",
                  borderRadius: "8px",
                  borderRadius: "8px",
                  mb: 1,
                }}
              >
                <Tooltip title={patchForm.values.eBills.reading}>
                  <Typography
                    sx={darkMode ? [theme.lightText] : [theme.darkText]}
                  >
                    E-Bill
                  </Typography>
                </Tooltip>
                {rent?.due?.ebillDue === 0 ? (
                  <Typography
                    sx={darkMode ? [theme.lightText] : [theme.darkText]}
                  >
                    Fuck off
                  </Typography>
                ) : (
                  <TextField
                    id="due.ebillDue"
                    name="due.ebillDue"
                    size="small"
                    type="number"
                    variant="standard"
                    defaultValue={rent?.due?.ebillDue}
                    // defaultValue={patchForm?.values?.due?.ebillDue}
                    onChange={patchForm.handleChange}
                  />
                )}
              </Box>
              {/* ============= EBILL_DUE =========================== */}
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  boxShadow: " 0px -2px 6px 0px grey",
                  background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                  borderRadius: "8px",
                  mb: 1,
                }}
              >
                <Tooltip title={patchForm.values.eBills.reading}>
                  <Typography sx={{ mb: 2 }}>Cash/online</Typography>
                </Tooltip>

                <TextField
                  id="due.ebillDue"
                  name="due.ebillDue"
                  size="small"
                  type="number"
                  variant="standard"
                  defaultValue={patchForm.values?.rent?.mode?.collectedBy}
                  onChange={patchForm.handleChange}
                />
              </Box> */}
              {/* ============= MODE =========================== */}
              <Box>
                {/* <form onSubmit={patchForm.handleSubmit}> */}

                <Box
                  sx={{
                    display: "flex",
                    // flexDirection: "column",
                    p: 2,
                    boxShadow: " 0px -2px 6px 0px grey",
                    backgroundColor: darkMode ? "#2c2f33" : "white",
                    borderRadius: "8px",
                    borderRadius: "8px",
                    mb: 1,
                  }}
                >
                  <Typography
                    sx={darkMode ? [theme.lightText] : [theme.darkText]}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          onClick={() => {
                            setOnline((prev) => !prev);
                            setCash(false);
                          }}
                        />
                      }
                      label="Online"
                    />
                  </Typography>{" "}
                  <Typography
                    sx={darkMode ? [theme.lightText] : [theme.darkText]}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          onClick={() => {
                            setCash((prev) => !prev);
                            setOnline(false);
                          }}
                        />
                      }
                      label="Cash"
                    />{" "}
                  </Typography>
                </Box>

                {/* -------------------------------------*/}
                {cash && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      p: 2,
                      boxShadow: " 0px -2px 6px 0px grey",
                      background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                      borderRadius: "8px",
                      mb: 1,
                    }}
                  >
                    <Typography>Collected By</Typography>
                    <TextField
                      id="mode.collectedBy"
                      name="mode.collectedBy"
                      size="small"
                      variant="standard"
                      defaultValue={admin.name}
                      onChange={patchForm.handleChange}
                    />
                  </Box>
                )}

                {online && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      p: 2,
                      boxShadow: " 0px -2px 6px 0px grey",
                      background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                      borderRadius: "8px",
                      mb: 1,
                    }}
                  >
                    <Typography>UTR</Typography>
                    <TextField
                      id="mode.transactionId"
                      name="mode.transactionId"
                      size="small"
                      variant="standard"
                      defaultValue={transactionId}
                      onChange={patchForm.handleChange}
                    />
                  </Box>
                )}
              </Box>
              {/* ============= UPDATE =========================== */}

              <Button
                onClick={() => {
                  axiosInstance
                    .patch(`${ADMIN_URL}/user/rent/${props.rentId}`, {
                      data: patchForm.values,
                      userId: props.userId,
                    })
                    .then((res) => {
                      setOpen(false);
                      Swal.fire("Done !", res, "success");
                    });
                }}
               sx={[theme.primaryBtn,{mt:3,width:"70%",ml:6}]}
              >
                Update Rent
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
      {/* ======================== RENT SHOW ================================== */}

      <Grid
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
          backgroundColor: darkMode ? "#2c2f33" : "white",
        }}
        item
        xl={4}
        lg={4}
        md={4}
        sm={12}
        xs={12}
      >
        {/* <RentCard
          setOpen={setOpen}
          month={props.month}
          rent={props.rent}
          rentDue={props.rentDue}
          ebillDue={props.ebillDue}
          status={props.status}
          total={props.total}
        /> */}
        <Box
          sx={{
            boxShadow:
              props.status === "DUE"
                ? "0px 0px 2px 6px #d9534f"
                : "0px 0px 5px 4px #5cb85c",
            backgroundColor: darkMode ? "white" : "#99aab5",
            borderRadius: "8px",
            p: 2,
            mb: 1,
            mt: 5,
            // border:"4px solid lightGreen"
            [theme.breakpoints.down("sm")]: {
              m: "auto",
            },
          }}
        >
          {/* --------------------------- */}

          {Checks.map((x) => {
            if (x.month === props.month) {
              return (
                <Box
                  key={x}
                  sx={{
                    background: `linear-gradient(252deg,  ${x.color}, #ffecec)`,
                    p: 5,
                    height: "150px",
                    width: "150px",
                    borderRadius: "100%",
                    boxShadow: "inset 0px 0px 8px 0px #3f51b5",
                    position: "relative",
                    bottom: "70px",
                    left: "2px",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bolder",
                      color: "white",
                      textAlign: "center",
                      mt: 1,
                    }}
                  >
                    {x.name}
                  </Typography>
                </Box>
              );
            }
          })}
          {/* --------------------------- */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "space-between",
              mb: 2,
              mt: -8,
            }}
          >
            <Box />
            <CallMadeIcon
              onClick={() => {
                router.push(`/admin/user/who-edited/?id=${props.rentId}`);
              }}
              sx={{ color: "gray", cursor: "pointer" }}
            />
            <AppRegistrationIcon
              onClick={() => {
                setOpen(true);
                getRentDetails();
              }}
              sx={{ ml: 6, color: "gray", cursor: "pointer" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "space-between",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "poppins",
                fontWeight: "bolder",
                color: "#2c2f33",
                fontSize: 14,
                alignSelf: "center",
              }}
            >
              Rent :
            </Typography>
            <Typography
              style={{
                color: "black",
                backgroundColor: "white",
                borderRadius: 10,
                padding: "5px",
                fontWeight: "bolder",
              }}
            >
              ₹ {props.rent.toLocaleString("en-IN")}{" "}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            <Typography
              sx={{
                fontFamily: "poppins",
                fontWeight: "bolder",
                color: "#2c2f33",
                fontSize: 14,
                alignSelf: "center",
              }}
            >
              E-Bill:
            </Typography>
            <span
              style={{
                color: "black",
                backgroundColor: "white",
                borderRadius: 10,
                padding: "5px",
                fontWeight: "bolder",
              }}
            >
              ₹ {props.ebillDue.toLocaleString("en-IN")}
            </span>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "space-between",
              mb: 1,
              mt: 1,
            }}
          >
            <Tooltip title="To be received">
              <Typography
                sx={{
                  fontFamily: "poppins",
                  fontWeight: "bolder",
                  color: "#2c2f33",
                  fontSize: 14,
                  alignSelf: "center",
                }}
              >
                TBR :
              </Typography>
            </Tooltip>
            <Typography
              style={{
                color: "white",
                backgroundColor: "gray",
                borderRadius: 4,
                padding: "3px 5px",
                fontWeight: "bolder",
              }}
            >
              ₹ {props.total}
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* ============================================= */}
    </>
  );
}
