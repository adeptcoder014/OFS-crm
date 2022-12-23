import {
  Grid,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { ADMIN_URL } from "../constants/url";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { getRent } from "../api/rental";
import { getUserById } from "../api/user";
//==================================================


export default function EbillEntry(props) {
  //==========================
  const router = useRouter();

  const [reading, setReading] = useState(0);
  



  //===========================
  useEffect(() => {
    getUserById(router.query.id).then((res) => setMeterReading(res.data.meterReading));
  }, []);
  const [meterReading, setMeterReading] = useState();

  //===========================
  return (
    <>
      <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
        <Typography sx={{ mb: 2 }}>Initial reading</Typography>
        <Box
          sx={{
            backgroundColor:"white",
            width:"fit-content",
            p:"5px 35px",
            borderRadius:"5px",
            fontWeight:"bolder",
            boxShadow: "inset 0px 1px 5px 0px grey",
          }}
          
        >{meterReading}</Box>
      </Grid>
      <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
        <Typography sx={{ mb: 2 }}>Meter Reading</Typography>
        <TextField
          size="small"
          variant="standard"
          type="number"
          onChange={(e) => setReading(e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
        <Typography sx={{ textAlign: "center", mb: 1 }}>Add meter reading</Typography>
        <Button
          onClick={() => {
            axios
              .post(`${ADMIN_URL}/user/ebill/${router.query.id}`, {
                initialReading :meterReading,
                reading: Number(reading),
                
              })
              .then((res) =>
                Swal.fire("Rent updated !", "Rent updated", "success")
              )
              .catch((e) =>
                Swal.fire("Ooops !", e.response, "error")
              );
          }}
          fullWidth
          sx={{
            backgroundColor: "white",
            color: "gray",
            fontWeight: "bold",
            border: "2px solid gray ",
          }}
        >
          Update
        </Button>
      </Grid>
    </>
  );
}
