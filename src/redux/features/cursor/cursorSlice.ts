import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CursorVariety } from "../../../@types/cursorVariety";
import { NodeVariety } from "../../../@types/nodeVariety";
import { RootState, AppThunk } from "../../app/store";
// import { fetchCount } from './counterAPI';

export interface CursorState {
  selectedNode: NodeVariety;
  cursorVariety: CursorVariety;
}

const initialState: CursorState = {
  cursorVariety: "Move",
  selectedNode: "Empty",
};

export const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectedNodeChanged: (state, action: PayloadAction<NodeVariety>) => {
      state.selectedNode = action.payload;
    },
    cursorVarietyChanged: (state, action: PayloadAction<CursorVariety>) => {
      state.cursorVariety = action.payload;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { selectedNodeChanged, cursorVarietyChanged } =
  cursorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSelectedNode = (state: RootState) =>
  state.cursor.selectedNode;
export const selectCursorVariety = (state: RootState) =>
  state.cursor.cursorVariety;

export default cursorSlice.reducer;
