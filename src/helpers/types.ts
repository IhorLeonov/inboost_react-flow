import { Node, Edge } from "reactflow";
import { Dispatch, SetStateAction } from "react";

export interface CustomNode extends Node {
  data: { nodeId: string; nodeName: string };
}

interface CheckedVariant {
  id: string;
  values: string[];
}

export interface NodesState {
  data: {
    nodes: CustomNode[];
    edges: Edge[];
    checked: CheckedVariant[];
  };
}

export interface CustomSelectProps {
  isSelectOpen: boolean;
  setIsSelectOpen: Dispatch<SetStateAction<boolean>>;
  nodeId: string;
  nodeName: string;
}

export type NodeData = {
  nodeId: string;
  nodeName: string;
};
