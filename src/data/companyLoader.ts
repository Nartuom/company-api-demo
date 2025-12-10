import { jsonLoader } from "./jsonLoader"
import dotenv from "dotenv";
import type { Company } from "../models/company";

dotenv.config();

export function loadCompaniesJson(): Company[] {
  const dirPath = process.env.COMPANIES_DATA_PATH;

  if (!dirPath) {
    throw new Error("COMPANIES_DATA_PATH is not set");
  }

  return jsonLoader<Company>(dirPath);
}

