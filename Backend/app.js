const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./connection/dbConnection");
const { router } = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api",router)



// Start Server
const startServer = async () => {
  try {
    await connectDB(); // ✅ Ensure DB is connected before starting server
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

startServer();
