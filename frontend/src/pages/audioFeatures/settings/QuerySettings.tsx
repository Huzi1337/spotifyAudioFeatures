import Checkbox from "../../../components/v2/Checkbox";
import { SelectedAudioFeatures } from "../../../types";
import "./QuerySettings.scss";
import Tooltip from "../../../components/Tooltip";
import { TOOLTIPS } from "../tooltipData";

type Props = {
  chosenFeatures: SelectedAudioFeatures;
  setChosenFeatures: React.Dispatch<
    React.SetStateAction<SelectedAudioFeatures>
  >;
};

function QuerySettings({ chosenFeatures, setChosenFeatures }: Props) {
  const onClickHandler = (key: keyof SelectedAudioFeatures) => {
    setChosenFeatures((prev) => {
      const newChosenFeatures = { ...prev };
      newChosenFeatures[key] = !prev[key];
      return newChosenFeatures;
    });
  };

  return (
    <div className="settings__audioFeaturesQuery__container">
      <h3 className="settings____audioFeaturesQuery__label">Audio Features</h3>
      {Object.entries(chosenFeatures).map(([key, value]) => (
        <div className="settings__audioFeaturesQuery__checkbox" key={key}>
          <Tooltip text={TOOLTIPS[key].tooltip}>
            <label>{TOOLTIPS[key].label}</label>
          </Tooltip>

          <Checkbox
            isChecked={value as boolean}
            onClick={() => onClickHandler(key as keyof SelectedAudioFeatures)}
            key={key}
          />
        </div>
      ))}
    </div>
  );
}

export default QuerySettings;
