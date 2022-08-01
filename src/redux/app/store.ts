import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cursorReducer from "../features/cursor/cursorSlice";
import graphReducer from "../features/graph/graphSlice";
import nodeLibraryReducer from "../features/nodeLibrary/nodeLibrarySlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";

export const store = configureStore({
  reducer: {
    cursor: cursorReducer,
    graph: graphReducer,
    nodeLibrary: nodeLibraryReducer,
    sidebar: sidebarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
