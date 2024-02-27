import "./AudioFeatures.scss";
import { useCallback, useEffect, useReducer, useState } from "react";
import {
  ApiResponse,
  AudioFeatures as TAudioFeatures,
  SelectedAudioFeatures,
  SongQuery,
} from "../types";
import useFetch from "../hooks/useFetch";
import QueryTable from "../components/QueryTable";
import usePager from "../hooks/usePager";
import Options from "../components/Options";
import { options } from "../data";
import Table from "../components/Table";
import QuerySettings from "./audioFeatures/settings/QuerySettings";
import { TOOLTIPS } from "./audioFeatures/tooltipData";
import reducer, { Action, DisplayedState } from "./audioFeatures/reducer";
import ResponseSettings from "./audioFeatures/settings/ResponseSettings";
import useCheckAuth from "../hooks/useCheckAuth";

const initialState: DisplayedState = {
  features: null,
  pageSize: 10,
  sortedBy: "title",
  sortOrder: "ascending",
};

function AudioFeatures() {
  useCheckAuth();

  const [queries, setQueries] = useState<SongQuery[]>([
    { artist: "", title: "" },
  ]);
  const { nextPage, page, prevPage } = usePager(2);
  const { fetchData, data, isLoading, error } = useFetch<ApiResponse>();
  const [chosenFeatures, setChosenFeatures] = useState<SelectedAudioFeatures>(
    options.audioFeatures
  );

  const [displayedState, dispatch] = useReducer<
    (state: DisplayedState, action: Action) => DisplayedState
  >(reducer, initialState);
  useEffect(() => {
    initializeDisplayedFeatures();

    function initializeDisplayedFeatures() {
      if (!data) return dispatch({ type: "set_features", payload: null });
      const availableFeatures: { [key: string]: boolean } = {};
      console.log(Object.keys(data.songs[0].audioFeatures));
      Object.keys(data.songs[0].audioFeatures).forEach(
        (key) => (availableFeatures[key] = true)
      );
      dispatch({ type: "set_features", payload: availableFeatures });
    }
  }, [data]);

  const onSubmit = useCallback(
    async function onSubmit(e: React.FormEvent) {
      e.preventDefault();
      console.log("click");
      const body = JSON.stringify({
        songs: queries.filter(
          ({ artist, title }) => artist.length > 0 && title.length > 0
        ),
        includedAudioFeatures: chosenFeatures,
      });
      const reqOptions = {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      };

      await fetchData(
        "https://u9zgoic04e.execute-api.eu-central-1.amazonaws.com/prod/api/v1/audioFeatures",
        reqOptions
      );

      nextPage();
    },
    [queries, chosenFeatures, data]
  );

  const handleTableData = useCallback(
    function handleTableData() {
      const result = (data as ApiResponse).songs
        .map((song) => {
          const mappedSong: TAudioFeatures = {};
          const { audioFeatures } = song;
          Object.entries(displayedState.features as TAudioFeatures).forEach(
            ([key, value]) =>
              value
                ? (mappedSong[key as keyof TAudioFeatures] =
                    audioFeatures[key as keyof TAudioFeatures])
                : null
          );
          return { title: song.title, artist: song.artist, ...mappedSong };
        })
        .sort((a, b) =>
          tableSort(
            a[displayedState.sortedBy] as string,
            b[displayedState.sortedBy] as string
          )
        );
      console.log(result);
      return result;

      function tableSort(a: string, b: string) {
        console.log(displayedState.sortedBy, displayedState.sortOrder);
        console.log(a, parseInt(a), b, parseInt(b));

        if (!isNaN(parseInt(a)) && !isNaN(parseInt(b))) {
          let numA = parseInt(a),
            numB = parseInt(b);

          return displayedState.sortOrder === "ascending"
            ? numA - numB
            : numB - numA;
        } else {
          if (displayedState.sortOrder === "ascending") return a > b ? 1 : -1;
          else return a > b ? -1 : 1;
        }
      }
    },
    [
      data,
      displayedState.features,
      displayedState.sortedBy,
      displayedState.sortOrder,
      displayedState,
    ]
  );

  if (!error)
    return (
      <div className="audioFeatures__container">
        <Options
          nextDisabled={page === 1 || !data}
          prevDisabled={page === 0}
          onNext={nextPage}
          onPrev={prevPage}
          settingsContent={
            page === 0 ? (
              <QuerySettings
                setChosenFeatures={setChosenFeatures}
                chosenFeatures={chosenFeatures}
              />
            ) : (
              <ResponseSettings dispatch={dispatch} state={displayedState} />
            )
          }
        />
        {page === 0 && (
          <QueryTable
            isLoading={isLoading}
            onSubmit={onSubmit}
            queries={queries}
            setQueries={setQueries}
          />
        )}
        {page === 1 && data && displayedState.features && (
          <Table
            data={handleTableData()}
            className={{
              paginationContainer: "audioFeatures__tablePagination",
            }}
            pageSize={displayedState.pageSize}
            headerOptions={TOOLTIPS}
          />
        )}
      </div>
    );
  else return <div className="home__container">An error has occurred.</div>;
}

export default AudioFeatures;
