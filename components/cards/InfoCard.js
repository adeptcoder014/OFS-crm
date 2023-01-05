import { Badge, Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import PeopleIcon from "@mui/icons-material/People";
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
      sm={12}
      xl={2}
      lg={2}
      md={2}
      sx={{
        backgroundColor: props.color,
        boxShadow: "0px 2px 2px 0px #00000070",
        borderRadius: "15px",
        p: 5,
        mt: 3,
        // mr: 12,
  
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent:"space-between",
            alignItems:"space-between"
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "gray",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {props.total}
          </Typography>
          <Box sx={{ml:2}}>

          {props.icon}
          </Box>
          {/* <PeopleIcon sx={{ fontSize: 56, ml: 4, color: "white" }} /> */}
        </Box>
        <Box  sx={{mt:1}}>
        <Typography
          variant="overlay"
          sx={{
            color: "gray",
            fontWeight: "bold",
            color: "white",
            
          }}
        >
          {props.title}
        </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
