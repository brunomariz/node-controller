import React, { ReactNode, useState } from "react";
import { Position } from "../../../@types/position";

type Props = {
  initialPosition: Position;
  children?: ReactNode | ReactNode[];
};

function Draggable({ initialPosition, children }: Props) {
  const [position, setPosition] = useState(initialPosition);
  const [mousePositionDifference, setMousePositionDifference] = useState({
    x: 0,
    y: 0,
  });
  const [mouseHolding, setmouseHolding] = useState(false);

  function vectorDifference(subtractAmmount: Position, subtractFrom: Position) {
    // Returns subtractFrom - subtractAmmount
    return {
      x: subtractFrom.x - subtractAmmount.x,
      y: subtractFrom.y - subtractAmmount.y,
    };
  }

  function vectorAddition(v1: Position, v2: Position) {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y,
    };
  }

  function handleDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const mousePosition: Position = { x: e.clientX, y: e.clientY };
    const newPosition = vectorDifference(
      mousePositionDifference,
      mousePosition
    );
    setPosition(newPosition);
  }
  return (
    <>
      <div
        className="fixed left-0 top-0 w-screen h-screen"
        onMouseMove={(e) => {
          if (mouseHolding) {
            handleDrag(e);
          }
        }}
        onMouseUp={() => {
          setmouseHolding(false);
        }}
        style={{ zIndex: mouseHolding ? 10 : 0 }}
      ></div>
      <div
        onMouseMove={(e) => {
          if (mouseHolding) {
            handleDrag(e);
          }
        }}
        onMouseUp={() => {
          setmouseHolding(false);
        }}
        onMouseDown={(e) => {
          const mousePosition: Position = { x: e.clientX, y: e.clientY };
          const difference = vectorDifference(position, mousePosition);
          setMousePositionDifference(difference);
          setmouseHolding(true);
        }}
        className="absolute select-none"
        style={{
          left: position.x,
          top: position.y,
          zIndex: mouseHolding ? 11 : 1,
        }}
        draggable={false}
      >
        {children}
      </div>
    </>
  );
}

export default Draggable;
