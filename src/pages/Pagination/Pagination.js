/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import * as React from "react";
import { useEffect, useRef, useState } from "react";
// import MailIcon from "@mui/icons-material/Mail";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Advanced from "./Advanced";
import Basic from "./Basic";
import Test1 from "./Test1";

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
            <ListItemButton onClick={() => onclickHandler("basic")}>
              <ListItemText primary="basic" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => onclickHandler("advanced")}>
              <ListItemText primary="advanced" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => onclickHandler("test1")}>
              <ListItemText primary="test1" />
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
        {currentPaginationView === "basic" && <Basic />}
        {currentPaginationView === "advanced" && <Advanced />}
        {currentPaginationView === "test1" && <Test1 />}
      </Box>
    </Box>
  );
};

const PaginationView = () => {
  return <LeftNavBar />;
};

export default PaginationView;
