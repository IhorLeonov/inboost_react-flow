import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
      action: PayloadAction<{ childNode: string; parentNode: string; oldName: string }>
    ) => {
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
    removeNodes: () => {
      // const { oldName } = action.payload;
      // removing nodes
      // const nodeIndex = state.data.nodes.findIndex(
      //   (obj) => obj.data.nodeName === oldName
      // );
      // state.data.nodes = state.data.nodes.slice(nodeIndex, 1);
      // removing edges
      // const edgeIndex = state.data.edges.findIndex((obj) => obj.id === oldName);
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
