import { Node, Edge } from "reactflow";
import { Dispatch, SetStateAction } from "react";

export interface NodesState {
  data: {
    nodes: Node[];
    edges: Edge[];
  };
}

export interface CustomSelectProps {
  isSelectOpen: boolean;
  setIsSelectOpen: Dispatch<SetStateAction<boolean>>;
  nodeNumb: string;
  nodeName: string;
}

export type NodeData = {
  nodeNumb: string;
  nodeName: string;
};
