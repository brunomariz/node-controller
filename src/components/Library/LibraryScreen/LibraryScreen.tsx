import React from "react";
import { useAppDispatch } from "../../../redux/app/hooks";
import {
  cursorVarietyChanged,
  nodeVarietyChanged,
} from "../../../redux/features/cursor/cursorSlice";
import Draggable from "../../Controls/Draggable/Draggable";
import PreventDrag from "../../Controls/PreventDrag/PreventDrag";
import LibraryButton from "../LibraryButton/LibraryButton";
import LibraryScreenList from "./LibraryScreenList";
import LibraryScreenTopbar from "./LibraryScreenTopbar";

type Props = {};

function LibraryScreen({}: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      <Draggable
        initialPosition={{ x: 200, y: 200 }}
        onDrag={(e, position) => {}}
      >
        <div
          style={{ borderStyle: "ridge" }}
          className="bg-white h-[320px] w-[480px] border-2 overflow-scroll"
        >
          <LibraryScreenTopbar></LibraryScreenTopbar>
          <div className="">
            <PreventDrag>
              <LibraryScreenList></LibraryScreenList>
            </PreventDrag>
          </div>
        </div>
      </Draggable>
    </>
  );
}

export default LibraryScreen;
