/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

export const treeSlice = createSlice({
  name: "tree",
  initialState: {
    value: [],
  },
  reducers: {
    update: (state, action) => {
      const newState = [...state];
      newState = [...newState, ...action.payload];
    },
  },
});

export const { update } = treeSlice.actions;

// function below is called a thunk and allows us to perform async logic where it can be dispatched like a regular action
export const updateAsync = (amt) => (dispatch) => {
  setTimeout(() => {
    dispatch(update(amt));
  }, 1000);
};

// function below is called a selector and allows us to select a value from the state where it can also be defined inline where they are used instead of in the slice file => useSelector((state) => state.counter.value)
export const selectCount = (state) => state.counter.value;

export default treeSlice.reducer;
