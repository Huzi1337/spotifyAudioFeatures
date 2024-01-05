import { useState } from "react";
import "./App.scss";
import Table from "./components/Table";
import TextForm from "./components/TextForm";
import { dummyData } from "./data";

function App() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  return (
    <>
      <h1 className="logo">Audify</h1>
      <button>You give us the song names...</button>
      <div id="main">
        {page === 0 && <TextForm />}
        <Table data={dummyData} />
      </div>

      <button>You get their audio features back!</button>
    </>
  );
}

export default App;
