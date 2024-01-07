import { useMemo, useRef, useState } from "react";
import useValidateInput from "../hooks/useValidateInput";
import "./TextForm.scss";

function TextForm() {
  const [text, setText] = useState("");
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
      setShouldReplaceHeight(current.clientHeight < numberOfLines * 22);
      console.log(shouldReplaceHeight);
    }
  }

  function addLineNumbers() {}

  return (
    <>
      <div ref={ref} className="inputWrapper">
        <div className="lineNumberWrapper">
          {Array.from(
            { length: text.split("\n").length },
            (_, index) => index + 1
          ).map((number) => (
            <span
              className={invalidLines.has(number) ? "error" : ""}
              key={number}
            >
              {number}
            </span>
          ))}
        </div>

        <textarea
          onKeyUp={lineNumberHandler}
          style={shouldReplaceHeight ? { height: numberOfLines * 22 } : {}}
          className="innerText"
          value={text}
          onChange={changeHandler}
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
