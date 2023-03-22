/**
 * This code is ideally stored in a separate hooks folder under the src folder
 *
 * */

import React, { useEffect, useReducer } from "react";

const useTreeState = () => {
  const initialState = {
    childTree: [],
    rootTree: [],
    childJsonRef: [],
    expandedNodes: [],
    globalTree: {},
  };

  const reducerFn = (state, action) => {
    switch (action.type) {
      case "updateRootTree":
        return { ...state, rootTree: action.payload };
      case "updateChildFolderJson":
        return {
          ...state,
          childFolderJson: [...action.payload],
          //   childFolderJson: [...state.childFolderJson, ...action.payload],
        };
      case "updateChildJsonRef":
        return {
          ...state,
          childJsonRef: [...state.childJsonRef, ...action.payload],
        };
      case "updateToggleableNodes":
        // eslint-disable-next-line no-case-declarations
        const id = action.payload;

        if (state.expandedNodes.includes(id)) {
          // collapse
          const collapse = state.expandedNodes.filter(
            expandedId => expandedId !== id,
          );
          return {
            ...state,
            expandedNodes: [...collapse],
          };
        }
        // expand
        return {
          ...state,
          expandedNodes: [...state.expandedNodes, id],
        };
      case "updateExpandOnlyNodes":
        return {
          ...state,
          expandedNodes: [...state.expandedNodes, action.payload],
        };
      case "updateGlobalTree":
        console.log(action.payload);
        return {
          ...state,
          globalTree: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFn, initialState);

  useEffect(() => {
    console.log(state.globalTree);
  }, [state.globalTree]);

  useEffect(() => {
    console.log(state.rootTree);
  }, [state.rootTree]);

  const updateRootTree = rootTree => {
    dispatch({ type: "updateRootTree", payload: rootTree });
  };

  const updateChildTree = childTree => {
    // dispatch({ type: "updateRootTree", payload: rootTree });
  };

  const updateChildFolderRef = childFolder => {
    dispatch({ type: "updateChildJsonRef", payload: childFolder });
  };

  const updateGlobalTree = tree => {
    dispatch({ type: "updateGlobalTree", payload: tree });
  };

  const convertJsonToTree = json => {
    const root = [];
    const tree = state.globalTree;

    if (json.length > 0) {
      // create a node for each json item
      for (const item of json) {
        tree[item.id] = {
          id: item.id,
          name: item.name,
          parentId: item.parentId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          children: [],
          count: {
            folder: item.count.folders,
          },
        };
      }

      // link each node to its parent
      for (const nodeId of Object.keys(tree)) {
        const node = tree[nodeId];
        root.push(node);
      }

      console.log(tree);
      updateGlobalTree(tree);

      return root;
    }
  };

  const insertNodes = newNodes => {
    // const { tree } = global;
    const root = [];
    console.log(state.globalTree);
    // convert folders json to tree
    // convertJsonToTree(folders);
    newNodes.forEach(newNode => {
      state.globalTree[newNode.id] = {
        id: newNode.id,
        name: newNode.name,
        parentId: newNode.parentId,
        createdAt: newNode.createdAt,
        updatedAt: newNode.updatedAt,
        children: [],
        count: {
          folder: newNode.count.folders,
        },
      };
    });
    console.log(state.globalTree);
    Object.keys(state.globalTree).forEach(nodeId => {
      const node = state.globalTree[nodeId];
      const { parentId, id } = node;
      if (parentId) {
        // check if children exists in parent
        const childExist = state.globalTree[parentId].children.find(
          child => child.id === id,
        );
        // if child does not exist
        if (!childExist) {
          state.globalTree[parentId].children.push(node);
        }
      } else {
        // the 3 root nodes will be pushed to root array
        root.push(node);
      }
    });

    return root;
  };

  return {
    state,
    updateRootTree,
    updateChildTree,
    updateChildFolderRef,
    updateGlobalTree,
    convertJsonToTree,
    insertNodes,
  };
};

export default useTreeState;
