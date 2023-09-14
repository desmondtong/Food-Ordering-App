import React, { useContext } from "react";
import NavBar from "../components/NavBar";

import { Box, Stack, Grid, CardMedia, Typography, Button } from "@mui/material";
import TopBar from "../components/TopBar";
import OrderAccordian from "../components/OrderAccordian";

import UserContext from "../context/user";
import ConsecutiveSnackbars from "../components/ConsecutiveSnackbars";

const Alert: React.FC = () => {
  const userCtx = useContext(UserContext);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <TopBar></TopBar>
          {userCtx?.orderInfo.length ? (
            <Stack my="2rem" spacing={3}>
              {userCtx?.orderInfo?.map((item, idx) => (
                <OrderAccordian key={idx} orderInfo={item}></OrderAccordian>
              ))}
            </Stack>
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
                  No Active Orders At The Moment..
                </Typography>
              </Grid>
            </>
          )}

          <ConsecutiveSnackbars />
        </Box>
      </Box>
    </>
  );
};

export default Alert;
