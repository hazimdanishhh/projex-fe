// src/api/task.api.js
import axios from "./axiosConfig";

// ========================
// Tasks: Get All Tasks (Only tasks from user's projects, Admin gets all)
// ========================
export const getTasks = async () => {
  const res = await axios.get("/tasks");
  return res.data;
};

// ========================
// Tasks: Get Single Task by ID
// ========================
export const getTaskById = async (id) => {
  const res = await axios.get(`/tasks/${id}`);
  return res.data;
};

// ========================
// Tasks: Create New Task
// ========================
export const createTask = async (payload) => {
  const res = await axios.post("/tasks", payload);
  return res.data;
};

// ========================
// Tasks: Update Task by ID
// ========================
export const updateTaskById = async (id, payload) => {
  const res = await axios.patch(`/tasks/${id}`, payload);
  return res.data;
};

// ========================
// Tasks: Delete Task by ID
// ========================
export const deleteTaskById = async (id) => {
  const res = await axios.delete(`/tasks/${id}`);
  return res.data;
};
