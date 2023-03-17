/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
const data = require("./Data.json");

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
  const convertJsonToTree = () => {
    const tree = {};
    const root = [];

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

    return root;
  };

  const tree = convertJsonToTree();

  const updateNode = (nodeId, updateFn) => {
    const update = node => {
      if (node.id === nodeId) {
        updateFn(node);
      }
      node.children.forEach(child => updateNode(child));
    };

    tree.forEach(node => updateNode(node));
  };

  return {
    tree,
    updateNode,
  };
};

const TreeViewHelper = treeView();

export default TreeViewHelper;
