import express from "express";
import {
  fetchTrackData,
  validateRequest,
} from "../controllers/audioFeatures.js";

const router = express.Router();

router.post("/", validateRequest, fetchTrackData);

export default router;
