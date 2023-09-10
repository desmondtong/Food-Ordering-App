import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  Paper,
} from "@mui/material";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import OrderSummary from "../components/OrderSummary";
import { Props, data } from "../interfaces";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";

const CheckOut: React.FC = () => {
  const fetchData = useFetch();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const params = useParams();

  const [cartItemInfo, setCartItemInfo] = useState<Props>({});

  // endpoint
  const getCartItems = async () => {
    const res: data = await fetchData(
      "/api/carts/" + userCtx?.userId,
      "POST",
      undefined,
      userCtx?.accessToken
    );

    if (res.ok) {
      setCartItemInfo(res.data);
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <TopBar></TopBar>

          <Grid container columnSpacing={8}>
            <Grid item xs={12} my="2.5rem">
              <IconButton
                sx={{ bgcolor: "var(--orange)" }}
                onClick={() => navigate(`/cart/${params.item}`)}
              >
                <ArrowBackIcon sx={{ color: "var(--white)" }}></ArrowBackIcon>
              </IconButton>
            </Grid>

            <Grid item xs={9}>
              <Paper
                sx={{
                  p: "1rem",
                  mb: "1.5rem",
                  bgcolor: "var(--lightgrey)",
                  borderRadius: "1rem",
                }}
                elevation={0}
              >
                <Typography variant="h5" fontWeight="bold">
                  Delivery Address
                </Typography>

                <Paper sx={{ mt: "1rem", borderRadius: "1rem" }} elevation={0}>
                  <Grid container alignItems="center" p="1rem">
                    <Grid item xs={0.5}>
                      <HomeIcon className="icon-orange" fontSize="large" />
                    </Grid>
                    <Grid item flexGrow="1" ml="1rem">
                      <Typography fontWeight="light" variant="body1">
                        Default Address
                      </Typography>
                      <Typography fontWeight="light" variant="body2">
                        xxxx
                      </Typography>
                    </Grid>
                    <Grid item xs={1} container justifyContent="flex-end">
                      <Button size="small">Edit</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Paper>

              <Button variant="contained" fullWidth>
                Place Order
              </Button>
            </Grid>

            <Grid item xs={3}>
              <OrderSummary
                total_price={cartItemInfo.total_price}
                orders={cartItemInfo.orders}
              ></OrderSummary>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default CheckOut;
