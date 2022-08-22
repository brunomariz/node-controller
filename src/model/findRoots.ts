import { NodesType } from "../redux/features/graph/graphSlice";

export const findRoots = (adjacencyList: number[][], nodes: NodesType) => {
  const nodesCopy = [...nodes];
  const destinations = [
    ...adjacencyList.map((item) => {
      return item[1];
    }),
  ];
  const rootNodeIds: number[] = [];
  nodesCopy.forEach((node) => {
    const nodeId = node.id;
    if (destinations.findIndex((destination) => destination == nodeId) == -1) {
      rootNodeIds.push(nodeId);
    }
  });
  return rootNodeIds;
};
