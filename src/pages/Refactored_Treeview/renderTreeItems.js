/**
 * Even though its a function and not component, but it is one of the methods to improve organization of code
 *
 * */

import React from "react";

import CustomTreeItem from "./CustomTreeItem";

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

export default renderTreeItems;
