import React from "react";
import { Position } from "../../../@types/position";
import BaseNode from "../BaseNode/BaseNode";

type Props = {
  id: number;
  initialPosition: Position;
  focus: boolean;
};

function AddNode({ id, initialPosition, focus }: Props) {
  return (
    <BaseNode
      id={id}
      initialPosition={initialPosition}
      inputs={2}
      outputs={1}
      label="Add"
      focus={focus}
    ></BaseNode>
  );
}

export default AddNode;
