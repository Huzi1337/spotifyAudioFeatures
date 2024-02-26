import { useState } from "react";
import { Action, DisplayedState } from "../reducer";
import "./ReponseSettings.scss";
import { TOOLTIPS } from "../tooltipData";
import Tooltip from "../../../components/Tooltip";
import Checkbox from "../../../components/v2/Checkbox";
import { SelectedAudioFeatures } from "../../../types";

type Props = {
  dispatch: React.Dispatch<Action>;
  state: DisplayedState;
};

function ResponseSettings({
  dispatch,
  state: { features, recordsPerPage },
}: Props) {
  const [current, setCurrent] = useState(0);
  function onClickHandler(key: keyof SelectedAudioFeatures) {
    const newDisplayedFeatures = { ...features };
    newDisplayedFeatures[key] = !(features as SelectedAudioFeatures)[key];
    dispatch({ type: "set_features", payload: newDisplayedFeatures });
  }

  return (
    <div className="settings__audioFeaturesResponse__container">
      {current === 0 && features && (
        <>
          <h1 className="settings____audioFeaturesResponse__label">
            Displayed Audio Features
          </h1>
          {Object.entries(features).map(([key, value]) => (
            <div
              className="settings__audioFeaturesResponse__checkbox"
              key={key}
            >
              <Tooltip text={TOOLTIPS[key].tooltip}>
                <label>{TOOLTIPS[key].label}</label>
              </Tooltip>

              <Checkbox
                isChecked={value as boolean}
                onClick={() =>
                  onClickHandler(key as keyof SelectedAudioFeatures)
                }
                key={key}
              />
            </div>
          ))}
        </>
      )}
      {current === 1 && <div></div>}
    </div>
  );
}

export default ResponseSettings;
