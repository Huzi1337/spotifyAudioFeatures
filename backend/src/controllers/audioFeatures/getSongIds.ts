import { Response, NextFunction } from "express";
import { SongRequest } from "../../models/types.js";
import { searchSongId } from "../../utils/searchSongId.js";
import fetchSpotify from "../../utils/fetchSpotify.js";

async function getSongIds(req: SongRequest, res: Response, next: NextFunction) {
  const { songs } = req.body;
  for (let i = 0; i < songs.length; i++) {
    const data = await fetchSpotify(async () => searchSongId(songs[i]));
    songs[i] = { ...songs[i], ...data };
  }
  next();
}

export default getSongIds;
