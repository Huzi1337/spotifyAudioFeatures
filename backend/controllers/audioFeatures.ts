import { fetchSpotify } from "../utils/fetchSpotify";
import { searchSongId } from "../utils/searchSongId";
import { Request, Response, NextFunction } from "express";

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
