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
  // id: number;
  // initialPosition: Position;
  node: NodeType;
  value: number;
  focus: boolean;
};

function ConstantNode({ node, value, focus }: Props) {
  const dispatch = useAppDispatch();
  return (
    <BaseNode
      focus={focus}
      // id={id}
      // initialPosition={initialPosition}
      // inputs={0}
      // outputs={1}
      node={node}
      label={"Constant"}
      onLabelDoubleClick={() => {
        dispatch(showSidebar());
        dispatch(
          sidebarDataChanged({
            node: node,
            properties: [
              {
                editable: true,
                value: value,
                label: "value",
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
