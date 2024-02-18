import { useMemo, useState } from "react";

function usePagination(data: any[], pageSize: number) {
  const [page, setPage] = useState(0);
  const numberOfPages = useMemo(
    () => Math.ceil(data.length / pageSize),
    [data, pageSize]
  );
  const pageSlice = useMemo(
    () => data.slice(page * pageSize, (1 + page) * pageSize),
    [page, data]
  );
  const isLastPage = !(page < numberOfPages - 1);
  const isFirstPage = !(page > 0);
  function nextPage() {
    if (!isLastPage) setPage((prev) => prev + 1);
  }
  function prevPage() {
    if (!isFirstPage) setPage((prev) => prev - 1);
  }

  return { nextPage, prevPage, page, pageSlice, isLastPage, isFirstPage };
}
export default usePagination;
