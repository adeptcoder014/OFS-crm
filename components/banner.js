import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Image from "next/image";
//====================================
export default function Banner(props) {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        sx={{
          // backgroundColor: "#f7e5e9",
          p: 5,
          mt: 2,
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-between",
        }}
      >
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{
          textAlign:"center",
          // justifyContent:"center",
          alignSelf:"center"

        }}>
          <Typography
            variant="h4"
            sx={{
              color: "#fe616f",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Welcome back {props.name} !
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              fontFamily: "poppins",
              color: "gray",
            }}
          >
            Manage all your settings from here , its seems there are newly
            registered memebrs here !{" "}
          </Typography>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{
          float:"right"
        }}>
          <img src="/admin.jpg" style={{
            maxWidth:"80%",
            marginLeft:36
          }}/>
          {/* <Image src="/admin.jpg" width={150} height={150} /> */}
        </Grid>
      </Grid>
    </Container>
  );
}
