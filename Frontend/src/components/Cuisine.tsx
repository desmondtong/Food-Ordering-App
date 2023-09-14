import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Props } from "../interfaces";
import { CardActionArea } from "@mui/material";

const Cuisine: React.FC<Props> = (props) => {
  return (
    <>
      {/* add card media action */}
      <Card
        sx={{ display: "flex", borderRadius: "0.5rem" }}
        elevation={0}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{
              aspectRatio: 1,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            image={`./${props.category}.jpg`}
            id={props.category}
          />
        </CardActionArea>
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
