import api from "../api";
import Location from "./location";

/**
 * Fetches location data from the API and parses it into Location instances.
 * @async
 * @function fetchLocations
 * @returns {Promise<Location[]>} An array of Location objects.
 * @throws {Error} If the API request fails.
 */
export async function fetchLocations() {
  const response = await api.get("/locations");
  if (response.status === 200) {
    return response.data.map((item) => new Location(item));
  } else {
    throw new Error("Failed to fetch locations");
  }
}
