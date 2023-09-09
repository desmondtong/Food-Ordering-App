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
import { Props, data } from "../interfaces";

import StarIcon from "@mui/icons-material/Star";
import ItemCard from "../components/ItemCard";

const RestaurantDetails: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const params = useParams();

  const [itemInfo, setItemInfo] = useState<Props[]>([]);
  const [vendorInfo, setVendorInfo] = useState<Props>({});
  const [categories, setCategories] = useState<string[]>([]);

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
              <Button variant="contained" size="small">
                Review & Info
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ borderWidth: "0.1rem", my: "1rem" }}></Divider>

          <Grid container alignItems="center">
            <Grid item xs={12} container alignItems="center" mb="0.3rem">
              <StarIcon
                sx={{ fontSize: "1rem", mr: "0.3rem", color: "var(--orange)" }}
              ></StarIcon>
              <Typography variant="body2" component="div" fontWeight="light">
                5.0
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="light">
                {vendorInfo.category}
              </Typography>
            </Grid>
          </Grid>

          {/* nest map for categories of item */}
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
                      image_url={"." + item.image_url}
                    ></ItemCard>
                  </Grid>
                ))}
            </Grid>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default RestaurantDetails;
