import {
  IconButton,
  Grid,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useContext, useState } from "react";

import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import UserContext from "../context/user";

const TopBar: React.FC = () => {
  const userCtx = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const todayDate = new Date().toDateString();

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography variant="h5">{userCtx?.userInfo.store_name}</Typography>
          <Typography variant="body2" fontWeight="light">
            {todayDate}
          </Typography>
        </Grid>
        <Grid item xs={1} container direction="row" justifyContent="flex-end">
          <Tooltip title="Profile">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              style={{ color: "var(--orange)" }}
            >
              <ManageAccountsOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Grid>

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
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={userCtx?.handleLogout}>Logout</MenuItem>
        </Menu>
      </Grid>
    </>
  );
};

export default TopBar;
