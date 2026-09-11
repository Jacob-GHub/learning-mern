require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;
const DB_URI = process.env.MONGODB_URI;
const url_routes = require("./routes/slugRoutes");
const URL = require("./models/Slug");
const { updateUrl } = require("./controllers/slugController");

console.log("Mongo URI:", process.env.MONGODB_URI);
app.use(express.json());
app.use(cors());

app.use("/api", url_routes);
app.get("/:slug", updateUrl);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "server is healthy and running",
  });
});

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    await URL.syncIndexes();
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
