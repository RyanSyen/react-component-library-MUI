/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import ElevateAppBar from "./Elevate";
import DrawerAppBar from "./Responsive";
import HideAppBar from "./Scroll";

const LeftNavBar = () => {
  const drawerWidth = 240;

  const [currentPaginationView, setCurrentPaginationView] = useState("basic");

  const onclickHandler = type => {
    setCurrentPaginationView(type);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Pagination - {currentPaginationView}
          </Typography>
        </Toolbar>
      </AppBar>
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
        <Toolbar />
        <Divider />
        <List>
          <ListItem>
            <ListItemButton onClick={() => onclickHandler("responsive")}>
              <ListItemText primary="responsive" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => onclickHandler("scroll")}>
              <ListItemText primary="scroll" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => onclickHandler("elevate")}>
              <ListItemText primary="elevate" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {currentPaginationView === "responsive" && <DrawerAppBar />}
        {currentPaginationView === "scroll" && <HideAppBar />}
        {currentPaginationView === "elevate" && <ElevateAppBar />}
      </Box>
    </Box>
  );
};

const NavbarView = () => {
  return <LeftNavBar />;
};

export default NavbarView;
