import RequestRetryHandler from "../models/RequestRetryHandler";

export const fetchSpotify = async (
  fetchFn: () => Promise<any>,
  tryCount = 0
): Promise<any> => {
  try {
    return await fetchFn();
  } catch (error) {
    console.log("Error:", (error as Error).message);

    return new RequestRetryHandler({
      tryCount,
      error: error as Error,
      fetchFn: () => fetchSpotify(fetchFn, tryCount + 1),
    }).retryRequest();
  }
};
