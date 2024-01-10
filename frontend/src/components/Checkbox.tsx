import { useState } from "react";
import "./Checkbox.scss";

type Props = {
  onClick: () => void;
  value: boolean;
  customClassName?: string;
};

function Checkbox({ onClick, value, customClassName }: Props) {
  const [isChecked, setIsChecked] = useState(value);
  let className = customClassName
    ? customClassName
    : `checkBoxWrapper${isChecked ? " checked" : ""}`;
  return (
    <>
      <button
        className={className}
        onClick={() => {
          setIsChecked((prev) => !prev);
          onClick();
        }}
      />
    </>
  );
}

export default Checkbox;
