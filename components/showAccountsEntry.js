import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { useDarkMode } from "../context/darkMode";
import Loading from "./loading";

//==============================
export default function ShowAccountsEntry(props) {
  const theme = useTheme();
  const { darkMode } = useDarkMode();

  //========================================
  return (
    <Grid
      container
      // spacing={2}
      sx={{
        boxShadow: "0px 1px 2px 0px grey",
        // backgroundColor:"wheat",
        // width: "200%",
        p: 2,
        borderRadius: 1,
        mt: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props?.data?.length === 0 ? (
        <Typography variant="h5" sx={{ color: "gray", fontWeight: "bolder" }}>
          No record found !
        </Typography>
      ) : (
        <>
          {props?.data?.map((x) => (
            <>
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  boxShadow: "0px 1px 2px 0px grey",
                  [theme.breakpoints.up("sm")]: {
                    ml: 2,
                    p: 2,
                  },
                  [theme.breakpoints.down("sm")]: {
                    ml: 2,
                    p: 2,
                  },
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box>
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
                                  m: 3,
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
                                  m: 3,
                                  mt: 5,
                                },
                              },
                            ]
                      }
                    >
                      Heads
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bolder",
                        color: "white",
                        backgroundColor: "#c62828",
                        p: "5px 15px",
                        borderRadius: 1,
                        textAlign: "center",
                        width: "fit-content",
                      }}
                    >
                      {x.accountHead}
                    </Typography>{" "}
                  </Box>
                  {/* ============================== */}
                  <Box>
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
                    >
                      Debit
                    </Typography>
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
                                },
                                [theme.breakpoints.up("sm")]: {
                                  m: 1,
                                  mt: 5,
                                },
                              },
                            ]
                      }
                    >
                      ₹ {x.debit}
                    </Typography>{" "}
                  </Box>
                </Box>
                {/* =================== */}
              </Grid>
            </>
          ))}
        </>
      )}
    </Grid>
  );
}
