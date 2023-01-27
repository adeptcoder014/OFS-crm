import DashboardLayout from "../../../components/layout/dashboard-layout";
import {
  Grid,
  Typography,
  Box,
  Container,
  Button,
  TextField,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Loading from "../../../components/loading";
import Table from "../../../components/table";
import { getUserById } from "../../../api/user";
import { approval } from "../../../api/approval";
import { getRentStructure } from "../../../api/rental";
import { useEffect, useState } from "react";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { approvalValidation } from "../../../validation/approval";
import axios from "axios";
import axiosInstance from "../../../api/axios";
import dayjs from "dayjs";
import { useRentController } from "../../../controller/rental";
import RentEntry from "../../../components/rentEntryCard";
import RentShow from "../../../components/rentShowCard";

import jwt_decode from "jwt-decode";
import { useTokenQuery } from "../../../controller/token";
import { useDarkMode } from "../../../context/darkMode";
import { ADMIN_URL } from "../../../constants/url";
//========================================
export default function UserRentalDetails() {
  const theme = useTheme();

  const { darkMode } = useDarkMode();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [year, setYear] = useState(2023);

  const query = useQuery({
    queryKey: ["userById", router.query.id],
    queryFn: () => getUserById(router.query.id),
    enabled: !!router.query.id,
  });
let room =0
  if (!query.isLoading) {
   room = query?.data?.data?.room
  }
  useEffect(() => {
    
      axios
        .get(`${ADMIN_URL}/rooms?room=${room}`)
        .then((x) => console.log(x));
    
  }, []);

  const { tokenQuery } = useTokenQuery();
  // const today = new Date()

  //==============

  if (!query.isLoading)
    return (
      <>
        <Box
          sx={{
            backgroundColor: darkMode ? "#23272a" : "white",
            [theme.breakpoints.down("sm")]: {
              ml: -2,
            },
            [theme.breakpoints.up("sm")]: {
              ml: -2,
            },
          }}
        >
          <Typography
            sx={
              darkMode
                ? [
                    theme.lightText,
                    {
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 16,
                        m: 1,
                      },
                      [theme.breakpoints.up("sm")]: {
                        m: 1,
                      },
                    },
                  ]
                : [
                    theme.darkText,
                    {
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 16,
                        m: 1,
                      },
                      [theme.breakpoints.up("sm")]: {
                        m: 1,
                      },
                    },
                  ]
            }
            variant="h5"
          >
            Enter rentals details:{" "}
          </Typography>

          <Grid
            container
            sx={{
              boxShadow: "0px 2px 3px 0px grey",
              backgroundColor: darkMode ? "#2c2f33" : "white",
              borderRadius: "8px",
              p: 2,
              borderRadius: 1,
              display: "flex",
              justifyContent: "space-2round",
              // mt: 5,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <RentEntry user={query?.data?.data} />
          </Grid>

          <Typography
            sx={
              darkMode
                ? [
                    theme.lightText,
                    {
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 16,
                        m: 1,
                        mt: 5,
                      },
                      [theme.breakpoints.up("sm")]: {
                        m: 1,
                        mt: 5,
                      },
                    },
                  ]
                : [
                    theme.darkText,
                    {
                      [theme.breakpoints.down("sm")]: {
                        fontSize: 16,
                        m: 1,
                        mt: 5,
                      },
                      [theme.breakpoints.up("sm")]: {
                        m: 1,
                        mt: 5,
                      },
                    },
                  ]
            }
            variant="h5"
          >
            Rentals details:{" "}
          </Typography>
          <TextField
            placeholder="search year ..."
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "white" : "gray",
                },
              },
              input: {
                color: darkMode ? "white" : "gray",
              },
              [theme.breakpoints.down("sm")]: {
                ml: 1,
              },
              [theme.breakpoints.up("sm")]: {
                ml: 1,
              },
            }}
            size="small"
            onChange={(e) => setYear(e.target.value)}
          />

          <Grid
            container
            sx={{
              backgroundColor: darkMode ? "#2c2f33" : "white",
              p: 2,
              mt: 5,
              boxShadow: "inset 0px 1px 5px 0px grey",

              borderRadius: 1,
            }}
          >
            {query?.data?.data?.dues?.rents?.map((x) => {
              if (x.year === Number(year)) {
                return (
                  <>
                    <RentShow
                      key={x._id}
                      month={x.month}
                      rentCycle={x.rentCycle}
                      year={x.year}
                      rent={x.rent}
                      status={x.status}
                      rentId={x._id}
                      userId={router.query.id}
                      rentDue={x.due.rentDue}
                      ebillDue={x.due.ebillDue}
                      total={x.due.total}
                    />
                  </>
                );
              }
            })}
          </Grid>
        </Box>
      </>
    );
}
UserRentalDetails.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
