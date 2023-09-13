import React, { useContext } from "react";
import NavBar from "../components/NavBar";

import { Typography, Box, Button, styled } from "@mui/material";
import TopBar from "../components/TopBar";

import useFetchImg from "../hooks/useFetchImg";
import UserContext from "../context/user";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { data } from "../interfaces";

const HistoryVendor: React.FC = () => {
  const fetchDataImg = useFetchImg();
  const userCtx = useContext(UserContext);

  // endpoint
  const updateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    const input = e.target.files!;

    const formData = new FormData();
    formData.append("image", input[0]);

    const res: data = await fetchDataImg(
      "/api/image/" + "00321deb-3ae1-4f84-874a-c6e434069e84",
      "POST",
      formData,
      userCtx?.accessToken
    );

    console.log(res);
    if (res.ok) {
      console.log("done upload");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <TopBar></TopBar>
          <Typography>History vendor</Typography>

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            href="#file-upload"
            size="small"
            color="warning"
          >
            Upload a file
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={(e) => updateImage(e)}
            />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default HistoryVendor;
