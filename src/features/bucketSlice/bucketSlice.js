import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  currentContentId: null,
  tabIsOpen: false,
  isEditing: false,
  isDeleting: false,
  editedContent: "",
  isFocused: false,
};

export const bucketSlice = createSlice({
  name: "bucket",
  initialState,
  reducers: {
    textContent: (state, action) => {
      state.text = action.payload;
    },
    setCurrentContent: (state, action) => {
      state.currentContentId = action.payload;
    },
    setTabIsOpen: (state, action) => {
      state.tabIsOpen = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setEditedContent: (state, action) => {
      state.editedContent = action.payload;
    },
    setIsDeleting: (state, action) => {
      state.isDeleting = action.payload;
    },
    setIsFocused: (state, action) => {
      state.isFocused = action.payload;
    },
  },
});

export const {
  textContent,
  setCurrentContent,
  setTabIsOpen,
  setIsEditing,
  setEditedContent,
  setIsDeleting,
  setIsFocused,
} = bucketSlice.actions;

export default bucketSlice.reducer;
