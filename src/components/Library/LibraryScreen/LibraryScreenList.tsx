import React from "react";
import LibraryButton from "../LibraryButton/LibraryButton";

type Props = {};

function LibraryScreenList({}: Props) {
  return (
    <div className="grid grid-cols-4 items-start h-full bg-black gap-[2px] p-[2px]">
      <LibraryButton
        color={"blue"}
        nodeVariety="Empty"
        value="Empty Node"
      ></LibraryButton>
      <LibraryButton
        color="blue"
        nodeVariety="Constant"
        value="Constant"
      ></LibraryButton>
      <LibraryButton color="blue" nodeVariety="Add" value="Add"></LibraryButton>
      <LibraryButton
        color="blue"
        nodeVariety="Subtract"
        value="Subtract"
      ></LibraryButton>
    </div>
  );
}

export default LibraryScreenList;
