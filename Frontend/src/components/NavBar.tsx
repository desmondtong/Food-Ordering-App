import { useContext } from "react";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";

import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import { navBarType } from "../interfaces";
//icons
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const drawerWidth = 280;
const navBarCustomer: navBarType[] = [
  {
    item: "Food",
    link: "/",
    icon: <LocalDiningOutlinedIcon />,
  },
  {
    item: "Cart",
    link: "/cart",
    icon: <ShoppingCartOutlinedIcon />,
  },
  {
    item: "History",
    link: "/history",
    icon: <RestoreIcon />,
  },
  {
    item: "Favourite",
    link: "/favourite",
    icon: <FavoriteBorderIcon />,
  },
];
const navBarVendor: navBarType[] = [
  {
    item: "Dashboard",
    link: "/",
    icon: <DashboardOutlinedIcon />,
  },
  {
    item: "Menu",
    link: "/menu",
    icon: <MenuIcon />,
  },
  {
    item: "History",
    link: "/history",
    icon: <RestoreIcon />,
  },
  {
    item: "Alert",
    link: "/alert",
    icon: <NotificationsNoneIcon />,
  },
  {
    item: "Rating & Reviews",
    link: "/ratingreview",
    icon: <ThumbUpOffAltIcon />,
  },
];

const NavBar = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  // function
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    userCtx?.setAccessToken("");
    userCtx?.setRole("");
    userCtx?.setUserId("");

    if (userCtx?.role === "CUSTOMER") {
      navigate("/");
    } else {
      navigate("/login/vendor");
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        {/* APP ICON */}
        <Typography>App Name</Typography>
      </Toolbar>

      {userCtx?.role === "CUSTOMER" && (
        <List sx={{ flexGrow: 1 }}>
          {navBarCustomer.map((item, idx) => (
            <NavLink
              to={item.link}
              style={{ textDecoration: "none" }}
              key={idx}
            >
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.item} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      )}

      {userCtx?.role === "VENDOR" && (
        <List sx={{ flexGrow: 1 }}>
          {navBarVendor.map((item, idx) => (
            <NavLink
              to={item.link}
              style={{ textDecoration: "none" }}
              key={idx}
            >
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.item} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      )}

      <List>
        <ListItem key={"Logout"} onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavBar;
