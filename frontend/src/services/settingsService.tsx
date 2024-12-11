/**
 * @file settingsService.tsx - ./frontend/src/services
 * @description Service module for retrieving and updating application settings.
 *              Handles GET and POST requests to the settings API endpoint.
 * @author matthewb
 * @date Created: 2024-10-01 | Last Modified: 2024-10-02
 * @version 1.0.0
 * @license MIT
 * @usage Import the service to get or update settings:
 *        `import settingsService from "./settingsService";`
 *        Example usage:
 *        `const settings = await settingsService.get();`
 *        `await settingsService.set(newSettings);`
 * @dependencies Axios is used for making HTTP requests, and `SettingsType` is imported from the types module.
 * @relatedFiles ../data/types (for `SettingsType`)
 */

import axios from 'axios'
import { SettingsType } from '../data/types'
const baseURL = '/api/settings'

const get = async () => {
  const request = axios.get<SettingsType>(baseURL)
  const response = await request
  return response.data
}

const set = async (newSettings: SettingsType) => {
  const request = axios.put<SettingsType>(baseURL, newSettings)
  const response = await request
  return response.data
}

const settingsService = { get, set }
export default settingsService
