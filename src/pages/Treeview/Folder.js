/* eslint-disable no-unused-vars */
import React from "react";

import useFolderTree from "../../hooks/useFolderTree";

const Folders = () => {
  const { folders, insertFolder, updateFolder, deleteFolder } = useFolderTree();

  const handleInsertFolder = parentId => {
    insertFolder(parentId);
  };

  const handleUpdateFolder = (folderId, updates) => {
    updateFolder(folderId, updates);
  };

  const handleDeleteFolder = folderId => {
    deleteFolder(folderId);
  };

  return (
    <div>
      {/* <button onClick={handleInsertFolder}>Insert File</button>
      <button onClick={handleUpdateFolder}>Update File</button>
      <button onClick={handleDeleteFolder}>Delete File</button> */}
      <ul>
        {console.log("folder rendered")}
        {console.log(folders)}
        {folders.map(folder => (
          <div key={folder.id}>
            <li>{folder.name}</li>
            <button type="button" onClick={handleInsertFolder(folder.id)}>
              Insert File
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Folders;
