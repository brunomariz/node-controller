import React from "react";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoMdTransgender } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  NodeType,
  selectFocusNode,
  selectNodes,
} from "../../redux/features/graph/graphSlice";
import {
  hideSidebar,
  selectSidebarData,
  SidebarData,
} from "../../redux/features/sidebar/sidebarSlice";
import { findNodeById } from "../Nodes/Node/findNodeById";

type Props = {};

function Sidebar({}: Props) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectSidebarData);

  return (
    <div className="window-container fixed right-0 top-0 p-2 z-30 w-72 h-screen">
      <div className="border-b-2 flex justify-between items-center  h-8">
        <span className="px-2 ">Node Parameters</span>
        <button
          onClick={() => dispatch(hideSidebar())}
          className="text-red-500 py-1 px-0 m-1 hover:scale-110 rounded-sm flex items-center justify-center "
        >
          <AiFillCloseSquare size={25}></AiFillCloseSquare>
        </button>
      </div>
      <div className="py-1 text-gray-900">
        <div>{data.node?.variety} Node</div>
        <div>
          Node ID: <span className="text-gray-600">{data.node?.id}</span>
        </div>
        {data.properties.map((item) => {
          return item.editable ? (
            <div className="flex justify-start items-center">
              <span>
                {item.label}:{` `}
              </span>
              <input
                type="text"
                className="text-gray-900 w-full mx-2 px-1"
                placeholder={JSON.stringify(item.value)}
                onBlur={(e) => {
                  if (e.target.value) {
                    e.target.placeholder = e.target.value;
                    e.target.value = "";
                  }
                }}
                onChange={(e) => {
                  if (item.onChange) {
                    item.onChange(e);
                  }
                }}
              />
            </div>
          ) : (
            <div>
              {item.label}: <span className="text-gray-600">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
