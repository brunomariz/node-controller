import { findNodeById } from "../components/Nodes/Node/findNodeById";
import { NodesType, NodeType } from "../redux/features/graph/graphSlice";

export const processData = (
  previousNodes: NodesType,
  adjacencyList: number[][]
) => {
  console.log("process data");

  const copyNodes = [
    ...previousNodes.map((node) => {
      const variety = findNodeById(node.id, previousNodes).variety;
      switch (variety) {
        case "Empty":
          return processEmptyNodeData(node.id, previousNodes, adjacencyList);

        case "Add":
          return processAddNodeData(node.id, previousNodes, adjacencyList);

        // case "Constant":
        //   return;

        default:
          return node;
      }
    }),
  ];
  return copyNodes;
};

function processEmptyNodeData(
  id: number,
  nodes: NodesType,
  adjacencyList: number[][]
) {
  const node = findNodeById(id, nodes);
  const inputs = findInputs(id, nodes, adjacencyList);
  if (inputs.every((value) => value != null)) {
    const newNode: NodeType = { ...node, outputs: inputs };
    return newNode;
  } else {
    return node;
  }
}

function processAddNodeData(
  id: number,
  nodes: NodesType,
  adjacencyList: number[][]
) {
  const node = findNodeById(id, nodes);
  const inputs = findInputs(id, nodes, adjacencyList);
  if (inputs.length > 0) {
    const sum = inputs.reduce((acc, curr) => {
      return acc != null && curr != null ? acc + curr : acc;
    }, 0);
    const newNode: NodeType = { ...node, outputs: [sum] };
    return newNode;
  } else {
    const newNode: NodeType = { ...node, outputs: [] };
    return newNode;
  }
}

function findInputs(id: number, nodes: NodesType, adjacencyList: number[][]) {
  const inputConnections = adjacencyList.filter((connection) => {
    const [originId, destinationId] = connection;
    return destinationId == id;
  });
  // Array to list nodes that have been connected,
  // to know which output to get from node
  const appeared: number[] = [];
  const inputValues = inputConnections.map((connection) => {
    const [originId, destinationId] = connection;
    const occurrences = appeared.reduce((acc, curr) => {
      return curr == originId ? acc + 1 : acc;
    }, 0);
    appeared.push(originId);
    // return findNodeById(originId, nodes).outputs[occurrences];

    // TODO: change outputs to use output number when more than one output
    // is implemented
    return findNodeById(originId, nodes).outputs[0];
  });
  return inputValues;
}
