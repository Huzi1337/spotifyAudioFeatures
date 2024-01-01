import express from "express";
import { sendSongData, validateRequest } from "../controllers/audioFeatures.js";

const router = express.Router();

router.post("/", validateRequest, sendSongData);

export default router;
