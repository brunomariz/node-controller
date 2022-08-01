import React from "react";
import { Position } from "../../../@types/position";
import { NodeType } from "../../../redux/features/graph/graphSlice";
import BaseNode from "../BaseNode/BaseNode";

type Props = {
  node: NodeType;
  focus: boolean;
};

function AddNode({ node, focus }: Props) {
  return (
    <BaseNode
      // id={id}
      // initialPosition={initialPosition}
      // inputs={2}
      // outputs={1}
      node={node}
      label="Add"
      focus={focus}
    ></BaseNode>
  );
}

export default AddNode;
