import {
    Grid,
    TextField,
    Typography,
    Button,
    Avatar,
    Box,
    Modal,
    Backdrop,
    Fade,
    Slide,
    FormLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { getUserById } from "../api/user";
  import { useRouter } from "next/router";
  import React from "react";
  import axios from "axios";
  import { ADMIN_URL } from "../constants/url";
  import { useQuery, useMutation } from "@tanstack/react-query";
  import { useFormik } from "formik";
  import Loading from "./loading";
  import PedalBikeIcon from "@mui/icons-material/PedalBike";
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
  
  const months = ["January", "Feburary", "March"];
  const years = [2021, 2022, 2023];
  
  //============================================
  export default function EbillShow(props) {
    //=============================
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //=========================================
  
    const patch = useMutation({
      // mutationFn: login,
      onSuccess: (res) => {
        return Swal.fire(
          "Logged in !",
          "Continue with the OFS Admin Panel",
          "success"
        ).then(() => router.push("/admin/home"));
      },
      onError: (err) =>
        // console.log("ERROr ---",err)
        Swal.fire("Error !", err.message, "error"),
    });
  
    const patchForm = useFormik({
      initialValues: {
        rent: 0,
        month: "",
        year: 0,
      },
      // validationSchema: adminLoginValidation,
      onSubmit: (values) => {
        patch.mutate(values);
      },
    });
  
    //   const query = useQuery({
    //     queryKey: ["getRentById"],
    //     queryFn: () =>
    //       axios.post(`${ADMIN_URL}/user/get-rent/${props.rentId}`, {
    //         userId: props.userId,
    //       }),
    //     onSuccess: (res) => {patchForm.setValues(res.data.rent),
    //      console.log("<<>>>", res.data.rent)}
    //   });
  
    // if(query.isLoading) return <Loading/>
  
    // if(!query.isLoading){
    //   console.log("---->",query.data.data.rent)
    // }
  
    //========================================
  
    return (
      <>
        {/* ============== UPDATE_MODAL_FORM =====================================  */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 50,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <form onSubmit={patchForm.handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Edit Rent
                  </Typography>
                  <FormLabel>Rent</FormLabel>
                  <TextField
                    id="rent"
                    name="rent"
                    size="small"
                    type="number"
                    variant="standard"
                    value={patchForm.values.rent}
                    onChange={patchForm.handleChange}
                  />{" "}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ mb: 2 }}>Month</Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">month</InputLabel>
                    <Select
                      id="month"
                      name="month"
                      defaultValue={patchForm.values.month}
                      label="months"
                      onChange={patchForm.handleChange}
                    >
                      {months.map((x) => (
                        <MenuItem key={x} value={x}>{x}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>{" "}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">year</InputLabel>
                    <Select
                      id="year"
                      name="year"
                      type="number"
                      defaultValue={patchForm.values.year}
                      label="year"
                      onChange={patchForm.handleChange}
                    >
                      {years.map((x) => (
                        <MenuItem   key={x} value={x}>{x}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>{" "}
                </Box>
                <Button
                  onClick={() => {
                    // console.log("FORM -->", props.rentId);
                    // console.log("FORM -->", patchForm.values);
                    axios.patch(`${ADMIN_URL}/user/rent/${props.rentId}`, {
                      data: patchForm.values,
                      userId: props.userId,
                    });
                  }}
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
              </form>
            </Box>
          </Fade>
        </Modal>
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
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} sx={{}}>
            <Box sx={{ display: "flex" }}>
              <Tooltip title={props.rentCycle}>
                <PedalBikeIcon sx={{ color: "gray", fontSize: "18px", mr: 1 }} />
              </Tooltip>
              <Typography>Meter Reading</Typography>
            </Box>
            {/* <Tooltip title={props.year}> */}
              <Typography
                sx={{
                  color: "white",
                  backgroundColor: "#4682B4",
                  borderRadius: 1,
                  width: "fit-content",
                  p: "2px 51px",
                }}
              >
                {props.reading ? props.reading : "xxx"}
              </Typography>
            {/* </Tooltip> */}
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} sx={{}}>
            <Typography>Total</Typography>
            <Typography> <span style={{fontWeight:"bold"}}>₹</span> {props.total ? props.total : "₹ x,xxx"}</Typography>
          </Grid>
         
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} sx={{}}>
            <Typography>UpdateRent</Typography>
            <Button
              // onClick={handleOpen}
              onClick={() => {
                setOpen(true);
                // console.log('--->',props.rentId)
  
                axios
                  .post(`${ADMIN_URL}/user/get-rent/${props.rentId}`, {
                    userId: props.userId,
                  })
                  .then((res) => {
                    console.log("<<---", res.data.rent),
                      patchForm.setValues(res.data.rent);
                  });
              }}
              sx={{
                backgroundColor: "white",
                color: "gray",
                fontWeight: "bold",
                border: "2px solid gray",
              }}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
  