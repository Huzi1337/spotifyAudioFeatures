import { useRef, useState } from "react";
import "./App.scss";
import Table from "./components/Table";
import TextForm from "./components/TextForm";
import { options } from "./data";
import { OptionsContext } from "./context/OptionsProvier";
import useFetch from "./hooks/useFetch";
import prepareReqBody from "./utils/prepareReqBody";
import { ApiResponse } from "./types";
import { ClipLoader } from "react-spinners";

function App() {
  const [text, setText] = useState("");
  const [page, setPage] = useState(0);
  const { data, error, fetchData, isLoading } = useFetch<ApiResponse>();
  const previousText = useRef(text);

  async function submitHandler() {
    if (text != previousText.current && !isLoading) {
      const body = prepareReqBody(text, options.audioFeatures);
      const reqOptions = {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      };

      await fetchData("http://localhost:3000/api/v1/audioFeatures", reqOptions);
      previousText.current = text;
      setPage(1);
    }
  }

  return (
    <OptionsContext.Provider value={options}>
      <h1 className="logo">Audify</h1>
      <button className="pageBtn" onClick={() => setPage(0)}>
        You give us the song names...
      </button>
      <div className="window">
        {!isLoading && !error && page === 0 && (
          <TextForm setText={setText} text={text} onSubmit={submitHandler} />
        )}
        {data && page === 1 && (
          <Table
            data={data.songs.map((song) => ({
              title: song.title,
              artist: song.artist,
              ...song.audioFeatures,
            }))}
          />
        )}
        {isLoading && <ClipLoader color="white" />}
      </div>

      <button className="pageBtn" disabled={!data} onClick={() => setPage(1)}>
        You get their audio features back!
      </button>
    </OptionsContext.Provider>
  );
}

export default App;
