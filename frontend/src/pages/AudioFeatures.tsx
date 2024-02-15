import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { useCallback, useEffect, useState } from "react";
import { ApiResponse, SongQuery } from "../types";
import useFetch from "../hooks/useFetch";
import QueryTable from "../components/QueryTable";
import usePager from "../hooks/usePager";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { URLS } from "../main";
import Options from "../components/Options";
import { options } from "../data";
import Table from "../components/Table";

function AudioFeatures() {
  const [queries, setQueries] = useState<SongQuery[]>([
    { artist: "", title: "" },
  ]);
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const { nextPage, page, prevPage } = usePager(2);

  const { fetchData, data, isLoading, error } = useFetch<ApiResponse>();

  const onSubmit = useCallback(
    async function onSubmit(e: React.FormEvent) {
      e.preventDefault();
      console.log("click");
      const body = JSON.stringify({
        songs: queries.filter(
          ({ artist, title }) => artist.length > 0 && title.length > 0
        ),
        includedAudioFeatures: options.audioFeatures,
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
    [queries]
  );

  useEffect(() => {
    if (authStatus != "authenticated") navigate(URLS.home);
  }, []);

  if (!error)
    return (
      <div className="home__container">
        <Options
          nextDisabled={page === 1 || !data}
          prevDisabled={page === 0}
          onNext={nextPage}
          onPrev={prevPage}
        />
        {page === 0 && (
          <QueryTable
            isLoading={isLoading}
            onSubmit={onSubmit}
            queries={queries}
            setQueries={setQueries}
          />
        )}
        {page === 1 && data && (
          <Table
            data={data.songs.map((song) => ({
              title: song.title,
              artist: song.artist,
              ...song.audioFeatures,
            }))}
          />
        )}
      </div>
    );
  else return <div className="home__container">An error has occurred.</div>;
}

export default AudioFeatures;
