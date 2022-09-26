import axios from "axios";

export const API_URL = {
  locations: "https://api.skypicker.com/locations",
  flights:
    "https://api.skypicker.com/flights?v=3&partner=skypicker&locale=en&typeFlight=return",
};

export const getAirportLocations = async (searchStr) => {
  const places = await axios
    .get(`${API_URL.locations}?term=${searchStr}&location_types=airport`)
    .then((response) => response.data.locations)
    .catch((err) => []);
  return places;
};

export const getFlights = async (options) => {
  const flights = await axios
    .get(`${API_URL.flights}&fly_from=${options.from}&fly_to=${options.to}`)
    .then((response) => response.data.locations)
    .catch((err) => []);
  return flights;
};
