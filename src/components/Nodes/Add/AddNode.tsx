import React from "react";
import { Position } from "../../../@types/position";
import BaseNode from "../BaseNode/BaseNode";

type Props = {
  id: number;
  initialPosition: Position;
};

function AddNode({ id, initialPosition }: Props) {
  return (
    <BaseNode
      id={id}
      initialPosition={initialPosition}
      inputs={2}
      outputs={1}
      label="Add"
    ></BaseNode>
  );
}

export default AddNode;
