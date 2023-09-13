import React, { useContext, useEffect } from "react";
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

  // endpoint
  const createOrder = async () => {
    const res: data = await fetchData(
      "/api/orders/" + userCtx?.userId,
      "PUT",
      {
        vendor_id: userCtx?.cartItemInfo.vendor_id,
        // total_price: cartItemInfo.total_price,
        total_price: userCtx?.cartItemInfo.total_price,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      userCtx?.setHaveActiveOrder(true);
      userCtx?.getCustomerLastOrder();

      createItemsOrders(res.data.order_id);

      //to clear cart
      // getCartItems(true);
      deleteCartItem();

      navigate("/");
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  const deleteCartItem = async () => {
    const body = userCtx?.cartItemInfo.orders?.reduce((acc: Props[], item) => {
      acc.push({ item_id: item.item_id, id: item.id });
      return acc;
    }, []);

    const res: data = await fetchData(
      "/api/carts/items/" + params.item,
      "DELETE",
      body,
      userCtx?.accessToken
    );

    if (res.ok) {
      userCtx?.getCartItems();
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  const createItemsOrders = async (orderId: String) => {
    console.log("createItemsOrders");
    const res: data = await fetchData(
      "/api/orders/items/" + orderId,
      "PUT",
      {
        cart_id: userCtx?.customerClaims.cart_id,
      },
      userCtx?.accessToken
    );

    if (!res.ok) {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    // getCartItems();
    userCtx?.getCartItems();
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

            <Grid item xs={8}>
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

              <Button
                variant="contained"
                fullWidth
                onClick={createOrder}
                disabled={userCtx?.haveActiveOrder}
              >
                Place Order
              </Button>
            </Grid>

            <Grid item xs={4}>
              <OrderSummary
                total_price={userCtx?.cartItemInfo.total_price}
                orders={userCtx?.cartItemInfo.orders}
              ></OrderSummary>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default CheckOut;
