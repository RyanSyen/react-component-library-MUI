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

import Basic from "./Basic";
import Custom from "./Custom";
import Custom2 from "./Custom_v2";
import Custom3 from "./Custom_v3";
import Custom4 from "./Custom_v4";
import CustomDocs from "./CustomDocs";
import Folders from "./Folder";
import RichObjectTreeView from "./RichObj";
import Working from "./Working";

const LeftNavBar = () => {
  const drawerWidth = 240;

  const [currentTreeView, setCurrentTreeView] = useState("basic");

  const onclickHandler = type => {
    setCurrentTreeView(type);
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
            {currentTreeView}
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
          {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
          <ListItem>
            <ListItemButton onClick={() => onclickHandler("basic")}>
              <ListItemText primary="basic" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => onclickHandler("rich-obj")}>
              <ListItemText primary="rich obj" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => onclickHandler("working")}>
              <ListItemText primary="working" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => onclickHandler("custom")}>
              <ListItemText primary="custom" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => onclickHandler("custom-docs")}>
              <ListItemText primary="custom docs" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => onclickHandler("custom_v2")}>
              <ListItemText primary="custom_v2" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => onclickHandler("custom_v3")}>
              <ListItemText primary="custom_v3" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => onclickHandler("custom_v4 with useReducer")}
            >
              <ListItemText primary="custom_v4 with useReducer" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        {/* <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {currentTreeView === "basic" && <Basic />}
        {currentTreeView === "rich-obj" && <RichObjectTreeView />}
        {currentTreeView === "working" && <Working />}
        {currentTreeView === "custom" && <Custom />}
        {currentTreeView === "custom-docs" && <CustomDocs />}
        {currentTreeView === "custom_v2" && <Custom2 />}
        {currentTreeView === "folders" && <Folders />}
        {currentTreeView === "custom_v3" && <Custom3 />}
        {currentTreeView === "custom_v4 with useReducer" && <Custom4 />}
      </Box>
    </Box>
  );
};

const TreeView = () => {
  return <LeftNavBar />;
};

export default TreeView;
