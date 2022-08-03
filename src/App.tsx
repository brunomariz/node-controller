import React, { useState } from "react";
import LibraryScreen from "./components/Library/LibraryScreen/LibraryScreen";
import NodeController from "./components/NodeController/NodeController";
import { findNodeById } from "./components/Nodes/Node/findNodeById";
import Sidebar from "./components/Sidebar/Sidebar";
import ToolbarLayout from "./components/ToolbarLayout/ToolbarLayout";
import { useAppSelector } from "./redux/app/hooks";
import {
  NodeType,
  selectFocusNode,
  selectNodes,
} from "./redux/features/graph/graphSlice";
import { selectShow } from "./redux/features/nodeLibrary/nodeLibrarySlice";
import {
  selectShowSidebar,
  selectSidebarData,
} from "./redux/features/sidebar/sidebarSlice";

function App() {
  const showLibrary = useAppSelector(selectShow);
  const showSidebar = useAppSelector(selectShowSidebar);

  return (
    <ToolbarLayout>
      {showLibrary && <LibraryScreen></LibraryScreen>}
      {showSidebar && <Sidebar></Sidebar>}
      <NodeController></NodeController>
    </ToolbarLayout>
  );
}

export default App;
