import express from "express";
import {
  batchGetAudioFeatures,
  getSongIds,
  sendSongData,
  validateRequest,
} from "../controllers/audioFeatures.js";

const router = express.Router();

router.post(
  "/",
  validateRequest,
  getSongIds,
  batchGetAudioFeatures,
  sendSongData
);

export default router;
