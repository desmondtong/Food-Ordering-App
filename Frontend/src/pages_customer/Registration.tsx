import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MenuItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Copyright = (props: any) => {
  return (
    <Typography
      fontSize="0.6rem"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Burps
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Registration: React.FC = () => {
  const pathName = window.location.pathname;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid
          item
          container
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={0}
          square
          direction="column"
          display="flex"
          justifyContent="center"
          height="100vh"
        >
          <Box mx="6rem">
            <Typography
              variant="h3"
              align="left"
              fontWeight="bold"
              gutterBottom
              mb="2rem"
            >
              {pathName === "/registration/vendor"
                ? "Register Your Store"
                : "Register"}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  type="text"
                  name="first name"
                  autoComplete="first name"
                  autoFocus
                  // onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="last name"
                  label="Last Name"
                  type="text"
                  id="lastName"
                  autoComplete="last name"
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              {/* only for vendor registration */}
              {pathName === "/registration/vendor" && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      name="store name"
                      label="Store Name"
                      type="text"
                      id="storeName"
                      // onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      select
                      required
                      fullWidth
                      name="category"
                      label="Category"
                      type="category"
                      id="category"
                      // onChange={(e) => setPassword(e.target.value)}
                    >
                      <MenuItem>1</MenuItem>
                      <MenuItem>1</MenuItem>
                      <MenuItem>1</MenuItem>
                      <MenuItem>1</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      name="address"
                      label="Store Address"
                      type="text"
                      id="address"
                      // onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="dense"
                      required
                      fullWidth
                      name="postal code"
                      label="Postal Code"
                      id="postalCode"
                      // onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  id="email"
                  autoComplete="email"
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="phone number"
                  label="Phone Number"
                  id="phoneNumber"
                  autoComplete="phone number"
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  name="confirm password"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: "3rem", mb: "1rem" }}
              // onClick={handleLogin}
            >
              CREATE ACCOUNT
            </Button>

            <Grid item>
              <Box>
                <Typography
                  variant="body1"
                  fontSize="0.8rem"
                  textAlign="center"
                >
                  Already have an account?
                  <Link
                    href={
                      pathName === "/registration/vendor"
                        ? "/login/vendor"
                        : "/login"
                    }
                    variant="body2"
                    ml="0.3rem"
                  >
                    Login Now
                  </Link>
                </Typography>
              </Box>
            </Grid>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Registration;
