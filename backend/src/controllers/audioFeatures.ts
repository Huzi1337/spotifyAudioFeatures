import HttpError from "../models/HttpError.js";
import {
  AudioFeatures,
  AudioFeaturesResponse,
  SongsWithIds,
  UserQuery,
} from "../models/types.js";
import { fetchSpotify } from "../utils/fetchSpotify.js";
import { fetchTracksAudioFeatures } from "../utils/fetchTracksAudioFeatures.js";
import { searchSongId } from "../utils/searchSongId.js";
import { Request, Response, NextFunction } from "express";

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (isValidRequest(req.body)) {
    next();
  } else {
    res.status(400).json(new HttpError("Invalid request body.", 400));
  }

  function isValidRequest(input: unknown) {
    return (
      (input as UserQuery).includedAudioFeatures && (input as UserQuery).songs
    );
  }
}

export async function getSongIds(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { songs } = req.body as UserQuery;
  for (let i = 0; i < songs.length; i++) {
    //get it to modify songs instead
    const data = await fetchSpotify(async () => searchSongId(songs[i]));
    songs[i] = { ...songs[i], ...data };
  }
  next();
}

export async function batchGetAudioFeatures(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { songs: songs, includedAudioFeatures } = req.body as UserQuery;

  const BATCH_SIZE = 100;
  const NUMBER_OF_BATCHES = Math.ceil(songs.length / BATCH_SIZE);

  for (let i = 0; i < NUMBER_OF_BATCHES; i++) {
    const BATCH_START = i * BATCH_SIZE;
    const BATCH_FINISH = (i + 1) * BATCH_SIZE;

    let songIds = songs
      .slice(BATCH_START, BATCH_FINISH)
      .map((song) => (song as SongsWithIds).id)
      .join(",");

    let { audio_features: audioFeatures } = await fetchSpotify(async () =>
      fetchTracksAudioFeatures(songIds)
    );

    //get the required audio features
    for (let j = 0; j < audioFeatures.length; j++) {
      let requestedAudioFeatures = filterAudioFeatures(
        audioFeatures,
        includedAudioFeatures
      );

      (songs[BATCH_START + j] as AudioFeaturesResponse).audioFeatures =
        requestedAudioFeatures;
    }
  }

  next();

  function filterAudioFeatures(
    allValues: AudioFeatures,
    selectedValues: AudioFeatures
  ) {
    let requestedAudioFeatures: AudioFeatures = {};
    for (const key in selectedValues) {
      const typedKey = key as keyof AudioFeatures;
      if (selectedValues[typedKey]) {
        requestedAudioFeatures[typedKey] = allValues[typedKey];
      }
    }
    return requestedAudioFeatures;
  }
}

export async function sendSongData(req: Request, res: Response) {
  try {
    res.json(req.body.songs);
  } catch (err) {
    res.status(404).send("Bad request");
  }
}
