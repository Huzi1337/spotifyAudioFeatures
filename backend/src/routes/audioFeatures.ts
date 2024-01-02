import express from "express";
import validateRequest from "../controllers/audioFeatures/validateRequest.js";
import getSongIds from "../controllers/audioFeatures/getSongIds.js";
import batchGetAudioFeatures from "../controllers/audioFeatures/batchGetAudioFeatures.js";
import sendSongData from "../controllers/audioFeatures/sendSongData.js";

const router = express.Router();

router.post(
  "/",
  validateRequest,
  getSongIds,
  batchGetAudioFeatures,
  sendSongData
);

export default router;
