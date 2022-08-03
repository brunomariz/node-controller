import { NodeVariety } from "../../../@types/nodeVariety";
import { Position } from "../../../@types/position";
import { NodesType } from "../../../redux/features/graph/graphSlice";
import { findNodeById } from "./findNodeById";

export const adjustInputPositionAdd = (
  position: Position,
  inputNumber: number
) => {
  return {
    x: position.x - 4,
    y: position.y + 16 + 32 * inputNumber,
  };
};

export const adjustOutputPositionAdd = (position: Position) => {
  return { x: position.x + 107, y: position.y + 32 };
};

export const adjustInputPositionSubtract = (
  position: Position,
  inputNumber: number
) => {
  return {
    x: position.x - 4,
    y: position.y + 16 + 32 * inputNumber,
  };
};

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
    case "Subtract":
      return adjustInputPositionSubtract(position, inputNumber);
    default:
      return { x: position.x - 4, y: position.y + 32 };
  }
};
