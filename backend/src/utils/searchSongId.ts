import { SongQuery } from "../models/types.js";
import { spotifyResponseHandler } from "./spotifyResponseHandler.js";

export const searchSongId = async ({ title, artist }: SongQuery) => {
  const URL = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    title
  )}&artist=${encodeURIComponent(artist)}&type=track&limit=1`;
  const data = await spotifyResponseHandler(URL);

  if (data.tracks.items[0]) {
    const {
      external_urls: { spotify: spotifyURL },
      id,
    } = data.tracks.items[0];

    return { id, title, spotifyURL };
  } else {
    console.log("No tracks found.");
    return {};
  }
};
