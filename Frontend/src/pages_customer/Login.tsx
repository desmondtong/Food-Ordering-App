import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

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
import { data } from "../interfaces";

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

  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const pathName = window.location.pathname;

  // function
  const handleLogin = async () => {
    const res: data = await fetchData("/auth/login", "POST", {
      email,
      password,
    });

    if (res.ok) {
      const decoded: any = jwtDecode(res.data?.access);

      const role = decoded.role;

      // check if user login using the correct login portal
      if (
        (role === "CUSTOMER" && pathName === "/") ||
        ((role === "VENDOR" || role === "ADMIN") &&
          pathName === "/login/vendor")
      ) {
        userCtx?.setAccessToken(res.data?.access);
        localStorage.setItem("accessToken", JSON.stringify(res.data?.access));

        userCtx?.setRefreshToken(res.data?.refresh);
        localStorage.setItem("refreshToken", JSON.stringify(res.data?.refresh));

        userCtx?.setUserId(decoded.id);
        localStorage.setItem("userId", JSON.stringify(decoded.id));

        userCtx?.setRole(decoded.role);
        localStorage.setItem("role", JSON.stringify(decoded.role));

        // userCtx?.getUserInfo();

        navigate(`/`);
      } else {
        alert("Please login with the correct portal!");
      }
    } else {
      alert(JSON.stringify(res.data));
    }
  };

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
            <Typography variant="h3" align="left" fontWeight="bold">
              {pathName === "/login/vendor"
                ? `Welcome Back to Vendor Portal!`
                : "Welcome Back!"}
            </Typography>
            <Typography variant="body1" mb="2rem">
              Please enter your details
            </Typography>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: "3rem", mb: "1rem" }}
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
                      pathName === "/login/vendor"
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
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
