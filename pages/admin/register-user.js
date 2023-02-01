import DashboardLayout from "../../components/layout/dashboard-layout";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getUserById } from "../../api/user";
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  FormLabel,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
  Tooltip,
  Dialog,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Loading from "../../components/loading";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import LuggageIcon from "@mui/icons-material/Luggage";
import ElectricMeterIcon from "@mui/icons-material/ElectricMeter";
import DiscountIcon from "@mui/icons-material/Discount";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import CommentIcon from "@mui/icons-material/Comment";
import { useFormik } from "formik";
import { approvalValidation } from "../../validation/approval";
import { approval } from "../../api/approval";
import { Query, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRentController } from "../../controller/rental";
import { useState } from "react";
import { ADMIN_URL } from "../../constants/url";
import MailIcon from "@mui/icons-material/Mail";
import { useTheme } from "@mui/system";
import { useDarkMode } from "../../context/darkMode";
import DownloadIcon from "@mui/icons-material/Download";
import axiosInstance from "../../api/axios";
import SecurityIcon from "@mui/icons-material/Security";
//============================================================================

export default function RegisterUser() {
  const [open, setOpen] = useState(false);
  const [idImage, setIdImage] = useState("");
  const theme = useTheme();
  const { darkMode } = useDarkMode();

  //============================================
  const { rentQuery } = useRentController();
  const router = useRouter();

  const query = useQuery({
    queryKey: ["userById", router.query.id],
    queryFn: () => getUserById(router.query.id),
    onSuccess: (res) =>
      // console.log(res.data.registeredDate),
      patchForm.setValues(res.data),
    enabled: !!router.query.id,
  });




  const patchForm = useFormik({
    initialValues: {
      room: 0,
      meterReading: 0,
      // discount: 0,
      security: 0,
      // remark: "",
      joiningDate: "",
      // dues: {
      //   rents: [
      //     rentCycle:
      //   ]
      // },

      // dues: "",
    },
    validationSchema: approvalValidation,
    onSubmit: (values) => {
      console.log("values---", values);

      patch.mutate({ data: values, id: router.query.id });
    },
  });
  //------------------- ADD -------------------------------------

  const patch = useMutation({
    mutationFn: approval,
    onSuccess: (res) =>
      Swal.fire("Registration Done ", "User is registered ", "success").then(
        () => router.push("/admin/home")
      ),
    onError: (err) => Swal.fire("Error !", err.response.data, "error"),
  });

  //==================================
  if (query.isLoading) {
    return <Loading />;
  }

console.log("Error --",patchForm.errors)

  if (rentQuery.isLoading) {
    return <Loading />;
  }

  const handleClose = () => {
    setOpen(false);
  };
  //=====================================================
  return (
    <>
      <Dialog
        scroll="paper"
        open={open}
        closeAfterTransition
        onClose={handleClose}
      >
        <Box>
          <img
            src={`${ADMIN_URL}/${query?.data?.data?.photo}`}
            style={{
              border: "1px dashed gray",
              // maxWidth: "-webkit-fill-available",
            }}
          />
        </Box>
      </Dialog>
      <Box
        sx={{
          backgroundColor: darkMode ? "#23272a" : "white",
          [theme.breakpoints.down("sm")]: {
            width: "100vw",

            ml: -3,
          },
          [theme.breakpoints.up("sm")]: {
            ml: -3,
          },
        }}
      >
        <Typography
          variant="h4"
          sx={
            darkMode ? [theme.lightText, { m: 7 }] : [theme.darkText, { m: 7 }]
          }
        >
          User details
        </Typography>
        <Container
          // maxWidth="lg"
          sx={{
            mt: 1,
            backgroundColor: darkMode ? "#2c2f33" : "white",
            boxShadow: "0px 3px 3px 0px #b1cdb1",
            borderRadius: "6px",
            p: 5,
            [theme.breakpoints.down("sm")]: {},
          }}
        >
          {/*============================= */}
          <Grid container>
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
              }}
            >
              <Box
                sx={{ mb: 2 }}
                item
                xl={1}
                lg={1}
                md={4}
                xs={12}
                onClick={() => setOpen(true)}
              >
                <img
                  src={`${ADMIN_URL}/${query?.data?.data?.photo}`}
                  style={{
                    border: "1px dashed gray",
                    width: 280,
                    height: 150,

                    // maxWidth: "-webkit-fill-available",
                  }}
                />{" "}
              </Box>
              <DownloadIcon
                sx={{
                  color: darkMode ? "white" : "gray",
                  cursor: "pointer",
                }}
                onClick={() => {
                  axiosInstance
                    .post(
                      `/user/get-imageId?file=${
                        query?.data?.data?.photo.split("uploads\\")[1]
                      }`
                    )
                    .then((res) => {
                      console.log(res);
                      var blob = res.data;
                      var a = document.createElement("a");
                      a.href = URL.createObjectURL(new Blob(blob));
                      a.download = fileURL;
                      a.click();
                    });
                }}
              />
            </Grid>
            {/* //------------------------- */}
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <Box
                item
                xl={6}
                lg={6}
                md={4}
                xs={12}
                sx={{ flexBasis: "350px" }}
              >
                <Box sx={{ display: "flex" }}>
                  <Typography
                    sx={
                      darkMode
                        ? [
                            theme.lightText,
                            {
                              mr: 2,
                              [theme.breakpoints.down("sm")]: {
                                fontSize: 13,
                              },
                              color: "gray",
                            },
                          ]
                        : [
                            theme.darkText,
                            {
                              mr: 2,
                              [theme.breakpoints.down("sm")]: {
                                fontSize: 13,
                              },
                              color: "gray",
                            },
                          ]
                    }
                  >
                    Name
                  </Typography>{" "}
                  <Typography
                    sx={
                      darkMode
                        ? [
                            theme.lightText,
                            {
                              [theme.breakpoints.down("sm")]: {
                                fontSize: 13,
                              },
                            },
                          ]
                        : [
                            theme.darkText,
                            {
                              [theme.breakpoints.down("sm")]: {
                                fontSize: 13,
                              },
                            },
                          ]
                    }
                  >
                    {query?.data?.data?.name}{" "}
                    {query?.data?.data?.zodiac?.symbol}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  {/* <MailIcon sx={{}} /> */}
                  <Typography
                    sx={
                      darkMode
                        ? [
                            theme.lightText,
                            {
                              mr: 2,
                              [theme.breakpoints.down("sm")]: {
                                fontSize: 13,
                              },
                              color: "gray",
                            },
                          ]
                        : [
                            theme.darkText,
                            {
                              mr: 2,
                              [theme.breakpoints.down("sm")]: {
                                fontSize: 13,
                              },
                              color: "gray",
                            },
                          ]
                    }
                  >
                    Email
                  </Typography>{" "}
                  <Typography
                    sx={
                      darkMode
                        ? [
                            theme.lightText,
                            {
                              mr: 2,
                              [theme.breakpoints.down("sm")]: {
                                fontSize: 13,
                              },
                            },
                          ]
                        : [
                            theme.darkText,
                            {
                              mr: 2,
                              [theme.breakpoints.down("sm")]: {
                                fontSize: 13,
                              },
                            },
                          ]
                    }
                  >
                    {query?.data?.data?.email}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography
                    sx={
                      darkMode
                        ? [
                            theme.lightText,
                            {
                              mr: 2,
                              [theme.breakpoints.down("sm")]: {
                                fontSize: 13,
                              },
                              color: "gray",
                            },
                          ]
                        : [
                            theme.darkText,
                            {
                              mr: 2,
                              [theme.breakpoints.down("sm")]: {
                                fontSize: 13,
                              },
                              color: "gray",
                            },
                          ]
                    }
                  >
                    Phone
                  </Typography>{" "}
                  <Typography
                    sx={
                      darkMode
                        ? [
                            theme.lightText,
                            {
                              mr: 2,
                              [theme.breakpoints.down("sm")]: {
                                fontSize: 13,
                              },
                            },
                          ]
                        : [
                            theme.darkText,
                            {
                              mr: 2,
                              [theme.breakpoints.down("sm")]: {
                                fontSize: 13,
                              },
                            },
                          ]
                    }
                  >
                    {query?.data?.data?.phone}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* //------------------------- */}
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              {query?.data?.data?.roomPreference === "double" ? (
                <>
                  <Tooltip title="*room preference">
                    <BedroomParentIcon
                      sx={{
                        backgroundColor: "gray",
                        color: "white",
                        borderRadius: "3px",
                        fontSize: 45,
                        mt: 2,
                      }}
                    />
                  </Tooltip>
                </>
              ) : (
                <>
                  <BedroomParentIcon
                    sx={{
                      backgroundColor: "gray",
                      color: "white",
                      borderRadius: "3px",
                      fontSize: 45,
                      mt: 2,
                    }}
                  />
                  <BedroomChildIcon
                    sx={{
                      backgroundColor: "gray",
                      color: "white",
                      borderRadius: "3px",
                      fontSize: 45,
                    }}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </Container>

        {/* ===================== FORM ================================== */}

        <Container
          maxWidth="lg"
          sx={{
            mt: 5,
            backgroundColor: darkMode ? "#2c2f33" : "white",
            boxShadow: "0px 3px 3px 0px #b1cdb1",
            borderRadius: "6px",
            p: 5,
            [theme.breakpoints.down("sm")]: {
              width: "80%",
            },
          }}
        >
          <form onSubmit={patchForm.handleSubmit}>
            {" "}
            <Typography
              variant="h4"
              sx={
                darkMode
                  ? [
                      theme.lightText,
                      {
                        m: 7,
                        [theme.breakpoints.down("sm")]: {
                          fontSize: 24,
                          width: "100%",
                          ml: -1,
                        },
                      },
                    ]
                  : [
                      theme.darkText,
                      {
                        m: 7,
                        [theme.breakpoints.down("sm")]: {
                          fontSize: 24,
                          width: "100%",
                          ml: -1,
                        },
                      },
                    ]
              }
            >
              {" "}
              Assign User Information
            </Typography>
            <Grid
              container
              sx={{ width: "100%", mt: 5, display: "flex", p: 0 }}
            >
              <Grid
                className="responsive"
                item
                md={6}
                xs={12}
                sx={{ display: "flex", flexDirection: "column", mb: 5 }}
              >
                <FormLabel
                  sx={
                    darkMode
                      ? [theme.lightText, { mb: 2 }]
                      : [theme.darkText, { mb: 2 }]
                  }
                >
                  Room Number
                </FormLabel>
                <TextField
                placeholder="room number..."
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
                  error={
                    patchForm.touched.room && Boolean(patchForm.errors.room)
                  }
                  helperText={patchForm.touched.room && patchForm.errors.room}
                  id="room"
                  type="number"
                  name="room"
                  // value={patchForm?.values?.room}
                  onChange={patchForm.handleChange}
                  size="small"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LuggageIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid
                className="responsive"
                item
                md={6}
                xs={12}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <FormLabel
                  sx={
                    darkMode
                      ? [theme.lightText, { mb: 2 }]
                      : [theme.darkText, { mb: 2 }]
                  }
                >
                  Electricity Meter Reading{" "}
                </FormLabel>
                <TextField
                  placeholder="0"
                  error={
                    patchForm.touched.meterReading &&
                    Boolean(patchForm.errors.meterReading)
                  }
                  helperText={
                    patchForm.touched.meterReading &&
                    patchForm.errors.meterReading
                  }
                  id="meterReading"
                  name="meterReading"
                  type="number"
                  // value={patchForm?.values?.meterReading}
                  onChange={patchForm.handleChange}
                  sx={{
                    [theme.breakpoints.up('sm')]:{

                      width: 500,
                      ml: 5,
                    },
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
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ElectricMeterIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid
                item
                md={6}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  [theme.breakpoints.up("sm")]: {
                    mt: 11,
                  },
                }}
              >
                <FormLabel
                  sx={
                    darkMode
                      ? [theme.lightText, { mb: 2 }]
                      : [theme.darkText, { mb: 2 }]
                  }
                >
                  Joining Date{" "}
                </FormLabel>

                <TextField
                  error={
                    patchForm.touched.joiningDate &&
                    Boolean(patchForm.errors.joiningDate)
                  }
                  helperText={
                    patchForm.touched.joiningDate &&
                    patchForm.errors.joiningDate
                  }
                  id="joiningDate"
                  type="date"
                  name="joiningDate"
                  value={patchForm?.values?.joiningDate.split("T")[0]}
                  onChange={patchForm.handleChange}
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
                  variant="standard"
                />
              </Grid>
              {/* <Grid
                className="responsive"
                item
                md={6}
                xs={12}
                sx={{ display: "flex", flexDirection: "column", mt: 5 }}
              >
                <FormLabel sx={{ mb: 2 }}>security</FormLabel>

                <TextField
                  error={
                    patchForm.touched.discount &&
                    Boolean(patchForm.errors.security)
                  }
                  helperText={
                    patchForm.touched.security && patchForm.errors.security
                  }
                  id="security"
                  name="security"
                  type="number"
                  defaultValue={
                    query?.data?.data?.roomPreference == "double"
                      ? rentQuery?.data?.data?.data[0].doubble
                      : rentQuery?.data?.data?.data[0].tripple
                  }
                  onChange={patchForm.handleChange}
                  sx={{ width: "90%" }}
                  size="small"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GppMaybeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid> */}
              <Grid
                className="responsive"
                item
                md={6}
                xs={12}
                sx={{ display: "flex", flexDirection: "column", mt: 6 }}
              >
                <FormLabel
                  sx={
                    darkMode
                      ? [theme.lightText, { mb: 2, mt: 5 }]
                      : [theme.darkText, { mb: 2, mt: 5 }]
                  }
                >
                  Security
                </FormLabel>
                <TextField
                  error={
                    patchForm.touched.discount &&
                    Boolean(patchForm.errors.security)
                  }
                  helperText={
                    patchForm.touched.security && patchForm.errors.security
                  }
                  id="security"
                  name="security"
                  type="number"
                  defaultValue={
                    query?.data?.data?.roomPreference === "double"
                      ? rentQuery?.data?.data?.data[0].doubble
                      : rentQuery?.data?.data?.data[0].tripple
                  }
                  onChange={patchForm.handleChange}
                  sx={{
                    [theme.breakpoints.up('sm')]:{

                      width: 500,
                      ml: 5,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: darkMode ? "white" : "gray",
                      },
                    },
                    input: {
                      color: darkMode ? "white" : "gray",
                    },
                  }}                  size="small"
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GppMaybeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* <TextField
                  error={
                    patchForm.touched.remark && Boolean(patchForm.errors.remark)
                  }
                  helperText={
                    patchForm.touched.remark && patchForm.errors.remark
                  }
                  id="security"
                  name="security"
                  value={query?.roomPreference}
                  onChange={patchForm.handleChange}
                  sx={{
                    width: 500,
                    ml: 5,
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
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SecurityIcon />
                      </InputAdornment>
                    ),
                  }}
                /> */}
              </Grid>
              <Grid
                sx={{ display: "flex" }}
                item
                xl={6}
                lg={6}
                md={6}
                xs={12}
                sm={12}
              >
                <LoadingButton
                  fullWidth // onClick={() => console.log("xxx----->", router.query.id)}
                  disabled={patch.isLoading}
                  loading={patch.isLoading}
                  type="submit"
                  sx={[
                    theme.primaryBtn,
                    {
                      [theme.breakpoints.up("sm")]: {
                        width: "80%",
                        mt: 5,
                      },
                    },
                  ]}
                >
                  Approve
                </LoadingButton>{" "}
              </Grid>
              <Grid
                sx={{ display: "flex" }}
                item
                xl={6}
                lg={6}
                md={6}
                xs={12}
                sm={12}
              >
                <LoadingButton
                  fullWidth
                  // onClick={() => console.log("xxx----->", router.query.id)}
                  disabled={patch.isLoading}
                  loading={patch.isLoading}
                  type="submit"
                  sx={[
                    theme.primaryBtn,
                    {
                      [theme.breakpoints.up("sm")]: {
                        width: "80%",
                        mt: 5,
                      },

                      [theme.breakpoints.down("sm")]: {
                        mt: 3,
                      },

                      backgroundColor: "#ed4245",
                      "&:hover": {
                        color: "#ed4245",
                        border: "2px solid #ed4245",
                        backgroundColor: "white",
                      },
                    },
                  ]}
                >
                  Disapprove
                </LoadingButton>{" "}
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
}

RegisterUser.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
