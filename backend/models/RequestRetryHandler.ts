import { BASE_DELAY, MAX_RETRIES } from "../data";

class RequestRetryHandler {
  private retryLimit = MAX_RETRIES;
  private baseDelay = BASE_DELAY;
  private tryCount: number;
  private error: Error;
  private fetchFn: () => Promise<any>;

  constructor({ tryCount, error, fetchFn }: RequestRetryProps) {
    this.tryCount = tryCount;
    this.error = error;
    this.fetchFn = fetchFn;
  }

  async retryRequest() {
    if (this.shouldRetry()) {
      console.log("Retrying");
      return new Promise(this.waitAndTryAgain);
    }
  }

  shouldRetry() {
    return (
      this.error.message === "Too many requests" &&
      this.tryCount < this.retryLimit
    );
  }

  async waitAndTryAgain(resolve: (value: unknown) => void) {
    setTimeout(async () => {
      resolve(await this.fetchFn());
    }, this.getDelay());
  }

  getDelay() {
    return this.baseDelay * Math.pow(this.baseDelay, this.tryCount);
  }
}

type RequestRetryProps = {
  tryCount: number;
  error: Error;
  fetchFn: () => Promise<any>;
};

export default RequestRetryHandler;
