import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  text: "",
  currentContent: null,
  tabIsOpen: false,
};

export const bucketSlice = createSlice({
  name: "bucket",
  initialState,
  reducers: {
    title: (state, action) => {
      state.title = action.payload;
    },
    textContent: (state, action) => {
      state.text = action.payload;
    },
    setCurrentContent: (state, action) => {
      state.currentContent = action.payload;
    },
    setTabIsOpen: (state, action) => {
      state.tabIsOpen = action.payload;
    },
  },
});

export const { title, textContent, setCurrentContent, setTabIsOpen } =
  bucketSlice.actions;

export default bucketSlice.reducer;
