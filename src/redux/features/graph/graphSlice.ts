import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NodeVariety } from "../../../@types/nodeVariety";
import { Position } from "../../../@types/position";
import { nodeVarietyMaxIO } from "../../../components/Nodes/Node/IONumbers";
import { processData } from "../../../model/processData";
import { RootState, AppThunk } from "../../app/store";
// import { fetchCount } from './counterAPI';

export type NodeOutputsType = (number | null)[];

export type NodeType = {
  id: number;
  position: Position;
  variety: NodeVariety;
  outputs: NodeOutputsType;
};

export type NodesType = NodeType[];

export interface GraphState {
  originNode: number | null;
  adjacencyList: number[][];
  // adjacencyList: { [id: number]: number[] };
  nodes: NodesType;
  focusNode: number | null;
}

const initialState: GraphState = {
  originNode: null,
  adjacencyList: [
    [0, 1],
    [2, 3],
    [1, 2],
    [1, 3],
    [4, 6],
    [5, 6],
    [6, 7],
    [8, 9],
  ],
  nodes: [
    { id: 0, position: { x: 100, y: 270 }, variety: "Empty", outputs: [] },
    { id: 1, position: { x: 250, y: 270 }, variety: "Empty", outputs: [] },
    { id: 2, position: { x: 400, y: 170 }, variety: "Empty", outputs: [] },
    { id: 3, position: { x: 550, y: 270 }, variety: "Add", outputs: [] },
    { id: 4, position: { x: 100, y: 400 }, variety: "Constant", outputs: [1] },
    { id: 5, position: { x: 100, y: 500 }, variety: "Constant", outputs: [1] },
    { id: 6, position: { x: 300, y: 450 }, variety: "Subtract", outputs: [] },
    { id: 7, position: { x: 500, y: 450 }, variety: "Empty", outputs: [] },
    { id: 8, position: { x: 100, y: 600 }, variety: "Constant", outputs: [1] },
    { id: 9, position: { x: 300, y: 600 }, variety: "Empty", outputs: [] },
  ],
  focusNode: null,
};

export const graphSlice = createSlice({
  name: "graph",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    originNodeChanged: (state, action: PayloadAction<number | null>) => {
      state.originNode = action.payload;
    },
    // destinationNodeChanged: (state, action: PayloadAction<number>) => {
    //   state.destinationNode = action.payload;
    // },
    newConnection: (state, action: PayloadAction<number[]>) => {
      const [origin, destination] = action.payload;

      const occupiedInputs =
        state.adjacencyList.filter((item) => item[1] == destination) || [];
      const destinationIndex = state.nodes.findIndex((item) => {
        return item.id == destination;
      });
      const destinationVariety = state.nodes[destinationIndex].variety;
      const maxInputsOnDestination =
        nodeVarietyMaxIO[destinationVariety].inputs;
      // Remove last connection on node depending on max connections
      if (occupiedInputs.length >= maxInputsOnDestination) {
        const lastOccupiedInputConnection =
          occupiedInputs[occupiedInputs.length - 1];

        state.adjacencyList = state.adjacencyList.filter(
          (item) => item != lastOccupiedInputConnection
        );
      }
      // Include new connection
      state.adjacencyList = [
        ...state.adjacencyList.map((item) => [...item]),
        action.payload,
      ];
      // Remove outputs from destination node
      state.nodes[destinationIndex].outputs = [];
    },
    deleteConnection: (state, action: PayloadAction<number[]>) => {
      state.adjacencyList = state.adjacencyList.filter((connection) => {
        return JSON.stringify(connection) != JSON.stringify(action.payload);
      });
    },
    nodeMoved: (
      state,
      action: PayloadAction<{ position: Position; id: number }>
    ) => {
      const { id, position } = action.payload;
      const index = state.nodes.findIndex((item) => {
        return item.id == id;
      });
      state.nodes[index].position = position;
    },
    nodeOutputsChanged: (
      state,
      action: PayloadAction<{ id: number; newOutputs: NodeOutputsType }>
    ) => {
      const { id, newOutputs } = action.payload;
      const index = state.nodes.findIndex((item) => {
        return item.id == id;
      });
      state.nodes[index].outputs = action.payload.newOutputs;
    },
    newNode: (
      state,
      action: PayloadAction<{ position: Position; variety: NodeVariety }>
    ) => {
      state.nodes = [
        ...state.nodes,
        {
          position: action.payload.position,
          variety: action.payload.variety,
          id:
            state.nodes.length > 0
              ? state.nodes[state.nodes.length - 1].id + 1
              : 0,
          outputs:
            action.payload.variety == "Constant"
              ? [1]
              : Array(nodeVarietyMaxIO[action.payload.variety].outputs).fill(
                  null
                ),
        },
      ];
    },
    clearNodes: (state) => {
      state.adjacencyList = [];
      state.nodes = [];
      state.originNode = null;
    },
    focusNodeChanged: (state, action: PayloadAction<number | null>) => {
      state.focusNode = action.payload;
    },
    nodeDeleted: (state, action: PayloadAction<number>) => {
      state.nodes = [
        ...state.nodes.filter((item) => {
          return item.id != action.payload;
        }),
      ];
      state.adjacencyList = [
        ...state.adjacencyList.filter((item) => {
          return item[0] != action.payload && item[1] != action.payload;
        }),
      ];
      if (state.originNode == action.payload) {
        state.originNode = null;
      }
      if (state.focusNode == action.payload) {
        state.focusNode = null;
      }
    },
    propagate: (state) => {
      state.nodes = processData(state.nodes, state.adjacencyList);
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const {
  originNodeChanged,
  newConnection,
  deleteConnection,
  nodeMoved,
  newNode,
  nodeOutputsChanged,
  clearNodes,
  focusNodeChanged,
  nodeDeleted,
  propagate,
} = graphSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNodes = (state: RootState) => state.graph.nodes;
export const selectOriginNode = (state: RootState) => state.graph.originNode;
export const selectAdjacencyList = (state: RootState) => {
  return state.graph.adjacencyList;
};
export const selectFocusNode = (state: RootState) => state.graph.focusNode;

export default graphSlice.reducer;
