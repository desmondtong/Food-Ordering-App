import React from "react";
import NavBar from "../components/NavBar";

import { Typography, Box } from "@mui/material";
import TopBar from "../components/TopBar";

const Dashboard: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <TopBar></TopBar>
          <br />
          <Typography>Dashboard</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
