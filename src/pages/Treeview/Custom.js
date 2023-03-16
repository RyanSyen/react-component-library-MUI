/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useCallback, useEffect, useRef, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TreeItem, {
  //   TreeItemContentProps,
  //   TreeItemProps,
  useTreeItem,
} from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { styled as muiStyles } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import clsx from "clsx";

import TreeViewHelper from "./helper";

const CustomTreeItem = muiStyles(props => <TreeItem {...props} />)({
  "& .MuiTreeItem-content": {
    flexDirection: "row-reverse",
  },
  "& .MuiTreeItem-content:hover": {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
});

const UnCollapse = muiStyles(props => <ChevronRightIcon {...props} />)({
  "&:hover": {
    color: "rgba(21, 115, 255, 1)",
  },
});

const Collpase = muiStyles(props => <ExpandMoreIcon {...props} />)({
  "&:hover": {
    color: "rgba(21, 115, 255, 1)",
  },
});

const Custom = () => {
  const [data, setData] = useState([]);
  const dataFetchedRef = useRef(false);
  const [expandedd, setExpandedd] = useState([]);
  const expandedRef = useRef(false);
  const currentFolderNode = useRef({});

  useEffect(() => {
    console.log(data);
    if (dataFetchedRef.current) return;
    const newData = TreeViewHelper.tree;
    console.log(newData);
    setData(newData);
    dataFetchedRef.current = true;
  }, []);

  const TreeHook = id => {
    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(id);

    const hook = {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    };

    const handleClick = (node, event) => {
      const { id } = node;
      //! clash of hooks
      //   TreeHook(id).preventSelection(event);
      currentFolderNode.current = node;
      console.log(`clicked ${id}`);
    };

    const handleToggle = (e, nodeId) => {
      // console.log(nodeIds);
      console.log(nodeId);
      // setExpanded(nodeIds);
      // > handle toggle got error: need to execute toggle only when clicking the icon and not the other div
      if (expandedd.includes(nodeId)) {
        setExpandedd(expandedd.filter(id => id !== nodeId));
        console.log(expandedd);
      } else {
        setExpandedd([...expandedd, nodeId]);
      }
    };

    const checkExpanded = nodes => {
      console.log(nodes);
      console.log(expandedd);
      const { id } = nodes;
      const isExpanded = expandedd.some(item => item === id);
      return isExpanded;
    };

    return hook;
  };

  const handleMouseDown = (event, id) => {
    TreeHook(id).preventSelection(event);
  };

  const handleExpansionClick = event => {
    handleExpansion(event);
  };

  const handleSelectionClick = event => {
    handleSelection(event);
  };

  const customTreeeItem = props => (
    <CustomTreeItem
      //   classes={classes}
      //   className={clsx(className, {
      //     [classes.expanded]: TreeHook(props.id).expanded,
      //     [classes.selected]: TreeHook(id).selected,
      //     [classes.focused]: TreeHook(id).focused,
      //     [classes.disabled]: TreeHook(id).disabled,
      //     // [classes.expanded]: expanded,
      //     // [classes.selected]: selected,
      //     // [classes.focused]: focused,
      //     // [classes.disabled]: disabled,
      //   })}
      key={props.id}
      nodeId={props.id}
      label={
        // <div
        //   //   className={classes.content}
        //   onMouseDown={handleMouseDown}
        //   //   ref={containerRef}
        // >
        //   <Typography
        //     onClick={handleSelectionClick}
        //     component="div"
        //     // className={classes.label}
        //   >
        //     {props.name}
        //   </Typography>
        //   <div
        //     onClick={handleExpansionClick}
        //     //   className={classes.iconContainer}
        //   >
        //     {checkExpanded(props) ? (
        //       <Collpase onClick={() => handleToggle(props.id)} />
        //     ) : (
        //       <UnCollapse onClick={() => handleToggle(props.id)} />
        //     )}
        //   </div>
        // </div>

        <div
          onMouseDown={handleMouseDown(props.id)}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            // onClick={handleSelectionClick}
            onClick={() => handleClick(props)}
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
              {`${props.name} + ${props.id}`}
            </Typography>
          </div>
          {props.count.folder !== "0" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "5px 0",
              }}
            >
              {/* only show icon when expand */}
              {checkExpanded(props) ? (
                <Collpase onClick={() => handleToggle(props.id)} />
              ) : (
                <UnCollapse onClick={() => handleToggle(props.id)} />
              )}
            </div>
          )}
        </div>
      }
      //   onClick={() => {
      //     if (containerRef.current === document.activeElement) {
      //       handleExpansionClick();
      //     } else {
      //       handleSelectionClick();
      //     }
      //   }}
      //   onIconClick={handleExpansionClick}
      //   {...props}
    >
      {Array.isArray(props.children)
        ? props.children.map(nodes => customTreeeItem(nodes))
        : null}
    </CustomTreeItem>
  );

  return (
    <TreeView
      aria-label="icon expansion"
      //   defaultCollapseIcon={<ExpandMoreIcon />}
      //   defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {data.map(item => {
        return customTreeeItem(item);
      })}
    </TreeView>
  );
};

export default Custom;
