/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
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

    return {root, tree};
  }
}

export function insertNodes(newNodes, currentTree) {
  const tree = currentTree;
  const root = [];

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

export function traverseTree(tree, currentTreeId){
  for (const node of tree) {
    if (node.id === currentTreeId) {
      console.log(node);
      // return node;
    }
    const test = "test";
    var test1 = "tes1";
    if (node.children && node.children.length > 0) {
      // recursively traverse all children of the current node
      console.log(node.children);
      const result = traverseTree(node.children, currentTreeId);
      // to prevent function from continuing to execute after return statement, add return statement before recursive call. It will stop executing when the result / target node is found
      if (result) {
        // return result;
      }
    }
  }

  console.log("did it run?");
  // eslint-disable-next-line no-undef
  console.log(result);
  console.log(test1);
}
