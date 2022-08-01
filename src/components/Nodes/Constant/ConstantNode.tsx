import React from "react";
import { Position } from "../../../@types/position";
import { NodeType } from "../../../redux/features/graph/graphSlice";
import BaseNode from "../BaseNode/BaseNode";

type Props = {
  // id: number;
  // initialPosition: Position;
  node: NodeType;
  value: number;
  focus: boolean;
};

function ConstantNode({ node, value, focus }: Props) {
  return (
    <BaseNode
      focus={focus}
      // id={id}
      // initialPosition={initialPosition}
      // inputs={0}
      // outputs={1}
      node={node}
      label={"Constant"}
    >
      {/* {value} */}
    </BaseNode>
  );
}

export default ConstantNode;
