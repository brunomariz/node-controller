import React, { ReactNode, useState } from "react";
import { Position } from "../../../@types/position";

type Props = {
  initialPosition: Position;
  children?: ReactNode | ReactNode[];
  onDrag: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    position: Position
  ) => void;
};

function Draggable({ initialPosition, children, onDrag }: Props) {
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

  function handleDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const mousePosition: Position = { x: e.clientX, y: e.clientY };
    const newPosition = vectorDifference(
      mousePositionDifference,
      mousePosition
    );
    setPosition(newPosition);
    onDrag(e, position);
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
        onMouseUp={(e) => {
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
        onMouseUp={(e) => {
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
