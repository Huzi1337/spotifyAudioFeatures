import "./OptionsPanel.scss";
import Modal from "./Modal";
import useClickOutside from "../hooks/useClickOutside";
import AudioFeatureSelection from "./AudioFeatures";

function OptionsPanel() {
  const { isVisible, ref, setIsVisible } = useClickOutside<HTMLDivElement>();
  return (
    <div className="optionsPanelWrapper">
      <button
        className="settings"
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(true);
        }}
      ></button>
      <Modal isVisible={isVisible}>
        <AudioFeatureSelection ref={ref} />
      </Modal>
    </div>
  );
}

export default OptionsPanel;
