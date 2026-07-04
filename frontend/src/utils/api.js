// src/utils/api.js

import { generateDummyData } from "../data/generateData";

// In‑memory store
let inventoryItems = generateDummyData(20);
let nextId = inventoryItems.length + 1;

// Helper to simulate async delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Login – dummy: accept any username/password, but we check for "admin"/"noun2026" as demo
  login: async (credentials) => {
    await delay(400);
    const { username, password } = credentials;
    if (username === "admin" && password === "noun2026") {
      return {
        token: "dummy-token-xyz",
        username: "Admin",
        role: "Administrator",
      };
    }
    // Also accept any credentials for demonstration (but we keep the demo hint)
    if (username && password) {
      return {
        token: "dummy-token-" + Math.random().toString(36).substr(2, 9),
        username: username,
        role: "Staff",
      };
    }
    throw new Error("Invalid credentials");
  },

  getInventory: async () => {
    await delay(300);
    return [...inventoryItems]; // return a copy
  },

  addItem: async (item) => {
    await delay(400);
    const newItem = {
      ...item,
      id: nextId++,
      status:
        item.quantity <= 0
          ? "Out of Stock"
          : item.quantity <= 50
            ? "Low Stock"
            : "In Stock",
    };
    inventoryItems.push(newItem);
    return newItem;
  },

  updateItem: async (id, updatedData) => {
    await delay(400);
    const index = inventoryItems.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");
    const updated = {
      ...inventoryItems[index],
      ...updatedData,
      status:
        updatedData.quantity <= 0
          ? "Out of Stock"
          : updatedData.quantity <= 50
            ? "Low Stock"
            : "In Stock",
    };
    inventoryItems[index] = updated;
    return updated;
  },

  deleteItem: async (id) => {
    await delay(300);
    const index = inventoryItems.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");
    inventoryItems.splice(index, 1);
    return { success: true };
  },
};
