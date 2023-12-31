import HttpError from "../models/HttpError.js";
import { UserQuery } from "../models/types.js";
import { fetchSpotify } from "../utils/fetchSpotify.js";
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

function isValidRequest(input: any) {
  return (input as UserQuery).audioFeatures && (input as UserQuery).songList;
}

export const fetchTrackData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //fetchSpotify(searchSongId());
    //fetchSpotify(getTracksAudioFeatures());
    //res.json(audioFeatures)
  } catch (err) {
    res.statusCode = 404;
    res.send("Bad request");
  }
};
