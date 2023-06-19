import express from "express";
import { getServices, getService, updateService, createService } from "../controllers/service.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

//router.get("/", getServices);
//router.post("/", createService);
router.route("/").get(getServices).post(protect, createService);
router.route("/:id").get(getService).put(protect, updateService);

export default router;