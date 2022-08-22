import { NodesType } from "../redux/features/graph/graphSlice";
import { findRoots } from "./findRoots";

describe("find root function", () => {
  const adjacencyList = [
    [2, 4],
    [2, 5],
    [3, 6],
    [3, 7],
    [4, 8],
    [4, 9],
    [4, 10],
    [7, 11],
  ];
  const nodes = [
    { id: 1, outputs: [], position: { x: 0, y: 0 }, variety: "Empty" },
    { id: 2, outputs: [], position: { x: 0, y: 0 }, variety: "Empty" },
    { id: 3, outputs: [], position: { x: 0, y: 0 }, variety: "Empty" },
    { id: 4, outputs: [], position: { x: 0, y: 0 }, variety: "Empty" },
    { id: 5, outputs: [], position: { x: 0, y: 0 }, variety: "Empty" },
    { id: 6, outputs: [], position: { x: 0, y: 0 }, variety: "Empty" },
    { id: 7, outputs: [], position: { x: 0, y: 0 }, variety: "Empty" },
    { id: 8, outputs: [], position: { x: 0, y: 0 }, variety: "Empty" },
    { id: 9, outputs: [], position: { x: 0, y: 0 }, variety: "Empty" },
    { id: 10, outputs: [], position: { x: 0, y: 0 }, variety: "Empty" },
    { id: 11, outputs: [], position: { x: 0, y: 0 }, variety: "Empty" },
  ] as NodesType;
  it("should find roots", () => {
    expect(findRoots(adjacencyList, nodes)).toEqual([1, 2, 3]);
  });
});
