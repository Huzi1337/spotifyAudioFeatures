import BeatLoader from "react-spinners/BeatLoader";
import "./SubmitBtn.scss";

type Props = {
  isLoading: boolean;
  text: string;
};

function SubmitBtn({ isLoading, text }: Props) {
  return (
    <button
      onClick={() => console.log("click")}
      className="submitBtn"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? (
        <BeatLoader
          size={8}
          speedMultiplier={1}
          loading={true}
          color="#000000"
        />
      ) : (
        text
      )}
    </button>
  );
}

export default SubmitBtn;
