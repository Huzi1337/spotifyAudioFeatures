import RequestRetryHandler from "../models/RequestRetryHandler";

export const fetchSpotify = async (
  callback: () => Promise<any>,
  tryCount = 0
) => {
  try {
    return await callback();
  } catch (error: any) {
    console.error("Error:", error as Error);

    return retryRequest(new RequestRetryHandler(tryCount, error), callback);
  }
};

async function retryRequest(
  retryHandler: RequestRetryHandler,
  callback: () => Promise<any>
) {
  if (retryHandler.shouldRetryRequest()) {
    const waitAndTryAgain = async (resolve: (value: unknown) => void) => {
      setTimeout(async () => {
        let result = await fetchSpotify(callback, retryHandler.tryCount + 1);
        resolve(result);
      }, retryHandler.getDelay());
    };

    return new Promise(waitAndTryAgain);
  }
}
