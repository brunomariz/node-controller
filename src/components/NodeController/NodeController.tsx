import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { selectCursorVariety } from "../../redux/features/cursor/cursorSlice";
import {
  newNode,
  selectAdjacencyList,
  selectNodePositions,
} from "../../redux/features/graph/graphSlice";
import Connector from "../Connector/Connector";
import Node from "../Node/Node";

type Props = {};

function NodeController({}: Props) {
  const [nodes, setNodes] = useState([]);
  const nodePositions = useAppSelector(selectNodePositions);
  const adjacencyList = useAppSelector(selectAdjacencyList);
  const cursorVariety = useAppSelector(selectCursorVariety);

  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cursorVariety == "AddNode") {
      dispatch(newNode({ x: e.clientX, y: e.clientY }));
    }
  };
  return (
    <div
      className="flex justify-center items-center w-full h-screen z-0"
      onDoubleClick={(e) => {
        handleClick(e);
      }}
    >
      {nodePositions.map((position, index) => {
        return <Node id={index} initialPosition={position}></Node>;
      })}
      {adjacencyList.map((connection) => {
        const originPosition = nodePositions[connection[0]];
        const destinationPosition = nodePositions[connection[1]];
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
