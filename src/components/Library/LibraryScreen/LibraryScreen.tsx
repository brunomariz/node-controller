import React from "react";
import { useAppDispatch } from "../../../redux/app/hooks";
import {
  cursorVarietyChanged,
  nodeVarietyChanged,
} from "../../../redux/features/cursor/cursorSlice";
import Draggable from "../../Controls/Draggable/Draggable";
import PreventDrag from "../../Controls/PreventDrag/PreventDrag";
import LibraryButton from "../LibraryButton/LibraryButton";
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
        <div className="bg-white h-[320px] w-[480px] border-2">
          <LibraryScreenTopbar></LibraryScreenTopbar>
          <PreventDrag>
            <div className="flex flex-col items-start">
              <LibraryButton
                color={"blue"}
                nodeVariety="Empty"
                value="Empty Node"
              ></LibraryButton>
              <LibraryButton
                color="blue"
                nodeVariety="Add"
                value="Add"
              ></LibraryButton>
            </div>
          </PreventDrag>
        </div>
      </Draggable>
    </>
  );
}

export default LibraryScreen;
