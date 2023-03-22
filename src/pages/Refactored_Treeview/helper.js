// import { useState } from "react";

// import useTreeState from "./useTreeState";

// const treeViewHelper = () => {
//   const global = {
//     tree: {},
//   };

//   const convertJsonToTree = json => {
//     const tree = {};
//     const root = [];

//     if (json.length > 0) {
//       // create a node for each json item
//       for (const item of json) {
//         tree[item.id] = {
//           id: item.id,
//           name: item.name,
//           parentId: item.parentId,
//           createdAt: item.createdAt,
//           updatedAt: item.updatedAt,
//           children: [],
//           count: {
//             folder: item.count.folders,
//           },
//         };
//       }

//       // update tree to global tree
//       global.tree = tree;
//       //   console.log("updated tree");
//       console.log(global.tree);

//       // link each node to its parent
//       for (const nodeId of Object.keys(global.tree)) {
//         const node = global.tree[nodeId];
//         root.push(node);
//         // const { parentId } = node;

//         // // if the json item contains a parent, insert into its parent's children array
//         // if (parentId) {
//         //   tree[parentId].children.push(node);
//         // } else {
//         //   // if no parent then push the root node to root array
//         //   root.push(node);
//         // }
//       }

//       return root;
//     }
//   };

//   const insertNodes = newNodes => {
//     const { tree } = global;
//     const root = [];

//     console.log(tree);

//     // add new node to tree using the id as key
//     newNodes.forEach(newNode => {
//       tree[newNode.id] = {
//         id: newNode.id,
//         name: newNode.name,
//         parentId: newNode.parentId,
//         createdAt: newNode.createdAt,
//         updatedAt: newNode.updatedAt,
//         children: [],
//         count: {
//           folder: newNode.count.folders,
//         },
//       };
//     });

//     for (const nodeId of Object.keys(tree)) {
//       const node = tree[nodeId];
//       const { parentId, id } = node;

//       if (parentId) {
//         const childExist = tree[parentId].children.find(
//           child => child.id === id,
//         );
//         if (!childExist) {
//           tree[parentId].children.push(node);
//         }
//       } else {
//         root.push(node);
//       }
//     }

//     global.tree = tree;

//     return root;
//   };

//   return {
//     global,
//     convertJsonToTree,
//     insertNodes,
//   };
// };

// export default treeViewHelper;
