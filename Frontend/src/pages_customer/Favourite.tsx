import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

import { Typography, Box, Grid, CardMedia, Button } from "@mui/material";
import OrderToaster from "../components/OrderToaster";
import TopBar from "../components/TopBar";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import ConsecutiveSnackbars from "../components/ConsecutiveSnackbars";
import { Props, data } from "../interfaces";
import Restaurant from "../components/Restaurant";

const Favourite: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const [favourite, setFavourite] = useState<Props[]>([]);

  // endpoint
  const getFavourites = async () => {
    const res: data = await fetchData(
      "/auth/favourite",
      "POST",
      {
        user_id: userCtx?.userId,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      setFavourite(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getFavourites();
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
          <Grid container mt="1.5rem" alignItems="center" spacing={4}>
            {favourite.length != 0 ? (
              <>
                {favourite.map((item, idx) => (
                  <Grid item xs={3} key={idx}>
                    <Restaurant
                      name={item.store_name}
                      address={item.address}
                      rating={item.rating}
                      uuid={item.uuid}
                      favourite={true}
                      getFavourites={getFavourites}
                      image_url={item.image_url}
                    ></Restaurant>
                  </Grid>
                ))}
              </>
            ) : (
              <>
                <Grid item xs={12} container justifyContent="center" mt="8rem">
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
                    No Favourites Saved
                  </Typography>
                  <Typography
                    textAlign="center"
                    variant="body1"
                    fontWeight="light"
                    color="text.secondary"
                  >
                    Hit the heart icon to save your favorite restaurants here!
                  </Typography>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/")}
                    color="warning"
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

export default Favourite;
