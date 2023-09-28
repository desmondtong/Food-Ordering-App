import React, { useContext, useState, useEffect, useRef } from "react";
import {
  IconButton,
  Grid,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  Button,
  CardMedia,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FaceIcon from "@mui/icons-material/Face";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { Props, data } from "../interfaces";
import { VisuallyHiddenInput } from "../customStyles";

const TopBar: React.FC<Props> = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [locationEl, setLocationEl] = useState<null | HTMLElement>(null);
  const [vendorProfile, setVendorProfile] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<String>(
    userCtx?.vendorClaims.category
  );

  const storeNameRef = useRef<HTMLInputElement>();
  const descriptionRef = useRef<HTMLInputElement>();
  const addressRef = useRef<HTMLInputElement>();
  const postalCodeRef = useRef<HTMLInputElement>();
  const contactRef = useRef<HTMLInputElement>();

  const todayDate = new Date().toDateString();

  // endpoint
  const handleUpdateProfile = async () => {
    const res: data = await fetchData(
      `/auth/update/profile/${userCtx?.userId}`,
      "PATCH",
      {
        contact: contactRef.current?.value,
        address: addressRef.current?.value,
        postal_code: postalCodeRef.current?.value,
        category,
        store_name: storeNameRef.current?.value,
        description: descriptionRef.current?.value,
        image_url: userCtx?.imageUrl || userCtx?.userInfo.image_url,
      },
      userCtx?.accessToken
    );

    if (res.ok) {
      userCtx?.setVendorClaims({
        contact: contactRef.current?.value,
        address: addressRef.current?.value,
        postal_code: postalCodeRef.current?.value,
        category,
        store_name: storeNameRef.current?.value,
        description: descriptionRef.current?.value,
      });
      localStorage.setItem(
        "vendorClaims",
        JSON.stringify({
          contact: contactRef.current?.value,
          address: addressRef.current?.value,
          postal_code: postalCodeRef.current?.value,
          category,
          store_name: storeNameRef.current?.value,
          description: descriptionRef.current?.value,
        })
      );

      setVendorProfile(false);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const getCategories = async () => {
    const res: data = await fetchData("/api/categories", "GET");

    if (res.ok) {
      setCategories(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {userCtx?.role === "VENDOR" ? (
        <Grid container alignItems="center">
          <Grid item sx={{ flexGrow: 1 }}>
            <Typography variant="h5">
              {userCtx?.vendorClaims.store_name}
            </Typography>
            <Typography variant="body2" fontWeight="light">
              {todayDate}
            </Typography>
          </Grid>
          <Grid item xs={4} container direction="row" justifyContent="flex-end">
            <Tooltip title="Profile">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                style={{ color: "var(--orange)" }}
              >
                <ManageAccountsOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      ) : (
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              onChange={props.handleSearch}
              sx={{
                boxShadow: 3,
                borderRadius: "2rem",
                bgcolor: "var(--lightgrey)",
              }}
              className="search-bar"
            >
              <InputLabel htmlFor="outlined-adornment" sx={{ ml: "0.5rem" }}>
                <Typography>Search</Typography>
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment"
                type="text"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" disabled sx={{ mr: "0.1rem" }}>
                      <SearchOutlinedIcon className="icon-orange" />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search"
                sx={{ borderRadius: "2rem" }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4} container direction="row" justifyContent="flex-end">
            <Tooltip title="Profile">
              <Chip
                icon={<LocationOnOutlinedIcon />}
                label="Location"
                onClick={(e) => setLocationEl(e.currentTarget)}
                sx={{ ml: "0.5rem" }}
              />
            </Tooltip>
            <Tooltip title="Profile">
              <Chip
                icon={<FaceIcon />}
                label={userCtx?.customerClaims.name?.split(" ")[0]}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ ml: "0.5rem" }}
              />
            </Tooltip>
          </Grid>
        </Grid>
      )}

      {/* profile menu popup */}
      <Menu
        sx={{ mt: "2.5rem" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setVendorProfile(true);
            userCtx?.getUserInfo();
          }}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={userCtx?.handleLogout}>Logout</MenuItem>
      </Menu>

      {/* location popup */}
      <Menu
        sx={{ mt: "2.5rem" }}
        id="menu-appbar"
        anchorEl={locationEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(locationEl)}
        onClose={() => setLocationEl(null)}
      >
        <MenuItem onClick={() => setLocationEl(null)}>Location</MenuItem>
      </Menu>

      {/* vendor profile setting popup */}
      <Dialog
        open={userCtx?.role === "VENDOR" && vendorProfile}
        onClose={() => setVendorProfile(false)}
        scroll="body"
      >
        <DialogTitle sx={{ p: 0 }} className="pic-display">
          <Typography my="1rem" ml="1rem" fontSize="24px">
            Business Profile
          </Typography>
          <CardMedia
            component="img"
            sx={{ aspectRatio: 1.5 }}
            image={userCtx?.imageUrl || userCtx?.userInfo.image_url}
          />
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
            Replace Image
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={(e) => userCtx?.displayImage(e)}
            />
          </Button>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="normal"
            id="storename"
            label="Store Name"
            type="text"
            fullWidth
            defaultValue={userCtx?.vendorClaims.store_name}
            inputRef={storeNameRef}
          />
          <TextField
            autoFocus
            required
            margin="normal"
            id="description"
            label="Description"
            placeholder="Tell us more about your store"
            type="text"
            multiline
            rows={3}
            fullWidth
            defaultValue={userCtx?.vendorClaims.description}
            inputRef={descriptionRef}
          />
          <TextField
            required
            select
            margin="normal"
            id="category"
            label="Category"
            type="text"
            fullWidth
            defaultValue={userCtx?.vendorClaims.category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories?.map((item, idx) => (
              <MenuItem key={idx} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            margin="normal"
            id="address"
            label="Address"
            type="text"
            fullWidth
            defaultValue={userCtx?.vendorClaims.address}
            inputRef={addressRef}
          />
          <TextField
            required
            margin="normal"
            id="postalcode"
            label="Postal Code"
            type="text"
            fullWidth
            defaultValue={userCtx?.vendorClaims.postal_code}
            inputRef={postalCodeRef}
          />
          <TextField
            autoFocus
            required
            margin="normal"
            id="contact"
            label="Contact Number"
            type="text"
            fullWidth
            defaultValue={userCtx?.vendorClaims.contact}
            inputRef={contactRef}
          />
          <Grid container alignItems="center"></Grid>
        </DialogContent>
        <DialogActions sx={{ p: "1.5rem" }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleUpdateProfile}
              >
                Save Changes
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setVendorProfile(false);
                  userCtx?.setImageUrl("");
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TopBar;
