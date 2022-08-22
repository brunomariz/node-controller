import React from "react";
import { useAppDispatch } from "../../../redux/app/hooks";
import { hideLibrary } from "../../../redux/features/nodeLibrary/nodeLibrarySlice";
import { AiFillCloseCircle, AiFillCloseSquare } from "react-icons/ai";
import { cursorVarietyChanged } from "../../../redux/features/cursor/cursorSlice";

type Props = {};

function LibraryScreenTopbar({}: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="border-b-2 flex justify-between items-center bg-gray-50 h-8">
      <span className="px-2">Library</span>
      <button
        onClick={() => {
          dispatch(hideLibrary());
          dispatch(cursorVarietyChanged("Move"));
        }}
        className="text-red-500 py-1 px-0 m-1 hover:scale-110 rounded-sm flex items-center justify-center "
      >
        <AiFillCloseSquare size={25}></AiFillCloseSquare>
      </button>
    </div>
  );
}

export default LibraryScreenTopbar;
