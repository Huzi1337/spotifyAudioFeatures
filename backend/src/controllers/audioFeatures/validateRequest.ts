import HttpError from "../../models/HttpError.js";
import { UserQuery } from "../../models/types.js";
import { Request, Response, NextFunction } from "express";

function validateRequest(req: Request, res: Response, next: NextFunction) {
  if (isValidRequest(req.body)) {
    next();
  } else {
    res.status(400).json(new HttpError("Invalid request body.", 400));
  }
}

function isValidRequest(input: UserQuery) {
  const { includedAudioFeatures, songs } = input;
  return includedAudioFeatures && songs && Array.isArray(songs);
}

export default validateRequest;
