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
    <div
      className={`${
        color == "blue"
          ? "bg-blue-200"
          : color == "red"
          ? "bg-red-200"
          : "bg-green-200"
      } relative`}
    >
      <button className={`text-left pl-1 truncate h-full w-full`}>
        <span>{value}</span>
      </button>
      <span
        onClick={() => {
          dispatch(cursorVarietyChanged("AddNode"));
          dispatch(nodeVarietyChanged(nodeVariety));
        }}
        className="bg-inherit hover:scale-105 absolute top-0 left-1 opacity-0 hover:opacity-100 min-w-[95%] overflow-visible whitespace-nowrap z-10 hover:cursor-pointer"
      >
        {value}
      </span>
    </div>
  );
}

export default LibraryButton;
