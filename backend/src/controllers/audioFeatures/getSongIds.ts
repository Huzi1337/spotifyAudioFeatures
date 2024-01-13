import { Response, NextFunction } from "express";
import { SongQuery, SongRequest } from "../../models/types.js";
import { searchSongId } from "../../utils/searchSongId.js";
import fetchSpotify from "../../utils/fetchSpotify.js";
import { SpotifyAuth } from "../../models/SpotifyAuth.js";

const BATCH_SIZE = 50;

async function getSongIds(req: SongRequest, res: Response, next: NextFunction) {
  const { songs } = req.body;
  SpotifyAuth.getInstance().then(async () => {
    for (let i = 0; i < songs.length; i += BATCH_SIZE) {
      let end = Math.min(songs.length, i + BATCH_SIZE);
      let batch = await handleBatch(i, end);
      for (let j = 0; j < batch.length; j++) {
        songs[i + j] = { ...songs[i + j], ...batch[j] };
      }
    }
    next();
  });

  async function handleBatch(start: number, end: number) {
    let batch = [];

    console.log(`Batch ${start / BATCH_SIZE} \n ------------ \n`);

    for (let i = start; i < end; i++) {
      if (!isTitleAndArtistValid(songs[i])) continue;

      batch.push(fetchSpotify(async () => searchSongId(songs[i])));
    }
    return await Promise.all(batch);
  }
}

function isTitleAndArtistValid(song: SongQuery) {
  return song.title && song.artist && song.title.length && song.artist.length;
}

export default getSongIds;
