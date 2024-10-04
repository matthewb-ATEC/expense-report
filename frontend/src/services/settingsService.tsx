import axios from "axios";
const baseURL = "/api/settings";

const get = async () => {
  console.log("Getting settings");
  const request = axios.get(baseURL);
  const response = await request;
  return response.data;
};

const set = async (newSettings: unknown) => {
  console.log(`Updating Settings: ${newSettings}`);
  const request = axios.post(`${baseURL}`, newSettings);
  const response = await request;
  return response.data;
};

const settingsService = { get, set };
export default settingsService;
