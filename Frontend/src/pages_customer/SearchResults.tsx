import React from "react";

import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
// import TopBar from "../components/TopBar";

const SearchResults: React.FC = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          {/* <TopBar></TopBar> */}
        </Box>
      </Box>
    </>
  );
};

export default SearchResults;
