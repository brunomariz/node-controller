import React from "react";
import { Position } from "../../@types/position";

type Props = { originPosition: Position; destinationPosition: Position };

function Connector({ originPosition, destinationPosition }: Props) {
  return (
    <svg className="h-full w-full fixed top-0 left-0">
      <line
        x1={originPosition.x}
        y1={originPosition.y}
        x2={destinationPosition.x}
        y2={destinationPosition.y}
        style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
      />
    </svg>
  );
}

export default Connector;
