import React, { useState, useContext, useRef, useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Grid,
  Button,
  InputAdornment,
  Divider,
  MenuItem,
} from "@mui/material";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

import IconButton from "@mui/material/IconButton";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Props, data } from "../interfaces";

const ItemCard: React.FC<Props> = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [openUpdate, setOpenUpdate] = useState<boolean>(false); // model
  const [category, setCategory] = useState<string>("");
  const [availability, setAvailability] = useState<string>("");

  const nameRef = useRef<HTMLInputElement>();
  const priceRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();

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
    console.log(props.uuid);
  };

  useEffect(() => {
    setCategory(props.category);
    setAvailability(props.availability);
  }, []);

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
            onClick={() => setOpenUpdate(true)}
          >
            <BorderColorOutlinedIcon
              fontSize="small"
              sx={{ p: "0.1rem", color: "white" }}
            />
          </IconButton>
        </Tooltip>
      </Card>

      {/* add item modal */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
        <DialogTitle>SHOW EXTG PICTURE</DialogTitle>
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
            onChange={(e) => setAvailability(e.target.value)}
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
    </>
  );
};

export default ItemCard;
