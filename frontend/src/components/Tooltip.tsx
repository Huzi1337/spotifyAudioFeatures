import { useRef, useState } from "react";
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
  const ref = useRef<HTMLDivElement>(null);

  const { current } = ref;

  function calculateX() {
    if (current) {
      const { clientWidth } = current;
      if (x + clientWidth > window.innerWidth) {
        return x - clientWidth;
      }
      return x;
    }
  }

  function calculateY() {
    if (current) {
      const { clientHeight } = current;
      if (y + clientHeight > window.innerHeight) {
        return y - clientHeight;
      }
      return y;
    }
  }

  if (!text) return <>{children}</>;

  return (
    <div
      onMouseLeave={() => setVisible(false)}
      onMouseEnter={() => setVisible(true)}
      className="tooltip__container"
    >
      {visible &&
        ReactDOM.createPortal(
          <div
            ref={ref}
            className="tooltip"
            style={{
              top: visible ? calculateY() : "auto",
              left: visible ? calculateX() : "auto",
            }}
          >
            {text}
          </div>,
          document.body
        )}
      {children}
    </div>
  );
}

export default Tooltip;
