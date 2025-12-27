// client/src/lib/api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch Dashboard Stats (Total Value, Dead Stock Count)
export const getInventoryStats = async () => {
  const res = await fetch(`${API_BASE_URL}/stats`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
};

// Fetch All Inventory Items
export const getInventory = async () => {
  const res = await fetch(`${API_BASE_URL}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return res.json();
};

// Add New Inventory Item
export const addInventory = async (data) => {
  const res = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to add item");
  }
  return res.json();
};

// Update Inventory Item Quantity
export const updateInventory = async (id, quantity) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update item");
  }
  return res.json();
};

// Delete Inventory Item
export const deleteInventory = async (id) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, { 
    method: "DELETE" 
  });
  
  if (!res.ok) {
    throw new Error("Failed to delete item");
  }
  return res.json();
};