import { Box, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useState } from "react";
import axiosInstance from "../api/axios";
import AccountHeadsEntry from "./accountHeadsEntry";
import ShowAccountsEntry from "./showAccountsEntry";
import { useQuery } from "@tanstack/react-query";
import Loading from "./loading";
import { useDarkMode } from "../context/darkMode";

//================================================
export default function AccountEntry() {
  //============================
  const theme = useTheme();
  const { darkMode } = useDarkMode();
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
        sx={
          darkMode
            ? [
                theme.lightText,
                {
                  [theme.breakpoints.down("sm")]: {
                    m: 2,
                    ml: 9,
                  },
                  [theme.breakpoints.up("sm")]: {
                    m: 2,
                    ml: 9,
                  },
                },
              ]
            : [
                theme.darkText,
                {
                  [theme.breakpoints.down("sm")]: {
                    m: 2,
                    ml: 9,
                  },
                  [theme.breakpoints.up("sm")]: {
                    m: 2,
                    ml: 9,
                  },
                },
              ]
        }
      >
        Debits :
      </Typography>
      <AccountHeadsEntry />

      {/* ================== SEARCH ====================== */}
      <Box
        sx={{
          display: "flex",
          mt: 5,
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
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
                      fontSize: 14,
                      ml: 12,
                    },
                    [theme.breakpoints.up("sm")]: {
                      fontSize: 14,
                      ml: 12,
                      mr:6,
                      alignSelf:"center"
                    },
                  },
                ]
              : [
                  theme.darkText,
                  {
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 14,
                      ml: 12,
                    },
                    [theme.breakpoints.up("sm")]: {
                      fontSize: 14,
                      ml: 12,
                    },
                  },
                ]
          }
        >
          Search :
        </Typography>
        <TextField
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
           width:220,
           m:'auto',
           mt:1
          },
        }}
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
