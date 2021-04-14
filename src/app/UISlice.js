import { createSlice } from "@reduxjs/toolkit";

const fetchApi = createSlice({
  name: "UI",
  initialState: {
    elements: [],
  },
  reducers: {
    setElementsStore: (state, action) => {
      state.elements = action.payload;
    },
  },
});

const { reducer, actions } = fetchApi;

export const { setElementsStore } = actions;

export default reducer;
