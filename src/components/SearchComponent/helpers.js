import axios from "axios";

export const API_URL = {
    places: 'https://api.skypicker.com/locations'
}

export const getAirportPlaces = async (searchStr) => {
    const places = await axios.get(`${API_URL.places}?term=${searchStr}&location_types=airport`)
        .then(response => response.data.locations)
        .catch(err => []);
    return places;
}