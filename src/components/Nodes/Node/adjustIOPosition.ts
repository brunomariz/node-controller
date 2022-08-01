import { NodeVariety } from "../../../@types/nodeVariety";
import { Position } from "../../../@types/position";
import { NodesType } from "../../../redux/features/graph/graphSlice";
import { adjustInputPositionAdd } from "../Add/adjustIOPositions";
import { findNodeById } from "./findNodeById";

export const adjustInputPosition = (
  nodes: NodesType,
  adjacencyList: number[][],
  id: number,
  inputNumber: number = 0
) => {
  const node = findNodeById(id, nodes);
  const variety = node.variety;
  const position = node.position;
  switch (variety) {
    case "Add":
      return adjustInputPositionAdd(position, inputNumber);
    default:
      return { x: position.x - 4, y: position.y + 32 };
  }
};
