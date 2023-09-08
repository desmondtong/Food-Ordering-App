import React from "react";
import NavBar from "../components/NavBar";

import { Grid, Box, Typography } from "@mui/material";
import TopBar from "../components/TopBar";

const Homepage: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <TopBar></TopBar>
          <Grid container mt="1.5rem" alignItems="center">
            <Grid item xs={8} sx={{ borderStyle: "solid" }}>
              BANNER 1
            </Grid>
            <Grid item xs={4} sx={{ borderStyle: "solid" }}>
              BANNER 2
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4">Cuisines</Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="h4">Restaurants</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
