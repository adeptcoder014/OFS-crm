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
import axiosInstance  from "../api/axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
export default function        AccountHeadsEntry() {
  //=============================================
  const [accountHead, setAccountHead] = useState("");

  const [debit, setDebit] = useState();
  const [open, setOpen] = useState(false);

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
            // backgroundColor:"wheat",
            // width: "200%",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
              Accounts Heads
            </Typography>
            <FormControl size="small" fullWidth>
              <Select
                onChange={(e) => {
                  setAccountHead(e.target.value);
                }}
              >
                <MenuItem>Choose accounts heads</MenuItem>

                {accountsHeads.map((x) => (
                  <MenuItem key={x.name} value={x.name.toUpperCase()}>{x.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

       
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
              Debit
            </Typography>
            <TextField
              type="number"
              onChange={(e) => {
                setDebit(e.target.value);
              }}
              size="small"
            />
          </Grid>

          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
              Action
            </Typography>
            <Button
              sx={{
                backgroundColor: "black",
                color: "white",
                p: "10px 45px",
                borderRadius: 1,
                fontWeight: "bolder",
                alignSelf: "center",
                "&:hover": {
                  color: "black",
                  border: "2px solid black",
                  backgroundColor: "white",
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
