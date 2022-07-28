import { NodeVarietyKeys } from "../../../@types/nodeVariety";

type INodeMaxIO = {
  [k in keyof NodeVarietyKeys]: { inputs: number; outputs: number };
};

export const nodeVarietyMaxIO: INodeMaxIO = {
  Empty: { inputs: 1, outputs: 1 },
  Add: { inputs: 2, outputs: 1 },
  Constant: { inputs: 0, outputs: 1 },
};
