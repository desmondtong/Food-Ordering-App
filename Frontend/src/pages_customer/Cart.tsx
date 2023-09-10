import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

import { Box, Grid, Typography, Stack, CardMedia, Button } from "@mui/material";
import TopBar from "../components/TopBar";
import CartItem from "../components/CartItem";
import { Props, data } from "../interfaces";
import OrderSummary from "../components/OrderSummary";

const Cart: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();

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
            {/* {JSON.stringify(Boolean(cartItemInfo.orders?.length != 0))} */}
            <Grid item xs={12} my="2.5rem">
              <Typography variant="h4">Cart</Typography>
            </Grid>

            {cartItemInfo.orders?.length != 0 ? (
              <>
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
              </>
            ) : (
              <>
                <Grid item xs={12} container justifyContent="center">
                  <CardMedia
                    component="img"
                    sx={{
                      width: "15%",
                      aspectRatio: 1,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    image="../empty-page.jpg"
                  />
                </Grid>
                <Grid item xs={12} m="2rem">
                  <Typography textAlign="center" variant="h6">
                    Your Cart Is Empty..
                  </Typography>
                  <Typography
                    textAlign="center"
                    variant="body1"
                    fontWeight="light"
                    color="text.secondary"
                  >
                    Look for something yums to burpsss!
                  </Typography>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/")}
                  >
                    Browse Now
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
