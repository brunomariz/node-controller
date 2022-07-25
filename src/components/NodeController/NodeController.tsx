import React from "react";
import Node from "../Node/Node";

type Props = {};

function NodeController({}: Props) {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Node initialPosition={{ x: 100, y: 200 }}></Node>
      <Node initialPosition={{ x: 50, y: 200 }}></Node>
      <Node initialPosition={{ x: 50, y: 200 }}></Node>
      <Node initialPosition={{ x: 50, y: 200 }}></Node>
      <Node initialPosition={{ x: 50, y: 200 }}></Node>
      <Node initialPosition={{ x: 50, y: 200 }}></Node>
    </div>
  );
}

export default NodeController;
