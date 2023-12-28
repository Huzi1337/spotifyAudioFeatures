type SongQuery = { artist: string; title: string };

type AudioFeatures = {
  acousticness?: number;
  danceability?: number;
  duration_ms?: number;
  energy?: number;
  instrumentalness?: number;
  liveness?: number;
  loudness?: number;
  mode?: number;
  speechiness?: number;
  tempo?: number;
  time_signature?: number;
  valence?: number;
  key?: number;
};

type UserQuery = {
  songList: SongQuery[];
  audioFeatures: AudioFeatures;
};
