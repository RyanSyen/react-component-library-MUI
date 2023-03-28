/* eslint-disable react/no-unstable-nested-components */ // not a good practice to nest components but its suitable for our use case and for small projects

/**
 * lint issues on CustomContent component (all fixed)
 *
 * 1. Visible, non-interactive elements with click handlers must have at least one keyboard listener
 * => lint: jsx-a11y/click-events-have-key-events
 * => follow accessibility guidelines WCAG 2.1.1
 * => scenario: using static elements like div as interactive button
 * => best practice is to use the button element for interactivity
 * => ✔ solution: enforce onClick with one of the following keyboard events: onKeyUp, onKeyDown, OnKeyPress
 * => source/docs: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md
 *
 * 2. Avoid non-native interactive elements. If using native HTML is not possible, add an appropriate role and support for tabbing, mouse, keyboard, and touch inputs to an interactive content element.
 * => lint: jsx-a11y/no-static-element-interactions
 * => scenario: using static elements like div as interactive button
 * => best practice is to use the button element for interactivity
 * => ✔ solution: requires static elements that are also interactive to have a role attribute
 * => source/docs: https://stackoverflow.com/questions/54274473/how-to-fix-static-html-elements-with-event-handlers-require-a-role/54274507#54274507
 *
 * 3. Elements with the 'button' interactive role must be focusable
 * => lint: jsx-a11y/interactive-supports-focus
 * => attribute to handle tab flow
 * => scenario: using static elements like div as interactive button
 * => best practice is to use the button element for interactivity
 * => ✔ solution: add tabIndex (avoid positive value)
 * => source/docs: https://stackoverflow.com/questions/56441825/how-to-fix-button-interactive-role-must-be-focusable
 * => Tabindex Best Practices: https://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html#:~:text=tabindex%20attribute.-,Tabindex%20Best%20Practices,-Here%20are%20some
 *
 * 4. 'prop-types' should be listed in the project's dependencies, not devDependencies
 * => prop-types should only be used for development, hence the lint is disabled for this package
 *
 *
 *
 * */

import React, { forwardRef, useEffect, useRef, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TreeItem, { useTreeItem } from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { Button, Typography } from "@mui/material";
import clsx from "clsx";

import Snackbar from "../../components/Snackbar";
import useSnackbar from "../../hooks/useSnackbar";

import action from "./actions";
import { convertJsonToTree, insertNodes } from "./helper";

const TreeViewR3 = () => {
  const [foldersTree, setFoldersTree] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState([]);

  const initFetchedRef = useRef(false);
  const childFolderRef = useRef([]);
  const treeRef = useRef({});
  const currentFolderId = useRef(null);

  const { fetchRootFolders, fetchChildFolders, addFolder } = action();

  const snackbar = useSnackbar();

  // init fetch
  useEffect(() => {
    if (initFetchedRef.current) return;
    fetchRootFolders().then(result => {
      const rootTree = convertJsonToTree(result);
      treeRef.current = rootTree.tree;
      setFoldersTree(rootTree.root);
    });
    initFetchedRef.current = true;
  }, []);

  const handleAddFolders = () => {
    const updatedTree = addFolder(foldersTree, currentFolderId.current);
    if (updatedTree) {
      // update tree
      setFoldersTree(updatedTree);
      // expand current folder id
      setExpandedNodes([...expandedNodes, currentFolderId.current]);
    } else {
      // can change snackbar color options and alert icon (error/warning/info/success)
      snackbar.open("Select a folder to add", "warning");
    }
  };

  const CustomContent = forwardRef(function CustomContent(props, ref) {
    const {
      classes,
      className,
      nodeId,
      label,
      icon: iconProp,
      expansionIcon,
      displayIcon,
      folders,
      // node, // no need to pass in the entire node
    } = props;

    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(nodeId);

    const handleMouseDown = event => {
      preventSelection(event);
    };

    const handleExpansionClick = event => {
      // > if children exists in ref, then don't fetch data
      const targetNode = childFolderRef.current.find(
        el => el.parentId === nodeId,
      );
      if (!targetNode) {
        fetchChildFolders(nodeId).then(result => {
          const childFolders = result;
          // update child folder reference
          childFolderRef.current = childFolders;
          // get updated tree
          const updatedTree = insertNodes(childFolders, treeRef.current);
          // update tree folders and render UI
          setFoldersTree(updatedTree);
        });
      }
      if (expandedNodes.includes(nodeId)) {
        setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
      } else {
        setExpandedNodes([...expandedNodes, nodeId]);
      }
      handleExpansion(event);
    };

    const handleSelectionClick = event => {
      console.log(`return folderId: ${nodeId}`);
      currentFolderId.current = nodeId;
      handleSelection(event);
    };

    return (
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        role="button"
        tabIndex={0}
        onMouseDown={handleMouseDown}
        ref={ref}
        style={{
          display: "flex",
          flexDirection: folders !== "0" ? "row-reverse" : "none",
          justifyContent: "space-between",
          padding: "8px 5px",
        }}
      >
        {/* //> show icon based on folders */}
        {folders !== "0" && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleExpansionClick()}
            onKeyDown={() => handleExpansionClick()}
            className={classes.iconContainer}
          >
            {expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </div>
        )}
        <div style={{ display: "flex" }}>
          <FolderOutlinedIcon sx={{ marginRight: "8px" }} />
          <Typography
            onClick={handleSelectionClick}
            component="div"
            className={classes.label}
          >
            {`${label} + ${nodeId}`}
          </Typography>
        </div>
      </div>
    );
  });

  const CustomTreeItem = props => {
    return <TreeItem ContentComponent={CustomContent} {...props} />;
  };

  const renderTree = data => (
    //* CustomTreeItem props api
    // https://mui.com/material-ui/api/tree-item/
    <CustomTreeItem
      key={data.id}
      nodeId={data.id}
      label={data.name}
      ContentProps={{
        // node: data, // no need to pass in the entire node
        folders: data.count.folder,
      }}
    >
      {Array.isArray(data.children)
        ? data.children.map(nodes => [renderTree(nodes)])
        : null}
    </CustomTreeItem>
  );

  return (
    <div>
      <Button
        className="XyanButton"
        onClick={() => handleAddFolders()}
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
      {foldersTree.length > 0 ? (
        <TreeView
          aria-label="icon expansion"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={expandedNodes}
          sx={{ height: 500, flexGrow: 1, maxWidth: 400 }}
        >
          {foldersTree.map(item => {
            return renderTree(item);
          })}
        </TreeView>
      ) : (
        <p>loading ...</p>
      )}
      <Snackbar {...snackbar} />
    </div>
  );
};

export default TreeViewR3;
