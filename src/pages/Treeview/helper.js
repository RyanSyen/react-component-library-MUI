/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
const data = require("./Data.json");

// import { useEffect, useRef, useState } from "react";

// this folders attribute determines whether to display the icon to expand
// if folders is 0 then dont show icon and disable expand
const count = {
  folders: String,
};

const testJson = [
  {
    id: "1",
    name: "Folder A",
    parentId: null,
  },
  {
    id: "2",
    name: "Folder B",
    parentId: null,
  },
  {
    id: "3",
    name: "Subfolder A1",
    parentId: "1",
  },
  {
    id: "4",
    name: "Subfolder A2",
    parentId: "1",
  },
  {
    id: "5",
    name: "Subfolder B1",
    parentId: "2",
  },
  {
    id: "6",
    name: "Subfolder B2",
    parentId: "2",
  },
  {
    id: "7",
    name: "Subfolder A1-1",
    parentId: "3",
  },
  {
    id: "8",
    name: "Subfolder A1-2",
    parentId: "3",
  },
];

const treeView = () => {
  const global = {
    tree: {},
  };

  // const convertJsonToTree = () => {
  //   const tree = {};
  //   const root = [];

  //   if (data.length > 0) {
  //     // Create a node for each item
  //     data.forEach(item => {
  //       tree[item.id] = {
  //         id: item.id,
  //         name: item.name,
  //         parentId: item.parentId,
  //         createdAt: item.createdAt,
  //         updatedAt: item.updatedAt,
  //         children: [],
  //         count: {
  //           folder: item.count.folders,
  //         },
  //       };
  //     });

  //     // Link each node to its parent
  //     Object.keys(tree).forEach(nodeId => {
  //       const node = tree[nodeId];
  //       const { parentId } = node;

  //       if (parentId) {
  //         tree[parentId].children.push(node);
  //       } else {
  //         root.push(node);
  //       }
  //     });
  //   }

  //   return root;
  // };

  const convertJsonToTree2 = info => {
    const start = window.performance.now();
    const tree = {};
    const root = [];

    console.log(info);

    if (info.length > 0) {
      // Create a node for each item
      info.forEach(item => {
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
      });

      console.log(tree);
      global.tree = tree;
      console.log(global.tree);
      // Link each node to its parent
      Object.keys(tree).forEach(nodeId => {
        const node = tree[nodeId];
        const { parentId } = node;

        if (parentId) {
          tree[parentId].children.push(node);
        } else {
          root.push(node);
        }
      });
    }
    const end = window.performance.now();
    const dur = end - start;
    console.log(dur);
    return root;
  };

  const insertNode = newNodes => {
    const start = window.performance.now();
    const { tree } = global;
    const root = [];

    console.log(tree);
    if (tree.length !== null) {
      // add new node to tree using the id as key
      newNodes.forEach(newNode => {
        tree[newNode.id] = {
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

      Object.keys(tree).forEach(nodeId => {
        const node = tree[nodeId];
        const { parentId, id } = node;

        if (parentId) {
          // check if children already exist
          // const childExist = tree[parentId].children.some(
          //   child => JSON.stringify(child) === JSON.stringify(node),
          // );
          const childExist = tree[parentId].children.find(
            child => child.id === id,
          );
          // if child does not exist, push to children array
          if (!childExist) {
            tree[parentId].children.push(node);
          }
        } else {
          // the 3 root nodes will be pushed to root
          root.push(node);
        }
      });

      global.tree = tree;
    } else {
      convertJsonToTree2(newNodes);
    }
    console.log(root);
    const end = window.performance.now();
    const dur = end - start;
    console.log(dur);
    return root;
  };

  // const tree = convertJsonToTree();
  const tree2 = info => convertJsonToTree2(info);

  return {
    global,
    // tree,
    tree2,
    // updateNode,
    insertNode,
  };
};

const TreeViewHelper = treeView();

export default TreeViewHelper;
