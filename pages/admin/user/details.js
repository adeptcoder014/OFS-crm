import DashboardLayout from "../../../components/layout/dashboard-layout";
import {
  Grid,
  Typography,
  Box,
  Container,
  Avatar,
  Divider,
  TextField,
} from "@mui/material";
import { getUserById } from "../../../api/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Loading from "../../../components/loading";
//========================================
export default function UserDetails() {
  const router = useRouter();

  const query = useQuery({
    queryKey: ["userById", router.query.id],
    queryFn: () => getUserById(router.query.id),
    enabled: !!router.query.id,
  });

  if (query.isLoading) {
    return <Loading />;
  }
  //=======================================

  return (
    <Container maxWidth="md" sx={{ ml: 5 }}>
      {/* ------------------- GENERAL_INFORMATION ------------------------------- */}

      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "gray", mb: 1, ml: -5 }}
      >
        General Information
      </Typography>

      <Grid
        container
        sx={{
          ml: -5,
          display: "flex",
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
          }}
        >
          <Avatar sx={{ mr: 1, fontSize: 5 }} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
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
            <Typography
              variant="caption"
              sx={{
                color: "gray",
                inlineSize: "150px",
                wordWrap: "break-word",
              }}
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
          <Box
            sx={{
            }}
            >
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
            Joined on : 28th Aug `22
          </Typography>
        </Grid>
      </Grid>
      {/* ----------------- HOSTEL_INFORMATION --------------------------------- */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "gray", mb: 1, mt: 5, ml: -5 }}
      >
        Stay Information
      </Typography>
      <Grid
        container
        sx={{
          ml: -5,
          display: "flex",
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
            p: 1,
          }}
        >
          {/* <Box sx={{ display: "flex" }}> */}
          <Typography
            sx={{ fontWeight: 600, color: "gray", alignSelf: "center" }}
          >
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
            InputProps={{
              inputProps: {
                style: { textAlign: "left" },
              },
            }}
            variant="outlined"
            size="small"
            defaultValue="211"
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
          <Typography
            sx={{ fontWeight: 600, color: "gray", alignSelf: "center" }}
          >
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
            InputProps={{
              inputProps: {
                style: { textAlign: "left" },
              },
            }}
            variant="outlined"
            size="small"
            defaultValue="doubble"
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
          <Typography
            sx={{ fontWeight: 600, color: "gray", alignSelf: "center" }}
          >
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
            defaultValue="21/2/2023"
          />
        </Grid>
      </Grid>

      {/* ------------ DUES_INFORMATION ------------------------------ */}
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "gray", mb: 1, mt: 5, ml: -5 }}
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
          background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
          p: 1,
          borderRadius: "8px",
          mb: 2,
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
          <Typography sx={{ fontWeight: 600, color: "gray", fontSize: "20px" }}>
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
            defaultValue="8508"
          />{" "}
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
          <Typography sx={{ fontWeight: 600, color: "gray", fontSize: "20px" }}>
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
            defaultValue="8508"
          />{" "}
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
          <Typography sx={{ fontWeight: 600, color: "gray", fontSize: "20px" }}>
            Misc. :
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
            defaultValue="8508"
          />{" "}
        </Grid>
      </Grid>

      {/* ------------ GENERAL_NOTICE ------------------------------ */}
    </Container>
  );
}
UserDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
