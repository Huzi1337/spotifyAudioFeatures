import { BASE_DELAY, MAX_RETRIES } from "../data.js";
import HttpError, { ErrorCodes } from "./HttpError.js";
import { SpotifyAuth } from "./SpotifyAuth.js";

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
    if (await this.shouldRetry()) {
      console.log("Retrying");
      return new Promise(this.waitAndRetry.bind(this)) as Promise<any>;
    } else {
      throw new HttpError("Can't retry", 404);
    }
  }

  async shouldRetry() {
    console.log(
      `shouldRetry:\nstatus: ${this.error.status} count: ${this.tryCount}`
    );
    if (this.error.status === ErrorCodes.BAD_TOKEN) {
      let spotifyAuth = await SpotifyAuth.getInstance();
      await spotifyAuth.getNewToken();
      return true;
    }
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
    let delay = this.baseDelay * Math.pow(this.baseDelay / 1000, this.tryCount);
    console.log(`getDelay called ${delay}`);
    return delay;
  }
}

export type RequestRetryProps = {
  tryCount: number;
  error: HttpError;
  fetchFn: () => Promise<any>;
};

export default RequestRetryHandler;
