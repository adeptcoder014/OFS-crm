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
import EbillEntry from "../../../components/ebillEntryCard";
import EbillShow from "../../../components/ebillShowCard";
//========================================
export default function UserRentalDetails() {
  const theme = useTheme();
  const router = useRouter();
  const [user, setUser] = useState({});

  const query = useQuery({
    queryKey: ["userById", router.query.id],
    queryFn: () => getUserById(router?.query?.id),
    enabled: !!router.query.id,
  });

  if (!query.isLoading) {
    console.log("Ebills ----->",query.data.data.dues.eBills);
  }

  //==============
  return (
    <>
      <Box
        sx={{ boxShadow: "inset 0px 1px 5px 0px grey", p: 2, borderRadius: 1 }}
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
          <EbillEntry user={query?.data?.data} />
        </Grid>
      </Box>
      <Grid
        container
        sx={{
          backgroundColor: "#f5f5f5",
          p: 2,
          mt: 5,
          boxShadow: "inset 0px 1px 5px 0px grey",

          borderRadius: 1,
          display: "flex",
          flexDirection: "columns",
          // justifyContent: "space-around",
        }}
      >
        {query?.data?.data?.dues?.eBills?.map((x) => (
          <EbillShow
            pricePerUnit={x.pricePerUnit}
            reading={x.reading}
            total={x.total}
          />
        ))}
      </Grid>
    </>
  );
}
UserRentalDetails.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);
