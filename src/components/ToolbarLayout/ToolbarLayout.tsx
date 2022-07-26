import React, { ReactNode } from "react";
import Toolbar from "./Toolbar";

type Props = {
  children: ReactNode | ReactNode[];
};

function ToolbarLayout({ children }: Props) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <Toolbar></Toolbar>
      {children}
    </div>
  );
}

export default ToolbarLayout;
