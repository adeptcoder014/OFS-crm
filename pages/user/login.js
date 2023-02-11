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
import { useController } from "../../controller/userLogin";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SignpostOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/system";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import { ADMIN_URL } from "../../constants/url";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { getUserById } from "../../api/user";

//============================================
export default function Pending() {
  const [phone, setPhone] = useState(0);

  //==========================================
  const { login, loginForm } = useController();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const theme = useTheme();
  //-------------------------------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        router.push("/user/home");
      }
      //  if() {
      //   router.push("/user/login");
      // }
    }
  }, []);
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
                Welcome!
              </Typography>
              <Typography
                sx={[
                  theme.darkText,
                  {
                    mt: 1,
                    fontWeight: 600,
                    fontSize: 14,
                    width: "343px",
                    textAlign: "center",
                  },
                ]}
              >
                After the admin approval, you can login with you mobile number.
              </Typography>
            </Box>
            {/* ================================================== */}

            {/* <form onSubmit={loginForm.handleSubmit}> */}
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
                  sx={{ display: "flex", flexDirection: "column", mt: 5 }}
                >
                  {/* =====================================================================00 */}
                  <FormLabel sx={[theme.darkText, { mb: 2 }]}>
                    Mobile Number
                  </FormLabel>
                  <TextField
                    // error={
                    //   loginForm.touched.phone && Boolean(loginForm.errors.phone)
                    // }
                    // helperText={
                    //   loginForm.touched.phone && loginForm.errors.phone
                    // }
                    id="phone"
                    name="phone"
                    // value={loginForm.values.phone}
                    // onChange={loginForm.handleChange}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{
                      width: "90%",
                      backgroundColor: "#f6f8fb",
                      color: "white",
                    }}
                    type="number"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />{" "}
                  {/* <FormLabel sx={[theme.darkText, { mb: 2, mt: 5 }]}>
                      Password
                    </FormLabel>
                    <TextField
                      error={
                        loginForm.touched.password &&
                        Boolean(loginForm.errors.password)
                      }
                      helperText={
                        loginForm.touched.password && loginForm.errors.password
                      }
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={loginForm.values.password}
                      onChange={loginForm.handleChange}
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
                    />{" "} */}
                  {/* ========================================================================>> */}
                </Grid>
              </Grid>
              <Button
                // disabled={login.isLoading}
                // loading={login.isLoading}
                type="submit"
                onClick={() => {
                  axios
                    .post(`${ADMIN_URL}/user/login`, { phone })
                    .then((res) => {
                      localStorage.setItem("userToken", res.data);
                      // const user = await getUserById(jwt_decode(res.data).id);
                      // console.log(user)
                      return Swal.fire(
                        "Logged in !",
                        "Continue with the OFS User Panel",
                        "success"
                      );
                    })
                    .then(() => {
                      router.push("/user/home");
                    })
                    .catch((err) => {
                      console.log(err);
                      return Swal.fire("Error !", err.response.data, "error");
                    });
                }}
                sx={[
                  theme.primaryBtn,
                  {
                    width: "100%",
                    [theme.breakpoints.down("sm")]: {
                      mt: 1,
                    },
                    [theme.breakpoints.up("sm")]: {
                      mt: 13,
                    },
                  },
                ]}
              >
                Login
              </Button>
            </Box>
            {/* </form> */}

            {/* ======================================================= */}
            {/* <LoadingButton
                // disabled={login.isLoading}
                // loading={login.isLoading}
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
              sx={[theme.lightText, { mt: 1,textAlign:"center" }]}
            >
              One Fine Stay
            </Typography>
            <Typography sx={[theme.lightText, { mt: 1, fontSize: 14 ,textAlign:"center"}]}>
              Welcome to One Fine Stay, the premier destination for unique and
              exceptional experience with an unwavering commitment to quality,
              comfort and style, your stay with us will be nothing short of
              remarkable
            </Typography>
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              <Box
                sx={[
                  theme.lightCard,
                  {
                    p: 1,
                    mt: 5,
                    textAlign: "center",
                    fontWeight: "bolder",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 11,
                    },
                  },
                ]}
              >
                STUDY
              </Box>{" "}
              <Box
                sx={[
                  theme.lightCard,
                  { p: 1, mt: 5, textAlign: "center", fontWeight: "bolder" },
                ]}
              >
                PROGRESS
              </Box>
              <Box
                sx={[
                  theme.lightCard,
                  { p: 1, mt: 5, textAlign: "center", fontWeight: "bolder" },
                ]}
              >
                RELAX
              </Box>
              <Box
                sx={[
                  theme.lightCard,
                  { p: 1, mt: 5, textAlign: "center", fontWeight: "bolder" },
                ]}
              >
                REPEAT
              </Box>
            </Box>
          </Grid>{" "}
        </Grid>
      </Container>
    </>
  );
}
