import React from "react";
import NavBar from "../components/NavBar";

import { Box, Stack } from "@mui/material";
import TopBar from "../components/TopBar";
import OrderAccordian from "../components/OrderAccordian";

const Alert: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <TopBar></TopBar>
          <Stack my="2rem">
            <OrderAccordian></OrderAccordian>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Alert;
