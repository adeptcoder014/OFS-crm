import { Box, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import AccountHeadsEntry from "./accountHeadsEntry";
import ShowAccountsEntry from "./showAccountsEntry";
//================================================
export default function AccountEntry() {
  //============================
  const theme = useTheme();
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
        <TextField size="small" placeholder="search month ..." />
      </Box>
      {/* ================== ACCOUNTS_HEADS ====================== */}
      <ShowAccountsEntry/>
      {/* ======================================================== */}
    </Box>
  );
}
