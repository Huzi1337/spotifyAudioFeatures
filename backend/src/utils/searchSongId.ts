import { SongQuery } from "../models/types.js";
import { spotifyResponseHandler } from "./spotifyResponseHandler.js";

export const searchSongId = async ({ title, artist }: SongQuery) => {
  const URL = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    title
  )}&artist=${encodeURIComponent(artist)}&type=track`;
  const data = await spotifyResponseHandler(URL);

  if (data.tracks.items) {
    const {
      external_urls: { spotify: spotifyURL },
      id,
    } = data.tracks.items[0];

    return { id, title, spotifyURL };
  } else {
    throw new Error("No tracks found");
  }
};
