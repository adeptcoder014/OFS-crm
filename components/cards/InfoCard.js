import { Badge, Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
//===================================================
export default function InfoCard(props) {
  const router = useRouter();
  return (
    <Grid
      onClick={() => {
        router.push(props.url);
      }}
      item
      xs={12}
      sm={4}
      xl={4}
      lg={4}
      md={4}
      sx={{
        backgroundColor: "ghostwhite",
        boxShadow: "0px 2px 2px 0px #00000070",
        borderRadius: "15px",
        p: 5,
        mt: 3,
        mr: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Badge badgeContent={4} color="primary">
        <Box>
          <Typography
            sx={{
              color: "gray",
              fontWeight: "bold",
            }}
          >
            {props.title}
            {/* <FiberNewIcon sx={{ fontSize: 26 }} /> */}
          </Typography>
        </Box>
      </Badge>
    </Grid>
  );
}
