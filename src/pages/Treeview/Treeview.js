/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import * as React from "react";
import { useState } from "react";
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
import CustomDocs from "./CustomDocs";
import RichObjectTreeView from "./RichObj";
import Working from "./Working";

const LeftNavBar = () => {
  const drawerWidth = 240;

  const [currentTreeView, setCurrentTreeView] = useState("basic");

  //   useEffect(() => {
  //     // console.log(currentTreeView);
  //   }, [currentTreeView]);

  //   const TypesView = type => {
  //     switch (type) {
  //       case "basic":
  //         setCurrentTreeView("basic");
  //         return <Basic />;
  //       case "richobj":
  //         setCurrentTreeView("rich obj");
  //         return <RichObjectTreeView />;
  //       default:
  //         console.error("invalid tree type");
  //         return <Typography>Test</Typography>;
  //     }

  //     return {};
  //   };

  const onclickHandler = type => {
    // switch (type) {
    //   case "basic":
    //     setCurrentTreeView("basic");
    //     return <Basic />;
    //   case "richobj":
    //     setCurrentTreeView("rich obj");
    //     return <RichObjectTreeView />;
    //   default:
    //     console.error("invalid tree type");
    // }
    setCurrentTreeView(type);
    // console.log(type);
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
      </Box>
    </Box>
  );
};

const TreeView = () => {
  return <LeftNavBar />;
};

export default TreeView;
