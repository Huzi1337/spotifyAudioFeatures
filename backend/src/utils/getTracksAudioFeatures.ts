import { SongsWithIds } from "../models/types.js";
import { spotifyResponseHandler } from "./spotifyResponseHandler.js";

export const getTracksAudioFeatures = async ({ id }: SongsWithIds) => {
  const URL = `https://api.spotify.com/v1/audio-features?ids=${id}`;
  const data = await spotifyResponseHandler(URL);

  const { audio_features } = data;

  if (audio_features) {
    return audio_features;
  } else {
    throw new Error("No tracks found");
  }
};
