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
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import Loading from "./loading";

//==============================
export default function ShowAccountsEntry() {
  //=======================================
  const query = useQuery({
    queryKey: ["getAccountsHeads"],
    queryFn: () => axiosInstance.get("/account"),
  });

  if (query.isLoading) {
    return <Loading />;
  }

  // console.log();
  //========================================
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
        mt: 2
      }}
    >
      {query.data.data.map((x) => (
        <>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
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
              {x.accountHead}
            </Typography>{" "}
          </Grid>

     

          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Typography sx={{ fontWeight: "bolder", color: "gray",textAlign:"end"  }}>
              Debit
            </Typography>
            <Typography sx={{ fontWeight: "bolder", color: "black",textAlign:"end" }}>
              ₹ {x.debit}
            </Typography>{" "}
          </Grid>

          {/* <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
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
          </Grid> */}
        </>
      ))}
    </Grid>
  );
}
