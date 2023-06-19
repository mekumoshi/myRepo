import  express  from "express";
import { authTechnician, registerTechnician, getTechnicianProfile, updateTechnicianProfile, logoutTechnician, getAllTechnicians  } from "../controllers/technician.js";
import { protectTechnician } from "../middleware/authTechnMiddleware.js";

const router = express.Router();

router.post("/", registerTechnician);
router.post("/auth", authTechnician);
router.post("/logout", logoutTechnician);
router.get("/", getAllTechnicians);
router.route("/profile").get(protectTechnician, getTechnicianProfile).put(protectTechnician, updateTechnicianProfile);

export default router;