import { createSlice } from "@reduxjs/toolkit";
import { Node, Edge } from "reactflow";
import { NodesState } from "../helpers/types";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "customNode",
    position: { x: 0, y: 0 },
    data: { nodeNumb: "1", nodeName: "1" },
  },
];

const initialEdges: Edge[] = [];

const initialState = {
  data: {
    nodes: initialNodes,
    edges: initialEdges,
  },
} as NodesState;

const addNode = (object: Node, childNode: string, oldName: string) => {
  const newNode = {
    id: `${Number(object.id) + 1}`,
    type: "customNode",
    position: { x: object.position.x + 250, y: object.position.y + 200 },
    data: {
      nodeNumb: `${Number(object.id) + 1}`,
      nodeName: `${oldName}-${childNode}`,
    },
  };
  return newNode;
};

const addEdge = (object: Node, childNode: string, parentNode: string) => {
  const newEdge = {
    id: `${parentNode}-${childNode}`,
    source: `${parentNode}`,
    target: `${Number(object.id) + 1}`,
  };
  return newEdge;
};

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setNodes: (state, action) => {
      const { childNode, parentNode, oldName } = action.payload;
      const nodes = state.data.nodes;

      state.data.nodes = [
        ...state.data.nodes,
        addNode(nodes[nodes.length - 1], childNode, oldName),
      ];
      state.data.edges = [
        ...state.data.edges,
        addEdge(nodes[nodes.length - 1], childNode, parentNode),
      ];
    },
  },
});

export const { setNodes } = nodesSlice.actions;
export const nodesReducer = nodesSlice.reducer;
