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
//=====================================
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: "inset 0px -2px 6px 0px grey",
  background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
  borderRadius: "8px",
  p: 4,
};

const months = ["December", "January", "Feburary", "March"];
const years = [2021, 2022, 2023];

//============================================
export default function RentShow(props) {
  const router = useRouter();
  const token = useToken();
  //=============================

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
          <Box sx={style}>
            <form onSubmit={patchForm.handleSubmit}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Edit Rent
              </Typography>
              <Typography sx={{ mb: 3 }}>
                Dated:{" "}
                <span style={{ fontWeight: "bold", color: "gray" }}>
                  {patchForm.values.month}/{patchForm.values.year}
                </span>
              </Typography>
              {/* ============= HAVE_GIVEN =========================== */}
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
                <FormLabel>Have given</FormLabel>
                {rentDue === 0 ? (
                  <Typography sx={{ mb: 2, mt: 2, fontWeight: "bolder" }}>
                    Fuck off
                  </Typography>
                ) : (
                  <TextField
                    id="due.rentDue"
                    name="due.rentDue"
                    size="small"
                    type="number"
                    variant="standard"
                    defaultValue={patchForm.values.due.rentDue}
                    onChange={patchForm.handleChange}
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
                  background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                  borderRadius: "8px",
                  mb: 1,
                }}
              >
                <Tooltip title={patchForm.values.eBills.reading}>
                  <Typography sx={{ mb: 2 }}>E-Bill</Typography>
                </Tooltip>
                {ebillDue === 0 ? (
                  <Typography sx={{ mb: 2, fontWeight: "bolder" }}>
                    Fuck off
                  </Typography>
                ) : (
                  <TextField
                    id="due.ebillDue"
                    name="due.ebillDue"
                    size="small"
                    type="number"
                    variant="standard"
                    defaultValue={patchForm.values.due.ebillDue}
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
                    background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                    borderRadius: "8px",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ cursor: "pointer" }}>
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
                  <Typography sx={{ cursor: "pointer" }}>
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
                sx={{
                  backgroundColor: "white",
                  color: "gray",
                  fontWeight: "bold",
                  border: "2px solid gray",
                  mt: 4,
                }}
              >
                Update Rent
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>

      <Grid
        sx={{ mb: 2, display: "flex", p: 1 }}
        item
        xl={4}
        lg={4}
        md={4}
        sm={12}
        xs={12}
      >
        <RentCard
          month={props.month}
          rent={props.rent}
          rentDue={props.rentDue}
          ebillDue={props.ebillDue}
          status={props.status}
        />
      </Grid>

      {/* ============================================= */}
    </>
  );
}
