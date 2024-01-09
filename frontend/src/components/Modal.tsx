import { createPortal } from "react-dom";
import "./Modal.scss";

type Props = {
  children?: React.ReactNode;
  isVisible: boolean;
};

function Modal({ children, isVisible }: Props) {
  return (
    <>
      {createPortal(
        <>
          {isVisible && <div className="modalWrapper">{children}</div>}

          {isVisible && <div className="modalBackground"></div>}
        </>,
        document.body
      )}
    </>
  );
}

export default Modal;
