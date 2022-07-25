import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
// import { fetchCount } from './counterAPI';

export interface CursorState {
  selectedNode: number;
}

const initialState: CursorState = { selectedNode: 0 };

export const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    selectedNodeChanged: (state) => {
      state.selectedNode += 1;
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

export const { selectedNodeChanged } = cursorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSelectedNode = (state: RootState) =>
  state.cursor.selectedNode;

export default cursorSlice.reducer;
