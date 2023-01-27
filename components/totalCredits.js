import { Grid, Typography, Tooltip, Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import dayjs from "dayjs";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useTheme } from "@mui/system";
import { useDarkMode } from "../context/darkMode";
import PedalBikeIcon from "@mui/icons-material/PedalBike";

//============================================
export default function TotalCredits(props) {
  const theme = useTheme();
  const { darkMode } = useDarkMode();
  // console.log("=============", props.editedRents);
  //========================================
  return (
    <>
      {/* ============================================= */}
      <Grid
        container
        sx={{
          width: "90%",
          boxShadow: "0px 2px 3px 0px grey",
          backgroundColor: darkMode ? "#2c2f33" : "white",
          borderRadius: "8px",
          p: 2,
          mb: 2,
          [theme.breakpoints.up("sm")]: {
            ml: 5,
          },
          [theme.breakpoints.down("sm")]: {
            ml: 7,
          },
        }}
      >
        {/* ====================== MONTH ============================ */}

        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
          <Box sx={{ display: "flex" }}>
            {/* <Tooltip title={props.time}>
              <PedalBikeIcon sx={{ color: "gray", fontSize: "18px", mr: 1 }} />
            </Tooltip> */}
            <Typography
              sx={
                darkMode
                  ? [theme.lightText, { color: "gray" }]
                  : [theme.darkText, { color: "gray" }]
              }
            >
              {" "}
              Month
            </Typography>
          </Box>
          <Tooltip title={props.year}>
            <Typography
              sx={{
                color: "white",
                backgroundColor: "#4682B4",
                borderRadius: 1,
                width: "fit-content",
                // p: "2px 51px",
                p: 1,
                fontWeight: "bolder",
              }}
            >
              {dayjs(props.time).format("DD MM YYYY").split(" ")[1]}/{" "}
              {dayjs(props.time).format("DD MM YYYY").split(" ")[2]}
            </Typography>
          </Tooltip>
        </Grid>

        {/* ====================== RENT ============================ */}

        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
          <Typography
            sx={
              darkMode
                ? [theme.lightText, { color: "gray" }]
                : [theme.darkText, { color: "gray" }]
            }
          >
            Rent received
          </Typography>
          <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
            {" "}
            {/* {props.rent ? props.rent : "₹ x,xxx"} */}
            {props.rentCollected}
          </Typography>
        </Grid>

        {/* ====================== DUE_RENT ============================ */}

        {/* <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
          <Typography
            sx={
              darkMode
                ? [theme.lightText, { color: "gray" }]
                : [theme.darkText, { color: "gray" }]
            }
          >
            Rent received
          </Typography>
          <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
            {" "}
            {props.rentDue}
          </Typography>
        </Grid> */}
        {/* ====================== DUE_EBILL ============================ */}

        <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
          <Typography
            sx={
              darkMode
                ? [theme.lightText, { color: "gray" }]
                : [theme.darkText, { color: "gray" }]
            }
          >
            Ebill received
          </Typography>
          <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
            {" "}
            {props.ebillCollected}
          </Typography>
        </Grid>
        {/* ====================== STATUS ============================ */}

        {/* <Grid item xs={12} sm={2} md={2} lg={2} xl={2} sx={{}}>
            <Typography
              sx={
                darkMode
                  ? [theme.lightText, { color: "gray" }]
                  : [theme.darkText, { color: "gray" }]
              }
            >
              Total
            </Typography>
            <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
              {"- "}
              {Math.abs(props?.total)}
            </Typography>
          </Grid> */}
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
          <Typography
            sx={
              darkMode
                ? [theme.lightText, { color: "gray" }]
                : [theme.darkText, { color: "gray" }]
            }
          >
            Mode
          </Typography>
          <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
            By{" "}
            <span style={{ fontWeight: "bolder" }}>
              {props?.mode?.collectedBy}{" "}
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
              <MonetizationOnIcon sx={{ color: "#57f287", ml: 2 }} />
            ) : (
              <Tooltip title={props?.mode?.transactionId}>
                <QrCodeIcon sx={{ ml: 2, color: "gray" }} />
              </Tooltip>
            )}
          </Typography>
        </Grid>
        {/* ====================== UPDATE ============================ */}
      </Grid>
    </>
  );
}
