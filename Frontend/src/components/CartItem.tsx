import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  ButtonGroup,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Props, data } from "../interfaces";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItem: React.FC<Props> = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [quantity, setQuantity] = useState<any>(1);

  // function
  const handleUpdateQuantity = (isAdd = true) => {
    // max cap 50; min cap 1
    const count = Math.max(
      Math.min(isAdd ? quantity + 1 : quantity - 1, 50),
      1
    );

    setQuantity(count); // quantity to display in cart
    updateItemsQuantity(count); // update quantity to cart database
  };

  // endpoint
  const deleteCartItem = async () => {
    const res: data = await fetchData(
      "/api/carts/items/" + props.cart_id,
      "DELETE",
      [
        {
          item_id: props.item_id,
          id: props.id,
        },
      ],
      userCtx?.accessToken
    );

    if (res.ok) {
      userCtx?.getCartItems?.();
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const updateItemsQuantity = async (finalQuantity: any) => {
    console.log(finalQuantity);
    console.log(props.id);
    const res: data = await fetchData(
      "/api/carts/items/" + props.item_id,
      "PATCH",
      {
        quantity_ordered: finalQuantity,
        cart_id: props.cart_id,
        id: props.id,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      userCtx?.getCartItems?.();
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    setQuantity(props.quantity_ordered);
  }, []);

  return (
    <>
      <Card
        sx={{
          display: "flex",
          borderRadius: "1rem",
        }}
        elevation={4}
        className="item-card"
      >
        <CardMedia
          component="img"
          sx={{ width: "10rem", height: "10rem", p: "1rem" }}
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
            <Typography variant="body1" fontWeight="medium">
              {props.name}
            </Typography>
            <Typography variant="body2" fontWeight="light" height="4.5rem">
              S$ {props.item_price}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight="light"
            >
              {`Remark: ${props.user_note || "-"}`}
            </Typography>
          </CardContent>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent
            sx={{
              flex: "1 0 auto",
            }}
          >
            <ButtonGroup size="small" sx={{ alignItems: "center" }}>
              <Button
                variant="contained"
                onClick={() => handleUpdateQuantity(false)}
                color="warning"
              >
                -
              </Button>
              <Button disabled className="disabled-btn">
                {quantity}
              </Button>
              <Button
                variant="contained"
                onClick={() => handleUpdateQuantity()}
                color="warning"
              >
                +
              </Button>
            </ButtonGroup>
          </CardContent>
        </Box>

        <IconButton
          className="delete-btn"
          sx={{ m: "0.5rem" }}
          onClick={deleteCartItem}
        >
          <DeleteOutlineIcon
            className="icon-orange"
            sx={{ fontSize: "1.5rem" }}
          />
        </IconButton>
      </Card>
    </>
  );
};

export default CartItem;
