import React, { useContext, useRef } from "react";
import { useNavigate, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

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

const Login: React.FC = () => {
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // const handleLogin = () => {
  //   console.log(emailRef.current?.value);
  //   console.log(passwordRef.current?.value);
  // };

  const handleLogin = async () => {
    const res = await fetchData("/auth/login", "POST", { email, password });
    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      localStorage.setItem("accessToken", JSON.stringify(res.data.access));

      const decoded = jwtDecode(res.data.access);

      userCtx.setUserId(decoded.id);
      localStorage.setItem("userId", JSON.stringify(decoded.id));

      navigate(`/profile/${decoded.id}`);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
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
            // borderStyle: "solid",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
          <Box
            sx={{
              my: "7rem",
              mx: "4rem",
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              // borderStyle: "solid",
            }}
          >
            <Typography variant="h4" align="left" fontWeight="bold">
              {userCtx?.role === "CUSTOMER"
                ? "Welcome Back!"
                : "Welcome Back to Vendor Portal"}
            </Typography>
            <Typography variant="body1" mb="2rem">
              Please enter your details
            </Typography>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={emailRef}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                LOG IN
              </Button>

              <Grid item>
                <Box>
                  <Typography
                    variant="body1"
                    fontSize="0.8rem"
                    textAlign="center"
                  >
                    Don't have an account?
                    <Link
                      href={
                        userCtx?.role === "CUSTOMER"
                          ? "/registration/vendor"
                          : "/registration"
                      }
                      variant="body2"
                      ml="0.3rem"
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Box>
              </Grid>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
