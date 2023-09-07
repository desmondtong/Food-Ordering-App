import React from "react";
import NavBar from "../components/NavBar";

import { Typography, Box } from "@mui/material";

const Menu: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Typography>Menu</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Menu;
