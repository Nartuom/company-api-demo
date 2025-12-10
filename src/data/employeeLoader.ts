import { jsonLoader } from "./jsonLoader";
import dotenv from "dotenv";
import type { Employee } from "../models/employee";

dotenv.config();

export function loadEmployeesJson(): Employee[] {
  const dirPath = process.env.EMPLOYEES_DATA_PATH;

  if (!dirPath) {
    throw new Error("EMPLOYEES_DATA_PATH is not set");
  }

  return jsonLoader<Employee>(dirPath);
}