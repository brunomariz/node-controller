import React from "react";
import ToolbarButton from "./ToolbarButton";

type Props = {};

function Toolbar({}: Props) {
  return (
    <div className="w-full bg-gray-300 z-[11] p-1 pt-2 flex items-end">
      <ToolbarButton onClick={() => {}} label="New" large></ToolbarButton>
      <ToolbarButton
        onClick={() => {}}
        label="Node Library"
        large
      ></ToolbarButton>
    </div>
  );
}

export default Toolbar;
