import React from "react";
import { Position } from "../../../@types/position";
import BaseNode from "../BaseNode/BaseNode";

type Props = {
  id: number;
  initialPosition: Position;
  value: number;
  focus: boolean;
};

function ConstantNode({ id, initialPosition, value, focus }: Props) {
  return (
    <BaseNode
      focus={focus}
      id={id}
      initialPosition={initialPosition}
      inputs={0}
      outputs={1}
      label={"Constant"}
    >
      {value}
    </BaseNode>
  );
}

export default ConstantNode;
