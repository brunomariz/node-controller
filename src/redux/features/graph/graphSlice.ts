import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NodeVariety } from "../../../@types/nodeVariety";
import { Position } from "../../../@types/position";
import { nodeVarietyMaxIO } from "../../../components/Nodes/Node/IONumbers";
import { RootState, AppThunk } from "../../app/store";
// import { fetchCount } from './counterAPI';

export type INodes = {
  position: Position;
  variety: NodeVariety;
}[];

export interface GraphState {
  originNode: number | null;
  adjacencyList: number[][];
  nodes: INodes;
}

const initialState: GraphState = {
  originNode: null,
  adjacencyList: [
    [0, 1],
    [2, 3],
    [1, 2],
    [1, 3],
  ],
  nodes: [
    { position: { x: 100, y: 200 }, variety: "Empty" },
    { position: { x: 110, y: 300 }, variety: "Empty" },
    { position: { x: 120, y: 400 }, variety: "Empty" },
    { position: { x: 130, y: 500 }, variety: "Empty" },
    { position: { x: 140, y: 600 }, variety: "Empty" },
  ],
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
        state.adjacencyList.filter((item) => item[1] == action.payload[1]) ||
        [];
      const destinationVariety = state.nodes[destination].variety;
      const maxInputsOnDestination =
        nodeVarietyMaxIO[destinationVariety].inputs;
      // Remove last connection on node depending on max connections
      if (occupiedInputs.length >= maxInputsOnDestination) {
        const lastOccupiedInputConnection =
          occupiedInputs[occupiedInputs.length - 1];
        console.log(lastOccupiedInputConnection.toString());

        state.adjacencyList = state.adjacencyList.filter(
          (item) => item != lastOccupiedInputConnection
        );
      }
      state.adjacencyList = [
        ...state.adjacencyList.map((item) => [...item]),
        action.payload,
      ];
    },
    nodeMoved: (
      state,
      action: PayloadAction<{ position: Position; id: number }>
    ) => {
      const { id, position } = action.payload;
      state.nodes[id].position = position;
    },
    newNode: (
      state,
      action: PayloadAction<{ position: Position; variety: NodeVariety }>
    ) => {
      state.nodes = [
        ...state.nodes,
        { position: action.payload.position, variety: action.payload.variety },
      ];
    },
    clearNodes: (state) => {
      state.adjacencyList = [];
      state.nodes = [];
      state.originNode = null;
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
  nodeMoved,
  newNode,
  clearNodes,
} = graphSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNodes = (state: RootState) => state.graph.nodes;
export const selectOriginNode = (state: RootState) => state.graph.originNode;
export const selectAdjacencyList = (state: RootState) => {
  return state.graph.adjacencyList;
};

export default graphSlice.reducer;
