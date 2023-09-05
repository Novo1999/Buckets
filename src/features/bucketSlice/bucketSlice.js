import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  text: "",
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
  },
});

export const { title, textContent } = bucketSlice.actions;

export default bucketSlice.reducer;
