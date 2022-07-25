import cursorReducer, { CursorState } from "./cursorSlice";
import { selectedNodeChanged } from "./cursorSlice";

describe("cursor reducer", () => {
  const initialState: CursorState = {
    selectedNode: 0,
  };
  it("should handle initial state", () => {
    expect(cursorReducer(undefined, { type: "unknown" })).toEqual({
      selectedNode: 0,
    });
  });

  it("should handle slection change", () => {
    const actual = cursorReducer(initialState, selectedNodeChanged());
    expect(actual.selectedNode).toEqual(1);
  });
});
