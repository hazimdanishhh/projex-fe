// src/api/project.api.js
import axios from "./axiosConfig";

// ========================
// Projects: Get All (Own Projects Only, Admin Gets All)
// ========================
export const getProjects = async () => {
  const res = await axios.get("/projects");
  return res.data;
};

// ========================
// Projects: Get Single Project by ID
// ========================
export const getProjectById = async (id) => {
  const res = await axios.get(`/projects/${id}`);
  return res.data;
};

// ========================
// Projects: Create New Project
// ========================
export const createProject = async (payload) => {
  const res = await axios.post("/projects", payload);
  return res.data;
};

// ========================
// Projects: Update Project by ID
// ========================
export const updateProjectById = async (id, payload) => {
  const res = await axios.patch(`/projects/${id}`, payload);
  return res.data;
};

// ========================
// Projects: Delete Project by ID
// ========================
export const deleteProjectById = async (id) => {
  const res = await axios.delete(`/projects/${id}`);
  return res.data;
};
