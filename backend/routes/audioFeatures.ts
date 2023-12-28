import express from "express";
import { fetchTrackData } from "../controllers/audioFeatures";

const router = express.Router();

router.post("/", validateReq, fetchTrackData);

function validateReq() {}

export default router;
