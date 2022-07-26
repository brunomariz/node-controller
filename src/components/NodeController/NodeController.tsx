import React, { useState } from "react";
import { Position } from "../../@types/position";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  nodeVarietyChanged,
  selectCursorVariety,
  selectNodeVariety,
} from "../../redux/features/cursor/cursorSlice";
import {
  newNode,
  originNodeChanged,
  selectAdjacencyList,
  selectNodes,
  selectOriginNode,
} from "../../redux/features/graph/graphSlice";
import Connector from "../Connector/Connector";
import { adjustInputPosition } from "../Nodes/Node/adjustIOPosition";
import Node from "../Nodes/Node/Node";

type Props = {};

function NodeController({}: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const nodes = useAppSelector(selectNodes);
  const adjacencyList = useAppSelector(selectAdjacencyList);
  const cursorVariety = useAppSelector(selectCursorVariety);
  const nodeVariety = useAppSelector(selectNodeVariety);
  const originNode = useAppSelector(selectOriginNode);

  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cursorVariety == "AddNode") {
      dispatch(
        newNode({
          position: { x: e.clientX, y: e.clientY },
          variety: nodeVariety,
        })
      );
    }
  };

  const adjustOutputPosition = (position: Position, numOutputs: number = 1) => {
    return { x: position.x + 107, y: position.y + 32 };
  };
  // const adjustInputPosition = (position: Position, numInputs: number = 1) => {
  //   return { x: position.x - 4, y: position.y + 32 / numInputs };
  // };
  return (
    <div
      className="flex justify-center items-center w-full h-screen z-0"
      onDoubleClick={(e) => {
        handleClick(e);
      }}
      onClick={(e) => {
        if (originNode != null) {
          dispatch(originNodeChanged(null));
        }
      }}
      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
    >
      {nodes.map((node, index) => {
        const position = node.position;
        return (
          <Node
            id={index}
            initialPosition={position}
            variety={node.variety}
          ></Node>
        );
      })}
      {adjacencyList.map((connection, index) => {
        const originPosition = adjustOutputPosition(
          nodes[connection[0]].position
        );
        const destinationPosition = adjustInputPosition(
          // nodes[connection[1]].position,
          // nodes[connection[1]].variety,
          nodes,
          adjacencyList,
          connection[1],
          // Count how many times node appears as output in adjacency
          // list before the current item
          adjacencyList.slice(0, index).find((item) => item[1] == connection[1])
            ?.length || 0
        );

        return (
          <Connector
            originPosition={originPosition}
            destinationPosition={destinationPosition}
          ></Connector>
        );
      })}
      {originNode != null && (
        <Connector
          destinationPosition={mousePosition}
          originPosition={adjustOutputPosition(nodes[originNode].position)}
        ></Connector>
      )}
    </div>
  );
}

export default NodeController;
