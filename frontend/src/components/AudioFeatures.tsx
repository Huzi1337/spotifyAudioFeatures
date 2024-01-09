import { forwardRef } from "react";

const AudioFeatureSelection = forwardRef(function AudioFeatureSelection(
  props,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      style={{
        color: "white",
        width: 400,
        height: 400,
        backgroundColor: "white",
      }}
    >
      Elo
    </div>
  );
});

export default AudioFeatureSelection;
