import React, { useState, useContext, useRef } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Tooltip,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Grid,
  Button,
  InputAdornment,
  Divider,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Props, data } from "../interfaces";

const ItemCard: React.FC<Props> = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [openUpdate, setOpenUpdate] = useState<boolean>(false); // model
  const [openAddCart, setOpenAddCart] = useState<boolean>(false); // model
  const [category, setCategory] = useState<string>("");
  const [availability, setAvailability] = useState<boolean>();
  const [quantity, setQuantity] = useState<any>(1);

  const nameRef = useRef<HTMLInputElement>();
  const priceRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();
  const userNoteRef = useRef<HTMLInputElement>();

  // function
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
    setCategory(props.category);
    setAvailability(props.availability);
  };

  const handleOpenAdd = () => {
    setOpenAddCart(true);
    setQuantity(1);
  };

  // endpoint
  const handleUpdate = async () => {
    const res: data = await fetchData(
      "/api/items/" + props.uuid,
      "PATCH",
      {
        name: nameRef.current?.value,
        item_price: priceRef.current?.value,
        image_url: "./sample-image.webp",
        description: descriptionRef.current?.value,
        category: category,
        availability: availability,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      setOpenUpdate(false);

      props.setUpdate?.(!props.update);
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      alert(JSON.stringify(res.data));
    }
  };

  const handleDelete = async () => {
    const res: data = await fetchData(
      "/api/items/" + props.uuid,
      "DELETE",
      undefined,
      userCtx?.accessToken
    );

    if (res.ok) {
      setOpenUpdate(false);

      props.setUpdate?.(!props.update);
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      alert(JSON.stringify(res.data));
    }
  };

  const handleAddToCart = async () => {
    // check extg cart items' vendor
    const resGet: data = await fetchData(
      "/api/carts/" + userCtx?.userId,
      "POST",
      undefined,
      userCtx?.accessToken
    );

    if (resGet.ok) {
      if (resGet.data.vendor_id && props.vendor_id !== resGet.data.vendor_id) {
        return alert(
          JSON.stringify(
            "Sorry, you can only add items from the same vendor to your cart at a time."
          )
        );
      }
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(resGet.data));
    }

    // if empty or same vendor, add to cart
    const res: data = await fetchData(
      "/api/carts/items/" + props.uuid,
      "PUT",
      {
        cart_id: userCtx?.userInfo.cart_id,
        item_price: props.item_price,
        quantity_ordered: quantity,
        user_note: userNoteRef.current?.value,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      console.log("added to cart");
      setOpenAddCart(false);
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      alert(JSON.stringify(res.data));
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          borderRadius: "1rem",
          bgcolor: props.availability ? undefined : "var(--lightgrey)",
        }}
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
          image={props.image_url}
        />

        {userCtx?.role === "VENDOR" ? (
          <Tooltip title="Edit Item">
            <IconButton
              className="edit-btn"
              size="small"
              sx={{ m: "0.4rem" }}
              style={{ backgroundColor: "var(--orange)" }}
              onClick={handleOpenUpdate}
            >
              <BorderColorOutlinedIcon
                fontSize="small"
                sx={{ p: "0.1rem", color: "white" }}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={props.availability ? "Add To Cart" : ""}>
            <IconButton
              className="edit-btn"
              size="small"
              sx={{ m: "0.4rem", boxShadow: 3 }}
              style={{
                backgroundColor: props.availability
                  ? "var(--white)"
                  : "var(--lightgrey)",
              }}
              onClick={props.availability ? handleOpenAdd : undefined}
            >
              <AddIcon
                fontSize="small"
                sx={{ p: "0.1rem" }}
                className="icon-orange"
              />
            </IconButton>
          </Tooltip>
        )}
        {!props.availability && (
          <Paper
            component={Stack}
            sx={{ width: "20%", height: "30%", bgcolor: "var(--orange)" }}
            className="sold-out"
            direction="column"
            justifyContent="center"
          >
            <Typography textAlign="center" color="var(--white)">
              Sold Out
            </Typography>
          </Paper>
        )}
      </Card>

      {/* update item modal */}
      <Dialog
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        scroll="body"
      >
        <CardMedia
          component="img"
          sx={{
            aspectRatio: 1.5,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          image={`./${props.image_url}`}
          id={props.category}
        />
        <DialogContent>
          <Divider sx={{ borderStyle: "solid" }} />
          <DialogContentText my="1rem">Item Details</DialogContentText>
          <TextField
            autoFocus
            required
            margin="normal"
            id="name"
            label="Name"
            type="text"
            fullWidth
            defaultValue={props.name}
            inputRef={nameRef}
          />
          <TextField
            autoFocus
            required
            margin="normal"
            id="price"
            label="Price"
            type="number"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">S$</InputAdornment>
              ),
            }}
            defaultValue={props.item_price}
            inputRef={priceRef}
          />
          <TextField
            required
            select
            margin="normal"
            id="category"
            label="Category"
            type="text"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {props.categories?.map((item, idx) => (
              <MenuItem key={idx} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            select
            margin="normal"
            id="availability"
            label="Availability"
            type="text"
            fullWidth
            value={availability ? "Yes" : "No"}
            onChange={(e) =>
              setAvailability(e.target.value === "Yes" ? true : false)
            }
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            autoFocus
            required
            margin="normal"
            id="description"
            label="Description"
            multiline
            rows={2}
            type="text"
            fullWidth
            defaultValue={props.description}
            inputRef={descriptionRef}
          />
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setOpenUpdate(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} height="2rem"></Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={handleDelete}>
                Delete Item
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      {/* add to cart modal */}
      <Dialog
        open={openAddCart}
        onClose={() => setOpenAddCart(false)}
        scroll="body"
        fullWidth
      >
        <CardMedia
          component="img"
          sx={{
            aspectRatio: 1.5,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          image={`./${props.image_url}`}
          id={props.category}
        />
        <DialogContent>
          <Grid container alignItems="center">
            <Grid item xs={9}>
              <Typography variant="body1">{props.name}</Typography>
            </Grid>
            <Grid item xs={3} container justifyContent="flex-end">
              <Typography
                fontWeight="light"
                variant="body1"
              >{`S$ ${props.item_price}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="light">
                {props.description}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ borderStyle: "solid", my: "1rem" }} />

          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Typography variant="body1">Special Request</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight="light" mb="1rem">
                Any specific preferences?
              </Typography>
            </Grid>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="e.g No chili"
              inputRef={userNoteRef}
            ></TextField>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Grid container alignItems="center">
            <Grid
              item
              xs={3}
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <IconButton
                onClick={
                  quantity == 0 ? undefined : () => setQuantity(quantity - 1)
                }
              >
                <RemoveIcon
                  fontSize="small"
                  className="icon-orange"
                ></RemoveIcon>
              </IconButton>
              <Typography mx="1rem">{quantity < 0 ? 0 : quantity}</Typography>
              <IconButton
                onClick={
                  quantity == 50 ? undefined : () => setQuantity(quantity + 1)
                }
              >
                <AddIcon fontSize="small" className="icon-orange"></AddIcon>
              </IconButton>
            </Grid>
            <Grid item xs={9}>
              <Button fullWidth variant="contained" onClick={handleAddToCart}>
                Add To Cart
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemCard;
