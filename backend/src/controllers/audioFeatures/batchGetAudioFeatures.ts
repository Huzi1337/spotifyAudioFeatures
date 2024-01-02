import { BATCH_SIZE } from "../../data.js";
import {
  AudioFeatures,
  AudioFeaturesResponse,
  SongBatchProcessParams,
  SongQuery,
  SongRequest,
  SongsWithIds,
} from "../../models/types.js";
import fetchSpotify from "../../utils/fetchSpotify.js";
import { fetchTracksAudioFeatures } from "../../utils/fetchTracksAudioFeatures.js";
import { Response, NextFunction } from "express";

async function batchGetAudioFeatures(
  req: SongRequest,
  res: Response,
  next: NextFunction
) {
  const { songs, includedAudioFeatures } = req.body;
  const NUMBER_OF_BATCHES = Math.ceil(songs.length / BATCH_SIZE);

  for (let i = 0; i < NUMBER_OF_BATCHES; i++) {
    let { audio_features: audioFeatures } = await getAudioFeatures({
      songs,
      index: i,
    });

    batchFilterSongs({
      songs,
      audioFeatures,
      includedAudioFeatures,
      batchStart: i * BATCH_SIZE,
    });
  }

  next();
}

async function getAudioFeatures({
  songs,
  index,
}: {
  songs: SongQuery[];
  index: number;
}) {
  const start = index * BATCH_SIZE;
  const finish = (index + 1) * BATCH_SIZE;

  let songIds = songs
    .slice(start, finish)
    .map((song) => (song as SongsWithIds).id)
    .join(",");

  return await fetchSpotify(async () => fetchTracksAudioFeatures(songIds));
}

function batchFilterSongs({
  songs,
  audioFeatures,
  includedAudioFeatures,
  batchStart,
}: SongBatchProcessParams) {
  for (let j = 0; j < Object.keys(audioFeatures).length; j++) {
    let filtered = filterAudioFeatures(audioFeatures, includedAudioFeatures);

    (songs[batchStart + j] as AudioFeaturesResponse).audioFeatures = filtered;
  }
}

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

export default batchGetAudioFeatures;
