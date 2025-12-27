// server/controllers/inventoryController.js

import Inventory from "../models/Inventory.js";

// @desc    Get all inventory with computed Status (Dead/Slow/Fresh)
// @route   GET /api/inventory
export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find().sort({ entryDate: 1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new inventory item
// @route   POST /api/inventory
export const addInventory = async (req, res) => {
  try {
    const { name, sku, category, quantity, location, entryDate } = req.body;

    // Validation: Ensure location is complete
    if (!location || !location.zone || !location.row || !location.shelf) {
      return res
        .status(400)
        .json({ message: "Full location (Zone, Row, Shelf) is required" });
    }

    const inventory = await Inventory.create({
      name,
      sku,
      category,
      quantity,
      location,
      // Robust backdating: uses provided date or defaults to now
      entryDate: entryDate || new Date(),
    });

    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get Top-Level Dashboard Stats
// @route   GET /api/inventory/stats
export const getInventoryStats = async (req, res) => {
  try {
    const items = await Inventory.find();

    // 1. Basic Aggregation
    const totalItems = items.length;
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    // 2. Health Distribution (Synced with Model Logic)
    // DEAD: >= 90 days
    const deadStockCount = items.filter(
      (item) => item.daysInInventory >= 90
    ).length;

    // SLOW: 30 to 89 days
    const slowStockCount = items.filter(
      (item) => item.daysInInventory >= 30 && item.daysInInventory < 90
    ).length;

    // FRESH: < 30 days
    const freshStockCount = items.filter(
      (item) => item.daysInInventory < 30
    ).length;

    res.status(200).json({
      totalItems,
      totalQuantity,
      deadStockCount,
      slowStockCount,
      freshStockCount,
      deadStockPercentage: totalItems
        ? ((deadStockCount / totalItems) * 100).toFixed(1)
        : 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update stock quantity
// @route   PATCH /api/inventory/:id
export const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true, runValidators: true }
    );
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete inventory item
// @route   DELETE /api/inventory/:id
export const deleteItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item removed from system" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};