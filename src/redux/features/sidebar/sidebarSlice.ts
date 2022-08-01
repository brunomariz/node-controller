import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CursorVariety } from "../../../@types/cursorVariety";
import { NodeVariety } from "../../../@types/nodeVariety";
import { RootState, AppThunk } from "../../app/store";
import { NodeType } from "../graph/graphSlice";
// import { fetchCount } from './counterAPI';

export type SidebarData = {
  node: NodeType | null;
  properties: {
    editable: boolean;
    value: number | string | number[];
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
};

export interface SidebarState {
  show: boolean;
  data: SidebarData;
}

const initialState: SidebarState = {
  show: false,
  data: { properties: [], node: null },
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showSidebar: (state) => {
      state.show = true;
    },
    hideSidebar: (state) => {
      state.show = false;
    },
    sidebarDataChanged: (state, action: PayloadAction<SidebarData>) => {
      state.data = action.payload;
    },
  },
});

export const { showSidebar, hideSidebar, sidebarDataChanged } =
  sidebarSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectShowSidebar = (state: RootState) => state.sidebar.show;
export const selectSidebarData = (state: RootState) => state.sidebar.data;
export const selectSidebarNode = (state: RootState) => state.sidebar.data;

export default sidebarSlice.reducer;
