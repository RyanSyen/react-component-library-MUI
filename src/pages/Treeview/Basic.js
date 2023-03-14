/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";

/*
  Dependencies
  - @emotion/react
  - @emotion/styled
  - @mui/icons-material
  - @mui/lab **
  - @mui/material **
*/

const Basic = () => {
  return (
    <TreeView
      // follows WAI-ARIA best practices for accessibility
      // screen readers will read this default component label as "tree" which makes it hard to understand the context of the component
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{
        height: 240,
        flexGrow: 1,
        maxWidth: 200,
        // overflowY: "auto"
      }}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
};

export default Basic;
