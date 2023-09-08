import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Props } from "../interfaces";

const ItemCard: React.FC<Props> = (props) => {
  return (
    <>
      <Card
        sx={{ display: "flex", borderRadius: "1rem" }}
        elevation={4}
        className="item-card"
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="body1" fontWeight="medium">
              {props.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="light"
              height="2.7rem"
            >
              {props.description}
            </Typography>
            <Typography variant="body2" fontWeight="light">
              S$ {props.item_price}
            </Typography>
          </CardContent>
        </Box>

        <CardMedia
          component="img"
          sx={{ width: "8rem", height: "8rem", p: "1rem" }}
          image="./sample-image.webp"
        />

        <Tooltip title="Edit Item">
          <IconButton
            className="edit-btn"
            size="small"
            sx={{ m: "0.4rem" }}
            style={{ backgroundColor: "var(--orange)" }}
          >
            <BorderColorOutlinedIcon
              fontSize="small"
              sx={{ p: "0.1rem", color: "white" }}
            />
          </IconButton>
        </Tooltip>
      </Card>
    </>
  );
};

export default ItemCard;
