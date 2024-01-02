import { Request } from "express";

export interface SongQuery {
  artist: string;
  title: string;
}

export interface SongsWithIds extends SongQuery {
  spotifyURL: string;
  id: string;
}

export interface AudioFeaturesResponse extends SongsWithIds {
  audioFeatures: AudioFeatures;
}

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

export interface UserQuery {
  songs: SongQuery[];
  includedAudioFeatures: AudioFeatures;
}

export type SpotifyClientData = {
  clientId: string;
  clientSecret: string;
};

export interface SongBatchProcessParams extends UserQuery {
  audioFeatures: AudioFeatures;
  batchStart: number;
}

export interface SongRequest extends Request {
  body: UserQuery;
}
