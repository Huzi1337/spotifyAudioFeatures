import { createPortal } from "react-dom";
import "./Options.scss";
import { useOutletContext } from "react-router-dom";

type Props = {
  onNext: () => void;
  onPrev: () => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
};

function Options({ onNext, onPrev, nextDisabled, prevDisabled }: Props) {
  const ref = useOutletContext<React.RefObject<HTMLDivElement>>();
  return (
    <>
      {ref.current &&
        createPortal(
          <div className="options__container">
            <button
              disabled={prevDisabled}
              className="options__prev"
              onClick={onPrev}
            />
            <button
              disabled={nextDisabled}
              className="options__next"
              onClick={onNext}
            />
            <button className="options__settings" />
          </div>,
          ref.current
        )}
    </>
  );
}

export default Options;
