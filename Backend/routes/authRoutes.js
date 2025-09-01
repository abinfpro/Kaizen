import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const {name, email } = req.body;
  const user={name,email}
  

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, user });
});



export default router;
