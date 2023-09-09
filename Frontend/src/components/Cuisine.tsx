import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Props } from "../interfaces";

const Cuisine: React.FC<Props> = (props) => {
  return (
    <>
      <Card sx={{ display: "flex", borderRadius: "0.5rem" }} elevation={0}>
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            aspectRatio: 1,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          image={`./${props.category}.jpg`}
        />
      </Card>
      <Typography
        variant="subtitle2"
        textAlign="center"
        mt="0.5rem"
        gutterBottom
      >
        {props.category}
      </Typography>
    </>
  );
};

export default Cuisine;
