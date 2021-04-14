import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./UISlice";

const rootReducer = {
  ui: uiReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
