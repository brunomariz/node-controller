import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  NodeType,
  selectFocusNode,
  selectNodes,
} from "../../redux/features/graph/graphSlice";
import {
  hideSidebar,
  SidebarData,
} from "../../redux/features/sidebar/sidebarSlice";
import { findNodeById } from "../Nodes/Node/findNodeById";

type Props = {
  data: SidebarData;
};

function Sidebar({ data }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className="fixed right-0 top-0 bg-gray-900 p-2 z-30 w-72 h-screen text-gray-50">
      <div className="border-b-2 flex justify-between items-center  h-8">
        <span className="px-2 ">Node Parameters</span>
        <button
          onClick={() => dispatch(hideSidebar())}
          className="text-red-500 py-1 px-0 m-1 hover:scale-110 rounded-sm flex items-center justify-center "
        >
          <AiFillCloseSquare size={25}></AiFillCloseSquare>
        </button>
      </div>
      <div className="py-1">
        <div>{data.node?.variety} Node</div>
        <div>Node ID: {data.node?.id}</div>
        {data.properties.map((item) => {
          return item.editable ? (
            <div className="flex justify-start items-center">
              {item.label}:{" "}
              <input
                type="text"
                className="text-gray-900 w-full mx-2 px-1"
                placeholder={JSON.stringify(item.value)}
                onChange={(e) => {
                  if (item.onChange) {
                    item.onChange(e);
                  }
                }}
              />
            </div>
          ) : (
            <div>
              {item.label}: {item.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
