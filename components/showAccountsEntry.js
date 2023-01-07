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
} from "@mui/material";
//==============================
export default function ShowAccountsEntry() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        boxShadow: "0px 1px 2px 0px grey",
        // backgroundColor:"wheat",
        // width: "200%",
        p: 2,
        borderRadius: 1,
        mt:2
      }}
    >
      <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
        <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
          Heads
        </Typography>
        <Typography
          sx={{
            fontWeight: "bolder",
            color: "white",
            backgroundColor: "#c62828",
            p: 1,
            borderRadius: 1,
            textAlign: "center",
          }}
        >
          Rental
        </Typography>{" "}
      </Grid>

      <Grid
        item
        xl={3}
        lg={3}
        md={3}
        sm={12}
        xs={12}
        // sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
          Credit
        </Typography>
        <Typography sx={{ fontWeight: "bolder", color: "black" }}>
          ₹ 5,547
        </Typography>{" "}
      </Grid>

      <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
        <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
          Debit
        </Typography>
        <Typography sx={{ fontWeight: "bolder", color: "black" }}>
          ₹ 5,547
        </Typography>{" "}
      </Grid>

      <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
        <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
          Status
        </Typography>
        <Typography
          sx={{
            fontWeight: "bolder",
            color: "white",
            backgroundColor: "green",
            p: 1,
            borderRadius: 1,
            textAlign: "center",
          }}
        >
          {" "}
          Cleared
        </Typography>{" "}
      </Grid>
    </Grid>
  );
}
