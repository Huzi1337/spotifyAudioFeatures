import { useState } from "react";
import { Action, DisplayedState } from "../reducer";
import "./ReponseSettings.scss";

type Props = {
  dispatch: React.Dispatch<Action>;
  state: DisplayedState;
};

function ResponseSettings({
  dispatch,
  state: { features, recordsPerPage },
}: Props) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="settings__audioFeaturesResponse__container">
      <div>
        <button onClick={() => setCurrent(0)}>Displayed features</button>
        <button onClick={() => setCurrent(1)}>Table settings</button>
      </div>

      {current === 0 && <div>{Object.entries()}</div>}
      {current === 1 && <div></div>}
    </div>
  );
}

export default ResponseSettings;
