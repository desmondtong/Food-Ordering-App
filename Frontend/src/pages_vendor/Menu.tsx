import React, { useState, useEffect, useContext, useRef } from "react";

import NavBar from "../components/NavBar";

import {
  Box,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  MenuItem,
  Divider,
  InputAdornment,
  IconButton,
  Tooltip,
  CardMedia,
} from "@mui/material";
import TopBar from "../components/TopBar";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Props, data } from "../interfaces";
import ItemCard from "../components/ItemCard";
import { VisuallyHiddenInput } from "../customStyles";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


const Menu: React.FC = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [categories, setCategories] = useState<string[]>([]);
  const [items, setItems] = useState<Props[]>([]);
  const [displayItem, setDisplayItem] = useState<Props[]>([]);
  const [itemId, setItemId] = useState<String>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false); // model
  const [openCat, setOpenCat] = useState<boolean>(false); // model
  const [addCat, setAddCat] = useState<boolean>(false);

  const [update, setUpdate] = useState<boolean>(false); //

  const nameRef = useRef<HTMLInputElement>();
  const priceRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();
  const newCatRef = useRef<HTMLInputElement>();
  const extgCatRef = useRef<HTMLInputElement>();

  // function
  const handleFilter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const input = e.target as HTMLElement;

    if (input.innerText == "All") {
      setDisplayItem(items);
    } else {
      const filtered = items.filter(
        (item) => item.category === input.innerText
      );
      setDisplayItem(filtered);
    }
  };

  // endpoint
  const getCategories = async () => {
    const res: data = await fetchData(
      "/api/items/categories/" + userCtx?.userId,
      undefined,
      undefined,
      userCtx?.accessToken
    );

    if (res.ok) {
      setCategories(res.data);
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      // if failed to refresh
      alert(JSON.stringify(res.data));
    }
  };

  const getItems = async () => {
    const res: data = await fetchData(
      "/api/items/" + userCtx?.userId,
      undefined,
      undefined,
      userCtx?.accessToken
    );

    if (res.ok) {
      setItems(res.data);
      setDisplayItem(res.data);
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();

      alert(JSON.stringify(res.data));
    }
  };

  const handleAddItem = async () => {
    const res: data = await fetchData(
      "/api/items/" + userCtx?.userId,
      "PUT",
      {
        name: nameRef.current?.value,
        item_price: priceRef.current?.value,
        image_url: userCtx?.imageUrl || "./sample-image.webp",
        description: descriptionRef.current?.value,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      setOpenAdd(false);
      setItemId(res.data.item_id);

      setOpenCat(true);
      userCtx?.setImageUrl("");
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();
      alert(JSON.stringify(res.data));
    }
  };

  const handleAddCat = async () => {
    // getting final category (extg or new category key in by vendor)
    const finalCat = addCat
      ? newCatRef.current?.value
      : extgCatRef.current?.value;

    const res: data = await fetchData(
      "/api/items/categories/" + itemId,
      "PUT",
      {
        category: finalCat,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      setOpenCat(false);

      getCategories();
      getItems();
    } else {
      //attempt to refresh to get new access token
      // userCtx?.refresh();
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getCategories();
    getItems();
    console.log("menu UE");
  }, [update]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar></NavBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <TopBar></TopBar>

          <Grid container mt="1.5rem" alignItems="center">
            <Grid item sx={{ flexGrow: 1 }}>
              <Chip
                label="All"
                sx={{ mr: "0.5rem" }}
                onClick={(e) => handleFilter(e)}
              />
              {categories.map((item, idx) => (
                <Chip
                  label={item}
                  key={idx}
                  sx={{ mr: "0.5rem" }}
                  onClick={(e) => handleFilter(e)}
                />
              ))}
            </Grid>
            <Grid
              item
              xs={2}
              container
              direction="row"
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                size="small"
                onClick={() => setOpenAdd(true)}
              >
                + Add Item
              </Button>
            </Grid>
          </Grid>

          {/* listing */}
          <Grid container mt="0.1rem" alignItems="center" spacing={4}>
            {displayItem.map((item, idx) => (
              <Grid item xs={6} key={idx}>
                <ItemCard
                  name={item.name}
                  description={item.description}
                  item_price={item.item_price}
                  uuid={item.uuid}
                  availability={item.availability}
                  category={item.category}
                  image_url={item.image_url}
                  categories={categories}
                  update={update}
                  setUpdate={setUpdate}
                ></ItemCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* add item modal */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} scroll="body">
        <DialogTitle sx={{ p: 0 }} className="pic-display">
          <CardMedia
            sx={{ height: 600, width: 600 }}
            component="img"
            image={userCtx?.imageUrl}
          ></CardMedia>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            href="#file-upload"
            size="small"
            color="warning"
            className="upload-btn"
            sx={{ m: "1rem" }}
          >
            Add Image
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={(e) => userCtx?.displayImage(e)}
            />
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            my="1rem"
            variant="h5"
            color="var(--darkgrey-text)"
          >
            Item Details
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="normal"
            id="name"
            label="Name"
            type="text"
            fullWidth
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
            inputRef={priceRef}
          />
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
            inputRef={descriptionRef}
          />
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={handleAddItem}>
                Add Item
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setOpenAdd(false);
                  userCtx?.setImageUrl("");
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      {/* select category for item added */}
      <Dialog open={openCat} onClose={() => setOpenCat(false)}>
        <DialogTitle>Select a category for your item</DialogTitle>
        <DialogContent>
          <Divider sx={{ borderStyle: "solid" }} />

          {addCat ? (
            <Grid container alignItems="center">
              <Grid item xs={10}>
                <TextField
                  required
                  margin="normal"
                  id="new category"
                  label="Add New Category"
                  type="text"
                  fullWidth
                  inputRef={newCatRef}
                />
              </Grid>
              <Grid
                item
                container
                xs={2}
                direction="row"
                justifyContent="flex-end"
              >
                <Tooltip title="Cancel Add New Category">
                  <IconButton size="medium" onClick={() => setAddCat(false)}>
                    <RemoveCircleOutlineIcon
                      fontSize="medium"
                      style={{ color: "var(--orange)" }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          ) : (
            <Grid container alignItems="center">
              <Grid item xs={10}>
                <TextField
                  select
                  required
                  margin="normal"
                  id="category"
                  label="Categories"
                  type="text"
                  fullWidth
                  defaultValue=""
                  inputRef={extgCatRef}
                >
                  {categories.map((item, idx) => (
                    <MenuItem key={idx} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                container
                xs={2}
                direction="row"
                justifyContent="flex-end"
              >
                <Tooltip title="Add New Category">
                  <IconButton size="medium" onClick={() => setAddCat(true)}>
                    <AddCircleOutlineIcon
                      fontSize="medium"
                      style={{ color: "var(--orange)" }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={handleAddCat}>
                Add Item
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Menu;
