import { configureStore } from "@reduxjs/toolkit";

import textContentReducer from "../features/bucketSlice/bucketSlice";

export const store = configureStore({
  reducer: {
    bucket: textContentReducer,
  },
});
