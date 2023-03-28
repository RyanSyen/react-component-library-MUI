/* eslint-disable prettier/prettier */
export function convertJsonToTree(json) {
  const root = [];
  const tree = {};

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

    return root;
  }
}

export function insertNodes(newNodes) {
  const tree = {};
  const root = [];

  console.log(tree);

  // add new node to tree using the id as key
  newNodes.forEach((newNode) => {
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

  for (const nodeId of Object.keys(tree)) {
    const node = tree[nodeId];
    const { parentId, id } = node;

    if (parentId) {
      // eslint-disable-next-line prettier/prettier
      const childExist = tree[parentId].children.find(
        (child) => child.id === id
      );
      if (!childExist) {
        tree[parentId].children.push(node);
      }
    } else {
      root.push(node);
    }
  }

  global.tree = tree;

  return root;
}
