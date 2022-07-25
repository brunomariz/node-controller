import React from "react";
import { NodeVariety } from "../../../@types/nodeVariety";
import { useAppDispatch } from "../../../redux/app/hooks";
import {
  cursorVarietyChanged,
  nodeVarietyChanged,
} from "../../../redux/features/cursor/cursorSlice";

type Props = {
  nodeVariety: NodeVariety;
  value: string;
  color: "blue" | "red" | "green";
};

function LibraryButton({ nodeVariety, value, color }: Props) {
  const dispatch = useAppDispatch();
  return (
    <button
      className={`${
        color == "blue"
          ? "bg-blue-200"
          : color == "red"
          ? "bg-red-200"
          : "bg-green-200"
      } border-2 border-black`}
      onClick={() => {
        dispatch(cursorVarietyChanged("AddNode"));
        dispatch(nodeVarietyChanged(nodeVariety));
      }}
    >
      {value}
    </button>
  );
}

export default LibraryButton;
