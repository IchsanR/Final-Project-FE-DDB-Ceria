import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Logo from "../atom/Logo";
import { Link, useNavigate } from "react-router-dom";
import { userAvatar } from "../../assets";
import { Toolbar, Typography } from "@mui/material";

const drawerWidth = 300;

function ResponsiveDrawer({ window, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || sessionStorage.getItem("name");
  const email = localStorage.getItem("email") || sessionStorage.getItem("email");

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.clear();
    sessionStorage.clear();
    return navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className="flex justify-center items-center mx:h-20 h-16">
        <Logo width={"md:w-[90px] w-[60px]"} height={"md:h-[30px] h-[20px]"} />
      </div>
      <List>
        <Link>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary={"Transaction"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding onClick={(e) => handleLogout(e)}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        className={`md:shadow-none bg-white border h-20 text-black sm:w-[calc(100% - ${drawerWidth}px)] sm:ml-[${drawerWidth}px]`}
      >
        <div className="p-5 flex justify-between sm:flex-row-reverse">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
            className="text-black"
          >
            <MenuIcon />
          </IconButton>
          <div className="flex items-center">
            <img src={userAvatar} alt="user" className="w-9 sm:w-12 h-9 sm:h-12" />
            <div className="ml-3">
              <p>{name}</p>
              <p className="text-slate-500">{email}</p>
            </div>
          </div>
        </div>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;