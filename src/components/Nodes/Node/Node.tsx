import React from "react";
import { nodeMoved, NodeType } from "../../../redux/features/graph/graphSlice";
import AddNode from "../Add/AddNode";
import BaseNode from "../BaseNode/BaseNode";
import ConstantNode from "../Constant/ConstantNode";
import EmptyNode from "../Empty/EmptyNode";
import SubtractNode from "../Subtract/SubtractNode";

type Props = {
  node: NodeType;
  focus: boolean;
};

function Node({ node, focus }: Props) {
  return (
    <>
      {node.variety === "Empty" ? (
        <EmptyNode node={node} focus={focus}></EmptyNode>
      ) : node.variety === "Add" ? (
        <AddNode node={node} focus={focus}></AddNode>
      ) : node.variety === "Constant" ? (
        <ConstantNode node={node} focus={focus}></ConstantNode>
      ) : node.variety === "Subtract" ? (
        <SubtractNode node={node} focus={focus}></SubtractNode>
      ) : null}
    </>
  );
}

export default Node;
