import { useState } from "react";
import { SongQuery, UserQuery } from "../types";

function TextForm() {
  const [text, setText] = useState("");
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
    let includedAudioFeatures = {
      acousticness: true,
      danceability: true,
      duration_ms: false,
      energy: false,
      instrumentalness: true,
      liveness: true,
      loudness: true,
      mode: false,
      speechiness: false,
      tempo: true,
      time_signature: false,
      valence: true,
      key: false,
    };

    const query: UserQuery = { songs, includedAudioFeatures };
    console.log(query);
    const data = await fetch("http://localhost:3000/api/v1/audioFeatures", {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
  }

  return (
    <>
      <textarea value={text} onChange={changeHandler}></textarea>
      <button onClick={submitHandler}>BIG BUTTON</button>
    </>
  );
}

export default TextForm;
