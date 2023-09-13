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
} from "@mui/material";
import React, { useContext, useState } from "react";

import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FaceIcon from "@mui/icons-material/Face";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import UserContext from "../context/user";
import { Props } from "../interfaces";

const TopBar: React.FC<Props> = (props) => {
  const userCtx = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [locationEl, setLocationEl] = useState<null | HTMLElement>(null);

  const todayDate = new Date().toDateString();

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
        <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
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
    </>
  );
};

export default TopBar;
