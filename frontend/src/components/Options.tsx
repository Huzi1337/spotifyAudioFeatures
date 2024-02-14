import { createPortal } from "react-dom";
import "./Options.scss";
import { useOutletContext } from "react-router-dom";

type Props = {
  onNext: () => void;
  onPrev: () => void;
};

function Options({ onNext, onPrev }: Props) {
  const ref = useOutletContext<React.RefObject<HTMLDivElement>>();
  return (
    <>
      {ref.current &&
        createPortal(
          <div className="options__container">
            <button className="options__prev" onClick={onPrev}>
              {"<"}
            </button>
            <button className="options__next" onClick={onNext}>
              {">"}
            </button>
            <button>Settings</button>
          </div>,
          ref.current
        )}
    </>
  );
}

export default Options;
