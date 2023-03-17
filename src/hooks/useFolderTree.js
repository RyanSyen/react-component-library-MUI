/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import TreeViewHelper from "../pages/Treeview/helper";

const useFolderTree = () => {
  const [folders, setFolders] = useState([]);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    const newFolders = TreeViewHelper.tree;
    console.log(newFolders);
    setFolders(newFolders);
    dataFetchedRef.current = true;
  }, []);

  function getCurrentDate() {
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
  }

  const insertFolder = parentId => {
    console.log("called insertFolder");
    const newFolder = {
      id: uuidv4(),
      name: "new folder",
      parentId,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      count: { folder: "0" },
    };

    setFolders(prevFolders => {
      console.log(prevFolders);
      if (prevFolders) {
        if (parentId) {
          // update parent folder
          prevFolders.map(folder => {
            if (folder.id === parentId) {
              return {
                ...folder,
                count: { folder: folder.count.folder + 1 },
                children: [...(folder.children || []), newFolder],
              };
            } else {
              return folder;
            }
          });
        } else {
          return [...prevFolders, newFolder];
        }
      } else {
        return [newFolder];
      }
    });
  };

  const updateFolder = (folderId, updates) => {
    setFolders(prevFolders =>
      prevFolders.map(folder =>
        folder.id === folderId ? { ...folder, ...updates } : folder,
      ),
    );
  };

  const deleteFolder = folderId => {
    setFolders(prevFolders =>
      prevFolders.filter(folder => {
        if (folder.id === folderId) {
          if (folder.parentId) {
            return prevFolders.map(f =>
              f.id === folder.parentId
                ? { ...f, count: { ...f.count, folder: f.count.folder - 1 } }
                : f,
            );
          }
          return prevFolders;
        } else if (folder.children) {
          return {
            ...folder,
            children: folder.children.filter(child => child.id !== folderId),
          };
        } else {
          return folder;
        }
      }),
    );
  };

  return { folders, insertFolder, updateFolder, deleteFolder };
};

export default useFolderTree;
