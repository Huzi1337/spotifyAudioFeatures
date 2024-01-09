import { useContext, useMemo, useRef, useState } from "react";
import useValidateInput from "../hooks/useValidateInput";
import "./TextForm.scss";
import LineCount from "./LineCount";
import ValidatorStatus from "./ValidatorStatus";
import { OptionsContext } from "../context/OptionsProvier";
import OptionsPanel from "./OptionsPanel";

const LINE_HEIGHT = 22;

function TextForm() {
  const [text, setText] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const { invalidLines, isValidating } = useValidateInput(text);
  const [shouldReplaceHeight, setShouldReplaceHeight] = useState(false);
  const temp = useContext(OptionsContext);
  console.log(temp);
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

      {/* <button disabled={!isValid || isValidating}>BIG BUTTON</button> */}
    </>
  );
}

export default TextForm;

// async function submitHandler() {
//   const songs: SongQuery[] = [];
//   for (const arr of text.split("\n")) {
//     const [title, artist] = arr.split(";");
//     songs.push({ title, artist });
//   }

//   const query: UserQuery = { songs, includedAudioFeatures };
//   console.log(query);
//   const response = await fetch("http://localhost:3000/api/v1/audioFeatures", {
//     method: "POST",
//     body: JSON.stringify(query),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   let data = await response.json();
//   setRes(data.CSV);
// }
