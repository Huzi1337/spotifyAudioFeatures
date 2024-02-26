import { useState } from "react";
import "./Tooltip.scss";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
  text: string;
  position: {
    x: number;
    y: number;
  };
};

function Tooltip({ children, text, position: { x, y } }: Props) {
  const [visible, setVisible] = useState(false);

  if (!text) return <>{children}</>;

  return (
    <div
      onMouseLeave={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
      className="tooltip__container"
    >
      {visible &&
        ReactDOM.createPortal(
          <div className="tooltip" style={{ top: y, left: x }}>
            {text}
          </div>,
          document.body
        )}
      {children}
    </div>
  );
}

export default Tooltip;
