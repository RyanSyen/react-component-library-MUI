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
  let GTree = {};
  const globalTree = tree => {
    GTree = tree;
    return GTree;
  };

  const convertJsonToTree = () => {
    const tree = {};
    const root = [];

    if (data.length > 0) {
      // Create a node for each item
      data.forEach(item => {
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

    return root;
  };

  const convertJsonToTree2 = info => {
    const tree = {};
    const root = [];

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

      globalTree(tree);

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

    return root;
  };

  // const updateNode = (nodeId, updateFn) => {
  //   const update = node => {
  //     if (node.id === nodeId) {
  //       updateFn(node);
  //     }
  //     node.children.forEach(child => updateNode(child));
  //   };

  //   tree.forEach(node => updateNode(node));
  // };

  // const insertNode = newNode => {
  //   const tree = {};
  //   const root = [];
  //   const oldTree = globalTree();
  //   console.log(GTree);

  //   if (oldTree.length > 0) {
  //     oldTree.forEach(item => {
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

  //     tree[newNode.id] = {
  //       id: newNode.id,
  //       name: newNode.name,
  //       parentId: newNode.parentId,
  //       createdAt: newNode.createdAt,
  //       updatedAt: newNode.updatedAt,
  //       children: [],
  //       count: {
  //         folder: newNode.count.folders,
  //       },
  //     };

  //     if (newNode.parentId) {
  //       tree[newNode.parentId].children.push(tree[newNode.id]);
  //     } else {
  //       const nodesWithoutParentId = Object.values(tree).filter(
  //         node => !node.parentId,
  //       );
  //       if (nodesWithoutParentId.length > 0) {
  //         nodesWithoutParentId[0].children.push(tree[newNode.id]);
  //       } else {
  //         root.push(tree[newNode.id]);
  //       }
  //     }
  //   } else {
  //     tree[newNode.id] = {
  //       id: newNode.id,
  //       name: newNode.name,
  //       parentId: newNode.parentId,
  //       createdAt: newNode.createdAt,
  //       updatedAt: newNode.updatedAt,
  //       children: [],
  //       count: {
  //         folder: newNode.count.folders,
  //       },
  //     };
  //     root.push(tree[newNode.id]);
  //   }
  //   return root;
  // };

  const tree = convertJsonToTree();
  const tree2 = info => convertJsonToTree2(info);

  return {
    tree,
    tree2,
    // updateNode,
    // insertNode,
  };
};

const TreeViewHelper = treeView();

export default TreeViewHelper;
