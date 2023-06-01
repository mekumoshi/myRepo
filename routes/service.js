import express from "express";
import { getServices, createService } from "../controllers/service.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", createService);

export default router;