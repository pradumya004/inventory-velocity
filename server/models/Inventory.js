// server/models/Inventory.js

import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a material name"],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "Please add a unique SKU"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Hardware",
        "Electronics",
        "Furniture",
        "Raw Materials",
        "Packaging",
      ],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
    },
    // Logical warehouse mapping
    location: {
      zone: {
        type: String,
        required: true,
        uppercase: true,
      },
      row: {
        type: String,
        required: true,
      },
      shelf: {
        type: String,
        required: true,
      },
    },
    entryDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field to calculate aging on the fly
InventorySchema.virtual("daysInInventory").get(function () {
  const diffTime = Math.abs(new Date() - this.entryDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual field to determine status based on aging
InventorySchema.virtual("status").get(function () {
  const days = this.daysInInventory;
  if (days >= 90) return "DEAD";
  if (days >= 30) return "SLOW";
  return "FRESH";
});

const Inventory = mongoose.model("Inventory", InventorySchema, "inventories");
export default Inventory;