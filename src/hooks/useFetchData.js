// /* eslint-disable import/no-extraneous-dependencies */
// import { useEffect, useState } from "react";
// import axios from "axios";

// const getRootFolders = () => {
//   const [rootFoldersArr, setRootFoldersArr] = useState([]);

//   useEffect(() => {
//     const fetchRootFolders = async () => {
//       try {
//         const { data } = await axios.get("https://localhost:3000/data.json");
//         const res = data;
//         const rootFolders = res.filter(item => item.parentId === null);
//         setRootFoldersArr(rootFolders);
//       } catch (err) {
//         console.log(err);
//         setRootFoldersArr(null);
//       }
//     };
//     fetchRootFolders();
//   }, []);

//   return rootFoldersArr;
// };

// const getFolders = parentId => {
//   const [foldersArr, setfoldersArr] = useState([]);

//   useEffect(() => {
//     const fetchFolders = async () => {
//       try {
//         const { data } = await axios.get("https://localhost:3000/data.json");
//         const res = data;
//         const childFolder = res.filter(item => item.parentId === parentId);
//         setfoldersArr(childFolder);
//       } catch (err) {
//         console.log(err);
//         setfoldersArr(null);
//       }
//     };
//   }, [foldersArr]);

//   return [foldersArr];
// };

// export { getFolders, getRootFolders };
