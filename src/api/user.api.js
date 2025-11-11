// src/api/user.api.js
import axios from "./axiosConfig";

// USERS: Get Current Authenticated User (/users/me)
export const getCurrentUser = async () => {
  const res = await axios.get("/users/me");
  return res.data;
};

// USERS: Update User by ID
export const updateCurrentUser = async (payload) => {
  const res = await axios.patch("/users/me", payload);
  return res.data;
};

// ADMIN ONLY: Get User by ID
export const getUserById = async (id) => {
  const res = await axios.get(`/users/${id}`);
  return res.data;
};

// ADMIN ONLY: Update User by ID
export const updateUserById = async (id, payload) => {
  const res = await axios.patch(`/users/${id}`, payload);
  return res.data;
};
