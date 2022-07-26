import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CursorVariety } from "../../../@types/cursorVariety";
import { NodeVariety } from "../../../@types/nodeVariety";
import { RootState, AppThunk } from "../../app/store";
// import { fetchCount } from './counterAPI';

export interface NodeLibraryState {
  show: boolean;
}

const initialState: NodeLibraryState = {
  show: false,
};

export const nodeLibrarySlice = createSlice({
  name: "nodeLibrary",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showLibrary: (state) => {
      state.show = true;
    },
    hideLibrary: (state) => {
      state.show = false;
    },
  },
});

export const { showLibrary, hideLibrary } = nodeLibrarySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectShow = (state: RootState) => state.nodeLibrary.show;

export default nodeLibrarySlice.reducer;
