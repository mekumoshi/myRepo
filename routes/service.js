import express from "express";
import { getServices, getService, updateService, createService } from "../controllers/service.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

//router.get("/", getServices);
//router.post("/", createService);
router.route("/").get(protect, getServices).post(protect, createService);
router.route("/:id").get(protect, getService).put(protect, updateService);

export default router;