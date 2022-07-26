import React, { useState } from "react";
import LibraryScreen from "./components/Library/LibraryScreen/LibraryScreen";
import NodeController from "./components/NodeController/NodeController";
import ToolbarLayout from "./components/ToolbarLayout/ToolbarLayout";
import { useAppSelector } from "./redux/app/hooks";
import { selectShow } from "./redux/features/nodeLibrary/nodeLibrarySlice";

function App() {
  const showLibrary = useAppSelector(selectShow);
  return (
    <ToolbarLayout>
      {showLibrary && <LibraryScreen></LibraryScreen>}
      <NodeController></NodeController>
    </ToolbarLayout>
  );
}

export default App;
