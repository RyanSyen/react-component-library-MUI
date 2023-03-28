/* eslint-disable no-else-return */
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { traverseTree } from "./helper";

const action = () => {
  const fetchRootFolders = async () => {
    try {
      const { data } = await axios.get("https://localhost:3000/data.json");
      const res = data;
      const rootFolders = res.filter(item => item.parentId === null);
      return rootFolders;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchChildFolders = async parentId => {
    try {
      const { data } = await axios.get("https://localhost:3000/data.json");
      const res = data;
      const childFolders = res.filter(item => item.parentId === parentId);
      return childFolders;
    } catch (err) {
      console.log(err);
    }
  };

  const addFolder = (treeArr, currentFolderId) => {
    if (currentFolderId) {
      // we add new folder by passing the new folder object
      const newObj = {
        id: uuidv4(),
        name: "new folder",
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
        parentId: null,
        breadcrumb: "3.3",
        count: {
          folder: "0",
        },
        children: [],
      };

      const treeArrCopy = [...treeArr];
      // find current node from treeArrCopy
      const currentNode = traverseTree(treeArrCopy, currentFolderId);
      // update new folder's parentId
      newObj.parentId = currentFolderId;
      // update parent node
      currentNode.count.folder = "1";
      currentNode.children.push(newObj);
      currentNode.updatedAt = getCurrentDate();
      // pass the updated tree for re-rendering
      return treeArrCopy;
    } else {
      return null;
      // console.log("select which folder to add");
    }
  };

  // can put at global helper/action file
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    // format the date in YYYY-MM-DDThh:mm:ssTZD format
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}T${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}Z`;
    return formattedDate;
  };

  return {
    fetchRootFolders,
    fetchChildFolders,
    addFolder,
  };
};

export default action;
