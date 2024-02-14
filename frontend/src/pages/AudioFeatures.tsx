import { useNavigate, useOutletContext } from "react-router-dom";
import "./Home.scss";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import { SongQuery } from "../types";
import useFetch from "../hooks/useFetch";
import QueryTable from "../components/QueryTable";
import usePager from "../hooks/usePager";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { URLS } from "../main";
import Options from "../components/Options";

function AudioFeatures() {
  const [queries, setQueries] = useState<SongQuery[]>([
    { artist: "", title: "" },
  ]);
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const { nextPage, page, prevPage } = usePager(2);

  const { fetchData, data, isLoading, error } = useFetch();

  const onSubmit = useCallback(
    async function onSubmit(e: React.FormEvent) {
      e.preventDefault();
      console.log(
        queries.filter(
          ({ artist, title }) => artist.length > 0 && title.length > 0
        )
      );
      await fetchData("ass");
    },
    [queries]
  );

  useEffect(() => {
    if (authStatus != "authenticated") navigate(URLS.home);
  }, []);

  return (
    <div className="home__container">
      <Options onNext={nextPage} onPrev={prevPage} />
      {page === 0 && (
        <QueryTable
          onSubmit={onSubmit}
          queries={queries}
          setQueries={setQueries}
        />
      )}
      {page === 1 && <div>elo</div>}
    </div>
  );
}

export default AudioFeatures;
