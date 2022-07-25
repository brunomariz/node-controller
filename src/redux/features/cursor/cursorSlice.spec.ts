import cursorReducer, { CursorState } from "./cursorSlice";
import { selectedNodeChanged } from "./cursorSlice";

describe("cursor reducer", () => {
  const initialState: CursorState = {
    selectedNode: "Empty",
    cursorVariety: "Move",
  };
  it("should handle initial state", () => {
    expect(cursorReducer(undefined, { type: "unknown" })).toEqual({
      selectedNode: "Empty",
    });
  });

  it("should handle slection change", () => {
    const actual = cursorReducer(initialState, selectedNodeChanged("Add"));
    expect(actual.selectedNode).toEqual("Add");
  });
});
