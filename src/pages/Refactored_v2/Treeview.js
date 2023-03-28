/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeView from "@mui/lab/TreeView";

import action from "./actions";
import { convertJsonToTree } from "./helper";
import renderTree from "./renderTreeItem";

const TreeViewR2 = () => {
  const [foldersTree, setFoldersTree] = useState([]);

  const { fetchRootFolders } = action();

  const initFetchedRef = useRef(false);

  // init fetch
  useEffect(() => {
    if (initFetchedRef.current) return;
    console.log("init fetch");
    fetchRootFolders().then((result) => {
      const rootTree = convertJsonToTree(result);
      console.log(rootTree);
      setFoldersTree(rootTree);
    });
    initFetchedRef.current = true;
  });

  return (
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {foldersTree.map((item) => {
        return renderTree(item);
      })}
    </TreeView>
  );
};

export default TreeViewR2;
