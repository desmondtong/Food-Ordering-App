import React from "react";
import NavBar from "../components/NavBar";

import { Typography, Box } from "@mui/material";

const Cart: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Typography>Cart</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
