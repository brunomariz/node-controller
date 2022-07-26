import React, { useState } from "react";
import LibraryScreen from "./components/Library/LibraryScreen/LibraryScreen";
import NodeController from "./components/NodeController/NodeController";
import ToolbarLayout from "./components/ToolbarLayout/ToolbarLayout";

function App() {
  return (
    <ToolbarLayout>
      {<LibraryScreen></LibraryScreen>}
      <NodeController></NodeController>
    </ToolbarLayout>
  );
}

export default App;
