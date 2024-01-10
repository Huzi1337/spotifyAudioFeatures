export interface UserQuery {
  songs: SongQuery[];
  includedAudioFeatures: AudioFeatures;
}

export type ApiResponse = {
  songs: AudioFeaturesResponse[];
  CSV: string;
};

export type AudioFeaturesResponse = {
  artist: string;
  title: string;
  audioFeatures: AudioFeatures;
  spotifyURL: string;
  id: string;
};

export interface SongQuery {
  artist: string;
  title: string;
}

export type Options = {
  audioFeatures: AudioFeatures;
};

export type AudioFeatures = {
  acousticness?: number | boolean;
  danceability?: number | boolean;
  duration_ms?: number | boolean;
  energy?: number | boolean;
  instrumentalness?: number | boolean;
  liveness?: number | boolean;
  loudness?: number | boolean;
  mode?: number | boolean;
  speechiness?: number | boolean;
  tempo?: number | boolean;
  time_signature?: number | boolean;
  valence?: number | boolean;
  key?: number | boolean;
};
