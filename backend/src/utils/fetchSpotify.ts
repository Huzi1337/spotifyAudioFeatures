import HttpError from "../models/HttpError.js";
import RequestRetryHandler from "../models/RequestRetryHandler.js";

const fetchSpotify = async <T>(
  fetchFn: () => Promise<T>,
  tryCount = 0
): Promise<T> => {
  try {
    return await fetchFn();
  } catch (error) {
    return new RequestRetryHandler({
      tryCount,
      error: error as HttpError,
      fetchFn: () => fetchSpotify<T>(fetchFn, tryCount + 1),
    }).retryRequest();
  }
};

export default fetchSpotify;
