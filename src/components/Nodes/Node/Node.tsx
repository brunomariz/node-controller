import React, { useState } from "react";
import { NodeVariety } from "../../../@types/nodeVariety";
import { Position } from "../../../@types/position";
import { useAppDispatch } from "../../../redux/app/hooks";
import { nodeMoved, NodeType } from "../../../redux/features/graph/graphSlice";
import Draggable from "../../Controls/Draggable/Draggable";
import PreventDrag from "../../Controls/PreventDrag/PreventDrag";
import AddNode from "../Add/AddNode";
import BaseNode from "../BaseNode/BaseNode";
import ConstantNode from "../Constant/ConstantNode";

type Props = {
  // initialPosition: Position;
  // id: number;
  // variety: NodeVariety;
  node: NodeType;
  focus: boolean;
};

// function Node({ variety, initialPosition, id, focus }: Props) {
function Node({ node, focus }: Props) {
  const dispatch = useAppDispatch();
  return (
    // <Draggable
    //   onDrag={(e, position) =>
    //     dispatch(nodeMoved({ id, position: { x: position.x, y: position.y } }))
    //   }
    //   initialPosition={initialPosition}
    // >
    //   <div className="p-[1px] bg-black relative">
    //     <PreventDrag>
    //       <div
    //         className="absolute h-0 w-0 "
    //         style={{
    //           borderTop: "10px solid transparent",
    //           borderBottom: "10px solid transparent",
    //           borderLeft: "10px solid",
    //           left: "calc(100% - 0px)",
    //           top: "calc(50% - 10px)",
    //         }}
    //       ></div>
    //       <div
    //         className="absolute "
    //         style={{ left: "calc(0% - 10px)", top: "calc(50% - 10px)" }}
    //       >
    //         <svg height={20} width={10}>
    //           <circle cx="10" cy="10" r="10" fill="black" />
    //         </svg>
    //       </div>
    //     </PreventDrag>
    //     <div className="w-[100px] h-16 bg-slate-400"></div>
    //   </div>
    // </Draggable>
    <>
      {node.variety == "Empty" ? (
        <BaseNode node={node} focus={focus}></BaseNode>
      ) : node.variety == "Add" ? (
        <AddNode
          // id={id}
          // initialPosition={initialPosition}
          node={node}
          focus={focus}
        ></AddNode>
      ) : node.variety == "Constant" ? (
        <ConstantNode
          // id={id}
          // initialPosition={initialPosition}
          node={node}
          value={1}
          focus={focus}
        ></ConstantNode>
      ) : null}
    </>
  );
}

export default Node;
