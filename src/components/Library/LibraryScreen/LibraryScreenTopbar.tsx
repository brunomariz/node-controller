import React from "react";
import { useAppDispatch } from "../../../redux/app/hooks";
import { hideLibrary } from "../../../redux/features/nodeLibrary/nodeLibrarySlice";

type Props = {};

function LibraryScreenTopbar({}: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="border-2 flex justify-between items-center absolute top-0 left-0 w-full bg-gray-50 h-8">
      <span className="px-2">Library</span>
      <button
        onClick={() => dispatch(hideLibrary())}
        className="bg-red-300 py-1 px-2 m-1 hover:scale-110 rounded-sm flex items-center justify-center"
      >
        <span className="leading-3">x</span>
      </button>
    </div>
  );
}

export default LibraryScreenTopbar;
