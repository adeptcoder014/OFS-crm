import {
  Grid,
  Typography,
  Box,
  Container,
  Avatar,
  Divider,
} from "@mui/material";
import DashboardLayout from "../../components/layout/user-layout";
import BedIcon from "@mui/icons-material/Bed";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/user";
import Loading from "../../components/loading";
import OutletIcon from "@mui/icons-material/Outlet";
import dayjs from "dayjs";
//===========================================================
function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
}
//--------------------------------------------------------
export default function Home() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  //---------------------------------------------------
  const router = useRouter();

  const query = useQuery({
    queryKey: ["userById", router.query.id],
    queryFn: () => getUserById(router.query.id),
    enabled: !!router.query.id,
  });

  if (query.isLoading) {
    return <Loading />;
  }
  console.log("--->", query.data.data);
  const user = query.data.data;
  //================================================
  return (
    <Container
      maxWidth="md"
      sx={{ background: "linear-gradient(#dce29f, #c1c54e)"}}
    > 
      {/* ------------------- GENERAL_INFORMATION ------------------------------- */}

      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "gray", mb: 1 }}
      >
        General Information
      </Typography>

      <Grid
        container
        sx={{
          // width:"150%",
          // ml: -5,
          display: "flex",
          // justifyContent: "space-around",
          // alignItems:"space-between",
          boxShadow: "0px 2px 3px 0px grey",
          background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
          p: 1,
          borderRadius: "8px",
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
            // background: "linear-gradient(252deg, #e1e1e1, red)",
          }}
        >
          <Avatar sx={{ mr: 1, fontSize: 5 }} />
          <Box>
            <Typography sx={{ fontWeight: 600, color: "gray" }}>
              {query?.data?.data.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "gray",
                inlineSize: "150px",
                wordWrap: "break-word",
              }}
            >
              {query?.data?.data.email}
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
          <Box
            sx={{
              backgroundColor:
                query?.data?.data.status === "NEW" ? "red" : "#22BB33",
              // width: "20%",
              textAlign: "center",
              fontWeight: "bolder",
              mb: 2,
              color: "white",
              p: 1,
              borderRadius: "8px",
            }}
          >
            {query?.data?.data.status}
          </Box>
        </Grid>
        {/* ------------------------------------------ */}

        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          xl={12}
          // sx={{ }}
        >
          <Typography sx={{ fontWeight: 600, color: "gray", mr: 1, mt: 2 }}>
            Joined on : {dayjs(user.joiningDate).format(`DD/MM/YYYY`)}
          </Typography>
        </Grid>
      </Grid>
      {/* ----------------- HOSTEL_INFORMATION --------------------------------- */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "gray", mb: 1, mt: 5 }}
      >
        Stay Information
      </Typography>
      <Grid
        container
        sx={{
          // width:"150%",
      
          // mt: 5,
          display: "flex",
          // justifyContent: "space-around",
          // alignItems:"space-between",
          boxShadow: "0px 2px 3px 0px grey",
          background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
          p: 1,
          borderRadius: "8px",
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
            p: 3,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: 600, color: "gray" }}>
              Room Number :
            </Typography>
            <Typography
              // variant="caption"
              sx={{
                color: "#28282B",
                ml: 1,
                fontWeight: "bold",
              }}
            >
              {user.room}
            </Typography>
          </Box>
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
            p: 3,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: 600, color: "gray" }}>
              Room Preference :
            </Typography>
            <Typography
              // variant="caption"
              sx={{
                color: "#28282B",
                ml: 1,
                fontWeight: "bold",
              }}
            >
              {user.roomPreference}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* ------------ DUES_INFORMATION ------------------------------ */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "gray", mb: 1, mt: 5 }}
      >
        Due(s) Information
      </Typography>
      <Grid
        maxWidth="sm"
        container
        sx={{
          
          display: "flex",
          boxShadow: "0px 2px 3px 0px grey",
          background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
          p: 1,
          borderRadius: "8px",
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
          <Typography sx={{ fontWeight: 600, color: "gray"}}>
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
          <Typography
            sx={{ fontWeight: 600, color: "#28282B", fontSize: "20px" }}
          >
            {/* ₹ {user.dues} */}
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
            justifyContent: "start",

            p: 1,
          }}
        >
          <Typography sx={{ fontWeight: "bolder", color: "gray" }}>
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
          <Typography
            sx={{ fontWeight: 600, color: "#28282B",  }}
          >
            {/* ₹ {user.eBills} */}
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
            justifyContent: "start",

            p: 1,
          }}
        >
          <Typography sx={{ fontWeight: 600, color: "gray"}}>
            Miscellaneous:
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
          {/* <TextField/> */}
          <Typography
            sx={{ fontWeight: 600, color: "#28282B", fontSize: "20px" }}
          >
            {/* ₹ {user.misc} */}
          </Typography>
        </Grid>
      </Grid>

      {/* ------------ GENERAL_NOTICE ------------------------------ */}

      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "gray", mb: 1, mt: 5 }}
      >
        General Notice
      </Typography>
      <Box
        maxWidth="md"
        container
        sx={{
          
          mb: 5,

          // display: "flex",
          boxShadow: "0px 2px 3px 0px grey",
          background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
          p: 1,
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            border: "2px dashed blue",

            color: "blue",
            textAlign: "center",
            fontWeight: "bolder",
            // mb: 2,
            p: 1,
            borderRadius: "8px",
            display: "inline-block",
          }}
        >
          Laundary Tag
        </Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "#28282B", mb: 1, mt: 2 }}
        >
          Notice Title Here
        </Typography>
        <Box sx={{ width: "99%", p: 2 }}>
          <Typography sx={{ fontWeight: 600, color: "gray" }}>
            On Today onwards laundary waala will take the cloths in the separate
            bag, which is provided to every student, On Today onwards laundary
            waala will take the cloths in the separate bag, which is provided to
            every student
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
//============================================================
Home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
