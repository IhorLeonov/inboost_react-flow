import {
  Select,
  CheckboxesWrapper,
  Label,
  Check,
  CheckIcon,
  CheckText,
} from "./CustomSelect.styled";
import { useState } from "react";
import selectIcon from "../../assets/select-icon.svg";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setNodes } from "../../redux/nodesSlice";
import { selectData } from "../../redux/selectors";
import { CustomSelectProps } from "../../helpers/types";

const checkboxArray = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

export const CustomSelect = ({
  isSelectOpen,
  setIsSelectOpen,
  nodeNumb,
  nodeName,
}: CustomSelectProps) => {
  const dispatch = useAppDispatch();
  const { nodes } = useAppSelector(selectData);
  const [checkBoxValues, setCheckBoxValues] = useState<string[]>([]);

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

    if (checkBoxValues.includes(inputValue)) {
      setCheckBoxValues(checkBoxValues.filter((value) => value !== inputValue));
    } else {
      setCheckBoxValues([...checkBoxValues, inputValue]);
      dispatch(
        setNodes({ childNode: inputValue, parentNode: nodeNumb, oldName: nodeName })
      );
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
          {checkboxArray.map(({ id }) => (
            <Label key={id}>
              <Check
                checked={checkBoxValues.includes(String(id))}
                onChange={onChange}
                name="position"
                type="checkbox"
                value={id}
              />
              <CheckIcon className="check_icon" />
              <CheckText>Варіант {id}</CheckText>
            </Label>
          ))}
        </CheckboxesWrapper>
      )}
    </>
  );
};
