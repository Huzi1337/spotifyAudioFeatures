import { Response } from "express";
import { SongRequest } from "../../models/types.js";

async function sendSongData(req: SongRequest, res: Response) {
  try {
    res.json(req.body.songs);
    console.log("Request fulfilled");
  } catch (err) {
    res.json(err);
  }
}

export default sendSongData;
