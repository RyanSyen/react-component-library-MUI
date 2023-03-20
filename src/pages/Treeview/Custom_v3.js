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

import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ControlPointSharp } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import TreeItem, { useTreeItem } from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import clsx from "clsx";
import { node } from "prop-types";
import { v4 as uuidv4 } from "uuid";

import { getFolders, getRootFolders } from "../../hooks/useFetchData";

import TreeViewHelper from "./helper";

const Custom3 = () => {
  const [info, setInfo] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState([]);
  const nodesFetchedRef = useRef(false);
  const currentFolderNodeRef = useRef({});
  const [pulled, setPulled] = useState([]);
  const dataFetchedRef = useRef(false);
  const [rootFolders, setRootFolders] = useState([]);
  const [childFolder, setChildFolder] = useState([]);

  // get root folders from useFetchData hook
  // meaning each render will call api
  //   const data = getRootFolders();

  // initial fetch of root folders
  useEffect(() => {
    // each time the node tree changes e.g. add new node, in real use case, we will update the database from the backend and then fetch the data from the backend to update our state.
    // we need to go through backend because of backend implementations and functions
    actions.fetchRootFolders();
  }, []);

  // initial fetch of root folders nodes
  useEffect(() => {
    if (rootFolders.length > 0) {
      if (nodesFetchedRef.current) return;
      const newData = TreeViewHelper.tree2(rootFolders, {});
      console.log(newData);
      setInfo(newData);
      nodesFetchedRef.current = true;
    }
  }, [rootFolders]);

  //   // update new childFolders nodes
  //   useEffect(() => {
  //     if (rootFolders.length > 0) {
  //       if (dataFetchedRef.current) return;
  //       setPulled(rootFolders);
  //       dataFetchedRef.current = true;
  //     }
  //   }, [rootFolders]);

  useEffect(() => {
    console.log(childFolder);
    // update fetched children in pulled state
    setPulled(prevState => prevState.push(childFolder));
    console.log(pulled);
    // update node tree
    console.log(childFolder);
    const updatedJson = [...rootFolders, ...childFolder];
    console.log(updatedJson);
    const newData = TreeViewHelper.tree2(updatedJson);
    setInfo(newData);
  }, [childFolder]);

  useEffect(() => {
    console.log(pulled);
    console.table(pulled, ["Pulled child data"]);
  }, [pulled]);

  const actions = (() => {
    const fetchRootFolders = async () => {
      try {
        const { data } = await axios.get("https://localhost:3000/data.json");
        const res = data;
        const rootFolders = res.filter(item => item.parentId === null);
        setRootFolders(rootFolders);
      } catch (err) {
        console.log(err);
        setRootFolders(null);
      }
    };
    const fetchFolders = async parentId => {
      try {
        console.log("fetching folders");
        const { data } = await axios.get("https://localhost:3000/data.json");
        const res = data;
        const childFolders = res.filter(item => item.parentId === parentId);
        console.log(childFolders);
        setChildFolder([...childFolder, ...childFolders]);
        // // update fetched children in pulled state
        // setPulled([...pulled, childFolders]);
        // // update node tree
        // console.log(childFolder);
        // const updatedJson = [...rootFolders, ...pulled];
        // console.log(updatedJson);
        // const newData = TreeViewHelper.tree2(updatedJson);
        // // addFolder(newData, parentId);
        // setInfo(newData);
      } catch (err) {
        console.log(err);
        setChildFolder(null);
      }
    };
    const addFolder = (children, parentId) => {
      //   const newObj = {
      //     id: uuidv4(),
      //     name: "new folder",
      //     createdAt: getCurrentDate(),
      //     updatedAt: getCurrentDate(),
      //     parentId: null,
      //     breadcrumb: "3.3",
      //     count: {
      //       folder: "0",
      //     },
      //     children: [],
      //   };

      const newData = [...info];
      const currentNode = currentFolderNodeRef.current; // parentId

      const newCurrentNode = traverseTree(newData, currentNode);
      console.log(newCurrentNode);
      for (const child of children) {
        // update new node's parent Id
        child.parentId = currentNode;
        // update parent node
        newCurrentNode.count.folder = children.length;
        newCurrentNode.children.push(child);
        newCurrentNode.updatedAt = getCurrentDate();
      }
      //   // update new node's parent Id
      //   newObj.parentId = currentNode;
      //   // update parent node
      //   newCurrentNode.count.folder = "1";
      //   newCurrentNode.children.push(newObj);
      //   newCurrentNode.updatedAt = getCurrentDate();
      setInfo(newData);
      // expand the parent folder
      if (!expandedNodes.includes(currentNode)) {
        setExpandedNodes([...expandedNodes, currentNode]);
      }
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
    const insertFolder = () => {
      const parentId = currentFolderNodeRef.current;

      const newObj = {
        id: uuidv4(),
        name: "new folder",
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
        parentId: null,
        breadcrumb: "3.3",
        count: {
          folder: "0",
        },
        children: [],
      };

      setInfo(prevFolders => {
        if (prevFolders) {
          if (parentId) {
            // update parent folder
            prevFolders.map(folder => {
              if (folder.id === parentId) {
                return {
                  ...folder,
                  count: { folder: folder.count.folder + 1 },
                  children: [...(folder.children || []), newObj],
                };
              } else {
                return folder;
              }
            });
          } else {
            return [...prevFolders, newObj];
          }
        } else {
          return [newObj];
        }
      });
    };
    const getCurrentDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      // format the date in YYYY-MM-DDThh:mm:ssTZD format
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}T${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}Z`;
      return formattedDate;
    };
    return {
      fetchFolders,
      fetchRootFolders,
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
      console.log(nodeId);
      // fetch child folders
      // check pulled reference
      const targetNode = pulled.find(el => el.parentId === nodeId);
      console.log(targetNode);
      if (!targetNode) {
        actions.fetchFolders(nodeId);
      }
      if (expandedNodes.includes(nodeId)) {
        setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
        // console.log(expandedNodes);
      } else {
        setExpandedNodes([...expandedNodes, nodeId]);
      }
      handleExpansion(event);
    };

    // called when user clicks on the TreeItem label and toggles the item's selection state by calling 'handleSelection()' function
    const handleSelectionClick = event => {
      console.log(nodeId);
      currentFolderNodeRef.current = nodeId;
      handleSelection(event);
    };

    // callback fired when items are expanded/collapsed
    // const handleToggle = () => {
    //   if (expandedNodes.includes(nodeId)) {
    //     setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
    //     // console.log(expandedNodes);
    //   } else {
    //     setExpandedNodes([...expandedNodes, nodeId]);
    //   }
    // };

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
            onClick={() => {
              handleExpansionClick();
            }}
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
          sx={{ height: 500, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
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

export default Custom3;
