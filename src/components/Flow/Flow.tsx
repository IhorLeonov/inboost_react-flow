import { useCallback, useEffect, useMemo } from "react";
import { CustomNode } from "../index";
import "reactflow/dist/style.css";
import { StyledFlow } from "./Flow.styled";

import {
  addEdge,
  OnConnect,
  MarkerType,
  SelectionMode,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { useAppSelector } from "../../redux/store";
import { selectData } from "../../redux/selectors";

function Flow() {
  const { nodes: initialNodes, edges: initialEdges } = useAppSelector(selectData);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, setNodes, initialEdges, setEdges]);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const defaultEdgeOptions = {
    style: {
      stroke: "#ADB5BD",
    },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <StyledFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        // fitView
        defaultEdgeOptions={defaultEdgeOptions}
        panOnScroll
        selectionOnDrag
        panOnDrag={[1, 2]}
        selectionMode={SelectionMode.Partial}
      ></StyledFlow>
    </div>
  );
}

export default Flow;
