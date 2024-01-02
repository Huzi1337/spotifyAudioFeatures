import RequestRetryHandler, {
  RequestRetryProps,
} from "../models/RequestRetryHandler.js";
import fetchSpotify from "./fetchSpotify.js";

jest.mock("../models/RequestRetryHandler");
describe("Success case", () => {
  it("Returns resolved value of the async fetch function", async () => {
    const mockFunction = jest.fn().mockResolvedValue("Resolved");

    const result = await fetchSpotify(mockFunction);

    expect(result).toBe("Resolved");
  });
});

describe("Request error case", () => {
  it("Passes correct args to the constructor of RequestRetryHandler", async () => {
    const mockError = jest.fn().mockRejectedValue(new Error("Rejected"));

    await fetchSpotify(mockError);

    let correctArgs: RequestRetryProps = {
      tryCount: 0,
      error: expect.any(Error),
      fetchFn: expect.any(Function),
    };
    expect(RequestRetryHandler).toHaveBeenCalledWith(correctArgs);
    //Be sure the function calls .retryRequest() method on the Handler.
  });
});
