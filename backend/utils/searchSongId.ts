import { spotifyResponseHandler } from "./spotifyResponseHandler.mjs";

export const searchSongIdAndURL = async ({ title, artist, authStr }) => {
  const data = await spotifyResponseHandler(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      title
    )}&artist=${encodeURIComponent(artist)}&type=track`,
    authStr
  );

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
