import React from "react";
import { Position } from "../../../@types/position";
import { useAppDispatch } from "../../../redux/app/hooks";
import {
  nodeOutputsChanged,
  NodeType,
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

function EmptyNode({ node, focus }: Props) {
  const dispatch = useAppDispatch();
  return (
    <BaseNode
      focus={focus}
      node={node}
      label={node.id.toString()}
      onLabelClick={() => {
        dispatch(showSidebar());
        dispatch(
          sidebarDataChanged({
            node: node,
            properties: [],
          })
        );
      }}
    >
      {node.outputs}
    </BaseNode>
  );
}

export default EmptyNode;
