import {
  Select,
  CheckboxesWrapper,
  Label,
  Input,
  CheckIcon,
  CheckText,
} from "./CustomSelect.styled";
import { useState } from "react";
import selectIcon from "../../assets/select-icon.svg";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setNodes, setChecked, removeChecked } from "../../redux/nodesSlice";
import { selectData } from "../../redux/selectors";
import { CustomSelectProps } from "../../helpers/types";
import { useEffect } from "react";

const checkboxArray = [
  { option: "1" },
  { option: "2" },
  { option: "3" },
  { option: "4" },
  { option: "5" },
  { option: "6" },
];

export const CustomSelect = ({
  isSelectOpen,
  setIsSelectOpen,
  nodeNumb,
  nodeName,
}: CustomSelectProps) => {
  const dispatch = useAppDispatch();
  const { nodes, checked } = useAppSelector(selectData);
  const [checkedInputs, setCheckedInputs] = useState<string[]>([]);

  useEffect(() => {
    console.log("nodeNumb", nodeNumb);
    console.log("checked", checked);
    console.log("nodes", nodes);
  }, [checked, nodeNumb, nodes]);

  useEffect(() => {
    if (checked.length > 0) {
      checked.map((obj) => {
        if (obj.id === nodeNumb) {
          setCheckedInputs(obj.values);
        }
      });
    }
  }, [checked, nodeNumb]);

  const handleOpen = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const selectStyle = {
    borderColor: isSelectOpen ? "#EAF2FF" : "#479F76",
    borderBottomLeftRadius: isSelectOpen ? 0 : 4,
    borderBottomRightRadius: isSelectOpen ? 0 : 4,
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const payload = { id: nodeNumb, value: inputValue };
    const nodesPayload = {
      childNode: inputValue,
      parentNode: nodeNumb,
      oldName: nodeName,
    };

    if (checkedInputs.includes(inputValue)) {
      dispatch(removeChecked(payload));
      // dispatch(removeNodes(nodesPayload));
    } else {
      dispatch(setChecked(payload));
      dispatch(setNodes(nodesPayload));
    }

    setIsSelectOpen(false);
  };

  return (
    <>
      <Select style={selectStyle} className="nodrag" onClick={handleOpen}>
        {nodes.length > 1 ? `Варіант ${nodeName}` : "Виберіть значення"}
        <img
          style={{
            width: 24,
            height: 24,
            transform: isSelectOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          src={selectIcon}
          alt="arrow"
        />
      </Select>
      {isSelectOpen && (
        <CheckboxesWrapper role="group" aria-labelledby="my-checkbox-group">
          {checkboxArray.map(({ option }) => {
            return (
              <Label key={option}>
                <Input
                  checked={checkedInputs.includes(option)}
                  onChange={onChange}
                  name="position"
                  type="checkbox"
                  value={option}
                />
                <CheckIcon className="check_icon" />
                <CheckText>Варіант {option}</CheckText>
              </Label>
            );
          })}
        </CheckboxesWrapper>
      )}
    </>
  );
};
