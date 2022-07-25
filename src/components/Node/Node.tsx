import React, { useState } from "react";
import { Position } from "../../@types/position";
import Draggable from "../Controls/Draggable/Draggable";
import PreventDrag from "../Controls/PreventDrag/PreventDrag";

type Props = {
  initialPosition: Position;
};

function Node({ initialPosition }: Props) {
  return (
    <Draggable initialPosition={initialPosition}>
      <div className="p-2 bg-slate-600 relative">
        <PreventDrag>
          <div className="absolute bg-red-400 w-[20%] left-[90%] top-[20%] h-[60%]"></div>
        </PreventDrag>
        <div className="w-24 h-16 p-5 bg-slate-400"></div>
      </div>
    </Draggable>
  );
}

export default Node;
