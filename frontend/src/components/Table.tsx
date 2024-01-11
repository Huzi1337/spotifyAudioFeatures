import usePagination from "../hooks/usePagination";
import "./Table.scss";
import { TableHeaders } from "./TableHeaders";
import { TableRows } from "./TableRows";

export type Props = {
  data: Object[];
};

const pageSize = 10;

function Table({ data }: Props) {
  let headers = Object.keys(data[0]);
  const { nextPage, prevPage, page, pageSlice, isFirstPage, isLastPage } =
    usePagination(data, pageSize);

  return (
    <>
      <div className="tableWrapper">
        <table className="audioFeatureTable">
          <TableHeaders headers={headers} />
          <TableRows headers={headers} data={pageSlice} />
        </table>
      </div>
      <div className="tablePagination">
        <button
          className="paginationBtn prev"
          disabled={isFirstPage}
          onClick={prevPage}
        ></button>
        <p>
          {page * pageSize + 1}-{page * pageSize + pageSlice.length}
        </p>
        <button
          className="paginationBtn next"
          disabled={isLastPage}
          onClick={nextPage}
        ></button>
      </div>
    </>
  );
}
export default Table;
