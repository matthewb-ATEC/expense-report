/**
 * @file settingsService.tsx - ./frontend/src/services
 * @description [Add description here]
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage [Add usage information here]
 * @dependencies [Add dependencies here]
 * @relatedFiles [Add related files here]
 */

import axios from "axios";
import { SettingsType } from "../data/types";
const baseURL = "/api/settings";

const get = async () => {
  console.log("Getting settings");
  const request = axios.get<SettingsType>(baseURL);
  const response = await request;
  return response.data;
};

const set = async (newSettings: SettingsType) => {
  console.log("Updating Settings", newSettings);
  const request = axios.post<SettingsType>(baseURL, newSettings);
  const response = await request;
  return response.data;
};

const settingsService = { get, set };
export default settingsService;
