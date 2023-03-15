/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
// import * as React from "react";
// import { SWMIcon } from "react-swm-icon-pack";
import React, { useEffect, useRef, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import TreeViewHelper from "./helper";

const CustomTreeItem = styled(props => <TreeItem {...props} />)({
  "& .MuiTreeItem-content": {
    flexDirection: "row-reverse",
  },
});

const UnCollapse = styled(props => <ChevronRightIcon {...props} />)({
  "&:hover": {
    color: "rgba(21, 115, 255, 1)",
  },
});

const Collpase = styled(props => <ExpandMoreIcon {...props} />)({
  "&:hover": {
    color: "rgba(21, 115, 255, 1)",
  },
});

const RichObjectTreeView = () => {
  const [data, setData] = useState([]);
  const dataFetchedRef = useRef(false);
  const [expanded, setExpanded] = useState([]);
  const expandedRef = useRef(false);
  const currentFolderNode = useRef({});

  const newObj = {
    id: "63fc75bb4e2a0af4916635b5",
    name: "new folder",
    createdAt: "2023-02-27T09:19:55Z",
    updatedAt: "2023-02-27T09:19:55Z",
    parentId: null,
    breadcrumb: "3.3",
    count: {
      folders: "0",
    },
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    const newData = TreeViewHelper.tree;
    setData(newData);
    dataFetchedRef.current = true;
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const actions = (() => {
    const addFolder = () => {
      const newData = [...data];
      const currentNode = currentFolderNode.current;
      const newNode = currentNode;

      // just to see how it looks like
      // replace the level 0 folder with the new folder
      const newCurrentNode = newData.find(item => item.id === currentNode.id);
      newObj.parentId = currentNode.id;
      newCurrentNode.count.folder = "1";
      newCurrentNode.children.push(newObj);
      setData(newData);

      // add new folder
      //   const currentNode = currentFolderNode.current;
      //   console.log(currentNode);
      //   TreeViewHelper.updateNode(currentNode.id, currentNode => {
      //     (currentNode.id = "63fc75bb4e2a0af4916635b5"),
      //       (currentNode.name = "new folder"),
      //       (currentNode.createdAt = "2023-02-27T09:19:55Z"),
      //       (currentNode.updatedAt = "2023-02-27T09:19:55Z"),
      //       (currentNode.parentId = null),
      //       (currentNode.breadcrumb = "3.3"),
      //       (currentNode.count.folders = "0");
      //   });
    };

    return {
      addFolder,
    };
  })();

  const handleClick = node => {
    const { id } = node;
    currentFolderNode.current = node;
    console.log(`clicked ${id}`);
  };

  const handleToggle = nodeId => {
    // console.log(nodeIds);
    // setExpanded(nodeIds);
    // > handle toggle got error: need to execute toggle only when clicking the icon and not the other div
    if (expanded.includes(nodeId)) {
      setExpanded(expanded.filter(id => id !== nodeId));
    } else {
      setExpanded([...expanded, nodeId]);
    }
  };

  const checkExpanded = nodes => {
    const { id } = nodes;
    const isExpanded = expanded.some(item => item === id);
    return isExpanded;
  };

  const renderTree = nodes => (
    <CustomTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      // label={nodes.name}
      label={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            onClick={() => handleClick(nodes)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px 0",
            }}
          >
            <FolderOutlinedIcon sx={{ marginRight: "8px" }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: "inherit", flexGrow: "1" }}
            >
              {`${nodes.name} + ${nodes.id}`}
            </Typography>
          </div>
          {nodes.count.folder !== "0" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "5px 0",
              }}
            >
              {/* only show icon when expand */}
              {checkExpanded(nodes) ? null : (
                <Collpase onClick={() => handleToggle(nodes.id)} />
              )}
            </div>
          )}
        </div>
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map(node => renderTree(node))
        : null}
    </CustomTreeItem>
  );

  return (
    <>
      <Button
        className="XyanButton"
        onClick={actions.addFolder}
        variant="contained"
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.46px",
          borderRadius: "20px",
          marginBottom: "25px",
        }}
      >
        Add New
      </Button>

      <TreeView
        aria-label="rich object"
        //   defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        // defaultExpandIcon={<ChevronRightIcon />}
        sx={{
          // height: 110,
          flexGrow: 1,
          maxWidth: 400,
          overflowY: "auto",
        }}
        //   className={classes.root}
        // expanded={expanded}
        // onNodeToggle={handleToggle}
      >
        {/* {renderTree(data)} */}
        {data.map(item => {
          return renderTree(item);
        })}
      </TreeView>
    </>
  );
};

export default RichObjectTreeView;
