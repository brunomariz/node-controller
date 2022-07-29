import { Position } from "../../../@types/position";

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
