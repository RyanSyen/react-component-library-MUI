/* eslint-disable prettier/prettier */
import React from "react";

import CustomTreeItem from "./CustomTreeItem";

const renderTree = (data) => (
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
      ? data.children.map((nodes) => [renderTree(nodes)])
      : null}
  </CustomTreeItem>
);

export default renderTree;
