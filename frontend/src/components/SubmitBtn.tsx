import BeatLoader from "react-spinners/BeatLoader";

type Props = {
  isLoading: boolean;
  text: string;
};

function SubmitBtn({ isLoading, text }: Props) {
  return (
    <button className="submitBtn" type="submit">
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
