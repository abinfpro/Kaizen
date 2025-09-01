const Treatment = require("../models/Treatment");

// GET user treatments
exports.getTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find({ userId: req.user.id });
    res.json(treatments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST add treatment
exports.addTreatment = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if treatment already exists for this user
    const exists = await Treatment.findOne({ name, userId: req.user.id });
    if (exists) {
      return res.status(400).json({ message: "Already exists" });
    }

    const treatment = await Treatment.create({ name, userId: req.user.id });
    res.status(201).json(treatment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE treatment
exports.deleteTreatment = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Treatment.deleteOne({ _id: id, userId: req.user.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Treatment not found" });
    }

    res.json({ id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
