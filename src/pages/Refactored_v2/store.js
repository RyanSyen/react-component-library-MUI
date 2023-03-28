/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from "@reduxjs/toolkit";

import treeReducer from "./treeSlice";

export default configureStore({
  reducer: {
    counter: treeReducer,
  },
});
