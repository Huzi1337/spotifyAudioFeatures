import { AudioFeatures, SongQuery, UserQuery } from "../types";

function prepareReqBody(text: string, audioFeatures: AudioFeatures) {
  const songs: SongQuery[] = [];
  for (const line of text.split("\n")) {
    const [title, artist] = line.split(";");
    songs.push({ title, artist });
  }
  const body: UserQuery = {
    songs,
    includedAudioFeatures: audioFeatures,
  };
  return JSON.stringify(body);
}

export default prepareReqBody;
