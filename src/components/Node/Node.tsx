import React, { useState } from "react";
import { Position } from "../../@types/position";

type Props = {
  initialPosition: Position;
};

function Node({ initialPosition }: Props) {
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
        className="absolute w-screen h-screen"
        onMouseMove={(e) => {
          // if (e.buttons != 1) {
          //   console.log(mouseHolding);
          // }
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
        onMouseUp={() => {
          setmouseHolding(false);
        }}
        onMouseDown={(e) => {
          console.log("clock");

          const mousePosition: Position = { x: e.clientX, y: e.clientY };
          const difference = vectorDifference(position, mousePosition);
          setMousePositionDifference(difference);
          setmouseHolding(true);
        }}
        className="absolute bg-slate-500 p-2 select-none"
        style={{
          left: position.x,
          top: position.y,
          zIndex: mouseHolding ? 10 : 1,
        }}
        draggable={false}
      >
        Node
      </div>
    </>
  );
}

export default Node;
