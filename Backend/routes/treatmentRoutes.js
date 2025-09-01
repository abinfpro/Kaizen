import express from "express";
import { getTreatments, addTreatment, deleteTreatment } from "../controllers/treatmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTreatments);
router.post("/", protect, addTreatment);
router.delete("/:id", protect, deleteTreatment);

export default router;
