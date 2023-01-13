import {
  Box,
  Container,
  TextField,
  Typography,
  FormLabel,
  InputAdornment,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from "next/image";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { useController } from "../../controller/adminLogin";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useRouter } from "next/router";
import { SignpostOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/system";

//============================================
export default function Login() {
  const { add, addForm } = useController();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const theme = useTheme();
  //-------------------------------------
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("Token");
    if (token) {
      router.push("/admin/home");
    }
  }
  //=====================================================
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "#99aab5",
          // height: "80vh",
          paddingBottom: 19,
          boxSizing: "content-box",
        }}
      >
        <Grid
          container
          maxWidth="md"
          sx={{
            m: "auto",
            // backgroundColor:"gray",
            // mt: 5,
            display: "flex",
          }}
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            order={{ xs: 2, sm: 2, lg: 1 }}

            sx={{
              // minWidth: "50%",
              boxShadow: "0px 6px 8px 0px #2c2f33",
              backgroundColor: "white",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              mt: 5,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={[theme.darkText, { fontWeight: "bold" }]}
              >
                Welcome back!
              </Typography>
              <Typography sx={[theme.darkText, { mt: 1, fontWeight: 600 }]}>
                We &#39 re so excited to see you again!
              </Typography>
            </Box>
            {/* ================================================== */}

            <form onSubmit={addForm.handleSubmit}>
              <Box>
                {" "}
                <Grid
                  container
                  // sx={{ width: "100%", mt: 5, display: "flex", p: 0 }}
                >
                  <Grid
                    className="responsive"
                    item
                    md={12}
                    xs={12}
                    sx={{ display: "flex", flexDirection: "column", mt: 2 }}
                  >
                    {/* =====================================================================00 */}
                    <FormLabel sx={[theme.darkText, { mb: 2 }]}>
                      Email
                    </FormLabel>
                    <TextField
                      error={
                        addForm.touched.email && Boolean(addForm.errors.email)
                      }
                      helperText={addForm.touched.email && addForm.errors.email}
                      id="email"
                      name="email"
                      value={addForm.values.email}
                      onChange={addForm.handleChange}
                      sx={{
                        width: "90%",
                        backgroundColor: "#f6f8fb",
                        color: "white",
                      }}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />{" "}
                    <FormLabel sx={[theme.darkText, { mb: 2, mt: 5 }]}>
                      Password
                    </FormLabel>
                    <TextField
                      error={
                        addForm.touched.password &&
                        Boolean(addForm.errors.password)
                      }
                      helperText={
                        addForm.touched.password && addForm.errors.password
                      }
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={addForm.values.password}
                      onChange={addForm.handleChange}
                      sx={{
                        backgroundColor: "#f6f8fb",

                        width: "90%",
                        "& label.Mui-focused": {
                          color: "red",
                        },
                      }}
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword((prev) => !prev)}
                              // onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              <KeyIcon />
                            </InputAdornment>
                          </>
                        ),
                      }}
                    />{" "}
                    {/* ========================================================================>> */}
                  </Grid>
                </Grid>
                <LoadingButton
                  disabled={add.isLoading}
                  loading={add.isLoading}
                  type="submit"
                  // sx={{
                  //   backgroundColor: "#f76334",
                  //   color: "white",
                  //   width: "100%",
                  //   fontSize: 16,
                  //   m: "auto",
                  //   fontWeight:"bolder",

                  //   mt: 5,
                  //   borderRadius: "100px",
                  //   p: 2,
                  //   "&:hover": {
                  //     color: "red",
                  //     border: "2px solid #ff7f56",
                  //     backgroundColor: "white",

                  //   },
                  // }},
                  sx={[
                    theme.primaryBtn,
                    {
                      width: "100%",
                      [theme.breakpoints.down("sm")]: {
                        mt: 1,
                      },
                      [theme.breakpoints.up("sm")]: {
                        mt: 5,
                      },

                    },
                  ]}
                >
                  Login
                </LoadingButton>
              </Box>
            </form>

            {/* ======================================================= */}
            {/* <LoadingButton
              // disabled={add.isLoading}
              // loading={add.isLoading}
              type="submit"
              sx={{
                color: "red",
                border: "1px solid #ff7f56",
                backgroundColor: "white",
                width: "50%",
                fontSize: 16,
                mr: 5,
                alignSelf: "end",
                // mt: 1,
                borderRadius: "100px",
              }}
            >
              Sign up
            </LoadingButton>{" "} */}
            {/* <Typography sx={{ ml: 250, mt: -30, mb: -30 }}>
              Or
            </Typography> */}
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            order={{ xs: 1, sm: 1, lg: 1 }}

            sx={{
              // minWidth: "50%",
              backgroundColor: "#2c2f33",
              boxShadow: "0px 6px 8px 0px #2c2f33",
              borderRadius: 1,

              p: 5,
              display: "flex",
              flexDirection: "column",
              mt: 5,
            }}
          >
            <Image src={"/logo.png"} height={150} width={150} />
            <Typography
              variant="h4"
              // sx={{ mt: 5, color: "black", fontWeight: "bolder" }}
              sx={[theme.lightText, { mt: 1 }]}
            >
              One Fine Stay
            </Typography>
            <Typography sx={[theme.lightText, { mt: 1, fontSize: 14 }]}>
              One Fine Stay is the most advance CRM system which employs
              Blockchain and run on the OFS-coin
            </Typography>
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              <Box
                sx={[
                  theme.lightCard,
                  { p: 1, mt: 5, textAlign: "center", fontWeight: "bolder" },
                ]}
              >
                Blockchain
              </Box>{" "}
              <Box
                sx={[
                  theme.lightCard,
                  { p: 1, mt: 5, textAlign: "center", fontWeight: "bolder" },
                ]}
              >
                OFS Token
              </Box>
            </Box>
          </Grid>{" "}
        </Grid>
      </Container>
    </>
  );
}
