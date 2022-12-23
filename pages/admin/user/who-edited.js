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
import WhoEditedCard from "../../../components/whoEditedCard";
import { useToken } from "../../../context/localStorageToken";
import { getAdminById } from "../../../api/admin";
import { useTokenQuery } from "../../../controller/token";
//========================================
export default function WhoEdited() {
  const { tokenQuery } = useTokenQuery();
  console.log(tokenQuery?.data?._id);
  const [editedRents, setEditedRents] = useState([]);
  useEffect(() => {
    if (typeof tokenQuery?.data?._id !== "undefined") {
    getAdminById(tokenQuery?.data?._id).then((res) => {
       return setEditedRents(res?.data?.data?.editedRents);
      });
    }
  }, []);

  //==============
  return (
    <>
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
        {editedRents?.map((x) => (
          <WhoEditedCard
            mode={x.mode}
            rentId={x.rentId}
            ebillDue={x.ebillDue}
            rent={x.rent}
            rentDue={x.rentDue}
            total={x.total}
            time={x.time}
          />
        ))}
      </Grid>
    </>
  );
}
WhoEdited.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
