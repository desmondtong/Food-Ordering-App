import React from "react";
import NavBar from "../components/NavBar";

import { Typography, Box } from "@mui/material";

const HistoryVendor: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Typography>History vendor</Typography>
        </Box>
      </Box>
    </>
  );
};

export default HistoryVendor;
