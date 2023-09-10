import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

import { Box, Grid, Typography, Stack } from "@mui/material";
import TopBar from "../components/TopBar";
import CartItem from "../components/CartItem";
import { Props, data } from "../interfaces";
import OrderSummary from "../components/OrderSummary";

const Cart: React.FC = () => {
  const fetchData = useFetch();
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
      userCtx?.setVendorId(res.data.vendor_id);
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
              <Typography variant="h4">Cart</Typography>
            </Grid>

            <Grid item xs={9}>
              <Stack spacing={3}>
                {cartItemInfo.orders?.map((item, idx) => (
                  <CartItem
                    name={item.name}
                    item_price={item.item_price}
                    user_note={item.user_note}
                    quantity_ordered={item.quantity_ordered}
                    image_url={"." + item.image_url}
                    cart_id={params.item}
                    item_id={item.item_id}
                    id={item.id}
                    getCartItems={getCartItems}
                    key={idx}
                  ></CartItem>
                ))}
              </Stack>
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

export default Cart;
