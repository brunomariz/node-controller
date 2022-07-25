import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  nodeVarietyChanged,
  selectCursorVariety,
  selectNodeVariety,
} from "../../redux/features/cursor/cursorSlice";
import {
  newNode,
  selectAdjacencyList,
  selectNodes,
} from "../../redux/features/graph/graphSlice";
import Connector from "../Connector/Connector";
import Node from "../Nodes/Node/Node";

type Props = {};

function NodeController({}: Props) {
  const nodes = useAppSelector(selectNodes);
  const adjacencyList = useAppSelector(selectAdjacencyList);
  const cursorVariety = useAppSelector(selectCursorVariety);
  const nodeVariety = useAppSelector(selectNodeVariety);

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
  return (
    <div
      className="flex justify-center items-center w-full h-screen z-0"
      onDoubleClick={(e) => {
        handleClick(e);
      }}
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
      {adjacencyList.map((connection) => {
        const originPosition = nodes[connection[0]].position;
        const destinationPosition = nodes[connection[1]].position;
        return (
          <Connector
            originPosition={{
              x: originPosition.x + 107,
              y: originPosition.y + 32,
            }}
            destinationPosition={{
              x: destinationPosition.x - 4,
              y: destinationPosition.y + 32,
            }}
          ></Connector>
        );
      })}
    </div>
  );
}

export default NodeController;
