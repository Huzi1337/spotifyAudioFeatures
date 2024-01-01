import HttpError from "../models/HttpError.js";
import RequestRetryHandler from "../models/RequestRetryHandler.js";

export const fetchSpotify = async <T>(
  fetchFn: () => Promise<T>,
  tryCount = 0
): Promise<T> => {
  try {
    return await fetchFn();
  } catch (error) {
    console.log("Error:", (error as HttpError).message);

    return new RequestRetryHandler({
      tryCount,
      error: error as HttpError,
      fetchFn: () => fetchSpotify<T>(fetchFn, tryCount + 1),
    }).retryRequest();
  }
};
