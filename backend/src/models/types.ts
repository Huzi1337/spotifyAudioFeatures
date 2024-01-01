export interface SongQuery {
  artist: string;
  title: string;
}

export interface SongsWithIds extends SongQuery {
  spotifyURL: string;
  id: string;
}

export type AudioFeatures = {
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

export type UserQuery = {
  songList: SongQuery[];
  audioFeatures: AudioFeatures;
};

export type SpotifyClientData = {
  clientId: string;
  clientSecret: string;
};
