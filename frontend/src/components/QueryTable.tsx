import { SongQuery } from "../types";
import "./QueryTable.scss";

type Props = {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  setQueries: React.Dispatch<React.SetStateAction<SongQuery[]>>;
  queries: SongQuery[];
};

function QueryTable({ onSubmit, queries, setQueries }: Props) {
  function addQuery() {
    setQueries((prev) => [...prev, { artist: "", title: "" }]);
  }

  function changeInput(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value, name } = event.target;
    const newQueries = [...queries];
    queries[index][name as keyof SongQuery] = value;
    setQueries(newQueries);
  }

  function deleteQuery(index: number) {
    const newQueries = [...queries];
    newQueries.splice(index, 1);
    setQueries(newQueries);
  }
  return (
    <form className="queryTable__container" onSubmit={onSubmit}>
      <div className="queryTable__headers">
        <div className="queryTable__col">Title</div>
        <div className="queryTable__col">Artist</div>
      </div>
      {queries.map((query, index) => (
        <div className="queryTable__row" key={index}>
          {/* <button
            disabled={queries.length <= 1}
            type="button"
            onClick={() => deleteQuery(index)}
          >
            Delete query
          </button> */}
          {Object.entries(query).map(([key, value]) => (
            <input
              className="queryTable__col"
              key={`${key}${index}`}
              name={key}
              value={value}
              onChange={(event) => changeInput(index, event)}
            />
          ))}
        </div>
      ))}
      <button type="button" onClick={addQuery}></button>
      <button>sabmit</button>
    </form>
  );
}

export default QueryTable;
