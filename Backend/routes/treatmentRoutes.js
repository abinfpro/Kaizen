const express = require("express")
const { getTreatments, addTreatment, deleteTreatment } = require("../controllers/treatmentController.js")
const { protect } = require("../middleware/authMiddleware.js")

const router = express.Router();

router.get("/", protect, getTreatments);
router.post("/", protect, addTreatment);
router.delete("/:id", protect, deleteTreatment);

export default router;
