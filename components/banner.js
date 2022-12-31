import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Image from "next/image";

export default function Banner() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundColor: "#f7e5e9",
          p: 5,
          mt: 2,
          borderRadius: 2,
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "space-between",
          }}
        >
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Typography
              variant="h5"
              sx={{
                color: "#fe616f",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Welcome back Anna !
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontFamily: "poppins",
                color: "gray",
              }}
            >
              Manage all your settings from here , its seems there are newly
              registered memebrs here !{" "}
            </Typography>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Image src="/admin.PNG" width={250} height={150} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
