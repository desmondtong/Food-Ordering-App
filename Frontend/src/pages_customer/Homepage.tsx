import React, { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";

import { Grid, Box, Typography } from "@mui/material";
import TopBar from "../components/TopBar";
import Cuisine from "../components/Cuisine";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { data } from "../interfaces";

const Homepage: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [categories, setCategories] = useState<String[]>([]);

  // endpoint
  const getCategories = async () => {
    const res: data = await fetchData(
      "/api/categories",
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
    getCategories();
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
            <Grid item xs={8} sx={{ borderStyle: "solid" }}>
              BANNER 1
            </Grid>
            <Grid item xs={4} sx={{ borderStyle: "solid" }}>
              BANNER 2
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Cuisines
              </Typography>
            </Grid>
            {categories.map((category, idx) => (
              <Grid item xs={1.5} key={idx}>
                <Cuisine category={category}></Cuisine>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Restaurants
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
