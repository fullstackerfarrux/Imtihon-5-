import { configureStore } from "@reduxjs/toolkit";
import nameSlice from "./slices/name";

const store = configureStore({
  reducer: {
    username: nameSlice,
  },
});

export default store;
