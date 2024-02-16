import { useState } from "react";
import "./Tooltip.scss";

type Props = {
  children: React.ReactNode;
  text: string;
};

function Tooltip({ children, text }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      onMouseLeave={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
      className="tooltip__container"
    >
      {visible && <div className="tooltip">{text}</div>}
      {children}
    </div>
  );
}

export default Tooltip;
