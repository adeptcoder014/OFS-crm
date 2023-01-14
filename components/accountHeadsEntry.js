import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Dialog,
} from "@mui/material";
import { useState } from "react";
import axiosInstance from "../api/axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme } from "@mui/system";
import { useDarkMode } from "../context/darkMode";
//=================================
const accountsHeads = [
  {
    name: "Rents",
  },
  {
    name: "Ebills",
  },
  {
    name: "Food",
  },
  {
    name: "Veggies",
  },
  {
    name: "Grocceries",
  },
  {
    name: "Salaries",
  },
  {
    name: "Housekeeping",
  },
  {
    name: "Waterbills",
  },
  {
    name: "Gasbills",
  },
];
//=================================
export default function AccountHeadsEntry() {
  //=============================================
  const [accountHead, setAccountHead] = useState("");

  const [debit, setDebit] = useState();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { darkMode } = useDarkMode();
  //========================================
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
            New head has been created !
          </Typography>
        </Box>
      </Dialog>
      {/* ====================== */}
      <form id="account">
        <Grid
          container
          spacing={2}
          sx={{
            boxShadow: "0px 1px 2px 0px grey",
            backgroundColor: darkMode ? "#2c2f33" : "white",
            // width: "200%",
            p: 2,
            borderRadius: 1,
            [theme.breakpoints.up("sm")]: {
              ml: 5,
            },
            [theme.breakpoints.down("sm")]: {
              // width:"100%"
              ml: 0.1,
              // mt:-5,
              p:4
            },
          }}
        >
          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={12}
            xs={12}
            
          >
            <Typography
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
                      },
                    ]
              }
            >
              Accounts Heads
            </Typography>
            <FormControl
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
              size="small"
              fullWidth
            >
              <Select
                onChange={(e) => {
                  setAccountHead(e.target.value);
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
                  [theme.breakpoints.down("sm")]: {
                    ml: 1,
                    width: 220,
                  },
                }}
              >
                <MenuItem>Choose accounts heads</MenuItem>

                {accountsHeads.map((x) => (
                  <MenuItem key={x.name} value={x.name.toUpperCase()}>
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Typography
              sx={
                darkMode
                  ? [
                      theme.lightText,
                      {
                        [theme.breakpoints.down("sm")]: {
                          fontSize: 16,

                          ml: 2,
                        },
                      },
                    ]
                  : [
                      theme.darkText,
                      {
                        [theme.breakpoints.down("sm")]: {
                          fontSize: 16,

                          ml: 2,
                        },
                      },
                    ]
              }
            >
              {" "}
              Debit
            </Typography>
            <TextField
              type="number"
              onChange={(e) => {
                setDebit(e.target.value);
              }}
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
                [theme.breakpoints.down("sm")]: {
                  ml: 1,
                },
              }}
            />
          </Grid>

          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Typography
              sx={
                darkMode
                  ? [
                      theme.lightText,
                      {
                        [theme.breakpoints.down("sm")]: {
                          fontSize: 16,
                          ml: 2,
                        },
                      },
                    ]
                  : [
                      theme.darkText,
                      {
                        [theme.breakpoints.down("sm")]: {
                          fontSize: 16,
                          ml: 2,
                        },
                      },
                    ]
              }
            >
              {" "}
              Action
            </Typography>
            <Button
              sx={{
                backgroundColor: "white",
                color: "gray",
                p: "10px 45px",
                borderRadius: 1,
                fontWeight: "bolder",
                alignSelf: "center",
                "&:hover": {
                  color: "black",
                  border: "2px solid black",
                  backgroundColor: "white",
                },
                [theme.breakpoints.down("sm")]: {
                  fontSize: 16,
                  ml: 2,
                  width: 220,
                },
              }}
              onClick={() => {
                axiosInstance
                  .post("/account", { accountHead, debit })
                  .then(() => setOpen(true))
                  .finally(() => {
                    document.getElementById("account").reset();
                  });
              }}
            >
              Enter
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
