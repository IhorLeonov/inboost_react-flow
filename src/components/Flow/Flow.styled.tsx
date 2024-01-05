import styled from "styled-components";
import ReactFlow from "reactflow";

export const StyledFlow = styled(ReactFlow)`
  position: relative;
  background-color: ${(props) => props.theme.colors.background};

  .react-flow__handle-right {
    top: 116px;
  }
`;
