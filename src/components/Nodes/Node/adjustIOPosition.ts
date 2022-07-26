import { NodeVariety } from "../../../@types/nodeVariety";
import { Position } from "../../../@types/position";
import { INodes } from "../../../redux/features/graph/graphSlice";
import { adjustInputPositionAdd } from "../Add/adjustIOPositions";

export const adjustInputPosition = (
  nodes: INodes,
  adjacencyList: number[][],
  id: number,
  inputNumber: number = 0
) => {
  const variety = nodes[id].variety;
  const position = nodes[id].position;
  switch (variety) {
    case "Add":
      return adjustInputPositionAdd(position, inputNumber);

    default:
      return { x: position.x - 4, y: position.y + 32 };
  }
};
