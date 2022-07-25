import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NodeVariety } from "../../../@types/nodeVariety";
import { Position } from "../../../@types/position";
import { RootState, AppThunk } from "../../app/store";
// import { fetchCount } from './counterAPI';

export interface GraphState {
  originNode: number;
  destinationNode: number;
  adjacencyList: number[][];
  nodes: { position: Position; variety: NodeVariety }[];
}

const initialState: GraphState = {
  originNode: 0,
  destinationNode: 0,
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
    originNodeChanged: (state, action: PayloadAction<number>) => {
      state.originNode = action.payload;
    },
    destinationNodeChanged: (state, action: PayloadAction<number>) => {
      state.destinationNode = action.payload;
    },
    newConnection: (state, action: PayloadAction<number[]>) => {
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
  destinationNodeChanged,
  newConnection,
  nodeMoved,
  newNode,
} = graphSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNodes = (state: RootState) => state.graph.nodes;
export const selectAdjacencyList = (state: RootState) => {
  return state.graph.adjacencyList;
};

export default graphSlice.reducer;
