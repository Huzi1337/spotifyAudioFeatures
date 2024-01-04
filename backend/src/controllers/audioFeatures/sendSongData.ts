import { Response } from "express";
import { AudioFeaturesResponse, SongRequest } from "../../models/types.js";
import convertToCSV from "../../utils/convertToCSV.js";

async function sendSongData(req: SongRequest, res: Response) {
  try {
    const {
      body: { songs },
    } = req;

    let response = {
      songs,
      CSV: convertToCSV(songs as AudioFeaturesResponse[]),
    };

    res.json(response);
    console.log("Request fulfilled");
  } catch (err) {
    res.json(err);
  }
}

export default sendSongData;
