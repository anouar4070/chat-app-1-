import { HOST } from "@/lib/constants";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: HOST,
});
