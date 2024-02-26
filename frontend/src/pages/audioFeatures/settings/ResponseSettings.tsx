import { useState } from "react";
import { Action, DisplayedState } from "../reducer";
import "./ReponseSettings.scss";
import { TOOLTIPS } from "../tooltipData";
import Tooltip from "../../../components/Tooltip";
import Checkbox from "../../../components/v2/Checkbox";
import { SelectedAudioFeatures } from "../../../types";
import useGetMousePos from "../../../hooks/useGetMousePos";

type Props = {
  dispatch: React.Dispatch<Action>;
  state: DisplayedState;
};

function ResponseSettings({
  dispatch,
  state: { features, recordsPerPage },
}: Props) {
  const mousePos = useGetMousePos();

  const [current, setCurrent] = useState(0);
  function onClickHandler(key: keyof SelectedAudioFeatures) {
    const newDisplayedFeatures = { ...features };
    newDisplayedFeatures[key] = !(features as SelectedAudioFeatures)[key];
    dispatch({ type: "update_features", payload: newDisplayedFeatures });
  }

  return (
    <div className="settings__audioFeaturesResponse__container">
      {features && (
        <>
          <div className="settings____audioFeaturesResponse__label">
            <button onClick={() => setCurrent(0)}>
              Displayed Audio Features
            </button>
            <button onClick={() => setCurrent(1)}>Table settings</button>
          </div>
          {current === 0 &&
            Object.entries(features).map(([key, value]) => (
              <div
                className="settings__audioFeaturesResponse__checkbox"
                key={key}
              >
                <Tooltip position={mousePos} text={TOOLTIPS[key].tooltip}>
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
          {current === 1 && (
            <div>
              <label>Number of records per page</label>
              <input />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ResponseSettings;
