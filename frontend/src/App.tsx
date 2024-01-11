import { useLayoutEffect, useMemo, useRef, useState } from "react";
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
  const [distance, setDistance] = useState(0);
  const [isTransition, setIsTransition] = useState(false);
  const { data, error, fetchData, isLoading } = useFetch<ApiResponse>();
  const previousText = useRef(text);
  const inputPageBtn = useRef<HTMLButtonElement>(null);
  const outputPageBtn = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (inputPageBtn.current && outputPageBtn.current) {
      const { y: inputHeight } = inputPageBtn.current.getBoundingClientRect();
      const { y: outputHeight } = outputPageBtn.current.getBoundingClientRect();
      setDistance(Math.abs(inputHeight - outputHeight));
    }
  }, [window.innerWidth, window.innerHeight]);

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

  const transitionTo = useRef(0);

  function clickHandler(pageNumber: number) {
    if (page != pageNumber && !isTransition) {
      setIsTransition(true);
      transitionTo.current = pageNumber;
    }
  }

  function transitionHandler(pageNumber: number) {
    if (isTransition && transitionTo.current === pageNumber) {
      setIsTransition(false);
      console.log(transitionTo);
      setPage(transitionTo.current);
    }
  }
  return (
    <OptionsContext.Provider value={options}>
      <h1 className="logo">Audify</h1>
      <button
        ref={inputPageBtn}
        style={{
          order: page === 0 ? 1 : 3,
          transform: isTransition
            ? `translateY(${(page === 0 ? 1 : -1) * (distance as number)}px)`
            : "",
        }}
        className={`pageBtn${isTransition ? " transition" : ""}${
          page === 0 ? " current" : ""
        }`}
        onTransitionEnd={() => transitionHandler(0)}
        onClick={() => clickHandler(0)}
      >
        You give us the song names...
      </button>
      <div style={{ order: 2 }} className="window">
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

      <button
        ref={outputPageBtn}
        style={{
          order: page === 1 ? 1 : 3,
          transform: isTransition
            ? `translateY(${(page === 1 ? 1 : -1) * (distance as number)}px)`
            : "",
        }}
        className={`pageBtn${isTransition ? " transition" : ""}${
          page === 1 ? " current" : ""
        }`}
        disabled={!data}
        onClick={() => clickHandler(1)}
        onTransitionEnd={() => transitionHandler(1)}
      >
        You get their audio features back!
      </button>
    </OptionsContext.Provider>
  );
}

export default App;
