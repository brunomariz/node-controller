import { INodes } from "../../../redux/features/graph/graphSlice";

export const findNodeById = (id: number, nodes: INodes) => {
  const node = nodes.find((item) => item.id == id);
  if (!node) {
    throw `error: node of id ${id} not found`;
  } else {
    return node;
  }
};
