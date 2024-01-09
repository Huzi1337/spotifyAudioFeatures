import ClipLoader from "react-spinners/ClipLoader";
import "./ValidatorStatus.scss";

type Props = {
  isValidating: boolean;
  isError: boolean;
};

function ValidatorStatus({ isValidating, isError }: Props) {
  return (
    <div className="validatorStatusWrapper">
      {isError && !isValidating && (
        <p className="errorMessage">Invalid lines</p>
      )}
      {isValidating && (
        <>
          <ClipLoader speedMultiplier={0.5} loading={true} color="#ffffff" />
          <p>Validating...</p>
        </>
      )}
      {!isError && !isValidating && <p className="errorMessage">OK</p>}
    </div>
  );
}

export default ValidatorStatus;
