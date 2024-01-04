import HttpError from "../models/HttpError.js";
import { SpotifyAuth } from "../models/SpotifyAuth.js";

export const spotifyResponseHandler = async (url: string) => {
  let token = (await SpotifyAuth.getInstance()).token;
  const response = await fetch(url, {
    headers: {
      Authorization: token as string,
    },
  });

  if (!response.ok) {
    console.log("spotifyResponseHandler: response not ok");
    throw new HttpError(response.statusText, response.status);
  }

  return await response.json();
};
