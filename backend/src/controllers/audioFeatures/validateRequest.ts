import { UserQuery } from "../../models/types.js";
import { Request, Response, NextFunction } from "express";

function validateRequest(req: Request, res: Response, next: NextFunction) {
  console.log(req.body);
  if (isValidRequest(req.body)) {
    next();
  } else {
    res.json("Bad request");
  }
}

function isValidRequest(input: UserQuery) {
  const { includedAudioFeatures, songs } = input;
  console.log(`Features: ${includedAudioFeatures}, songs: ${songs}`);
  return includedAudioFeatures && songs && Array.isArray(songs);
}

export default validateRequest;
