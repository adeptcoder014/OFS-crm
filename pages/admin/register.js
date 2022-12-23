import {
  Box,
  Container,
  TextField,
  Typography,
  FormLabel,
  InputAdornment,
  Grid,
  FormControl,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from "next/image";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { useController } from "../../controller/adminRegistration";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

//============================================
export default function Register() {
  const { add, addForm } = useController();
  const [showPassword, setShowPassword] = useState(false);
  //=============================================
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
            {/* ==================FORM ================================ */}

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
                    <FormLabel sx={{ mb: 2 }}>Name</FormLabel>
                    <TextField
                      error={
                        addForm.touched.name && Boolean(addForm.errors.name)
                      }
                      helperText={addForm.touched.name && addForm.errors.name}
                      id="name"
                      name="name"
                      value={addForm.values.name}
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
                    <FormLabel sx={{ mb: 2, mt: 2 }}>Email</FormLabel>
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
                        backgroundColor: "#f6f8fb",

                        width: "90%",
                        "& label.Mui-focused": {
                          color: "red",
                        },
                      }}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                            //   aria-label="toggle password visibility"
                            //   onClick={() => setShowPassword(prev => !prev)}
                            // // onMouseDown={handleMouseDownPassword}
                            >
                              {/* {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
                              <KeyIcon />
                            </IconButton>
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

                  <Grid
                    className="responsive"
                    item
                    md={6}
                    xs={12}
                    sx={{ display: "flex", flexDirection: "column", mt: 6 }}
                  >
                    {/* ============= Conditional Rendering ====================== */}

                    {/* //=========================================================== */}
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

                    // mt: 5,
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
