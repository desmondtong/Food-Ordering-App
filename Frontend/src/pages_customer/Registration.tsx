import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { MenuItem, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { data, registerBody } from "../interfaces";

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
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const [categories, setCategories] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [storeName, setStoreName] = useState<String>("");
  const [category, setCategory] = useState<String>("");
  const [address, setAddress] = useState<String>("");
  const [postalCode, setPostalCode] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [contact, setContact] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);

  const pathName = window.location.pathname;

  // endpoint
  const getCategories = async () => {
    const res: data = await fetchData("/api/categories", "GET");

    if (res.ok) {
      setCategories(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const handleRegister = async () => {
    if (password != confirmPassword) {
      return setWrongPassword(true);
    } else {
      setWrongPassword(false);
    }

    // construct body for endpoint for different role
    const body: registerBody = {
      role: pathName === "/registration/vendor" ? "VENDOR" : "CUSTOMER",
      email,
      password,
      contact,
      first_name: firstName,
      last_name: lastName,
    };
    if (pathName === "/registration/vendor") {
      body["category"] = category;
      body["store_name"] = storeName;
      body["address"] = address;
      body["postal_code"] = postalCode;
    }

    const res: data = await fetchData("/auth/register", "PUT", body);

    if (res.ok) {
      // Login user after register successful
      const resLogin: data = await fetchData("/auth/login", "POST", {
        email,
        password,
      });
      if (resLogin.ok) {
        const decoded: any = jwtDecode(resLogin.data?.access);

        userCtx?.setAccessToken(resLogin.data?.access);
        localStorage.setItem(
          "accessToken",
          JSON.stringify(resLogin.data?.access)
        );

        userCtx?.setUserId(decoded.id);
        localStorage.setItem("userId", JSON.stringify(decoded.id));

        userCtx?.setRole(decoded.role);
        localStorage.setItem("role", JSON.stringify(decoded.role));

        createUserCart(decoded.id, resLogin.data.access);

        navigate(`/`);
      } else {
        alert(JSON.stringify(resLogin.data));
      }
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const createUserCart = async (userId: String, accessToken: String) => {
    console.log(userId, accessToken);
    const res: data = await fetchData(
      "/api/carts/" + userId,
      "PUT",
      undefined,
      accessToken
    );

    if (!res.ok) {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
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
              {/* only for customer registration */}
              {pathName === "/registration/vendor" || (
                <>
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
                      onChange={(e) => setFirstName(e.target.value)}
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
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Grid>
                </>
              )}

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
                      onChange={(e) => setStoreName(e.target.value)}
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
                      defaultValue=""
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((item, idx) => (
                        <MenuItem key={idx} value={item}>
                          {item}
                        </MenuItem>
                      ))}
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
                      onChange={(e) => setAddress(e.target.value)}
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
                      onChange={(e) => setPostalCode(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setContact(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={wrongPassword}
                  margin="dense"
                  required
                  fullWidth
                  name="confirm password"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  helperText={wrongPassword && "Password does not match!"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: "3rem", mb: "1rem" }}
              onClick={handleRegister}
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
                        : "/"
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
