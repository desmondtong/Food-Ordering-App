import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Grid,
  Card,
  CardMedia,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { OrderInfo, Props, data } from "../interfaces";

import StarIcon from "@mui/icons-material/Star";
import ItemCard from "../components/ItemCard";
import OrderToaster from "../components/OrderToaster";
import ReviewAbout from "../components/ReviewAbout";

const RestaurantDetails: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const params = useParams();

  const [itemInfo, setItemInfo] = useState<Props[]>([]);
  const [vendorInfo, setVendorInfo] = useState<Props>({});
  const [categories, setCategories] = useState<string[]>([]);

  const [reviewInfo, setReviewInfo] = useState<OrderInfo>([]);
  const [displayInfo, setDisplayInfo] = useState<boolean>(false);

  // function
  const handleDisplayInfo = () => {
    getOrdersByVendorId();
    setDisplayInfo(true);
  };

  // endpoint
  const getItemInfo = async () => {
    const res: data = await fetchData(
      "/api/items/" + params.item,
      undefined,
      undefined,
      userCtx?.accessToken
    );

    if (res.ok) {
      setItemInfo(res.data);
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  const getVendorInfo = async () => {
    const res: data = await fetchData(
      "/auth/accounts/" + params.item,
      undefined,
      undefined,
      userCtx?.accessToken
    );

    if (res.ok) {
      setVendorInfo(res.data);
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  const getCategories = async () => {
    const res: data = await fetchData(
      "/api/items/categories/" + params.item,
      undefined,
      undefined,
      userCtx?.accessToken
    );

    if (res.ok) {
      setCategories(res.data);
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  const getOrdersByVendorId = async () => {
    const res: data = await fetchData(
      "/api/orders/items/vendor_id",
      "POST",
      {
        vendor_id: params.item,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      getOrderByOrderId(res.data.order_id);
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  const getOrderByOrderId = async (orderIdArr: string[]) => {
    const res: data = await fetchData(
      "/api/orders/items/order_id",
      "POST",
      orderIdArr,
      userCtx?.accessToken
    );

    if (res.ok) {
      if (res.data.length) {
        //filter orders only with rating or review
        const orderInfo = res.data;
        const filteredOrderInfo = orderInfo.filter(
          (item: any) => item[0].rating || item[0].review
        );
        setReviewInfo(filteredOrderInfo);
      }
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getItemInfo();
    getCategories();
    getVendorInfo();
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
            <Grid item xs={12} my="1.5rem">
              <Card
                sx={{ display: "flex", borderRadius: "1rem" }}
                elevation={0}
              >
                <CardMedia
                  component="img"
                  alt="image title"
                  sx={{
                    aspectRatio: 3,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  image="../public/WESTERN.jpg"
                />
              </Card>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h4">{vendorInfo.store_name}</Typography>
            </Grid>
            <Grid
              item
              xs={2}
              // sx={{ borderStyle: "solid" }}
              container
              direction="row"
              justifyContent="flex-end"
            >
              {displayInfo ? (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setDisplayInfo(false)}
                >
                  Back
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleDisplayInfo}
                >
                  Review & Info
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid container alignItems="center">
            <Grid item xs={12} container alignItems="center" mb="0.3rem">
              <StarIcon
                sx={{ fontSize: "1rem", mr: "0.3rem", color: "var(--orange)" }}
              ></StarIcon>
              <Typography variant="body2" component="div" fontWeight="light">
                {vendorInfo.rating}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="light">
                {vendorInfo.category}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ borderWidth: "0.1rem", my: "1rem" }}></Divider>

          {/* reviews and about */}
          {displayInfo ? (
            <ReviewAbout
              reviewInfo={reviewInfo}
              vendorInfo={vendorInfo}
            ></ReviewAbout>
          ) : (
            <>
              {/* nest map for categories of item to display items */}
              {categories.map((cat, idx) => (
                <Grid container key={idx} spacing={3} mt="1.5rem">
                  <Grid item xs={12}>
                    <Typography variant="h5">{cat}</Typography>
                  </Grid>
                  {itemInfo
                    .filter((item) => item.category === cat)
                    .map((item, idx) => (
                      <Grid item xs={6} key={idx}>
                        <ItemCard
                          name={item.name}
                          description={item.description}
                          item_price={item.item_price}
                          uuid={item.uuid}
                          availability={item.availability}
                          category={item.category}
                          vendor_id={params.item}
                          image_url={item.image_url}
                        ></ItemCard>
                      </Grid>
                    ))}
                </Grid>
              ))}
            </>
          )}
        </Box>
      </Box>

      <OrderToaster></OrderToaster>
    </>
  );
};

export default RestaurantDetails;
