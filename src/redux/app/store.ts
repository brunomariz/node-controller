import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cursorReducer from "../features/cursor/cursorSlice";

export const store = configureStore({
  reducer: {
    cursor: cursorReducer,
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
