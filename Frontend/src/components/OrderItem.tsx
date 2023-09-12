import React from "react";

import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Stack,
} from "@mui/material";
import { Props } from "../interfaces";

const OrderItem: React.FC<Props> = (props) => {
  return (
    <>
      <Card
        sx={{
          display: "flex",
        }}
        elevation={0}
      >
        <CardMedia
          component="img"
          sx={{ width: "7rem", height: "7rem", p: "1rem" }}
          image={props.image_url}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
          }}
        >
          <CardContent
            sx={{
              flex: "1 0 auto",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={1}
              >
                <Typography variant="body1" fontWeight="medium">
                  {props.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="light"
                >
                  {`Remark: ${props.user_note || "-"}`}
                </Typography>
                <Typography variant="body2" fontWeight="light">
                  {`S$ ${props.item_price}`}{" "}
                  <span style={{ fontWeight: "bold" }}>
                    x {props.quantity_ordered}
                  </span>
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="body2" fontWeight="bold">
                  {`S$ ${(
                    Number(props.item_price!) * Number(props.quantity_ordered!)
                  ).toFixed(2)}`}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default OrderItem;
