import React, { useContext } from "react";
import NavBar from "../components/NavBar";

import { Typography, Box } from "@mui/material";
import TopBar from "../components/TopBar";
import UserContext from "../context/user";

const Dashboard: React.FC = () => {
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
          <br />
          <Typography>Dashboard</Typography>
          {JSON.stringify(userCtx?.activeOrderId)}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
