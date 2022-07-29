import cursorReducer, { CursorState } from "./cursorSlice";
import { nodeVarietyChanged } from "./cursorSlice";

describe("cursor reducer", () => {
  const initialState: CursorState = {
    nodeVariety: "Empty",
    cursorVariety: "Move",
  };
  it("should handle initial state", () => {
    expect(cursorReducer(undefined, { type: "unknown" })).toEqual({
      nodeVariety: "Empty",
      cursorVariety: "Move",
    });
  });

  it("should handle slection change", () => {
    const actual = cursorReducer(initialState, nodeVarietyChanged("Add"));
    expect(actual.nodeVariety).toEqual("Add");
  });
});
