import React from "react";
import { useAppDispatch } from "../../redux/app/hooks";
import {
  cursorVarietyChanged,
  selectedNodeChanged,
} from "../../redux/features/cursor/cursorSlice";
import Draggable from "../Controls/Draggable/Draggable";
import PreventDrag from "../Controls/PreventDrag/PreventDrag";

type Props = {};

function LibraryScreen({}: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      <Draggable
        initialPosition={{ x: 500, y: 200 }}
        onDrag={(e, position) => {}}
      >
        <div className="bg-white h-[320px] w-[480px] border-2">
          <div className="border-2">Library</div>
          <PreventDrag>
            <div className="flex flex-col items-start">
              <button
                className="bg-blue-200 outline-1 outline-black outline-double"
                onClick={() => {
                  dispatch(cursorVarietyChanged("AddNode"));
                  dispatch(selectedNodeChanged("Empty"));
                }}
              >
                Empty Node
              </button>
            </div>
          </PreventDrag>
        </div>
      </Draggable>
    </>
  );
}

export default LibraryScreen;
