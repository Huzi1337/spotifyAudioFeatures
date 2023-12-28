import { BASE_DELAY, MAX_RETRIES } from "../data";

class RequestRetryHandler {
  private retryLimit = MAX_RETRIES;
  private baseDelay = BASE_DELAY;
  private _tryCount: number;
  private error: Error;

  constructor(tryCount: number, error: Error) {
    this._tryCount = tryCount;
    this.error = error;
  }

  shouldRetryRequest() {
    return (
      this.error.message === "Too many requests" &&
      this._tryCount < this.retryLimit
    );
  }

  getDelay() {
    return this.baseDelay * Math.pow(this.baseDelay, this.tryCount);
  }

  public get tryCount(): number {
    return this.tryCount;
  }
}
export default RequestRetryHandler;
