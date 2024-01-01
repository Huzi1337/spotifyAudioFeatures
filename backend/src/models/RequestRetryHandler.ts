import { BASE_DELAY, MAX_RETRIES } from "../data.js";
import HttpError, { ErrorCodes } from "./HttpError.js";

class RequestRetryHandler {
  private retryLimit = MAX_RETRIES;
  private baseDelay = BASE_DELAY;
  private tryCount: number;
  private error: HttpError;
  private fetchFn: () => Promise<any>;

  constructor({ tryCount, error, fetchFn }: RequestRetryProps) {
    this.tryCount = tryCount;
    this.error = error;
    this.fetchFn = fetchFn;
  }

  async retryRequest() {
    if (this.shouldRetry()) {
      console.log("Retrying");
      return new Promise(this.waitAndRetry) as Promise<any>;
    }
  }

  shouldRetry() {
    return (
      this.error.status === ErrorCodes.TOO_MANY_REQUESTS &&
      this.tryCount < this.retryLimit
    );
  }

  async waitAndRetry(resolve: (value: unknown) => void) {
    setTimeout(async () => {
      resolve(await this.fetchFn());
    }, this.getDelay());
  }

  getDelay() {
    return this.baseDelay * Math.pow(this.baseDelay, this.tryCount);
  }
}

export type RequestRetryProps = {
  tryCount: number;
  error: HttpError;
  fetchFn: () => Promise<any>;
};

export default RequestRetryHandler;
