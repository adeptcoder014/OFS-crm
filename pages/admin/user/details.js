import DashboardLayout from "../../../components/layout/dashboard-layout";
import {
  Grid,
  Typography,
  Box,
  Container,
  Avatar,
  Divider,
  TextField,
  Dialog,
  Badge,
  Tooltip,
} from "@mui/material";
import { getUserById } from "../../../api/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Loading from "../../../components/loading";
import dayjs from "dayjs";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTheme } from "@mui/system";
import { useDarkMode } from "../../../context/darkMode";
//========================================
export default function UserDetails() {
  //============
  const [open, setOpen] = useState(false);
  const [openEbill, setOpenEbill] = useState(false);
  const [search, setSearch] = useState("");
  const [ebill, setEbill] = useState("");
  const theme = useTheme();
  const { darkMode } = useDarkMode();
  //============================
  const router = useRouter();

  const query = useQuery({
    queryKey: ["userById", router.query.id],
    queryFn: () => getUserById(router.query.id),
    enabled: !!router.query.id,
  });

  if (query.isLoading) {
    return <Loading />;
  }

  console.log(query?.data?.data?.dues.rents);
  //=======================================

  return (
    <>
      {/* ======= RENT_DIALOGUE =============== */}
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
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: "bolder" }}>Search rents</Typography>
          <TextField
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ mb: 2 }}
          />
        </Box>
        {query?.data?.data?.dues?.rents?.map((x) => {
          if (x?.month?.startsWith(search)) {
            return (
              <Box
                key={x}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "space-between",
                  boxShadow: "0px 2px 3px 0px grey",
                  background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                  p: 2,
                  mb: 1,
                  borderRadius: "8px",
                  width: "350px",
                  m: "10px 25px ",
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
                    Installments
                  </Typography>
                  <Typography sx={{ fontWeight: "bolder" }}>
                    {x.month}/{x.year}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{ fontWeight: "bolder", color: "gray", mr: 2 }}
                  >
                    Rent
                  </Typography>

                  <Tooltip title={x.due.rentDue}>
                    <Typography
                      sx={{
                        fontWeight: "bolder",
                        backgroundColor: x.status === "PAID" ? "green" : "red",
                        color: "white",
                        textAlign: "center",
                        borderRadius: 1,
                      }}
                    >
                      {x.rent}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>
            );
          }
        })}
        {/* </Box> */}
      </Dialog>{" "}
      {/* =========================== */}
      {/* ======= EBILL_DIALOGUE =============== */}
      <Dialog
        scroll="body"
        open={openEbill}
        closeAfterTransition
        onClose={() => setOpenEbill(false)}
        sx={{
          mt: 5,
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: "bolder" }}>Search ebills</Typography>
          <TextField
            onChange={(e) => setEbill(e.target.value)}
            size="small"
            sx={{ mb: 2 }}
          />
        </Box>
        {query?.data?.data?.dues?.rents?.map((x) => {
          if (x?.month?.startsWith(ebill)) {
            return (
              <Box
                key={x}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "space-between",
                  boxShadow: "0px 2px 3px 0px grey",
                  background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
                  p: 2,
                  mb: 1,
                  borderRadius: "8px",
                  width: "350px",
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
                    Installments
                  </Typography>
                  <Typography sx={{ fontWeight: "bolder" }}>
                    {x.month}/{x.year}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{ fontWeight: "bolder", color: "gray", mr: 2 }}
                  >
                    Reading
                  </Typography>

                  <Tooltip title={x.due.ebillDue}>
                    <Typography
                      sx={{
                        fontWeight: "bolder",
                        // backgroundColor: x.status === "PAID" ? "green" : "red",
                        // color: "white",
                        textAlign: "center",
                        borderRadius: 1,
                      }}
                    >
                      {x.eBills.reading}
                    </Typography>
                  </Tooltip>
                </Box>

                <Box>
                  <Typography
                    sx={{ fontWeight: "bolder", color: "gray", mr: 2 }}
                  >
                    Ebill Due
                  </Typography>

                  <Tooltip title={x.due.ebillDue}>
                    <Typography
                      sx={{
                        fontWeight: "bolder",
                        backgroundColor: x.status === "PAID" ? "green" : "red",
                        color: "white",
                        textAlign: "center",
                        borderRadius: 1,
                      }}
                    >
                      {x.due.ebillDue}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>
            );
          }
        })}
        {/* </Box> */}
      </Dialog>{" "}
      {/* =========================== */}
      <Container
        maxWidth=""
        sx={{ ml: 5, backgroundColor: darkMode ? "#23272a" : "white" ,
        [theme.breakpoints.up("sm")]: {
          ml: -2,
          // width: "140vw",
        },
      }}
      >
        {/* ------------------- GENERAL_INFORMATION ------------------------------- */}

        <Typography
          variant="h5"
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
          General Information
        </Typography>

        <Grid
          container
          sx={{
            ml: -5,
            display: "flex",
            boxShadow: "0px 2px 3px 0px grey",
            backgroundColor: darkMode ? "#2c2f33" : "white",
            p: 3,
            borderRadius: "8px",
            [theme.breakpoints.up("sm")]: {
              ml: 2,
              width: "70%",
            },
            [theme.breakpoints.down("sm")]: {
              ml: 2,
              // width:"70%"
            },
          }}
        >
          <Grid
            item
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
            }}
          >
            <Avatar sx={{ mr: 1, fontSize: 5 }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
                {query?.data?.data.name}
              </Typography>
              <Typography
                sx={
                  darkMode
                    ? [theme.lightText, { fontSize: 12 }]
                    : [theme.darkText, { fontSize: 12 }]
                }
              >
                {query?.data?.data.email}
              </Typography>
              <Typography
                sx={
                  darkMode
                    ? [theme.lightText, { fontSize: 12 }]
                    : [theme.darkText, { fontSize: 12 }]
                }
              >
                {query?.data?.data.phone}
              </Typography>
            </Box>
          </Grid>
          {/* ------------------------------------------ */}

          <Grid
            item
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Box sx={{}}>
              <Typography
                sx={{
                  p: 1,
                  backgroundColor:
                    query?.data?.data.status === "NEW" ? "red" : "#22BB33",
                  // width: "20%",
                  textAlign: "center",
                  fontWeight: "bolder",
                  borderRadius: "8px",

                  color: "white",
                }}
              >
                {query?.data?.data.status}
              </Typography>
              <Typography
                sx={
                  darkMode
                    ? [theme.lightText, { fontSize: 12 }]
                    : [theme.darkText, { fontSize: 12 }]
                }
              >
                Registered on :{" "}
                {dayjs(query?.data?.data.registeredDate).format("DD MMM-YYYY")}
              </Typography>
            </Box>
          </Grid>
          {/* ------------------------------------------ */}
        </Grid>
        {/* ----------------- HOSTEL_INFORMATION --------------------------------- */}
        <Typography
          variant="h5"
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
          Stay Information
        </Typography>
        <Grid
          container
          sx={{
            ml: -5,
            display: "flex",
            boxShadow: "0px 2px 3px 0px grey",
            backgroundColor: darkMode ? "#2c2f33" : "white",
            p: 1,
            borderRadius: "8px",
            [theme.breakpoints.up("sm")]: {
              ml: 2,
              width: "70%",
            },
            [theme.breakpoints.down("sm")]: {
              ml: 2,
              // width:"70%"
            },
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              
            }}
          >
            {/* <Box sx={{ display: "flex" }}> */}
            <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
              Room Number :
            </Typography>

            {/* </Box> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            <TextField
             sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "white" : "gray",
                },
              },
              "& .MuiInputBase-root": {
                color: darkMode ? "white" : "gray",
              },
              [theme.breakpoints.down("sm")]: {
                width: "80%",
               
              },
            }}
              InputProps={{
                inputProps: {
                  style: { textAlign: "left" },
                },
              }}
              variant="outlined"
              size="small"
              defaultValue={query?.data?.data.room}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            {/* <Box sx={{ display: "flex" }}> */}
            <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
              Room Preference :
            </Typography>

            {/* </Box> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            <TextField
             sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "white" : "gray",
                },
              },
              "& .MuiInputBase-root": {
                color: darkMode ? "white" : "gray",
              },
              [theme.breakpoints.down("sm")]: {
                width: "80%",
                
              },
            }}
              InputProps={{
                inputProps: {
                  style: { textAlign: "left" },
                },
              }}
              variant="outlined"
              size="small"
              defaultValue={query?.data?.data.roomPreference}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            {/* <Box sx={{ display: "flex" }}> */}
            <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
              Joining Date :
            </Typography>

            {/* </Box> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
            }}
          >
            <TextField
              InputProps={{
                inputProps: {
                  style: { textAlign: "left" },
                },
              }}
              variant="outlined"
              size="small"
              defaultValue={dayjs(query?.data?.data.joiningDate).format(
                "DD-MMM-YYYY"
              )}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "white" : "gray",
                  },
                },
                "& .MuiInputBase-root": {
                  color: darkMode ? "white" : "gray",
                },
                [theme.breakpoints.down("sm")]: {
                  width: "80%",
                
                },
              }}
            />
          </Grid>
        </Grid>

        {/* ------------ DUES_INFORMATION ------------------------------ */}
        <Typography
          variant="h5"
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
          Due(s) Information
        </Typography>
        <Grid
          maxWidth="sm"
          container
          sx={{
            ml: -5,
            display: "flex",
            boxShadow: "0px 2px 3px 0px grey",
            backgroundColor: darkMode ? "#2c2f33" : "white",
            p: 1,
            borderRadius: "8px",
            mb: 2,
            [theme.breakpoints.up("sm")]: {
              ml: 2,
              width: "70%",
            },
            [theme.breakpoints.down("sm")]: {
              ml: 2,
              // width:"70%"
            },
          }}
        >
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "start",

              p: 1,
            }}
          >
            <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
              Rent :
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
            }}
          >
            <TextField
              InputProps={{
                inputProps: {
                  style: {
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#28282B",
                  },
                },
              }}
              variant="outlined"
              size="small"
              defaultValue={query?.data?.data?.dues?.rents?.at(-1)?.rent}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "white" : "gray",
                  },
                },
                "& .MuiInputBase-root": {
                  color: darkMode ? "white" : "gray",
                },
                [theme.breakpoints.down("sm")]: {
                  width: "80%",
                  ml: 8,
                },
              }}
            />{" "}
            <MoreVertIcon
              onClick={() => setOpen(true)}
              sx={{
                color: "gray",
                m: 1,
                cursor: "pointer",
              }}
            />
          </Grid>

          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "start",

              p: 1,
            }}
          >
            <Typography sx={darkMode ? [theme.lightText] : [theme.darkText]}>
              E-Bills :
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
            }}
          >
            <TextField
              InputProps={{
                inputProps: {
                  style: {
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#28282B",
                  },
                },
              }}
              variant="outlined"
              size="small"
              defaultValue={
                query?.data?.data?.dues?.rents?.at(-1)?.due?.ebillDue
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "white" : "gray",
                  },
                },
                "& .MuiInputBase-root": {
                  color: darkMode ? "white" : "gray",
                },
              }}
            />{" "}
            <MoreVertIcon
              onClick={() => setOpenEbill(true)}
              sx={{
                color: "gray",
                m: 1,
                cursor: "pointer",
              }}
            />
          </Grid>

          {/* <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "start",

              p: 1,
            }}
          >
            <Typography
              sx={{ fontWeight: 600, color: "gray", fontSize: "20px" }}
            >
              Misc. :
            </Typography>
          </Grid> */}
          {/* <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
            }}
          >
            <TextField
              InputProps={{
                inputProps: {
                  style: {
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#28282B",
                  },
                },
              }}
              variant="outlined"
              size="small"
              defaultValue="8508"
            />{" "}
          </Grid> */}
        </Grid>

        {/* ------------ GENERAL_NOTICE ------------------------------ */}
      </Container>
    </>
  );
}
UserDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
