import React from "react";
import { useAppDispatch } from "../../redux/app/hooks";
import { clearNodes, propagate } from "../../redux/features/graph/graphSlice";
import { showLibrary } from "../../redux/features/nodeLibrary/nodeLibrarySlice";
import ToolbarButton from "./ToolbarButton";

type Props = {};

function Toolbar({}: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="window-container w-full z-[11] p-1 pt-2 flex items-end fixed top-0 left-0">
      <ToolbarButton
        onClick={() => {
          dispatch(clearNodes());
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
      <ToolbarButton
        onClick={() => {
          dispatch(propagate());
        }}
        label="Run"
        large
      ></ToolbarButton>
    </div>
  );
}

export default Toolbar;
