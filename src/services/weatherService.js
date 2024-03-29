import axios from 'axios';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../api';

export const fetchCurrentWeather = async (latitude, longitude) => {
    const response = await axios.get(`${WEATHER_API_URL}/weather`, {
        params: {
            lat: latitude,
            lon: longitude,
            appid: WEATHER_API_KEY,
            units: 'metric',
        },
    });
    return response;
};

export const fetchForecast = async (latitude, longitude) => {
    const response = await axios.get(`${WEATHER_API_URL}/forecast`, {
        params: {
            lat: latitude,
            lon: longitude,
            appid: WEATHER_API_KEY,
            units: 'metric',
        },
    });
    return response;
};
