import { AudioFeatures } from "../../types";

type Props = {
  setDisplayedFeatures: React.Dispatch<
    React.SetStateAction<AudioFeatures | null>
  >;
  displayedFeatures: AudioFeatures | null;
};

function DisplaySettings({ setDisplayedFeatures }: Props) {
  return <div> </div>;
}
