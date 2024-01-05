import { useState } from "react";
import { SongQuery, UserQuery } from "../types";
import { includedAudioFeatures } from "../data";

function TextForm() {
  const [text, setText] = useState("");
  const [res, setRes] = useState("");
  function changeHandler({ target }: React.ChangeEvent) {
    const { value } = target as HTMLTextAreaElement;
    setText(value);
  }

  async function submitHandler() {
    const songs: SongQuery[] = [];
    for (const arr of text.split("\n")) {
      const [title, artist] = arr.split(";");
      songs.push({ title, artist });
    }

    const query: UserQuery = { songs, includedAudioFeatures };
    console.log(query);
    const response = await fetch("http://localhost:3000/api/v1/audioFeatures", {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    setRes(data.CSV);
  }

  return (
    <>
      <textarea value={text} onChange={changeHandler}></textarea>
      <p>
        {res.split("\n").map((line) => (
          <>
            {line}
            <br />
          </>
        ))}
      </p>
      <button onClick={submitHandler}>BIG BUTTON</button>
    </>
  );
}

export default TextForm;
