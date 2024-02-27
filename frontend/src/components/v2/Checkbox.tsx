import "./Checkbox.scss";

type Props = {
  onClick: () => void;
  isChecked: boolean;
  customClassName?: string;
};

function Checkbox({ onClick, isChecked, customClassName }: Props) {
  let className = customClassName
    ? customClassName
    : `checkBoxWrapper${isChecked ? " checked" : ""}`;
  return <button className={className} onClick={onClick} />;
}

export default Checkbox;
