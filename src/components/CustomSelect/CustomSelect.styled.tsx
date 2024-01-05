import styled from "styled-components";
import checkIcon from "../../assets/check-icon.svg";

export const Select = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 4px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 12px;

  width: 233px;
  height: 40px;

  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.green};
  background-color: ${(props) => props.theme.colors.white};

  cursor: pointer;
`;

export const CheckboxesWrapper = styled.div`
  position: absolute;
  left: 4px;
  top: 134px;

  display: flex;
  flex-direction: column;

  height: 240px;
  width: 233px;

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.lightBlue};
  background-color: ${(props) => props.theme.colors.white};

  & :last-child {
    border-bottom: none;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  padding: 0 12px;

  height: 40px;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightBlue};
`;

export const Check = styled.input`
  position: absolute;
  appearance: none;
  -webkit-appearance: none;

  &:checked + .check_icon {
    background-color: ${(props) => props.theme.colors.blue};
  }

  &:checked + .check_icon::before {
    content: url("${checkIcon}");
    position: absolute;
    bottom: 6px;
    left: 1px;

    width: 12px;
    height: 12px;
  }
`;

export const CheckIcon = styled.span`
  position: absolute;

  width: 16px;
  height: 16px;
  border: 1px solid ${(props) => props.theme.colors.blue};
  border-radius: 2px;
`;

export const CheckText = styled.span`
  margin-left: 28px;
`;
