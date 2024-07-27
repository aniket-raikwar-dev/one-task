import axios from "axios";
import { getToken } from "./utils/getToken";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 50000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
