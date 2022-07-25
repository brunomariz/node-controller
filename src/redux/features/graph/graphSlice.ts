import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position } from "../../../@types/position";
import { RootState, AppThunk } from "../../app/store";
// import { fetchCount } from './counterAPI';

export interface GraphState {
  originNode: number;
  destinationNode: number;
  adjacencyList: number[][];
  nodePositions: Position[];
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
  nodePositions: [
    { x: 100, y: 200 },
    { x: 110, y: 300 },
    { x: 120, y: 400 },
    { x: 130, y: 500 },
    { x: 140, y: 600 },
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
      state.nodePositions[id] = position;
    },
    newNode: (state, action: PayloadAction<Position>) => {
      state.nodePositions = [...state.nodePositions, action.payload];
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
export const selectNodePositions = (state: RootState) =>
  state.graph.nodePositions;
export const selectAdjacencyList = (state: RootState) => {
  return state.graph.adjacencyList;
};

export default graphSlice.reducer;
