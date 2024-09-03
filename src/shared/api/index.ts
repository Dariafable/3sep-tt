import axios from "axios";
import { API_BASE_URL } from "@shared/constants";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
