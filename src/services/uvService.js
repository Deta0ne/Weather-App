import axios from 'axios';
import { UV_API_URL, UV_API_KEY } from '../api';

export const fetchUVIndex = async (latitude, longitude) => {
    const response = await axios.get(`${UV_API_URL}/uv`, {
        params: { lat: latitude, lng: longitude },
        headers: {
            'x-access-token': UV_API_KEY,
        },
    });
    return response;
};
