import {
  Grid,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Backdrop,
  Fade,
  Box,
  FormLabel,
  Tooltip,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ADMIN_URL } from "../constants/url";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { getRent } from "../api/rental";
import { SelectAllSharp } from "@mui/icons-material";
import { useToken } from "../context/localStorageToken";
import { getAdminById } from "../api/admin";
import jwt_decode from "jwt-decode";
import { useTheme } from "@mui/system";
import { useDarkMode } from "../context/darkMode";
import { getUserById } from "../api/user";
//==================================================
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

//=====================
export default function RentEntry(props) {
  //==========================
  const router = useRouter();
  const token = useToken();

  const [rent, setRent] = useState(0);
  const [reading, setReading] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const [online, setOnline] = useState(false);
  const [admin, setAdmin] = useState({});
  const [collectedBy, setCollectedBy] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const theme = useTheme();
  const { darkMode } = useDarkMode();
  //===========================
  const [dues, setDues] = useState({});

  useEffect(() => {
    getAdminById(jwt_decode(token)._id).then((res) => setAdmin(res.data.data));
    getUserById(router.query.id).then((res) => {
      setDues(res.data.dues.rents.slice(-1).pop());
    });
  }, []);
  const [cycle, setCycle] = useState();
  // console.log("||-->", cycle);
  //===========================
  return (
    <>
      {/* ============== UPDATE_MODAL_FORM =====================================  */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 50,
        }}
        sx={{ overflow: "scroll" }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* <form onSubmit={patchForm.handleSubmit}> */}
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit Rent
            </Typography>
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
                  size="small"
                  variant="standard"
                  defaultValue={admin.name}
                  onChange={(e) => setCollectedBy(e.target.value)}
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
                  size="small"
                  variant="standard"
                  defaultValue={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </Box>
            )}
            {/* ------------------------------------- */}
            <Button
              onClick={() => setOpen(false)}
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
            {/* </form> */}
          </Box>
        </Fade>
      </Modal>
      {/* ==================== RENT_CYCLE ==================================== */}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{}}>
        <Typography
          sx={
            darkMode
              ? [theme.lightText, { mb: 1, fontSize: 12 }]
              : [theme.darkText, { mb: 1, fontSize: 12 }]
          }
        >
          Rent Cycle :
        </Typography>
        <TextField
          placeholder={dues.rentCycle}
          name="cycle"
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
          }}
          type="number"
          // defaultValue={dues?.rentCycle}
          // defaultValue={cycle}
          onChange={(e) => setCycle(e.target.value)}
        />
      </Grid>
      {/* ==================== RENT ==================================== */}

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{}}>
        <Typography
          sx={
            darkMode
              ? [theme.lightText, { mb: 1, mt: 2, fontSize: 12 }]
              : [theme.darkText, { mb: 1, mt: 2, fontSize: 12 }]
          }
        >
          Rent :
        </Typography>
        <TextField
          size="small"
          // variant="standard"
          type="number"
          onChange={(e) => setRent(e.target.value)}
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
      </Grid>
      {/* ==================== METER_READING ==================================== */}

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Typography
          sx={
            darkMode
              ? [theme.lightText, { mb: 1, mt: 2, fontSize: 12 }]
              : [theme.darkText, { mb: 1, mt: 2, fontSize: 12 }]
          }
        >
          Ebill :
        </Typography>
        <TextField
          // placeholder={dues.eBills.reading}
          placeholder={`previous reading :${dues?.eBills?.reading}`}
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
          }}
          type="number"
          onChange={(e) => setReading(e.target.value)}
        />
      </Grid>
      {/* ==================== DURATION ==================================== */}

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{}}>
        <Typography
          sx={
            darkMode
              ? [theme.lightText, { mb: 1, mt: 2, fontSize: 12 }]
              : [theme.darkText, { mb: 1, mt: 2, fontSize: 12 }]
          }
        >
          Duration
        </Typography>
        <input
          type="month"
          onChange={(e) => {
            setDuration(e.target.value);
          }}
          style={{
            // border: 0,
            border: darkMode ? "1px solid white" : "1px solid gray",
            padding: 12,
            borderRadius: 8,
            backgroundColor: "transparent",
            width: 230,
          }}
        />
      </Grid>
      {/* ==================== MODE ==================================== */}

      {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{}}>
        <Typography sx={{ mb: 2 }}>Mode</Typography>
        <Typography
          sx={{ mb: 2, cursor: "pointer" }}
          onClick={() => setOpen(true)}
        >
          Mode
        </Typography>
      </Grid> */}
      {/* ==================== UPDATE ==================================== */}

      <Grid item xs={12} sm={12} md={12} lg={12} xl={6} sx={{}}>
        <Button
          onClick={() => {
            axios
              .post(`${ADMIN_URL}/user/rent/${router.query.id}`, {
                rent: Number(rent),
                year: duration?.split("-")[0],
                month: duration?.split("-")[1],
                rentCycle: cycle ? cycle : dues?.rentCycle,
                reading: Number(reading),
                initialReading: props.user.meterReading,
                collectedBy: collectedBy ? collectedBy : admin.name,
                transactionId: transactionId ? transactionId : "transactionId",
              })
              .then((res) =>
                Swal.fire("Rent updated !", "Rent updated", "success")
              )
              .catch((e) =>
                Swal.fire("Ooops !", e.response.data.message, "error")
              );
          }}
          sx={[
            theme.primaryBtn,
            {
              mt: 5,
              [theme.breakpoints.down("sm")]: {
                width: 240,
              },
              [theme.breakpoints.up("sm")]: {
                width: 540,
                ml: 25,
              },
            },
          ]}
        >
          Update
        </Button>
      </Grid>
    </>
  );
}
