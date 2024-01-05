import styled from "styled-components";

export const Node = styled.div`
  padding: 19px 3px 6px;

  border-radius: 4px;
  border: 0.658px solid ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.lightGreen};

  width: 241px;
  height: 141px;

  .react-flow__handle {
    background-color: ${(props) => props.theme.colors.gray};
    border: none;
    width: 3px;
    height: 3px;
  }

  color: ${(props) => props.theme.colors.black};
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 14px;
  line-height: 23.8px;
`;

export const Area = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  height: 72px;
  border-radius: 4px;
`;
