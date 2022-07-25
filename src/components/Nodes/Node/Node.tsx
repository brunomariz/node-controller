import React, { useState } from "react";
import { NodeVariety } from "../../../@types/nodeVariety";
import { Position } from "../../../@types/position";
import { useAppDispatch } from "../../../redux/app/hooks";
import { nodeMoved } from "../../../redux/features/graph/graphSlice";
import Draggable from "../../Controls/Draggable/Draggable";
import PreventDrag from "../../Controls/PreventDrag/PreventDrag";
import BaseNode from "../BaseNode/BaseNode";

type Props = {
  initialPosition: Position;
  id: number;
  variety: NodeVariety;
};

function Node({ variety, initialPosition, id }: Props) {
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
      {variety == "Empty" ? (
        <BaseNode
          id={id}
          initialPosition={initialPosition}
          inputs={1}
          outputs={1}
        ></BaseNode>
      ) : variety == "Add" ? (
        <BaseNode
          id={id}
          initialPosition={initialPosition}
          inputs={2}
          outputs={1}
        >
          +
        </BaseNode>
      ) : null}
    </>
  );
}

export default Node;
