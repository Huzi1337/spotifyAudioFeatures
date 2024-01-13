import ClipLoader from "react-spinners/ClipLoader";
import "./ValidatorStatus.scss";
import { useState } from "react";

type Props = {
  isValidating: boolean;
  isError: boolean;
};

function ValidatorStatus(props: Props) {
  return (
    <div className="validatorStatusWrapper">
      <ValidatorMessage {...props} />
    </div>
  );
}

function ValidatorMessage({ isError, isValidating }: Props) {
  const errorOccurred = isError && !isValidating;
  const [isHover, setIsHover] = useState(false);

  if (errorOccurred)
    return (
      <>
        <div
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
          className="icon error"
        >
          {isHover && (
            <div className="tooltip">
              Correct line format:
              <br />
              {"<songTitle>;<songArtist>"}
            </div>
          )}
        </div>
        <p className="statusMsg error">Invalid lines</p>
      </>
    );

  if (isValidating)
    return (
      <>
        <ClipLoader
          size={24}
          speedMultiplier={0.5}
          loading={true}
          color="#ffffff"
        />
        <p className="statusMsg">Validating...</p>
      </>
    );
  else
    return (
      <>
        <div className="icon success" />
        <p className="statusMsg success">OK</p>
      </>
    );
}

export default ValidatorStatus;
