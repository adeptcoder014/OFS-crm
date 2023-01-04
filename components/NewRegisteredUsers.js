import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useController } from "../controller/user";
export default function NewRegisteredUsers() {

    const { query } = useController({ filter: "NEW" });

  return (
    <Box
      sx={{
        p: 5,
        boxShadow: "0px 1px 3px 0px grey",
        borderRadius: 1,
        // width: "70%",
        mt:2
      }}
    >
      {/* //======================================== */}

      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "18px",
          fontFamily: "poppins",
          mb: 2,
        }}
      >
        Latest Registration Bookings :
      </Typography>
      {/* //======================================== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          mb:2
        }}
      >
        <Typography
          sx={{
            color: "blue",
            fontWeight: "bold",
            //   fontSize: "18px",
            fontFamily: "poppins",
            // mb: 2,
            alignSelf: "center",
          }}
        >
          {" "}
          Search
        </Typography>
        <TextField size="small" variant="standard" />
      </Box>
      {/* //======================================== */}
      <Box
        sx={{
          overflow: "auto",
          borderRadius: 1,
          height:"250px"
        }}
      >
        {query?.data?.data?.user.map(x=>(

        <Box
          sx={{
            p: 1,
            boxShadow: "0px 1px 3px 0px grey",
            borderRadius: 1,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Avatar />
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontWeight: "bolder", fontSize: "100%",color:"gray" }}>
            {x.name}
            </Typography>
            <Typography
              sx={{ color: "#205CBE", fontWeight: "bolder", fontSize: "80%" }}
            >
              joined : 12 May
              {x.jointingDate}
            </Typography>
          </Box>
          <AppRegistrationIcon sx={{ color: "gray", fontSize: "35px" }} />
        </Box>
        ))}
      </Box>
      {/* //======================================== */}
    </Box>
  );
}
