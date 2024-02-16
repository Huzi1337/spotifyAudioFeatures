import { createPortal } from "react-dom";
import "./Options.scss";
import { useOutletContext } from "react-router-dom";
import Modal from "./Modal";
import useClickOutside from "../hooks/useClickOutside";

type Props = {
  onNext: () => void;
  onPrev: () => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  settingsContent: React.ReactNode;
};

function Options({
  onNext,
  onPrev,
  nextDisabled,
  prevDisabled,
  settingsContent,
}: Props) {
  const {
    isVisible,
    ref: modalRef,
    setIsVisible,
  } = useClickOutside<HTMLDivElement>();
  const topbarRef = useOutletContext<React.RefObject<HTMLDivElement>>();
  return (
    <>
      {topbarRef.current &&
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
            <button
              className="options__settings"
              onClick={(event) => {
                event.stopPropagation();
                setIsVisible((prev) => !prev);
              }}
            />
            <Modal isVisible={isVisible}>
              <div ref={modalRef}>{settingsContent}</div>
            </Modal>
          </div>,
          topbarRef.current
        )}
    </>
  );
}

export default Options;
