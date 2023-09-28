import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ConsecutiveSnackbars from "../components/ConsecutiveSnackbars";
import NavBar from "../components/NavBar";
import OrderToaster from "../components/OrderToaster";
import TopBar from "../components/TopBar";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { Props, data } from "../interfaces";

const HistoryDetail: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const params = useParams();

  const [orderInfo, setOrderInfo] = useState<Props[]>([]);

  const formattedOrderId = orderInfo[0]?.order_id?.split("-")[4].toUpperCase();
  const image_url = orderInfo[0]?.vendor_image_url;
  const date = new Date(orderInfo[0]?.date!).toDateString().slice(4);
  const store_name = orderInfo[0]?.store_name;
  const address = orderInfo[0]?.address;

  // endpoint
  const getOrderInfo = async () => {
    const res: data = await fetchData(
      "/api/orders/items/order_id",
      "POST",
      [params.item],
      userCtx?.accessToken
    );

    if (res.ok) {
      setOrderInfo(res.data[0]);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getOrderInfo();
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

          <Grid container alignItems="center">
            <Grid item xs={12} my="2rem">
              <IconButton
                sx={{ bgcolor: "var(--orange)" }}
                onClick={() => history.back()}
              >
                <ArrowBackIcon sx={{ color: "var(--white)" }}></ArrowBackIcon>
              </IconButton>
            </Grid>

            <Grid item xs={12}></Grid>
          </Grid>

          {/* delivery info */}
          <Card
            sx={{ borderRadius: "1rem", backgroundColor: "var(--lightgrey)" }}
            elevation={2}
          >
            {userCtx?.role === "CUSTOMER" && (
              <CardMedia
                component="img"
                sx={{
                  aspectRatio: 3,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                image={image_url}
              />
            )}
            
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Order ID #{formattedOrderId}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="light"
                mb="1rem"
                color="text.secondary"
              >
                Delivered on {date}
              </Typography>

              <Stack direction="row" spacing={8}>
                <Stack direction="row" spacing={1}>
                  <LocationOnOutlinedIcon
                    fontSize="large"
                    className="icon-orange"
                  />
                  <Stack direction="column">
                    <Typography
                      variant="body2"
                      fontWeight="light"
                      color="text.secondary"
                    >
                      Order from
                    </Typography>
                    <Typography variant="body1" color="var(--orange)">
                      {`${store_name} (${address})`}
                    </Typography>
                  </Stack>
                </Stack>

                <ArrowForwardIcon fontSize="large" className="icon-orange" />

                <Stack direction="row" spacing={1}>
                  <LocationOnOutlinedIcon
                    fontSize="large"
                    className="icon-orange"
                  />
                  <Stack direction="column">
                    <Typography
                      variant="body2"
                      fontWeight="light"
                      color="text.secondary"
                    >
                      Delivered to
                    </Typography>
                    <Typography variant="body1">user address</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* order and payment info */}
          <Grid container alignItems="center" p="1rem">
            {orderInfo.map((item, idx) => (
              <Grid item container xs={12} my="1rem" key={idx}>
                <Grid item xs={0.5}>
                  <Typography variant="body1">{`${item.quantity_ordered} x`}</Typography>
                </Grid>
                <Grid item flexGrow="1">
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography
                    variant="body2"
                    fontWeight="light"
                    color="text.secondary"
                  >
                    {item.user_note}
                  </Typography>
                </Grid>
                <Grid item xs={2} container justifyContent="flex-end">
                  <Typography
                    variant="body2"
                    fontWeight="light"
                  >{`S$ ${item.item_price}`}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ mx: "0.5rem", mb: "1rem" }}></Divider>

          <Grid container alignItems="center" p="1rem">
            <Grid item xs={9}>
              <Typography
                variant="body2"
                fontWeight="light"
              >{`Subtotal (${orderInfo.length} items)`}</Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end">
              <Typography variant="body2" fontWeight="bold">
                {`S$ ${(Number(orderInfo[0]?.total_price) - 1).toFixed(2)}`}
              </Typography>
            </Grid>
            <Grid item xs={9} mt="1rem">
              <Typography variant="body2" fontWeight="light">
                Delivery Fee
              </Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end" mt="1rem">
              <Typography variant="body2" fontWeight="bold">
                S$ 1.00
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body2" fontWeight="bold" mt="1rem">
                Total
              </Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end" mt="1rem">
              <Typography variant="body2" fontWeight="bold">
                {`S$ ${orderInfo[0]?.total_price}`}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ m: "0.5rem" }}></Divider>

          <ConsecutiveSnackbars />
        </Box>
      </Box>

      {userCtx?.role === "CUSTOMER" && <OrderToaster></OrderToaster>}
    </>
  );
};

export default HistoryDetail;
