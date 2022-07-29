import React, { useEffect, useState } from "react";
import { Position } from "../../@types/position";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  nodeVarietyChanged,
  selectCursorVariety,
  selectNodeVariety,
} from "../../redux/features/cursor/cursorSlice";
import {
  focusNodeChanged,
  newNode,
  nodeDeleted,
  originNodeChanged,
  selectAdjacencyList,
  selectFocusNode,
  selectNodes,
  selectOriginNode,
} from "../../redux/features/graph/graphSlice";
import Connector from "../Connector/Connector";
import { adjustInputPosition } from "../Nodes/Node/adjustIOPosition";
import { findNodeById } from "../Nodes/Node/findNodeById";
import Node from "../Nodes/Node/Node";

type Props = {};

function NodeController({}: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const nodes = useAppSelector(selectNodes);
  const adjacencyList = useAppSelector(selectAdjacencyList);
  const cursorVariety = useAppSelector(selectCursorVariety);
  const nodeVariety = useAppSelector(selectNodeVariety);
  const originNode = useAppSelector(selectOriginNode);
  const focusNode = useAppSelector(selectFocusNode);

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
    if (focusNode != null) {
      dispatch(focusNodeChanged(null));
    }
  };

  const adjustOutputPosition = (position: Position, numOutputs: number = 1) => {
    return { x: position.x + 107, y: position.y + 32 };
  };
  // const adjustInputPosition = (position: Position, numInputs: number = 1) => {
  //   return { x: position.x - 4, y: position.y + 32 / numInputs };
  // };
  const calculateOriginDestination = (
    connection: number[],
    numConnections: number
  ) => {
    const originPosition = adjustOutputPosition(
      findNodeById(connection[0], nodes).position
    );
    const destinationPosition = adjustInputPosition(
      nodes,
      adjacencyList,
      connection[1],
      numConnections
    );
    return { originPosition, destinationPosition };
  };
  return (
    <div
      className="flex justify-center items-center w-full h-screen z-0"
      onDoubleClick={(e) => {
        handleClick(e);
      }}
      onMouseUp={(e) => {
        if (originNode != null) {
          dispatch(originNodeChanged(null));
        }
      }}
      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key == "Delete" && focusNode != null) {
          dispatch(nodeDeleted(focusNode));
        }
      }}
    >
      {nodes.map((node, index) => {
        return (
          <Node
            focus={focusNode == node.id}
            id={node.id}
            initialPosition={node.position}
            variety={node.variety}
          ></Node>
        );
      })}
      {adjacencyList.map((connection, index) => {
        const numConnections = adjacencyList
          .slice(0, index)
          .filter((item) => item[1] == connection[1]).length;
        const { originPosition, destinationPosition } =
          calculateOriginDestination(connection, numConnections);
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
          originPosition={adjustOutputPosition(
            findNodeById(originNode, nodes).position
          )}
        ></Connector>
      )}
    </div>
  );
}

export default NodeController;
