import React from "react";
import { Position } from "../../../@types/position";
import { findInputs } from "../../../model/processData";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks";
import {
  NodeType,
  selectAdjacencyList,
  selectNodes,
} from "../../../redux/features/graph/graphSlice";
import {
  hideSidebar,
  showSidebar,
  sidebarDataChanged,
} from "../../../redux/features/sidebar/sidebarSlice";
import BaseNode from "../BaseNode/BaseNode";

type Props = {
  node: NodeType;
  focus: boolean;
};

function SubtractNode({ node, focus }: Props) {
  const nodes = useAppSelector(selectNodes);
  const adjacencyList = useAppSelector(selectAdjacencyList);
  const nodeInputs = findInputs(node.id, nodes, adjacencyList);
  const dispatch = useAppDispatch();

  const inputsLatexExpression = `$$${nodeInputs[0] || 0}-${
    (nodeInputs[1] || 0) < 0 ? "(" : ""
  }${nodeInputs[1] || 0}${(nodeInputs[1] || 0) < 0 ? ")" : ""}$$`;
  const outputsLatexExpression = `$$=${node.outputs}$$`;
  return (
    <BaseNode
      node={node}
      label="Subtract"
      focus={focus}
      onLabelClick={() => {
        dispatch(showSidebar());
        dispatch(
          sidebarDataChanged({
            node: node,
            properties: [
              {
                editable: false,
                label: "Description",
                value: "Subtracts top input from bottom input",
              },
              { editable: false, value: 2, label: "Inputs" },
            ],
          })
        );
      }}
    >
      {nodeInputs.length > 1 && (
        <span>
          {nodeInputs[0] || "_"} - {(nodeInputs[1] || 0) < 0 && "("}
          {nodeInputs[1] || "_"}
          {(nodeInputs[1] || 0) < 0 && ")"} = {node.outputs}
        </span>
      )}{" "}
    </BaseNode>
  );
}

export default SubtractNode;
