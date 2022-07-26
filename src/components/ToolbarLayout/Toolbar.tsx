import React from "react";
import { useAppDispatch } from "../../redux/app/hooks";
import { clearNodes } from "../../redux/features/graph/graphSlice";
import { showLibrary } from "../../redux/features/nodeLibrary/nodeLibrarySlice";
import ToolbarButton from "./ToolbarButton";

type Props = {};

function Toolbar({}: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full bg-gray-300 z-[11] p-1 pt-2 flex items-end">
      <ToolbarButton
        onClick={() => {
          dispatch(clearNodes());
          console.log("oi");
        }}
        label="New"
        large
      ></ToolbarButton>
      <ToolbarButton
        onClick={() => {
          dispatch(showLibrary());
        }}
        label="Node Library"
        large
      ></ToolbarButton>
    </div>
  );
}

export default Toolbar;
