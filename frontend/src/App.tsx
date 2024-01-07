import { useState } from "react";
import "./App.scss";
import Table from "./components/Table";
import TextForm from "./components/TextForm";
import { dummyData } from "./data";

function App() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  return (
    <>
      <h1 className="logo">Audify</h1>
      <button onClick={() => setPage(0)}>You give us the song names...</button>
      <div className="window">
        {page === 0 && <TextForm />}
        {page === 1 && <Table data={dummyData} />}
      </div>

      <button onClick={() => setPage(1)}>
        You get their audio features back!
      </button>
    </>
  );
}

export default App;
