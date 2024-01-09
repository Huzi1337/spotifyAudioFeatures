import ClipLoader from "react-spinners/ClipLoader";
import "./ValidatorStatus.scss";

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

  if (errorOccurred)
    return (
      <>
        <div className="icon error" />
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
