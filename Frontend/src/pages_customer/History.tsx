import React from "react";
import NavBar from "../components/NavBar";

import { Typography, Box } from "@mui/material";
import OrderToaster from "../components/OrderToaster";
import TopBar from "../components/TopBar";
import ConsecutiveSnackbars from "../components/ConsecutiveSnackbars";

const History: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <TopBar></TopBar>
          <ConsecutiveSnackbars />
        </Box>
      </Box>

      <OrderToaster></OrderToaster>
    </>
  );
};

export default History;
