import HttpError from "../models/HttpError.js";
import { SongQuery, SongsWithIds, UserQuery } from "../models/types.js";
import { fetchSpotify } from "../utils/fetchSpotify.js";
import { getTracksAudioFeatures } from "../utils/getTracksAudioFeatures.js";
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
}

function isValidRequest(input: unknown) {
  return (input as UserQuery).audioFeatures && (input as UserQuery).songList;
}

export const sendSongData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { songList } = req.body as UserQuery;
    await addSongAudioFeatures(songList);
    res.json(songList);
  } catch (err) {
    rejectRequest(err);
  }

  async function addSongAudioFeatures(songList: SongQuery[]) {
    await getSongIds(songList);
    await batchGetAudioFeatures(songList as SongsWithIds[]);
  }

  async function rejectRequest(err: unknown) {
    res.statusCode = 404;
    res.send("Bad request");
  }
};

async function getSongIds(songList: SongQuery[]) {
  let songs: SongsWithIds[] = [];

  for (const song of songList) {
    //get it to modify songList instead
    const data = await fetchSpotify(() => searchSongId(song));
    songs.push(data);
  }
  return songs;
}

async function batchGetAudioFeatures(songList: SongsWithIds[]) {
  const BATCH_SIZE = 100;
  const NUMBER_OF_BATCHES = Math.ceil(songList.length / BATCH_SIZE);

  for (let i = 0; i < NUMBER_OF_BATCHES; i++) {
    const BATCH_START = i * BATCH_SIZE;
    const BATCH_FINISH = (i + 1) * BATCH_SIZE;

    let songIds = songList
      .slice(BATCH_START, BATCH_FINISH)
      .map((song) => song.id)
      .join(",");

    let audioFeatures = await getTracksAudioFeatures(songIds);
    //get the required audio features
    for (let j = 0; j < audioFeatures.length; j++) {
      songList[BATCH_START + j].audioFeatures = audioFeatures;
    }
  }

  return songList;
}
