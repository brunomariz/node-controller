import React, { ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[];
};

function PreventDrag({ children }: Props) {
  // Place this component inside a Draggable component to prevent the elements inside from triggering a drag.
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
}

export default PreventDrag;
