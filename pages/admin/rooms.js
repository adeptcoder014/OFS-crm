import { Typography, Container, Box, Button } from "@mui/material";
import { useTheme } from "@mui/system";
import DashboardLayout from "../../components/layout/dashboard-layout";
import Loading from "../../components/loading";
import { useRouter } from "next/router";
import Users from "../../components/allUsers";
import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_URL } from "../../constants/url";
import _ from "lodash";
//==========================================
export default function Rooms() {
  const theme = useTheme();
  const router = useRouter();
  const [roomsWithPartner, setRoomsWithPartner] = useState([]);

  useEffect(() => {
    axios.get(`${ADMIN_URL}/rooms`).then((x) => setRoomsWithPartner(x.data));
  }, []);

  console.log("---->", roomsWithPartner);
  //===============================
  return (
    <>
      <Typography
        variant="h5"
        sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
      >
        Rooms :
      </Typography>

      {roomsWithPartner?.map((x) => (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              boxShadow: "0px 1px 2px 0px grey",
              p: 2,
            }}
          >
            <Typography
              sx={{
                backgroundColor: "black",
                p: "5px 25px",
                borderRadius: "4px",
                fontWeight: "bolder",
                color: "white",
              }}
            >
              {x.room}
            </Typography>
            {x?.name?.map((w) => (
              <Typography>{w}</Typography>
            ))}
          </Box>
        </>
      ))}

      {/* <Users /> */}
      {/* <Container>
        {query?.data?.data?.user?.map((x) => {
          if (x.room === 211) {
            return <Typography>{x.name}</Typography>;
          }
        })}
      </Container> */}
    </>
  );
}

Rooms.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
