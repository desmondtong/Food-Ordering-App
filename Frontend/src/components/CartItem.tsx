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
    if (isAdd) {
      // add quantity; cap at 50
      quantity == 50 ? undefined : setQuantity(quantity + 1);
    } else {
      // reduce quantity; cap at 1
      quantity == 1 ? undefined : setQuantity(quantity - 1);
    }

    updateItemsQuantity(isAdd ? quantity + 1 : quantity - 1);
  };

  // endpoint
  const deleteCartItem = async () => {
    const res: data = await fetchData(
      "/api/carts/items/" + props.item_id,
      "DELETE",
      {
        cart_id: props.cart_id,
        id: props.id,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      props.getCartItems?.();
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
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
      props.getCartItems?.();
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
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
          //add image_url from backend!!!
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
              >
                -
              </Button>
              {/* <Typography mx="2rem">{quantity}</Typography> */}
              <Button disabled className="disabled-btn">
                {quantity}
              </Button>
              <Button
                variant="contained"
                onClick={() => handleUpdateQuantity()}
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
