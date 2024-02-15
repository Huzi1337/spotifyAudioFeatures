import { useCallback, useState } from "react";

function usePager(pageCount: number) {
  const [page, setPage] = useState(0);

  const nextPage = useCallback(() => {
    console.log(page);
    setPage((prev) => (prev + 1 < pageCount ? ++prev : prev));
  }, [page]);

  const prevPage = useCallback(() => {
    console.log(page);

    setPage((prev) => (prev - 1 >= 0 ? --prev : prev));
  }, [page]);

  return { nextPage, prevPage, page };
}

export default usePager;
