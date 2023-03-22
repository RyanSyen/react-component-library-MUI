import axios from "axios";

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

  return {
    fetchRootFolders,
    fetchChildFolders,
  };
};

export default action;
