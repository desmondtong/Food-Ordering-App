import React from "react";
import NavBar from "../components/NavBar";

import { Typography, Box, Stack } from "@mui/material";
import TopBar from "../components/TopBar";
import EngineeringIcon from "@mui/icons-material/Engineering";

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
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="70vh"
          >
            <Typography variant="h4" color="text.secondary">
              {"UNDER MAINTENANCE :("}
            </Typography>
            <EngineeringIcon
              sx={{ color: "var(--orange)", fontSize: "10rem" }}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
