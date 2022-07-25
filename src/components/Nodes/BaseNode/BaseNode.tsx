import React, { Children, ReactNode, useState } from "react";
import { NodeVariety } from "../../../@types/nodeVariety";
import { Position } from "../../../@types/position";
import { useAppDispatch } from "../../../redux/app/hooks";
import { nodeMoved } from "../../../redux/features/graph/graphSlice";
import Draggable from "../../Controls/Draggable/Draggable";
import PreventDrag from "../../Controls/PreventDrag/PreventDrag";

type Props = {
  initialPosition: Position;
  id: number;
  inputs: number;
  outputs: number;
  children?: ReactNode | ReactNode[];
};

function BaseNode({ initialPosition, id, inputs, outputs, children }: Props) {
  const dispatch = useAppDispatch();
  return (
    <Draggable
      onDrag={(e, position) =>
        dispatch(nodeMoved({ id, position: { x: position.x, y: position.y } }))
      }
      initialPosition={initialPosition}
    >
      <div className="p-[1px] bg-black relative">
        <PreventDrag>
          <div
            className="absolute h-0 w-0 "
            style={{
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderLeft: "10px solid",
              left: "calc(100% - 0px)",
              top: "calc(50% - 10px)",
            }}
          ></div>
          <div
            className="absolute h-full"
            style={{ left: "calc(0% - 10px)", top: "0" }}
          >
            <div className="flex flex-col justify-around h-full">
              {Array(inputs)
                .fill(null)
                .map((item) => {
                  return (
                    <svg height={20} width={10}>
                      <circle cx="10" cy="10" r="10" fill="black" />
                    </svg>
                  );
                })}
            </div>
          </div>
        </PreventDrag>
        <div className="w-[100px] h-16 bg-slate-400">{children}</div>
      </div>
    </Draggable>
  );
}

export default BaseNode;
