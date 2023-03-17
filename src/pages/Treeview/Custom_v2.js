/* eslint-disable array-callback-return */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */

import React, { useCallback, useEffect, useRef, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem, { useTreeItem } from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { Button, Typography } from "@mui/material";
import clsx from "clsx";
import { node } from "prop-types";

import TreeViewHelper from "./helper";

const newObj = {
  id: "63fc75bb4e2a0af4916635b5",
  name: "new folder",
  createdAt: "2023-02-27T09:19:55Z",
  updatedAt: "2023-02-27T09:19:55Z",
  parentId: null,
  breadcrumb: "3.3",
  count: {
    folder: "0",
  },
  children: [],
};

const Custom2 = () => {
  const [info, setInfo] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState([]);
  const dataFetchedRef = useRef(false);
  const currentFolderNodeRef = useRef({});

  const logDataStateChange = newData => {
    console.log("Updated State:", newData);
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    const newData = TreeViewHelper.tree;
    console.log(newData);
    setInfo(newData);
    dataFetchedRef.current = true;
  }, []);

  //   useEffect(() => {
  //     console.log(info);
  //   }, [info]);

  //   useEffect(() => {
  //     console.log(expandedNodes);
  //   }, [expandedNodes]);

  const actions = (() => {
    const addFolder = () => {
      const newData = [...info];
      const currentNode = currentFolderNodeRef.current;
      const newNode = currentNode;
      console.log(newData);
      console.log(currentNode);

      const newCurrentNode = traverseTree(newData, currentNode);
      console.log(newCurrentNode);
      newObj.parentId = currentNode;
      // newObj.parentId = currentNode.id;
      newCurrentNode.count.folder = "1";
      // if (!newCurrentNode.children) {
      //   newCurrentNode.children = [];
      // }
      newCurrentNode.children.push(newObj);
      setInfo(newData);
    };
    const traverseTree = (nodes, targetNodeId) => {
      for (const node of nodes) {
        if (node.id === targetNodeId) {
          console.log(node);
          return node;
        }
        if (node.children && node.children.length > 0) {
          // recursively traverse all children of the current node
          console.log(node.children);
          const result = traverseTree(node.children, targetNodeId);
          // to prevent function from continuing to execute after return statement, add return statement before recursive call. It will stop executing when the result / target node is found
          if (result) {
            return result;
          }
        }
      }
    };
    return {
      addFolder,
    };
  })();

  // React.forwardRef is used to create ref to the DOM node
  const CustomContent = React.forwardRef(function CustomContent(props, ref) {
    // classes and className are styles passed down from the parent TreeView
    // nodeId is used to manage the item state
    // icon, expansionIcon, displayIcon are props passed from parent TreeView to specify the icons that are used to represent the item's state

    //* In order to pass custom props, use ContentProps as it will be merged with the original TreeItemContentProps
    // https://stackoverflow.com/questions/69481071/material-ui-how-to-pass-custom-props-to-a-custom-treeitem#:~:text=Use%20ContentProps%20props%2C%20it%20will%20be%20merged%20with%20the%20original%20TreeItemContentProps

    const {
      classes,
      className,
      nodeId,
      label,
      icon: iconProp,
      expansionIcon,
      displayIcon,
      folders,
    } = props;

    // custom hook to manage item's state
    // the hook takes the nodeId as param and returns an obj with various properties and func
    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(nodeId);

    // selects appropriate icon based on `iconProp`, `expansionIcon`, and `displayIcon` props
    const icon = iconProp || expansionIcon || displayIcon;

    // console.log(`expanded: ${expanded}`);

    // called when user clicks on TreeItem and prevents the item from being selected by calling the 'preventSelection()' function
    const handleMouseDown = event => {
      preventSelection(event);
    };

    // called when user clicks on the expansion icon and toggles the item's expansion state by calling the 'handleExpansion()' function
    const handleExpansionClick = event => {
      handleExpansion(event);
    };

    // called when user clicks on the TreeItem label and toggles the item's selection state by calling 'handleSelection()' function
    const handleSelectionClick = event => {
      console.log(nodeId);
      currentFolderNodeRef.current = nodeId;
      handleSelection(event);
    };

    // callback fired when items are expanded/collapsed
    const handleToggle = () => {
      if (expandedNodes.includes(nodeId)) {
        setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
        // console.log(expandedNodes);
      } else {
        setExpandedNodes([...expandedNodes, nodeId]);
      }
    };

    return (
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onMouseDown={handleMouseDown}
        ref={ref}
        style={{ flexDirection: "row-reverse" }}
      >
        {/* {console.log(folders === "0")} */}
        {/* //> show icon based on folders */}
        {folders !== "0" && (
          <div
            onClick={() => {
              handleExpansionClick();
              handleToggle();
            }}
            className={classes.iconContainer}
          >
            {expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </div>
        )}
        <Typography
          onClick={handleSelectionClick}
          component="div"
          className={classes.label}
        >
          {`${label} + ${nodeId}`}
        </Typography>
      </div>
    );
  });

  const CustomTreeItem = props => {
    return <TreeItem ContentComponent={CustomContent} {...props} />;
  };

  const renderTreeItems = data => (
    //* CustomTreeItem props api
    // https://mui.com/material-ui/api/tree-item/
    <CustomTreeItem
      key={data.id}
      nodeId={data.id}
      label={data.name}
      ContentProps={{
        folders: data.count.folder,
      }}
    >
      {Array.isArray(data.children)
        ? data.children.map(nodes => [renderTreeItems(nodes)])
        : null}
    </CustomTreeItem>
  );

  return (
    <div>
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
      {info.length > 0 ? (
        <TreeView
          aria-label="icon expansion"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={expandedNodes}
          sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          {info.map(item => {
            return renderTreeItems(item);
          })}
        </TreeView>
      ) : (
        <p>loading ...</p>
      )}
    </div>
  );
};

export default Custom2;
