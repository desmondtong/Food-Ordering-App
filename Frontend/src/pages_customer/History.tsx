import React from "react";
import NavBar from "../components/NavBar";

import { Typography, Box } from "@mui/material";

const History: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Typography>History customer</Typography>
        </Box>
      </Box>
    </>
  );
};

export default History;
