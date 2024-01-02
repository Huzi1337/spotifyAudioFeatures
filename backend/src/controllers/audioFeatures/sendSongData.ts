import { Response } from "express";
import { SongRequest } from "../../models/types.js";

async function sendSongData(req: SongRequest, res: Response) {
  try {
    res.json(req.body.songs);
  } catch (err) {
    res.status(404).send("Bad request");
  }
}

export default sendSongData;
