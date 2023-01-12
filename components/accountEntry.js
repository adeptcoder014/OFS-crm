import { Box, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useState } from "react";
import axiosInstance from "../api/axios";
import AccountHeadsEntry from "./accountHeadsEntry";
import ShowAccountsEntry from "./showAccountsEntry";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";

//================================================
export default function AccountEntry() {
  //============================
  const theme = useTheme();

  const [error, setError] = useState("");
  //==========================
  const query = useQuery({
    queryKey: ["getAccountsHeads"],
    queryFn: () => axiosInstance.get("/account"),
  });
  const [data, setData] = useState(query?.data?.data);

  if (query.isLoading) {
    return <Loading />;
  }
  //========================================
  return (
    <Box>
      {/* ================== ENTRY============================= */}

      <Typography
        variant="h5"
        sx={[theme.custom.typography.h1, { mb: 5, mt: 5 }]}
      >
        Debits :
      </Typography>
      <AccountHeadsEntry />

      {/* ================== SEARCH ====================== */}
      <Box sx={{ display: "flex", mt: 5 }}>
        <Typography sx={{ fontWeight: "bolder", mr: 5, alignSelf: "center" }}>
          Search :
        </Typography>
        <TextField
          size="small"
          placeholder="search month ..."
          type="date"
          onChange={(e) => {
            axiosInstance
              .get(`/account/sort?date=${e.target.value}`)
              .then((res) => setData(res?.data))
              .catch((e) => setError(e?.response?.data));
          }}
        />
      </Box>
      {/* ================== ACCOUNTS_HEADS ====================== */}
      <ShowAccountsEntry data={data} error={error} />
      {/* ======================================================== */}
    </Box>
  );
}
