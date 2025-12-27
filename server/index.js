// server/index.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

// 1. Configuration
dotenv.config();
connectDB();

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Routes
// Mounts all inventory logic to /api/inventory
app.use("/api/inventory", inventoryRoutes);

// Base Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});