import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Edge } from "reactflow";
import { NodesState, CustomNode } from "../helpers/types";

const initialNodes: CustomNode[] = [
  {
    id: "1",
    type: "customNode",
    position: { x: 0, y: 0 },
    data: { nodeId: "1", nodeName: "1" },
  },
];

const initialEdges: Edge[] = [];

const addNode = (object: CustomNode, selectedValue: string, prevName: string) => {
  const newNode = {
    id: `${Number(object.id) + 1}`,
    type: "customNode",
    position: { x: object.position.x + 250, y: object.position.y + 200 },
    data: {
      nodeId: `${Number(object.id) + 1}`,
      nodeName: `${prevName}-${selectedValue}`,
    },
  };
  return newNode;
};

const addEdge = (object: CustomNode, selectedValue: string, prevNodeId: string) => {
  const newEdge = {
    id: `${prevNodeId}-${selectedValue}`,
    source: `${prevNodeId}`,
    target: `${Number(object.id) + 1}`,
  };
  return newEdge;
};

const initialState = {
  data: {
    nodes: initialNodes,
    edges: initialEdges,
    checked: [],
  },
} as NodesState;

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setNodes: (
      state,
      action: PayloadAction<{
        selectedValue: string;
        prevNodeId: string;
        prevName: string;
      }>
    ) => {
      const { selectedValue, prevNodeId, prevName } = action.payload;
      const nodes = state.data.nodes;

      state.data.nodes = [
        ...state.data.nodes,
        addNode(nodes[nodes.length - 1], selectedValue, prevName),
      ];
      state.data.edges = [
        ...state.data.edges,
        addEdge(nodes[nodes.length - 1], selectedValue, prevNodeId),
      ];
    },
    removeNodes: () => {
      // const { prevName } = action.payload;
      // removing nodes
      // const nodeIndex = state.data.nodes.findIndex(
      //   (obj) => obj.data.nodeName === prevName
      // );
      // state.data.nodes = state.data.nodes.slice(nodeIndex, 1);
      // removing edges
      // const edgeIndex = state.data.edges.findIndex((obj) => obj.id === prevName);
      // state.data.nodes = state.data.nodes.slice(edgeIndex, 1);
    },
    setChecked: (state, action: PayloadAction<{ id: string; value: string }>) => {
      const { id, value } = action.payload;
      const objIndex = state.data.checked.findIndex((obj) => obj.id === id);

      if (objIndex === -1) {
        state.data.checked = [...state.data.checked, { id, values: [value] }];
      } else {
        state.data.checked[objIndex].values = [
          ...state.data.checked[objIndex].values,
          ...[value],
        ];
      }
    },
    removeChecked: (state, action: PayloadAction<{ id: string; value: string }>) => {
      const { id, value } = action.payload;

      const objIndex = state.data.checked.findIndex((obj) => obj.id === id);
      state.data.checked[objIndex].values = state.data.checked[objIndex].values.filter(
        (val) => val !== value
      );
    },
  },
});

export const { setNodes, setChecked, removeChecked, removeNodes } = nodesSlice.actions;
export const nodesReducer = nodesSlice.reducer;
