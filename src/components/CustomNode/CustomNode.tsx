import { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Node, Area } from "./CustomNode.styled";
import { CustomSelect } from "../index";
import { NodeData } from "../../helpers/types";

export function CustomNode({ data, isConnectable }: NodeProps<NodeData>) {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  return (
    <Node>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: "transparent" }}
      />
      <Area />
      <CustomSelect
        nodeId={data.nodeId}
        nodeName={data.nodeName}
        isSelectOpen={isSelectOpen}
        setIsSelectOpen={setIsSelectOpen}
      />
      <Handle
        type="source"
        position={data.nodeId === "1" ? Position.Bottom : Position.Right}
        id="a"
        isConnectable={isConnectable}
        style={{
          background: isSelectOpen ? "transparent" : "#adb5bd",
        }}
      />
    </Node>
  );
}
