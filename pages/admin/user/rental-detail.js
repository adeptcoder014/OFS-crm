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
//========================================
export default function UserRentalDetails() {
  const theme = useTheme();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const query = useQuery({
    queryKey: ["userById", router.query.id],
    queryFn: () => getUserById(router.query.id),
    enabled: !!router.query.id,
  });

  const { tokenQuery } = useTokenQuery();
  // useEffect(() => {
  //   if (!tokenQuery.isLoading) (
  //     setToken(tokenQuery)
  // )
  // }, []);

  console.log("TOKEN ------>", tokenQuery?.data?._id);

  //==============

  if (!query.isLoading)
    return (
      <>
        <Box
          sx={{
            backgroundColor: "#eef2db",
            boxShadow: "inset 0px 1px 5px 0px grey",
            p: 2,
            borderRadius: 1,
          }}
        >
          <Grid
            container
            sx={{
              boxShadow: "0px 2px 3px 0px grey",
              background: "linear-gradient(252deg, #e1e1e1, #ffffff)",
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
        </Box>
        <Grid
          container
          sx={{
            backgroundColor: "#eef2db",
            p: 2,
            mt: 5,
            boxShadow: "inset 0px 1px 5px 0px grey",

            borderRadius: 1,
            display: "flex",
            flexDirection: "columns",
            // justifyContent: "space-around",
          }}
        >
          {query?.data?.data?.dues?.rents?.map((x) => (
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
          ))}
        </Grid>
      </>
    );
}
UserRentalDetails.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
