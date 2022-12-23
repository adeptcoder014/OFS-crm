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
import { signIn } from "next-auth/react";
//============================================
export default function Login() {
  const { add, addForm } = useController();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
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
          backgroundColor: "#ffede1",
          height: "500%",
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
            sx={{
              // minWidth: "50%",
              boxShadow: "0px 6px 8px 0px #f3c7ab",
              backgroundColor: "white",
              p: 5,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              mt: 5,
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "black", fontWeight: "bolder" }}
            >
              OFS Admin Center
            </Typography>
            {/* ================================================== */}
            {/* <form onSubmit={addForm.handleSubmit}> 
              <FormLabel sx={{ mb:1 }}>Email</FormLabel>
              <TextField
                id="name"
                name="name"
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
              <FormLabel sx={{ mb: -4 }}>Password</FormLabel>
              <TextField
                id="name"
                name="name"
                sx={{
                  backgroundColor: "#f6f8fb",

                  width: "90%",
                  "& label.Mui-focused": {
                    color: "red",
                  },
                }}
                size="small"
                InputProps={{
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    
                    </>
                  ),
                }}
              />{" "}
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{
                    fontFamily: "poppins",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    color: "black",
                    mt: 2,
                  }}
                >
                  Forgot Password
                </Typography>

                <LoadingButton
                 
                  type="submit"
                  sx={{
                    backgroundColor: "#f76334",
                    color: "white",
                    width: "50%",
                    fontSize: 16,
                    m: "auto",
                    borderRadius: "100px",
                    "&:hover": {
                      color: "red",
                      border: "1px solid #ff7f56",
                      backgroundColor: "white",
                    },
                  }}
                >
                  Login
                </LoadingButton>
              </Box>
            </form> */}

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
                    sx={{ display: "flex", flexDirection: "column", mt: 5 }}
                  >
                    {/* =====================================================================00 */}
                    <FormLabel sx={{ mb: 2 }}>Email</FormLabel>
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
                    <FormLabel sx={{ mb: 2, mt: 2 }}>Password</FormLabel>
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
                  sx={{
                    backgroundColor: "#f76334",
                    color: "white",
                    width: "100%",
                    fontSize: 16,
                    m: "auto",

                    mt: 5,
                    borderRadius: "100px",
                    p: 2,
                    "&:hover": {
                      color: "red",
                      border: "1px solid #ff7f56",
                      backgroundColor: "white",
                    },
                  }}
                >
                  Register a user
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
            sx={{
              // minWidth: "50%",
              backgroundColor: "#ffede1",
              boxShadow: "0px 6px 8px 0px #f3c7ab",

              p: 5,
              display: "flex",
              flexDirection: "column",
              mt: 5,
            }}
          >
            <Image src={"/logo.png"} height={150} width={150} />
            <Typography
              variant="h5"
              sx={{ mt: 5, color: "black", fontWeight: "bolder" }}
            >
              One Fine Stay
            </Typography>
            <Typography
              sx={{
                mt: 5,
                fontFamily: "poppins",
                color: "black",
              }}
            >
              One Fine Stay is the most advance CRM system which employs
              Blockchain and run on the OFS-coin
            </Typography>
            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              <Box
                sx={{
                  color: "#ff9625",
                  fontWeight: 500,
                  backgroundColor: "#ffddc7",
                  textAlign: "center",
                  borderRadius: 1,
                  p: 1,
                  mt: 5,
                }}
              >
                Blockchain
              </Box>{" "}
              <Box
                sx={{
                  color: "#ff9625",
                  fontWeight: 500,
                  backgroundColor: "#ffddc7",
                  textAlign: "center",
                  borderRadius: 1,
                  p: 1,
                  mt: 5,
                }}
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
