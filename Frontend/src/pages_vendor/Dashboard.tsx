import React, { useContext } from "react";
import NavBar from "../components/NavBar";

import { Typography, Box, Stack } from "@mui/material";
import TopBar from "../components/TopBar";
import UserContext from "../context/user";
import EngineeringIcon from "@mui/icons-material/Engineering";

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
            {/* <Typography>{JSON.stringify(userCtx?.activeOrderId)}</Typography> */}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
