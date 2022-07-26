import React, { Children, ReactNode, useState } from "react";
import { NodeVariety } from "../../../@types/nodeVariety";
import { Position } from "../../../@types/position";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks";
import {
  newConnection,
  nodeMoved,
  originNodeChanged,
  selectOriginNode,
} from "../../../redux/features/graph/graphSlice";
import Draggable from "../../Controls/Draggable/Draggable";
import PreventDrag from "../../Controls/PreventDrag/PreventDrag";

type Props = {
  initialPosition: Position;
  id: number;
  inputs: number;
  outputs: number;
  children?: ReactNode | ReactNode[];
  label?: string;
};

function BaseNode({
  initialPosition,
  id,
  inputs,
  outputs,
  children,
  label,
}: Props) {
  const dispatch = useAppDispatch();
  const originNode = useAppSelector(selectOriginNode);

  if (!label) {
    label = id.toString();
  }
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
            onMouseDown={(e) => {
              dispatch(originNodeChanged(id));
            }}
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
            onMouseUp={(e) => {
              if (originNode != null && originNode != id) {
                dispatch(newConnection([originNode, id]));
                dispatch(originNodeChanged(null));
              }
            }}
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
        <div className="w-[100px] h-16 bg-slate-400">
          <span className="absolute -top-5 left-0 bg-slate-400 leading-3 p-1">
            {label}
          </span>
          {children}
        </div>
      </div>
    </Draggable>
  );
}
// TODO: fazer o numero de outputs corretos de acordo com o prop
// TODO: fazer linhas entrarem e sairem dos pontos certos quando houver mais de 1 input/output
export default BaseNode;
