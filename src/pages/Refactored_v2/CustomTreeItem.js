/* eslint-disable prettier/prettier */
import TreeItem from "@mui/lab/TreeItem";

import CustomContent from "./CustomContent";

const CustomTreeItem = (props) => {
  return <TreeItem ContentComponent={CustomContent} {...props} />;
};

export default CustomTreeItem;
