import React, { useEffect, useRef } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeView from "@mui/lab/TreeView";

import action from "./actions";
// import { Button, Typography } from "@mui/material";
import treeViewHelper from "./helper";
import renderTreeItems from "./renderTreeItems";
import useTreeState from "./useTreeState";

const RefactoredTreeView = () => {
  // references to track renders in useEffect
  const initFetchedRef = useRef(false);
  const nodesFetchedRef = useRef(false);
  const childFetchedRef = useRef(false);

  // custom hooks
  const { state, updateRootTree, convertJsonToTree } = useTreeState();

  const { fetchRootFolders } = action();

  //   const { convertJsonToTree, global } = treeViewHelper();

  // actions object
  //   const action = (() => {
  //     // reducer.dispatch({
  //     //   type: "updateRootFoldersJson",
  //     //   payload: rootFolders,
  //     // });
  //     const fetchRootFolders = async () => {
  //       try {
  //         const { data } = await axios.get("https://localhost:3000/data.json");
  //         const res = data;
  //         const rootFolders = res.filter(item => item.parentId === null);
  //         return rootFolders;
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };

  //     const fetchChildFolders = async parentId => {
  //       try {
  //         const { data } = await axios.get("https://localhost:3000/data.json");
  //         const res = data;
  //         const childFolders = res.filter(item => item.parentId === parentId);
  //         return childFolders;
  //         // dispatch({ type: "updateChildFolderJson", payload: childFolders });
  //         childFetchedRef.current = false;
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };

  //     return {
  //       fetchRootFolders,
  //       fetchChildFolders,
  //     };
  //   })();

  //   useEffect(() => {
  //     console.log(global.tree);
  //   }, [global.tree]);

  // initial fetch for root folders
  useEffect(() => {
    if (initFetchedRef.current) return;
    fetchRootFolders().then(result => {
      const rootFolders = result;
      const rootTree = convertJsonToTree(rootFolders);
      console.log(rootTree);
      updateRootTree(rootTree);
    });
    initFetchedRef.current = true;
  }, []);

  return (
    <div>
      {/* <Button
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
      </Button> */}
      {state.rootTree.length > 0 ? (
        <TreeView
          aria-label="icon expansion"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={state.expandedNodes}
          sx={{ height: 500, flexGrow: 1, maxWidth: 400 }}
        >
          {state.rootTree.map(item => {
            return renderTreeItems(item);
          })}
        </TreeView>
      ) : (
        <p>loading ...</p>
      )}
    </div>
  );
};

export default RefactoredTreeView;
