import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 5000,
});

export const getTasks = () => {
  return api.get("/tasks");
};

export const createTask = (taskData) => {
  return api.post("/tasks", taskData);
};
