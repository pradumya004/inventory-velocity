// server/routes/inventoryRoutes.js

import express from "express";
import {
  getInventory,
  addInventory,
  getInventoryStats,
  updateQuantity,
  deleteItem
} from "../controllers/inventoryController.js";

const router = express.Router();

// Route: /api/inventory/stats
router.get("/stats", getInventoryStats);

// Route: /api/inventory
router.route("/").get(getInventory).post(addInventory);

// Route: /api/inventory/:id
router
  .route("/:id")
  .put(updateQuantity) // Update quantity only
  .delete(deleteItem); // Delete item

export default router;