import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import UserContext from "../context/user";

import { Box, Grid, Typography, Stack, CardMedia, Button } from "@mui/material";
import TopBar from "../components/TopBar";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import OrderToaster from "../components/OrderToaster";
import ConsecutiveSnackbars from "../components/ConsecutiveSnackbars";

const Cart: React.FC = () => {
  const userCtx = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();
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
            <Typography variant="body2">
              {JSON.stringify(userCtx?.cartItemInfo)}
            </Typography>
            <Grid item xs={12} my="2.5rem">
              <Typography variant="h4">Cart</Typography>
            </Grid>

            {userCtx?.cartItemInfo.orders?.length != 0 ? (
              <>
                <Grid item xs={8}>
                  <Stack spacing={3}>
                    {userCtx?.cartItemInfo.orders?.map((item, idx) => (
                      <CartItem
                        name={item.name}
                        item_price={item.item_price}
                        user_note={item.user_note}
                        quantity_ordered={item.quantity_ordered}
                        image_url={"." + item.image_url}
                        cart_id={params.item}
                        item_id={item.item_id}
                        id={item.id}
                        getCartItems={userCtx?.getCartItems}
                        key={idx}
                      ></CartItem>
                    ))}
                  </Stack>
                </Grid>

                <Grid item xs={4}>
                  <OrderSummary
                    total_price={userCtx?.cartItemInfo.total_price}
                    orders={userCtx?.cartItemInfo.orders}
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
          <ConsecutiveSnackbars />
        </Box>
      </Box>

      <OrderToaster></OrderToaster>
    </>
  );
};

export default Cart;
