import React, { Children, ReactNode, useState } from "react";
import { NodeVariety } from "../../../@types/nodeVariety";
import { Position } from "../../../@types/position";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks";
import {
  deleteConnection,
  focusNodeChanged,
  newConnection,
  nodeMoved,
  NodesType,
  NodeType,
  originNodeChanged,
  selectAdjacencyList,
  selectOriginNode,
} from "../../../redux/features/graph/graphSlice";
import { showSidebar } from "../../../redux/features/sidebar/sidebarSlice";
import Draggable from "../../Controls/Draggable/Draggable";
import PreventDrag from "../../Controls/PreventDrag/PreventDrag";
import { nodeVarietyMaxIO } from "../Node/IONumbers";
import { IoMdSettings } from "react-icons/io";

type Props = {
  // initialPosition: Position;
  // id: number;
  // inputs: number;
  // outputs: number;
  node: NodeType;
  children?: ReactNode | ReactNode[];
  label?: string;
  focus?: boolean;
  onLabelDoubleClick?: () => void;
};

function BaseNode({
  // initialPosition,
  // id,
  // inputs,
  // outputs,
  node,
  children,
  label,
  focus = false,
  onLabelDoubleClick,
}: Props) {
  const dispatch = useAppDispatch();
  const originNode = useAppSelector(selectOriginNode);
  const adjacencyList = useAppSelector(selectAdjacencyList);

  if (!label) {
    label = node.id.toString();
  }
  return (
    <Draggable
      onDrag={(e, position) => {
        dispatch(nodeMoved({ id: node.id, position }));
      }}
      initialPosition={node.position}
    >
      <div
        className={`relative`}
        onMouseDown={() => {
          dispatch(focusNodeChanged(node.id));
        }}
      >
        <PreventDrag>
          <div
            onMouseDown={(e) => {
              dispatch(originNodeChanged(node.id));
            }}
            className="absolute h-0 w-0"
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
              {/* {Array(inputs) */}
              {Array(nodeVarietyMaxIO[node.variety].inputs)
                .fill(null)
                .map((_, index) => {
                  return (
                    <svg
                      onMouseUp={(e) => {
                        if (originNode != null && originNode != node.id) {
                          dispatch(newConnection([originNode, node.id]));
                          dispatch(originNodeChanged(null));
                        }
                      }}
                      onClick={(e) => {
                        const connection = adjacencyList.filter(
                          (connection) => {
                            // return connection[1] == id;
                            return connection[1] == node.id;
                          }
                        )[index];
                        dispatch(deleteConnection(connection));
                      }}
                      height={20}
                      width={10}
                    >
                      <circle cx="10" cy="10" r="10" fill="black" />
                    </svg>
                  );
                })}
            </div>
          </div>
        </PreventDrag>
        <div
          className={`w-[100px] h-16 bg-slate-400 ${
            focus ? "bottom-border-red" : "bottom-border-black"
          }`}
        >
          <div
            onDoubleClick={onLabelDoubleClick}
            className="absolute -top-5 left-0 bg-slate-400 leading-3 p-1 flex items-center cursor-pointer"
          >
            <IoMdSettings size={12}></IoMdSettings>
            <span className="pl-1">{label}</span>
          </div>
          {children}
        </div>
      </div>
    </Draggable>
  );
}
// TODO: fazer o numero de outputs corretos de acordo com o prop
// TODO: fazer linhas entrarem e sairem dos pontos certos quando houver mais de 1 input/output
export default BaseNode;
