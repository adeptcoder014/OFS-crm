import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Image from "next/image";
import { useDarkMode } from "../context/darkMode";
import { useTheme } from "@mui/system";
//====================================
export default function Banner(props) {
  const { darkMode, setDarkMode } = useDarkMode();
  const theme = useTheme();
  return (
    <Container maxWidth="lg">
      <Grid
        container
        sx={{
          backgroundColor: darkMode ? "#2c2f33" : "",
          p: 5,
          mt: 2,
          borderRadius: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-between",
        }}
      >
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          order={{ xs: 2, sm: 2, lg: 1 }}
          sx={{
            textAlign: "center",
            // justifyContent:"center",
            alignSelf: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={
              darkMode
                ? [
                    theme.lightText,
                    {
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 28,
                      },
                    },
                  ]
                : [
                    theme.darkText,
                    {
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 28,
                      },
                    },
                  ]
            }
          >
            Welcome back {props.name}!
          </Typography>
          <Typography
            // variant="h7"
            sx={
              darkMode
                ? [
                    theme.lightText,
                    {
                      mt: 5,
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 12,
                      },
                    },
                  ]
                : [
                    theme.darkText,
                    {
                      mt: 5,
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 12,
                      },
                    },
                  ]
            }
          >
            Manage all your settings from here , its seems there are newly
            registered memebrs here.
          </Typography>
        </Grid>
        <Grid 
          item
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          order={{ xs: 1, sm: 1 }}
        >
          <img
            src="/admin.jpg"
            style={{
              maxWidth: "100%",
              // marginLeft: 36,
              marginBottom: 20,
              borderRadius: 500,
            }}
          />
          {/* <Image src="/admin.jpg" width={150} height={150} /> */}
        </Grid>
      </Grid>
    </Container>
  );
}
