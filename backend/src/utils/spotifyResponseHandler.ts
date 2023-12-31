import HttpError from "../models/HttpError.js";

export const spotifyResponseHandler = async (url: any, authStr: any) => {
  const response = await fetch(url, {
    headers: {
      Authorization: authStr,
    },
  });

  if (!response.ok) {
    throw new HttpError(response.statusText, response.status);
  }

  return await response.json();
};
