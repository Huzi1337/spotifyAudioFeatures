import { forwardRef, useContext } from "react";
import { OptionsContext } from "../context/OptionsProvier";
import { AudioFeatures } from "../types";
import Checkbox from "./Checkbox";
import "./AudioFeatureSelection.scss";

const AudioFeatureSelection = forwardRef(function AudioFeatureSelection(
  props,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { audioFeatures } = useContext(OptionsContext);

  return (
    <div ref={ref} className="audioFeatureSelectionWrapper">
      <h2>Audio Features</h2>
      {Object.entries(audioFeatures).map(([key, value]) => (
        <div className="inputLine">
          <label>{key}</label>
          <Checkbox
            key={key}
            value={value as boolean}
            onClick={() => {
              audioFeatures[key as keyof AudioFeatures] =
                !audioFeatures[key as keyof AudioFeatures];
            }}
          />
        </div>
      ))}
    </div>
  );
});

export default AudioFeatureSelection;
