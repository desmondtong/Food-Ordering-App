import React from "react";
import NavBar from "../components/NavBar";

import { Typography, Box } from "@mui/material";

const RatingReview: React.FC = () => {
  return (
    <>
      {" "}
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Typography>Review</Typography>
        </Box>
      </Box>
    </>
  );
};

export default RatingReview;
