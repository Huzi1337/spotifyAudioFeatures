import { useContext, useMemo, useRef, useState } from "react";
import useValidateInput from "../hooks/useValidateInput";
import "./TextForm.scss";
import LineCount from "./LineCount";
import ValidatorStatus from "./ValidatorStatus";
import OptionsPanel from "./OptionsPanel";

const LINE_HEIGHT = 22;

type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
};

function TextForm({ text, setText, onSubmit }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { invalidLines, isValidating } = useValidateInput(text);
  const [shouldReplaceHeight, setShouldReplaceHeight] = useState(false);

  function changeHandler({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(value);
  }
  let numberOfLines = useMemo(() => text.split("\n").length, [text]);

  function lineNumberHandler() {
    const { current } = ref;
    if (current) {
      setShouldReplaceHeight(
        current.clientHeight < numberOfLines * LINE_HEIGHT
      );
      console.log(shouldReplaceHeight);
    }
  }

  return (
    <>
      <div className="textForm__topBar">
        <ValidatorStatus
          isValidating={isValidating}
          isError={invalidLines.size != 0}
        />
        <OptionsPanel />
      </div>

      <div ref={ref} className="textForm__inputWrapper">
        <LineCount invalidLines={invalidLines} text={text} />

        <textarea
          onKeyUp={lineNumberHandler}
          style={
            shouldReplaceHeight ? { height: numberOfLines * LINE_HEIGHT } : {}
          }
          className="innerText"
          value={text}
          onChange={changeHandler}
          placeholder="Submit one song per line in the following format: <songTitle>;<songAuthor>"
        ></textarea>
      </div>
      <div className="textForm__botBar">
        <button
          disabled={invalidLines.size > 0 || isValidating || !text.length}
          onClick={onSubmit}
        >
          Search Audio Features
        </button>
      </div>
    </>
  );
}

export default TextForm;
