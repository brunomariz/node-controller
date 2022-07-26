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

function ConstantNode({ node, focus }: Props) {
  const dispatch = useAppDispatch();
  return (
    <BaseNode
      focus={focus}
      node={node}
      label={"Constant"}
      onLabelClick={() => {
        dispatch(showSidebar());
        dispatch(
          sidebarDataChanged({
            node: node,
            properties: [
              {
                editable: false,
                label: "Description",
                value: "Outputs a constant value",
              },
              {
                editable: true,
                value: node.outputs[0] || [],
                label: "Value",
                onChange: (e) => {
                  dispatch(
                    nodeOutputsChanged({
                      id: node.id,
                      newOutputs: [Number(e.target.value)],
                    })
                  );
                },
              },
            ],
          })
        );
      }}
    >
      {node.outputs}
    </BaseNode>
  );
}

export default ConstantNode;
