import {
  Grid,
  Typography,

  Tooltip,
} from "@mui/material";

import { useRouter } from "next/router";
import React from "react";

import dayjs from "dayjs";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import QrCodeIcon from "@mui/icons-material/QrCode";
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
export default function WhoEditedCard(props) {
  const router = useRouter();

  //========================================
  if (router.query.id === props.rentId)
    return (
      <>
        {/* ============================================= */}
        <Grid
          container
          sx={{
            boxShadow: "0px 2px 3px 0px grey",
            background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
            borderRadius: "8px",
            p: 2,
            mb: 2,
          }}
        >
          {/* ====================== MONTH ============================ */}

          {/* <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
            <Box sx={{ display: "flex" }}>
              <Tooltip title={props.rentCycle}>
                <PedalBikeIcon sx={{ color: "gray", fontSize: "18px", mr: 1 }} />
              </Tooltip>
              <Typography>Month</Typography>
            </Box>
            <Tooltip title={props.year}>
              <Typography
                sx={{
                  color: "white",
                  backgroundColor: "#4682B4",
                  borderRadius: 1,
                  width: "fit-content",
                  p: "2px 51px",
                }}
              >
                {props.month ? props.month : "month"}
              </Typography>
            </Tooltip>
          </Grid> */}

          {/* ====================== RENT ============================ */}

          <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
            <Typography>Rent</Typography>
            <Typography> {props.rent ? props.rent : "₹ x,xxx"}</Typography>
          </Grid>

          {/* ====================== DUE_RENT ============================ */}

          <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
            <Typography>To be receive</Typography>
            <Typography> {props.rentDue}</Typography>
          </Grid>

          {/* ====================== DUE_eBILL ============================ */}

          <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
            <Typography>Ebill</Typography>
            <Typography> {props.ebillDue}</Typography>
          </Grid>
          {/* ====================== STATUS ============================ */}

          <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
            <Typography>Total</Typography>
            {/* {props.status === "DUE" ? ( */}
            <Typography>
              {"- "}
              {Math.abs(props?.total)}
            </Typography>
            {/* ) : ( */}
          </Grid>
          {/* ====================== MODE ============================ */}

          <Grid
            item
            xs={12}
            sm={2}
            md={2}
            lg={2}
            xl={2}
            sx={{ alignSelf: "center" }}
          >
            <Typography>Mode</Typography>
            <Typography>
              By{" "}
              <span style={{ fontWeight: "bolder" }}>
                {props?.mode?.collectedBy }{" "}
              </span>
              <span>
                @
                {
                  dayjs(props.time)
                    .format("YYYY-MM-DDTHH:mm:ssZ[Z]")
                    .split("T")[1]
                    .split("+")[0]
                    .split(":")[0]
                }
                {":"}
                <span>
                  {
                    dayjs(props.time)
                      .format("YYYY-MM-DDTHH:mm:ssZ[Z]")
                      .split("T")[1]
                      .split("+")[0]
                      .split(":")[1]
                  }
                </span>
              </span>
              {props?.mode?.transactionId === "transactionId" ? (
                <MonetizationOnIcon sx={{ color: "green",ml:2 }} />
              ) : (
                <Tooltip title={props?.mode?.transactionId}>

                  <QrCodeIcon sx={{ml:2,color:"gray"}}/>
                </Tooltip>
              )}
            </Typography>
          </Grid>
          {/* ====================== UPDATE ============================ */}
        </Grid>
      </>
    );
}
