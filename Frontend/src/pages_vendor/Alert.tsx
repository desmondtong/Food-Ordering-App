import React, { useContext } from "react";
import NavBar from "../components/NavBar";

import { Box, Stack } from "@mui/material";
import TopBar from "../components/TopBar";
import OrderAccordian from "../components/OrderAccordian";

import UserContext from "../context/user";

const Alert: React.FC = () => {
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
          <Stack my="2rem" spacing={3}>
            {userCtx?.userId}
            <br></br>
            {JSON.stringify(userCtx?.orderInfo)}
            {userCtx?.orderInfo?.map((item, idx) => (
              <OrderAccordian key={idx} orderInfo={item}></OrderAccordian>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Alert;
