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

function AddNode({ node, focus }: Props) {
  const nodes = useAppSelector(selectNodes);
  const adjacencyList = useAppSelector(selectAdjacencyList);
  const nodeInputs = findInputs(node.id, nodes, adjacencyList);
  const dispatch = useAppDispatch();

  return (
    <BaseNode
      node={node}
      label="Add"
      focus={focus}
      onLabelDoubleClick={() => {
        dispatch(showSidebar());
        dispatch(
          sidebarDataChanged({
            node: node,
            properties: [{ editable: false, value: 2, label: "Inputs" }],
          })
        );
      }}
    >
      {nodeInputs.length > 1 && (
        <span>
          {nodeInputs[0] || "_"} + {nodeInputs[1] || "_"} = {node.outputs}
        </span>
      )}{" "}
    </BaseNode>
  );
}

export default AddNode;
