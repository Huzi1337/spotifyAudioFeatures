import { useNavigate } from "react-router-dom";
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
import { useAuthenticator } from "@aws-amplify/ui-react";
import { URLS } from "../main";
import Options from "../components/Options";
import { options } from "../data";
import Table from "../components/Table";
import QuerySettings from "./audioFeatures/settings/QuerySettings";
import { TOOLTIPS } from "./audioFeatures/tooltipData";
import reducer, { DisplayedState } from "./audioFeatures/reducer";
import ResponseSettings from "./audioFeatures/settings/ResponseSettings";

const initialState: DisplayedState = {
  features: null,
  recordsPerPage: 10,
};

function AudioFeatures() {
  const [queries, setQueries] = useState<SongQuery[]>([
    { artist: "", title: "" },
  ]);
  const { nextPage, page, prevPage } = usePager(2);
  const { fetchData, data, isLoading, error } = useFetch<ApiResponse>();
  const [chosenFeatures, setChosenFeatures] = useState<SelectedAudioFeatures>(
    options.audioFeatures
  );

  const [displayedState, dispatch] = useReducer(reducer, initialState);
  console.log(displayedState);
  useEffect(() => {
    initializeDisplayedFeatures();

    function initializeDisplayedFeatures() {
      if (!data) return dispatch({ type: "set_features", payload: null });
      const availableFeatures: { [key: string]: boolean } = {};
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

  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const navigate = useNavigate();
  useEffect(() => {
    if (authStatus != "authenticated") navigate(URLS.home);
  }, []);

  const handleTableData = useCallback(
    function handleTableData() {
      return (data as ApiResponse).songs.map((song) => {
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
      });
    },
    [data, displayedState]
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
            page === 1 ? (
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
            pageSize={displayedState.recordsPerPage}
            headerOptions={TOOLTIPS}
          />
        )}
      </div>
    );
  else return <div className="home__container">An error has occurred.</div>;
}

export default AudioFeatures;
