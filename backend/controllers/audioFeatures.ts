import HttpError from "../models/HttpError";
import { fetchSpotify } from "../utils/fetchSpotify";
import { searchSongId } from "../utils/searchSongId";
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
    req.body;
  } catch (err) {
    res.statusCode = 404;
    res.send("Bad request");
  }
};
