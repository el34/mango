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
  console.log(options);
  const flights = await axios
    .get(
      `${API_URL.flights}&fly_from=${options.from}&fly_to=${options.to}&depart_after=${options.departureDate[0]}&depart_before=${options.departureDate[1]}&rt_depart_after=${options.returnDate[0]}&rt_depart_before=${options.returnDate[1]}`
    )
    .then((response) => response.data)
    .catch((err) => []);
  return flights;
};
