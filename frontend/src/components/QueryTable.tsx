import { useState } from "react";
import { SongQuery } from "../types";
import "./QueryTable.scss";
import BeatLoader from "react-spinners/BeatLoader";
import { MOCK_QUERIES } from "../assets/mockData";

type Props = {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  setQueries: React.Dispatch<React.SetStateAction<SongQuery[]>>;
  queries: SongQuery[];
  isLoading: boolean;
};

function QueryTable({ onSubmit, queries, setQueries, isLoading }: Props) {
  function addQuery() {
    setQueries((prev) => [...prev, { artist: "", title: "" }]);
  }
  const [hoveredElement, setHoveredElement] = useState(-1);

  function changeInput(
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value, name } = event.target;
    const newQueries = [...queries];
    queries[index][name as keyof SongQuery] = value;
    setQueries(newQueries);
  }

  function inputMockQueries() {
    setQueries(MOCK_QUERIES);
  }

  function deleteQuery(index: number) {
    const newQueries = [...queries];
    newQueries.splice(index, 1);
    setQueries(newQueries);
  }

  return (
    <>
      <form className="queryTable__container" onSubmit={onSubmit}>
        <div className="queryTable__headers">
          <div className="queryTable__col">Title</div>
          <div className="queryTable__col">Artist</div>
        </div>
        {queries.map((query, index) => (
          <div
            className="queryTable__row"
            onMouseLeave={() => setHoveredElement(-1)}
            onMouseEnter={() => setHoveredElement(index)}
            key={index}
          >
            {Object.entries(query).map(([key, value]) => (
              <input
                className="queryTable__col"
                key={`${key}${index}`}
                name={key}
                value={value}
                onChange={(event) => changeInput(index, event)}
              />
            ))}

            <div className="queryTable__deleteContainer">
              {hoveredElement === index && (
                <button
                  className="queryTable__deleteBtn"
                  disabled={queries.length <= 1}
                  type="button"
                  onClick={() => deleteQuery(index)}
                >
                  <img width={16} height={16} src="/minus.svg" />
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" className="queryTable__addBtn" onClick={addQuery}>
          <img width={24} height={24} src="/plus.svg" />
        </button>
      </form>

      <div className="queryTable__btnContainer">
        <button
          disabled={
            queries.filter(
              ({ artist, title }) => artist.length > 0 && title.length > 0
            ).length === 0
          }
          onClick={onSubmit}
          className="queryTable__submitBtn"
        >
          {isLoading ? (
            <BeatLoader
              size={8}
              speedMultiplier={1}
              loading={true}
              color="#000000"
            />
          ) : (
            "Submit"
          )}
        </button>
        <button onClick={inputMockQueries}>Use sample input</button>
      </div>
    </>
  );
}

export default QueryTable;
