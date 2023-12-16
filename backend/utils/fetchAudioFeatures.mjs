import { spotifyResponseHandler } from "./spotifyResponseHandler.mjs";

export const fetchAudioFeatures = async ({ id, authStr }) => {
  const data = await spotifyResponseHandler(
    `https://api.spotify.com/v1/audio-features?ids=${id}`,
    authStr
  );
  const { audio_features } = data;

  if (audio_features) {
    return audio_features;
  } else {
    throw new Error("No tracks found");
  }
};
