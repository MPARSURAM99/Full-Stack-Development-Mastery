import Navbar from "../component/component-Js/navbar.js";
import { GEO_LOCATION_API_KEY } from "./config.js";

customElements.define("component-navbar", Navbar);

export async function getAllCountries() {
  try {
    const response = await fetch(
      "https://api.countrystatecity.in/v1/countries",
      {
        headers: { "X-CSCAPI-KEY": GEO_LOCATION_API_KEY },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error("Failed to fetch countries:", error.message);
    return [];
  }
}