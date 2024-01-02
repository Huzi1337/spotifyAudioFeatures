import { SpotifyAuth } from "./SpotifyAuth.js";
global.fetch = jest.fn().mockResolvedValue({
  json: jest
    .fn()
    .mockResolvedValue({ token_type: "type", access_token: "token" }),
});

describe("SpotifyAuth test", () => {
  afterEach(() => {
    jest.clearAllMocks();
    SpotifyAuth.destroyInstance();
  });

  it("Fetches the key only on the first .getInstance call", async () => {
    SpotifyAuth.getInstance();
    SpotifyAuth.getInstance();

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("Correctly forms an auth token", async () => {
    let token = (await SpotifyAuth.getInstance()).token;
    expect(token).toBe("type token");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("Gets new token on .getNewToken()", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: jest
          .fn()
          .mockResolvedValue({ token_type: "type", access_token: "token" }),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({
          token_type: "type",
          access_token: "differentToken",
        }),
      });
    let instance = await SpotifyAuth.getInstance();
    let token1 = instance.token;

    await instance.getNewToken();
    let token2 = instance.token;

    expect(token1).not.toBe(token2);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
