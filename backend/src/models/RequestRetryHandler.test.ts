import RequestRetryHandler, {
  RequestRetryProps,
} from "./RequestRetryHandler.js";
import { BASE_DELAY, MAX_RETRIES } from "../data.js";
import HttpError, { ErrorCodes } from "./HttpError.js";

const mockFn = jest.fn().mockResolvedValue("Resolved");

it("Calculates correct delay", () => {
  mockDelay(0);
  mockDelay(1);
  mockDelay(3);
});

it("Does not retry requests when the limit is hit", () => {
  const args: RequestRetryProps = {
    tryCount: MAX_RETRIES,
    error: new HttpError("Message", ErrorCodes.TOO_MANY_REQUESTS),
    fetchFn: mockFn,
  };
  const instance = new RequestRetryHandler(args);

  expect(instance.shouldRetry()).toBeFalsy();
});

it("Retries requests when below the limit", () => {
  const args: RequestRetryProps = {
    tryCount: 2,
    error: new HttpError("Message", ErrorCodes.TOO_MANY_REQUESTS),
    fetchFn: mockFn,
  };
  const instance = new RequestRetryHandler(args);

  expect(instance.shouldRetry()).toBeTruthy();
});

function mockDelay(tryCount: number) {
  const args: RequestRetryProps = {
    tryCount,
    error: new HttpError("Message", ErrorCodes.TOO_MANY_REQUESTS),
    fetchFn: mockFn,
  };

  const instance = new RequestRetryHandler(args);

  expect(instance.getDelay()).toBe(BASE_DELAY * Math.pow(BASE_DELAY, tryCount));
}
